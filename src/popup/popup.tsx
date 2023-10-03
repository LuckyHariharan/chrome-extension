import React, { useState } from "react";
import "./popup.css";

const Popup = () => {
  // State for dropdown selections and stage control
  const [stage, setStage] = useState("input"); // "input" or "result"
  const [gender, setGender] = useState("");
  const [smoking, setSmoking] = useState("");
  const [periods, setPeriods] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");
  const [paymentStartYear, setPaymentStartYear] = useState("0");
  const [result, setResult] = useState(""); // Store the calculated result here

  // Function to handle the calculation when the button is clicked
  const handleCalculate = () => {
    // Perform your present value calculation here
    // You can use the selected values from the state
    // and update the "result" state accordingly
    const calculatedResult = "Calculated Value"; // Replace with your logic
    setResult(calculatedResult);
    setStage("result"); // Move to the result stage
  };

  // Function to go back to the input stage
  const handleBack = () => {
    setStage("input");
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <h1 className="text-4xl text-green-500 mb-4">
        {stage === "input" ? "Actuarial Calculator" : "Result"}
      </h1>
      {stage === "input" && (
        <div>
          {/* Input fields and dropdowns for the first stage */}
          {/* ... (same as your previous code) */}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
            onClick={handleCalculate}
          >
            Calculate
          </button>
        </div>
      )}
      {stage === "result" && (
        <div>
          {/* Display the result */}
          <p>
            The Actuarial Present Value of that series of payments is{" "}
            <span className="text-green-500 font-bold text-xl">
              {result} {/* Display the calculated result */}
            </span>
          </p>
          {/* Back button to navigate to the input stage */}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Popup;
