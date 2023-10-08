import React, { useState } from "react";
import "./popup.css";
import { useTransition, animated } from "react-spring";

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
  const [age, setAge] = useState(15);
  const [ageError, setAgeError] = useState(false);
  const [payPeriodError, setPayPeriodError] = useState(false);

  // Function to format the interest rate input
  const reformatInterestRateInput = (value) => {
    // Remove any non-digit characters (except ".")
    value = value.replace(/[^\d.]/g, "");

    // Ensure only one decimal point
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts.slice(0, 2).join(".") + parts.slice(2).join("");
    }

    return value;
  };

  function parseCurrencyString(currencyString: string): number {
    // Remove special characters ('$' and ',') from the input string
    const sanitizedString = currencyString.replace(/[$,]/g, "");

    // Parse the sanitized string into a number
    const numberValue = parseFloat(sanitizedString);

    return numberValue;
  }

  // Function to handle the calculation when the button is clicked
  const handleCalculate = () => {
    // Check for age < 15
    if (age < 15) {
      setAgeError(true);
    } else {
      setAgeError(false);
    }

    // Check for payPeriod + age <= 100
    if (parseInt(periods) + age > 100) {
      setPayPeriodError(true);
    } else {
      setPayPeriodError(false);
    }

    if (ageError || payPeriodError) {
      return;
    }

    const result = ActuarialCalculation(
      reformatInterestRateInput(interestRate),
      parseInt(periods),
      gender,
      parseCurrencyString(paymentAmount),
      age
    );
    setResult(result); // Example result
    setStage(Stages.Result); // Move to the result stage
  };

  // Function to handle going back to the input stage
  const handleBackToStage1 = () => {
    setStage(Stages.Input); // Move back to the input stage
  };

  // Function to format the interest rate input
  const formatInterestRateInput = (value) => {
    // Remove any existing percent symbols from the value
    value = value.replace(/%/g, "");

    // Add a percent symbol only if the last character is not already a percent symbol
    if (value[value.length - 1] !== "%") {
      value += "%";
    }

    return value;
  };

  // Function to format the payment amount input
  const formatPaymentAmountInput = (value) => {
    // Remove any existing dollar signs from the value
    value = value.replace(/\$/g, "");

    // Add a dollar sign at the beginning if it's not already there
    if (value[0] !== "$") {
      value = "$" + value;
    }

    // Split the value into dollars and cents (if present)
    const [dollars, cents] = value.split(".");

    // Add commas for thousands in the dollars part
    const formattedDollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Reconstruct the formatted value with dollars and cents
    if (cents !== undefined) {
      return formattedDollars + "." + cents;
    } else {
      return formattedDollars;
    }
  };

  const fadeIn = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }, // Updated leave opacity to 0
  };

  const transitions = useTransition(true, {
    ...fadeIn,
  });

  return (
    <div className="w-full p-4 bg-gray-100">
      <h1 className={"text-4xl text-green-500 mb-4 flex justify-center "}>
        {stage === Stages.Input ? "Actuarial Calculator" : "Result"}
      </h1>
      {transitions((styles) => (
        <animated.div style={{ ...styles, width: "100%" }}>
          {/* Stage 1: Input Fields */}
          {stage === Stages.Input && (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Gender
                </label>
                <div className="flex items-center">
                  <select
                    className="border rounded px-3 py-2 w-full"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <label className="ml-4 text-gray-700 font-bold mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    className="border rounded px-3 py-2 w-full"
                    value={age}
                    onChange={(e) => {
                      setAge(parseInt(e.target.value));
                      if (ageError) {
                        setAgeError(false);
                      }
                    }}
                    min={15}
                    max={100}
                  />
                </div>
                {ageError && (
                  <p className="text-green-500 text-right pr-4">
                    Age must be between 15 and 100.
                  </p>
                )}
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
                  type="number"
                  className="border rounded px-3 py-2 w-full"
                  value={periods}
                  onChange={(e) => {
                    setPeriods(e.target.value);
                    if (payPeriodError) {
                      setPayPeriodError(false);
                    }
                  }}
                  min={0}
                  max={85}
                />
                {payPeriodError && (
                  <p className="text-green-500 text-right pr-4">
                    The sum of Pay Periods and Age must not exceed 100.
                  </p>
                )}
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
              {/* Rest of your input fields */}
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
                onClick={handleCalculate}
              >
                Calculate
              </button>
            </div>
          )}

          {/* Stage 2: Result */}
          {stage === Stages.Result && (
            <div className="text-center h-full space-y-12">
              <p className="text-xl mb-4">
                The Actuarial Present Value of that series of payments is:{" "}
                <span className="text-green-500 font-bold text-3xl">
                  ${result || 0}
                </span>
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleBackToStage1}
              >
                Back to Input
              </button>
            </div>
          )}
        </animated.div>
      ))}
    </div>
  );
};

export default Popup;
