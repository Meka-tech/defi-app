import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentalBank from "../truffle_abis/DecentralBank.json";
import Main from "./Main";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ParticleSettings from "./ParticleSettings";

const App = () => {
  //state
  const [account, setAccount] = useState("0x0");
  const [tether, setTether] = useState(null);
  const [rwd, setRwd] = useState(null);
  const [decentralBank, setDecentralBank] = useState(null);
  const [tetherBalance, setTetherBalance] = useState("0");
  const [rwdBalance, setRwdBalance] = useState("0");
  const [stakingBalance, setStakingBalance] = useState("0");
  const [loading, setLoading] = useState(true);

  const LoadWeb3 = async () => {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "No ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  const LoadBlockChainData = async () => {
    try {
      const web3 = window.web3;

      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      //get account
      const accounts = await web3.eth.getAccounts();
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found. Please connect your wallet.");
      }
      const account = accounts[0];
      setAccount(account);

      //get netword Id
      const networkId = await web3.eth.net.getId();

      //load contract on Netword Id
      const tetherData = Tether.networks[networkId];
      const rwdData = RWD.networks[networkId];
      const decentralBankData = DecentalBank.networks[networkId];

      if (!tetherData || !rwdData || !decentralBankData) {
        throw new Error(
          "One or more contracts not deployed to the detected network."
        );
      }

      //tether
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      setTether(tether);
      let tetherBalance = await tether.methods.balanceOf(account).call();
      setTetherBalance(tetherBalance.toString());

      //rwd
      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
      setRwd(rwd);
      let rwdBalance = await rwd.methods.balanceOf(account).call();
      setRwdBalance(rwdBalance.toString());

      //decentral bank
      const decentralBank = new web3.eth.Contract(
        DecentalBank.abi,
        decentralBankData.address
      );

      setDecentralBank(decentralBank);

      let stakingBalance = await decentralBank.methods
        .stakingBalance(account)
        .call();

      setStakingBalance(stakingBalance.toString());
    } catch (error) {
      window.alert(error.message);
    }
    setLoading(false);
  };

  const StakeTokens = async (amount) => {
    try {
      setLoading(true);
      await tether.methods
        .approve(decentralBank._address, amount)
        .send({ from: account });

      await decentralBank.methods
        .depositTokens(amount)
        .send({ from: account })
        .on("transactionHash", (hash) => {
          // setLoading(false);
        });

      let tetherBalance = await tether.methods.balanceOf(account).call();
      let stakingBalance = await decentralBank.methods
        .stakingBalance(account)
        .call();
      setTetherBalance(tetherBalance.toString());
      setStakingBalance(stakingBalance.toString());
    } catch (error) {
      window.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const UnstakeTokens = async () => {
    try {
      setLoading(true);
      await decentralBank.methods
        .unstakeTokens()
        .send({ from: account })
        .on("transactionHash", (hash) => {
          //function
        });

      let tetherBalance = await tether.methods.balanceOf(account).call();
      let stakingBalance = await decentralBank.methods
        .stakingBalance(account)
        .call();
      setTetherBalance(tetherBalance.toString());
      setStakingBalance(stakingBalance.toString());
    } catch (error) {
      window.alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    LoadWeb3();
    LoadBlockChainData();
  }, []);

  return (
    <div>
      <ParticleSettings />
      <Navbar
        acoount={account}
        className="App"
        style={{ position: "relative" }}
      />

      <div className="container-fluid mt-5">
        {loading ? (
          <p
            id="loader"
            className="text-center"
            style={{
              margin: "30px",
              position: "relative",
              zIndex: "5",
              color: "white"
            }}
          >
            LOADING PLEASE...
          </p>
        ) : (
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{
                maxWidth: "600px",
                minHeight: "100vm",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <div>
                <Main
                  tetherBalance={tetherBalance}
                  stakingBalance={stakingBalance}
                  rwdBalance={rwdBalance}
                  stakeTokens={StakeTokens}
                  unstakeTokens={UnstakeTokens}
                />
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
