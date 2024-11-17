import React, { useState } from "react";
import tether from "../tether.png";

const Main = ({
  tetherBalance,
  rwdBalance,
  stakingBalance,
  stakeTokens,
  unstakeTokens
}) => {
  const [inputText, setInputText] = useState("");
  return (
    <div id="content" className="mt-3">
      <table className="table text-muted text-center">
        <thead>
          <tr style={{ color: "white" }}>
            <th scope="col">Staking Balance</th>
            <th scope="col">Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ color: "white" }}>
            <td>{window.web3.utils.fromWei(stakingBalance, "ether")} USDT</td>
            <td>{window.web3.utils.fromWei(rwdBalance, "ether")} RWD</td>
          </tr>
        </tbody>
      </table>
      <div className="card mb-2 p-3" style={{ opacity: ".9" }}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            let amount;
            amount = inputText.toString();
            amount = window.web3.utils.toWei(amount, "ether");
            stakeTokens(amount);
          }}
          className="mb-3"
        >
          <div style={{ borderSpacing: "0 1em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <label style={{ marginLeft: "15px" }}>
                <b>Stake Tokens</b>
              </label>
              <span style={{ marginRight: "8px" }}>
                Balance: {window.web3.utils.fromWei(tetherBalance, "ether")}
              </span>
            </div>

            <div className="input-group mb-4">
              <input
                type="text"
                placeholder="0"
                required
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="input-group-open">
                <div className="input-group-text">
                  <img src={tether} alt="tether" height="32" />
                  &nbsp;&nbsp;&nbsp; USDT
                </div>
              </div>
            </div>
            <button
              disabled={Number(inputText) <= 0}
              type="submit"
              style={{ width: "100%" }}
              className="btn btn-primary btn-lg btn-block"
            >
              DEPOSIT
            </button>
          </div>
        </form>
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            unstakeTokens();
          }}
          className="btn btn-primary btn-lg btn-block"
        >
          WITHDRAW
        </button>
        <div className="card-body text-center" style={{ color: "blue" }}>
          AIRDROP{" "}
          {/* <Airdrop
            stakingBalance={this.props.stakingBalance}
            decentralBankContract={this.props.decentralBankContract}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
