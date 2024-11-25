import React, { useState } from "react";
import tether from "../tether.png";
import Airdrop from "./Airdrop";

const Main = ({
  tetherBalance,
  rwdBalance,
  stakingBalance,
  stakeTokens,
  unstakeTokens,
  issueTokens,
  hasClaimed
}) => {
  const [inputText, setInputText] = useState("");
  return (
    <div
      id="content"
      className="mt-3 "
      style={{ position: "relative", zIndex: 5 }}
    >
      <table
        className="table text-muted text-center"
        style={{ background: "transparent" }}
      >
        <thead>
          <tr style={{ color: "red" }}>
            <th
              style={{ color: "white", background: "transparent" }}
              scope="col"
            >
              Staking Balance
            </th>
            <th
              style={{ color: "white", background: "transparent" }}
              scope="col"
            >
              Reward Balance
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ color: "white", background: "transparent" }}>
            <td style={{ color: "white", background: "transparent" }}>
              {window.web3.utils.fromWei(stakingBalance, "ether")} USDT
            </td>
            <td style={{ color: "white", background: "transparent" }}>
              {Math.trunc(window.web3.utils.fromWei(rwdBalance, "ether"))} RWD
            </td>
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
                Balance: {window.web3.utils.fromWei(tetherBalance, "ether")} $
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
              className="btn btn-dark btn-lg btn-block"
            >
              DEPOSIT
            </button>
          </div>
        </form>
        <button
          type="submit"
          disabled={Number(stakingBalance) <= 0}
          onClick={(event) => {
            event.preventDefault();
            unstakeTokens();
          }}
          className="btn btn-danger btn-lg btn-block"
        >
          WITHDRAW
        </button>
        <div className="card-body text-center" style={{ color: "black" }}>
          <p style={{ fontWeight: "700", marginBottom: "2px" }}>AIRDROP</p>
          <Airdrop
            stakingBalance={stakingBalance}
            issueTokens={issueTokens}
            hasClaimed={hasClaimed}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
