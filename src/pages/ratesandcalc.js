import React, { useEffect, useState } from "react";
import "../CSS/Header.css";

function Calc() {
  // Importing records data from JSON file
  const RatesList = require("../data/rates.json");

  console.log("list size is: " + RatesList.length);

  // loop through the data to add more fields and formatting
  for (let i = 0; i < RatesList.length; i++) {
    // make a sortable version of the APY String - not working yet
    RatesList[i].apyNum = parseFloat(RatesList[i].APY);
    RatesList[i].APY = RatesList[i].apyNum.toFixed(2) + "%";

    // create a new days field for term length, makes sorting easier
    if (RatesList[i].TermType === "MONTH") {
      // if the term type is month, multiply amnt by 31
      RatesList[i].days = RatesList[i].TermAmnt * 31;
    } else if (RatesList[i].TermType === "YEAR") {
      // if the term type is year, multiply amnt by 365
      RatesList[i].days = RatesList[i].TermAmnt * 365;
    } else {
      // if the term type is day, do nothing
      RatesList[i].days = RatesList[i].TermAmnt;
    }

    // format the minimum deposit with currency formatting
    if (RatesList[i].Deposit === null || isNaN(RatesList[i].Deposit)) {
      RatesList[i].Deposit = 0;
    }
    RatesList[i].minDepositDisplay =
      "$" + new Intl.NumberFormat().format(RatesList[i].Deposit);
  }

  // create a state to store the sort value
  const [selectedSorting, setSelectedSorting] = useState("default");
  const [searchVal, setSearchVal] = useState("");
  const [depositVal, setDepositVal] = useState(0);
  const [termLength, setTermLength] = useState("all");
  // state for knowing which set of entries in the table are being viewed
  const [displayStart, setDisplayStart] = useState(0);

  // states for calculator
  const [calcTerm, setCalcTerm] = useState(0);
  const [calcDeposit, setCalcDeposit] = useState(0);
  const [calcAPY, setCalcAPY] = useState(0);
  const [calcTermType, setCalcTermType] = useState("MONTH");

  // amount of entries to be shown at once on table
  // this will change everything including displays and stuff
  const blockSize = 20;

  RatesList.sort((a, b) => Math.random() - Math.random());

  // Sort the record list based on the input from the sort dropdown
  switch (selectedSorting) {
    case "highestAPY":
      RatesList.sort((a, b) => b.apyNum - a.apyNum);
      break;
    case "longest":
      RatesList.sort((a, b) => a.apyNum - b.apyNum);
      RatesList.sort((a, b) => b.days - a.days);
      break;
    case "shortest":
      RatesList.sort((a, b) => a.apyNum - b.apyNum);
      RatesList.sort((a, b) => a.days - b.days);
      break;
    case "highestDeposit":
      RatesList.sort((a, b) => a.apyNum - b.apyNum);
      RatesList.sort((a, b) => b.Deposit - a.Deposit);
      break;
    case "lowestDeposit":
      RatesList.sort((a, b) => a.apyNum - b.apyNum);
      RatesList.sort((a, b) => a.Deposit - b.Deposit);
      break;
    default:
      RatesList.sort((a, b) => a.Deposit - b.Deposit);
      RatesList.sort((a, b) => a.days - b.days);
      RatesList.sort((a, b) => b.apyNum - a.apyNum);
  }

  function getCalcValue() {
    let days = 0;
    if (calcTermType === "MONTH") {
      // if the term type is month, multiply amnt by 31
      days = calcTerm * 31;
    } else if (calcTermType === "YEAR") {
      // if the term type is year, multiply amnt by 365
      days = calcTerm * 365;
    } else {
      // if the term type is day, do nothing
      days = calcTerm;
    }
    let realAPY = 1 + calcAPY / 100;
    let overall_apy = realAPY ** (days / 365);
    return calcDeposit * overall_apy - calcDeposit;
  }

  // display the page
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Displaying heading text */}
      <h3 className="text-white text-3xl font-bold mt-5 mb-5">CDaily Rates</h3>
      <span className="line" style={{ paddingLeft: 5 + "px" }}>
        Search:{" "}
        <input
          type="text"
          className="w-auto px-2 py-0 m-0 bg-white"
          placeholder="Bank Name"
          onChange={(e) => setSearchVal(e.target.value)}
        ></input>{" "}
      </span>
      <span className="line" style={{ paddingLeft: 5 + "px" }}>
        Sort By:{" "}
        <select
          value={selectedSorting}
          onChange={(e) => setSelectedSorting(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="highestAPY">Highest APY</option>
          <option value="shortest">Shortest Term</option>
          <option value="longest">Longest Term</option>
          <option value="lowestDeposit">Lowest Deposit</option>
          <option value="highestDeposit">Highest Deposit</option>
        </select>
      </span>
      <span className="line" style={{ paddingLeft: 5 + "px" }}>
        Term Length:{" "}
        <select
          value={termLength}
          onChange={(e) => {
            setTermLength(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="short">0-12 Months</option>
          <option value="medium">12-36 Months</option>
          <option value="long">Beyond 36 Months</option>
        </select>
      </span>
      <span className="line" style={{ paddingLeft: 5 + "px" }}>
        Deposit Amount:{" "}
        <input
          type="number"
          className="w-auto px-2 py-0 m-0 bg-white"
          placeholder="$0"
          onChange={(e) => setDepositVal(e.target.value)}
        ></input>{" "}
      </span>
      <div className="tableContainer">
        <table className="mb-10 table-auto">
          {/* Displaying table head with name for fields */}
          <thead>
            <tr>
              <th>Bank</th>
              <th>Term Length</th>
              <th>Min Deposit</th>
              <th>APY</th>
              <th>Bank Link</th>
              <th>Calculator Link</th>
            </tr>
          </thead>
          <tbody>
            {/* map the items in the Rates List to JSX Objects so they can be displayed */}
            {RatesList.filter(
              (item) =>
                (searchVal === "" ||
                  item.Bank.toLowerCase().includes(searchVal.toLowerCase())) &&
                (termLength === "all" ||
                  (termLength === "short" && item.days <= 12 * 31) ||
                  (termLength === "medium" &&
                    item.days > 12 * 31 &&
                    item.days < 36 * 31) ||
                  (termLength === "long" && item.days > 36 * 31)) &&
                (depositVal == 0 ||
                  depositVal === null ||
                  item.Deposit <= depositVal)
            )
              .slice(displayStart, displayStart + blockSize)
              .map((item) => (
                <tr>
                  <td>{item.Bank != null ? item.Bank.toString() : "Null"}</td>
                  <td>
                    {item.TermAmnt != null ? item.TermAmnt.toString() : "Null"}{" "}
                    {item.TermType != null
                      ? item.TermType.charAt(0) +
                        item.TermType.slice(1).toLowerCase()
                      : "Null"}
                  </td>
                  <td>
                    {item.Deposit != null
                      ? item.minDepositDisplay.toString()
                      : "Null"}
                  </td>
                  <td> {item.APY != null ? item.APY.toString() : "Null"}</td>
                  <td>
                    <a
                      target="_blank"
                      href={item.Url != null ? item.Url.toString() : "Null"}
                    >
                      Bank Site
                    </a>
                  </td>
                  <td>
                    <a
                      onClick={() => {
                        setCalcTerm(item.TermAmnt);
                        document.getElementById("calcTerm").value = calcTerm;
                        setCalcTermType(item.TermType);
                        document.getElementById("calcTermType").innerHTML =
                          item.TermType.charAt(0) +
                          item.TermType.slice(1).toLowerCase();
                        setCalcDeposit(depositVal);
                        document.getElementById("calcDeposit").value =
                          calcDeposit;
                        setCalcAPY(item.apyNum);
                        document.getElementById("calcAPY").value = calcAPY;
                      }}
                    >
                      Open In Calculator
                    </a>
                  </td>
                </tr>
              ))}
            <tr>
              <td>
                <a onClick={() => setDisplayStart(0)}>{"first " + blockSize}</a>
              </td>
              <td>
                {displayStart >= blockSize ? (
                  <a onClick={() => setDisplayStart(displayStart - blockSize)}>
                    {"< previous " + blockSize}
                  </a>
                ) : (
                  <span></span>
                )}
              </td>
              <td></td>
              <td>
                {displayStart + blockSize <=
                RatesList.filter(
                  (item) =>
                    (searchVal === "" ||
                      item.Bank.toLowerCase().includes(
                        searchVal.toLowerCase()
                      )) &&
                    (termLength === "all" ||
                      (termLength === "short" && item.days <= 12 * 31) ||
                      (termLength === "medium" &&
                        item.days > 12 * 31 &&
                        item.days < 36 * 31) ||
                      (termLength === "long" && item.days > 36 * 31)) &&
                    (depositVal == 0 ||
                      depositVal === null ||
                      item.Deposit <= depositVal)
                ).length ? (
                  <a onClick={() => setDisplayStart(displayStart + blockSize)}>
                    {"next " + blockSize + " >"}
                  </a>
                ) : (
                  <span></span>
                )}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="calculator">
        <span className="line" style={{ paddingLeft: 5 + "px" }}>
          Term:{" "}
          <input
            id="calcTerm"
            type="number"
            className="w-auto px-2 py-0 m-0 bg-white"
            placeholder="0 Months"
            onChange={(e) => setCalcTerm(e.target.value)}
          ></input>{" "}
          <span id="calcTermType">Months</span>
          {", "}
        </span>
        <span className="line" style={{ paddingLeft: 5 + "px" }}>
          Deposit:{" $"}
          <input
            id="calcDeposit"
            type="number"
            className="w-auto px-2 py-0 m-0 bg-white"
            placeholder="$0"
            onChange={(e) => setCalcDeposit(e.target.value)}
          ></input>{" "}
        </span>
        <span className="line" style={{ paddingLeft: 5 + "px" }}>
          APY:{" "}
          <input
            id="calcAPY"
            type="number"
            className="w-auto px-2 py-0 m-0 bg-white"
            placeholder="0.00%"
            onChange={(e) => setCalcAPY(e.target.value)}
          ></input>
          {"% "}
        </span>
        <span className="line" style={{ paddingLeft: 5 + "px" }}>
          Est. Profit:{" "}
          <span id="estimatedEarnings">
            {"$" + new Intl.NumberFormat().format(getCalcValue().toFixed(2))}
          </span>
        </span>
      </div>
    </div>
  );
}

export default Calc;
