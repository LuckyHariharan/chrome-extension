import React, { useState } from "react";
import "./popup.css";

const Popup = () => {
  const Stages = {
    Input: 1,
    Result: 2,
  };

  // State for dropdown selections
  const [gender, setGender] = useState("");
  const [smoking, setSmoking] = useState("");
  const [periods, setPeriods] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");
  const [paymentStartYear, setPaymentStartYear] = useState("0");
  const [stage, setStage] = useState(Stages.Input);
  const [result, setResult] = useState(null); // Result state

  // Function to handle the calculation when the button is clicked
  const handleCalculate = () => {
    // Perform your present value calculation here
    // You can use the selected values from the state
    // and update the UI accordingly
    // For now, let's assume the result is calculated and stored in 'result'.
    // Replace this with your actual calculation logic.
    setResult(1234.56); // Example result
    setStage(Stages.Result); // Move to the result stage
  };

  // Function to handle going back to the input stage
  const handleBackToStage1 = () => {
    setStage(Stages.Input); // Move back to the input stage
  };

  // Function to format the interest rate input
  const formatInterestRateInput = (value) => {
    if (value[0] !== "%") return value + "%";
  };

  // Function to parse the interest rate input
  const parseInterestRateInput = (value) => {
    if (value[0] !== "%") return value + "%";
  };

  // Function to format the payment amount input
  const formatPaymentAmountInput = (value) => {
    if (value[0] !== "$") return "$" + value;
  };

  // Function to parse the payment amount input
  const parsePaymentAmountInput = (value) => {
    if (value[0] !== "$") return "$" + value;
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <h1 className={"text-4xl text-green-500 mb-4 flex justify-center "}>
        {stage === Stages.Input ? "Actuarial Calculator" : "Result"}
      </h1>
      {stage === Stages.Input ? (
        // Stage 1: Input Fields
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Gender</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Smoking Status
            </label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={smoking}
              onChange={(e) => setSmoking(e.target.value)}
            >
              <option value="">Select Smoking Status</option>
              <option value="smoker">Smoker</option>
              <option value="non-smoker">Non-Smoker</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Number of Pay Periods
            </label>
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              value={periods}
              onChange={(e) => setPeriods(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Interest Rate
            </label>
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              value={interestRate}
              onChange={(e) =>
                setInterestRate(formatInterestRateInput(e.target.value))
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Payment Amount
            </label>
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              value={paymentAmount}
              onChange={(e) =>
                setPaymentAmount(formatPaymentAmountInput(e.target.value))
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Payment Frequency
            </label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={paymentFrequency}
              onChange={(e) => setPaymentFrequency(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Payment Start Year
            </label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={paymentStartYear}
              onChange={(e) => setPaymentStartYear(e.target.value)}
            >
              <option value="0">Year 0</option>
              <option value="1">Year 1</option>
            </select>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
            onClick={handleCalculate}
          >
            Calculate
          </button>
        </div>
      ) : (
        // Stage 2: Result
        <div className="text-center h-full space-y-12">
          <p className="text-xl mb-4">
            The Actuarial Present Value of that series of payments is:{" "}
            <span className="text-green-500 font-bold text-3xl">
              ${result || 0}
            </span>
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600"
            onClick={handleBackToStage1}
          >
            Back to Input
          </button>
        </div>
      )}
    </div>
  );
};

export default Popup;
