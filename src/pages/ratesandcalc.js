import React, { useEffect, useState } from "react";
import "../CSS/table.css";

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

    // calculate profit based on $100 investment
    let depositAmount = 100;
    let realAPY = 1 + RatesList[i].apyNum / 100;
    // compound based on terms
    let overall_apy = realAPY ** (RatesList[i].days / 365);
    // return the profit
    RatesList[i].expProfit = depositAmount * overall_apy - depositAmount;

    // format the minimum deposit with currency formatting
    if (RatesList[i].Deposit === null || isNaN(RatesList[i].Deposit)) {
      RatesList[i].Deposit = 0;
    }
    RatesList[i].minDepositDisplay =
      "$" + new Intl.NumberFormat().format(RatesList[i].Deposit);
  }

  // create a state to store the sort value
  const [selectedSorting, setSelectedSorting] = useState("default");
  // create states for filtering the rates
  const [searchVal, setSearchVal] = useState("");
  const [depositVal, setDepositVal] = useState(0);
  const [termLength, setTermLength] = useState("all");
  // state for knowing which set of entries in the table are being viewed
  const [displayStart, setDisplayStart] = useState(0);

  // states for calculator data
  const [calcTerm, setCalcTerm] = useState(0);
  const [calcDeposit, setCalcDeposit] = useState(0);
  const [calcAPY, setCalcAPY] = useState(0);
  const [calcTermType, setCalcTermType] = useState("MONTH");

  // amount of entries to be shown at once on table
  // this variable will change everything including displays and stuff
  const blockSize = 13;

  // Sort the record list based on the input from the sort dropdown
  switch (selectedSorting) {
    case "highestAPY":
      RatesList.sort((a, b) => b.expProfit - a.expProfit);
      RatesList.sort((a, b) => b.apyNum - a.apyNum);
      break;
    case "longest":
      // always sort by highest APY and expected profit first
      RatesList.sort((a, b) => a.apyNum - b.apyNum);
      RatesList.sort((a, b) => b.expProfit - a.expProfit);
      RatesList.sort((a, b) => b.days - a.days);
      break;
    case "shortest":
      RatesList.sort((a, b) => a.apyNum - b.apyNum);
      RatesList.sort((a, b) => b.expProfit - a.expProfit);
      RatesList.sort((a, b) => a.days - b.days);
      break;
    case "highestDeposit":
      RatesList.sort((a, b) => a.apyNum - b.apyNum);
      RatesList.sort((a, b) => b.expProfit - a.expProfit);
      RatesList.sort((a, b) => b.Deposit - a.Deposit);
      break;
    case "lowestDeposit":
      RatesList.sort((a, b) => a.apyNum - b.apyNum);
      RatesList.sort((a, b) => b.expProfit - a.expProfit);
      RatesList.sort((a, b) => a.Deposit - b.Deposit);
      break;
    default:
      // default sorting uses deposit, days, and APY
      RatesList.sort((a, b) => a.Deposit - b.Deposit);
      RatesList.sort((a, b) => a.days - b.days);
      RatesList.sort((a, b) => b.apyNum - a.apyNum);
      RatesList.sort((a, b) => b.expProfit - a.expProfit);
  }

  // function that calculates the return for the calculator
  function getCalcValue() {
    let days = 0;
    if (calcTermType === "MONTH") {
      // if the term type is month, multiply term by 31
      days = calcTerm * 31;
    } else if (calcTermType === "YEAR") {
      // if the term type is year, multiply amnt by 365
      days = calcTerm * 365;
    } else {
      // if the term type is day, do nothing
      days = calcTerm;
    }
    // convert from percentage
    let realAPY = 1 + calcAPY / 100;
    // compound based on terms
    let overall_apy = realAPY ** (days / 365);
    // return the profit
    return calcDeposit * overall_apy - calcDeposit;
  }

  // display the page
  return (
    <div className="flex flex-col">
      
      <div className="form text-black">
        <div className="flex flex-row justify-left userForm">
          {/* Displaying heading text */}
          {/* Search Input Field */}
          <span className="line">
            <input
              type="text"
              className="w-auto px-2 py-0 m-0 bg-white search"
              placeholder="Bank Name"
              onChange={(e) => setSearchVal(e.target.value)}
            ></input>{" "}
          </span>
          {/* Sort Dropdown */}
          <span className="line">
            <select
              value={selectedSorting}
              onChange={(e) => setSelectedSorting(e.target.value)}
            >
              <option value="Sort By">Default</option>
              <option value="highestAPY">Highest APY</option>
              <option value="shortest">Shortest Term</option>
              <option value="longest">Longest Term</option>
              <option value="lowestDeposit">Lowest Deposit</option>
              <option value="highestDeposit">Highest Deposit</option>
            </select>
          </span>
          {/* Term length dropdown*/}
          <span className="line">
            
            <select
              value={termLength}
              onChange={(e) => {
                setTermLength(e.target.value);
              }}
            >
              <option value="all">Term Length</option>
              <option value="short">0-12 Months</option>
              <option value="medium">12-36 Months</option>
              <option value="long">Beyond 36 Months</option>
            </select>
          </span>
          {/* Deposit amount input */}
          <span className="line">
            <input
              type="number"
              className="w-auto px-2 py-0 m-0 bg-white"
              placeholder="Deposit Amount ($)"
              onChange={(e) => setDepositVal(e.target.value)}
            ></input>{" "}
          </span>

          {/* this is the calculator */}

        </div>
      </div>
      <div className="flex flex-row">
        {/* The table of rates */}
        <div className="tableContainer mt-6 w-1/4 ml-15 mr-5">
          <table className="mb-10 table-auto">
            {/* Displaying table head with name for fields */}
            <thead>
                <th>Bank</th>
                <th>Term Length</th>
                <th>Min Deposit</th>
                <th>APY</th>
                <th>Bank Link</th>
            </thead>
            <tbody>
              {/* map the items in the Rates List to JSX Objects so they can be displayed */}
              {/* use the filter to make sure that the results match the input categories for the search */}
              {/* use slice to display parts of the results at a time */}
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
                 
                  <tr className="mt-10" onClick={() => {
                    setCalcTerm(item.TermAmnt);
                    setCalcTermType(item.TermType);
                    setCalcDeposit(depositVal);
                    setCalcAPY(item.apyNum);
                    document.getElementById("calcTerm").value =
                      item.TermAmnt;
                    document.getElementById("calcTermType").innerText =
                      item.TermType.charAt(0) +
                      item.TermType.slice(1).toLowerCase();
                    document.getElementById("calcDeposit").value =
                      depositVal;
                    document.getElementById("calcAPY").value = item.apyNum;
                  }}>
                    <td className="w-1/4">{item.Bank != null ? item.Bank.toString() : "Null"}</td>
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
                    
                  </tr>
                ))}
              {/* create a last row of the table with the buttons to click through the results */}
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
                  {/* this looks very complicated but basically we're checking if there are any more
                results that need to be displayed, this is a great implimentation but for now we just
                refilter the array and get its length */}
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
        <div id="calculator" className="flex flex-col mt-10 calc ">
          {/* input field for term length */}
          <span className="line flex flex-row">
            Term:{" "}
            <input
              id="calcTerm"
              type="number"
              className="w-auto px-2 py-0 m-0 bg-white text-black"
              placeholder="0 Months"
              onChange={(e) => setCalcTerm(e.target.value)}
            ></input>{" "}
            <span id="calcTermType">Months</span>
            {", "}
          </span>
          {/* input field for deposit amount */}
          <span className="line  flex flex-row">
            Deposit:$
            <input
              id="calcDeposit"
              type="number"
              className="w-auto px-2 py-0 m-0 bg-white text-black"
              placeholder="$0"
              onChange={(e) => setCalcDeposit(e.target.value)}
            ></input>{" "}
          </span>
          {/* input field for APY */}
          <span className="line  flex flex-row">
            APY:{" "}
            <input
              id="calcAPY"
              type="number"
              className="w-auto px-2 py-0 m-0 bg-white text-black"
              placeholder="0.00%"
              onChange={(e) => setCalcAPY(e.target.value)}
            ></input>
            {"% "}
          </span>
          {/* output field for extimated profit */}
          <span className="line">
            Est. Profit:{" "}
            <span id="estimatedEarnings">
              {"$" + new Intl.NumberFormat().format(getCalcValue().toFixed(2))}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Calc;
