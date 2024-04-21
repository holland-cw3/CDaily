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
  const blockSize = 10;

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
          <span className="line ml-10">
            <input
              type="text"
              className="search border-2 border-[#CECECE] text-white"
              placeholder="Bank Name "
              onChange={(e) => setSearchVal(e.target.value)}
            ></input>
            {}
          </span>
          {/* Sort Dropdown */}
          <span className="line">
            <select
              value={selectedSorting}
              onChange={(e) => setSelectedSorting(e.target.value)}
              className="search border-2 border-[#CECECE] text-opacity-40
              "
            >
              <option value="Sort By" className="opt">
                Sort By - Default
              </option>
              <option value="highestAPY" className="opt">
                Highest APY
              </option>
              <option value="shortest" className="opt">
                Shortest Term
              </option>
              <option value="longest" className="opt">
                Longest Term
              </option>
              <option value="lowestDeposit" className="opt">
                Lowest Deposit
              </option>
              <option value="highestDeposit" className="opt">
                Highest Deposit
              </option>
            </select>
          </span>
          {/* Term length dropdown*/}
          <span className="line ">
            <select
              value={termLength}
              onChange={(e) => {
                setTermLength(e.target.value);
              }}
              className="search border-2 border-white"
            >
              <option value="all" className="opt">
                Term Length
              </option>
              <option value="short" className="opt">
                0-12 Months
              </option>
              <option value="medium" className="opt">
                12-36 Months
              </option>
              <option value="long" className="opt">
                36+ Months
              </option>
            </select>
          </span>
          {/* Deposit amount input */}
          <span className="line text-white">
            <input
              type="number"
              className="search border-2 border-[#CECECE]"
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
            <thead className="text-white">
              <th>Bank</th>
              <th>Term</th>
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
              )
                .slice(displayStart, displayStart + blockSize)
                .map((item) => (
                  <tr
                    className="mt-10"
                    for="btnControl"
                    onClick={() => {
                      if (
                        document.getElementById("calcDeposit").value > 0 ==
                        false
                      ) {
                        if (depositVal > 0) setCalcDeposit(depositVal);
                      }
                      setCalcTerm(item.TermAmnt);
                      setCalcTermType(item.TermType);
                      // setCalcDeposit(depositVal);
                      setCalcAPY(item.apyNum);
                      document.getElementById("calcTerm").value = item.TermAmnt;
                      if (
                        document.getElementById("calcDeposit").value > 0 ==
                        false
                      ) {
                        if (depositVal > 0)
                          document.getElementById("calcDeposit").value =
                            depositVal;
                      }
                      document.getElementById("calcAPY").value = item.apyNum;
                    }}
                  >
                    <td className="w-1/4 bankName ml-2">
                      {item.Bank != null ? item.Bank.toString() : "Null"}
                    </td>
                    <td>
                      {item.TermAmnt != null
                        ? item.TermAmnt.toString()
                        : "Null"}{" "}
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
                        className="underline text-blue-200"
                      >
                        Bank Site
                      </a>
                    </td>
                  </tr>
                ))}

              {/* create a last row of the table with the buttons to click through the results */}
              <tr>
                <td>
                  {displayStart >= blockSize ? (
                    <a
                      className="next"
                      onClick={() => setDisplayStart(displayStart - blockSize)}
                    >
                      {"Prev"}
                    </a>
                  ) : (
                    <span className="next-inactive">Prev</span>
                  )}
                </td>
                <td></td>
                <td>
                  {/* check if more
                results need to be displayed, this is a great implimentation but for now we just
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
                      (depositVal === 0 ||
                        depositVal === null ||
                        item.Deposit <= depositVal)
                  ).length ? (
                    <a
                      className="next"
                      onClick={() => setDisplayStart(displayStart + blockSize)}
                    >
                      {"Next"}
                    </a>
                  ) : (
                    <span className="next-inactive ">Next</span>
                  )}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="calculator" className="flex flex-col mt-5 calc align-center">
          {/* input field for term length */}
          <div className="flex flex-row justify-center mt-5 mb-5">
            <h1 className="font-bold text-3xl justify-center">CD Calculator</h1>
          </div>
          <div className="grid grid-cols-3 ml-5">
            <p className="text-center font-bold -ml-7">Term</p>
            <p className="text-center font-bold -ml-7">Deposit</p>
            <p className="text-center font-bold -ml-7">APY</p>
            <div className="line ">
              <input
                id="calcTerm"
                type="number"
                className="formIn border-2"
                placeholder="None"
                onChange={(e) => setCalcTerm(e.target.value)}
              ></input>{" "}
            </div>
            <div className="line">
              <input
                id="calcDeposit"
                type="text"
                className="formIn border-2"
                placeholder="$0.00"
                onChange={(e) => setCalcDeposit(e.target.value)}
              ></input>
            </div>

            <div className="line">
              <input
                id="calcAPY"
                type="number"
                className="formIn border-2"
                placeholder="APY"
                onChange={(e) => setCalcAPY(e.target.value)}
              ></input>
            </div>
          </div>

          {/* output field for extimated profit */}
          <div className="flex justify-center">
            {" "}
            <hr />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center text-center ml-20">
              <span className="line text-3xl flex flex-col justify-center ml-10 mt-1">
                Est. Profit
                <span id="estimatedEarnings" className="text-[#7b9a6d]">
                  {"$" +
                    new Intl.NumberFormat().format(getCalcValue().toFixed(2))}
                </span>
              </span>
            </div>
            <div className="flex justify-center">
              {" "}
              <hr />
            </div>
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5877950634442895"
              crossorigin="anonymous"
            ></script>
            <ins
              class="adsbygoogle"
              data-ad-client="ca-pub-5877950634442895"
              data-ad-slot="8805444670"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calc;
