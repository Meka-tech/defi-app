import React, { useEffect, useMemo, useState } from "react";

const Airdrop = ({ stakingBalance, issueTokens, hasClaimed }) => {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [seconds, setSeconds] = useState(hasClaimed ? 0 : 10); //604800

  const isEligible = useMemo(
    () => (stakingBalance >= Number("50000000000000000000") ? true : false),
    [stakingBalance]
  );

  function secondsToTime(secs) {
    let days, hours, minutes, seconds;

    days = Math.floor(secs / (60 * 60 * 24));
    let remainingSeconds = secs % (24 * 60 * 60);
    hours = Math.floor(remainingSeconds / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      d: days,
      h: hours,
      m: minutes,
      s: seconds
    };

    setTime(obj);
  }

  async function airdropReleaseToken() {
    if (isEligible) {
      try {
        issueTokens();
      } catch (err) {
        window.alert(err.message);
      }
    }
  }

  useEffect(() => {
    if (seconds <= 0) {
    }
    secondsToTime(seconds);

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div>
      {isEligible ? (
        <p style={{ color: "blue", fontWeight: "500", marginBottom: "1px" }}>
          You are Eligible for the airdrop
        </p>
      ) : (
        <p style={{ color: "red", fontWeight: "500", marginBottom: "1px" }}>
          Not Eligible for airdrop
        </p>
      )}
      {seconds > 0 ? (
        <div
          style={{
            color: "white",
            background: "black",
            fontWeight: "500",
            marginTop: "10px",
            padding: "20px",
            borderRadius: "10px"
          }}
        >
          {time.d} days {time.h} hrs {time.m} mins {time.s} secs
        </div>
      ) : (
        <button
          className="btn btn-dark btn-lg btn-block"
          disabled={!isEligible || hasClaimed}
          style={{ marginTop: "10px" }}
          onClick={() => {
            airdropReleaseToken();
          }}
        >
          {hasClaimed ? "Claimed" : "Claim Airdrop"}
        </button>
      )}

      {!isEligible && (
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Deposit up to 50$ to be eligible for airdrop
        </p>
      )}
    </div>
  );
};

export default Airdrop;
