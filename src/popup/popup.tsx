import React, { useState } from "react";
import "./popup.css";

const Popup = () => {
  // State for dropdown selections
  const [gender, setGender] = useState("");
  const [smoking, setSmoking] = useState("");
  const [periods, setPeriods] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");
  const [paymentStartYear, setPaymentStartYear] = useState("0");

  // Function to handle the calculation when the button is clicked
  const handleCalculate = () => {
    // Perform your present value calculation here
    // You can use the selected values from the state
    // and update the UI accordingly
  };

  return (
    <div className="w-80 p-4 bg-gray-100">
      <h1 className="text-4xl text-green-500 mb-4">Actuarial Calculator</h1>
      {/* First Box: Gender and Smoking */}
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
      {/* Second Box: Number of Pay Periods, Interest Rate, Payment Amount */}
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
          onChange={(e) => setInterestRate(e.target.value)}
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
          onChange={(e) => setPaymentAmount(e.target.value)}
        />
      </div>
      {/* Additional Dropdowns for Payment Frequency and Start Year */}
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
      {/* Calculate Button */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
        onClick={handleCalculate}
      >
        Calculate
      </button>
    </div>
  );
};

export default Popup;
