import React, { useEffect, useState } from "react";
import "./popup.css";
import { useTransition, animated } from "react-spring";
import ActuarialCalculation from "../calculations/ActuarialCalculation";

const Popup = () => {
  const Stages = {
    Input: 1,
    Result: 2,
  };

  // State for Retirement or Actuarial Button
  const [isActuarialMode, setIsActuarialMode] = useState<boolean>(true);

  // State for dropdown selections
  const [gender, setGender] = useState<string>("");
  const [smoking, setSmoking] = useState<string>("");
  const [periods, setPeriods] = useState<string>("0");
  const [interestRate, setInterestRate] = useState<string>("%");
  const [numericInterest, setNumericInterest] = useState<number>(0);
  const [paymentAmount, setPaymentAmount] = useState<string>("$");
  const [paymentFrequency, setPaymentFrequency] = useState<string>("monthly");
  const [paymentStartYear, setPaymentStartYear] = useState<string>("0");
  const [stage, setStage] = useState<number>(Stages.Input);
  const [result, setResult] = useState<number | null>(null); // Result state
  const [ageDisplay, setAgeDisplay] = useState<number | "">(15);
  const [age, setAge] = useState<number>(15);
  const [ageError, setAgeError] = useState<boolean>(false);
  const [payPeriodError, setPayPeriodError] = useState<boolean>(false);
  const [smokingStatusError, setSmokingStatusError] = useState<boolean>(false);
  const [genderStatusError, setGenderStatusError] = useState<boolean>(false);
  const [formattedResult, setFormattedResult] = useState<string>("");
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [previousAge, setPreviousAge] = useState(15); // Store the previous age

  // Function to format the interest rate input
  const reformatInterestRateInput = (value: string): string => {
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
  const formatResult = (value: number): string => {
    // Check if the value is not a number or is NaN
    if (isNaN(value) || typeof value !== "number") {
      return "$0.00";
    }

    // Convert the number to a string and round it to two decimal places
    const formattedValue = value.toFixed(2);

    // Split the formatted string into dollars and cents parts
    const [dollars, cents] = formattedValue.split(".");

    // Add commas for thousands in the dollars part
    const formattedDollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Reconstruct the formatted value with dollars and cents
    return `$${formattedDollars}.${cents}`;
  };
  useEffect(() => {
    if (!ageError && !payPeriodError) {
      const result = ActuarialCalculation(
        numericInterest / 100, // Use the parsed interest rate
        parseInt(periods),
        gender,
        parseCurrencyString(paymentAmount),
        smoking,
        age
      );
      setResult(result);
      setFormattedResult(formatResult(result));
    }
    if (gender !== "") {
      setGenderStatusError(false);
      setDisableButton(false);
    }
    if (age > 15 && age < 100) {
      setAgeError(false);
    }
    if (smoking !== "") {
      setSmokingStatusError(false);
      setDisableButton(false);
    }
  });
  // Function to handle the calculation when the button is clicked
  const handleCalculate = () => {
    if (smoking == "") {
      setSmokingStatusError(true);
      return;
    }
    if (gender == "") {
      setGenderStatusError(true);
      return;
    }

    // Check for age < 15
    if (age < 15 || age > 100) {
      setAgeError(true);
      return;
    } else {
      // Check for payPeriod + age <= 100
      if (parseInt(periods) + age > 100) {
        setPayPeriodError(true);
        return;
      } else {
        setPayPeriodError(false);
        setAgeError(false);
      }
    }
    if (
      !ageError &&
      !payPeriodError &&
      !genderStatusError &&
      !smokingStatusError
    ) {
      setNumericInterest(parseFloat(interestRate.replace(/%/g, "")));

      const result = ActuarialCalculation(
        numericInterest / 100, // Use the parsed interest rate
        parseInt(periods),
        gender,
        parseCurrencyString(paymentAmount),
        smoking,
        age
      );
      setResult(result);
      setFormattedResult(formatResult(result));
    }

    if (ageError || genderStatusError || smokingStatusError || payPeriodError) {
      return;
    } else {
      setStage(Stages.Result);
    }
  };

  const handleBackToStage1 = () => {
    setStage(Stages.Input); // Move back to the input stage
    setInputFieldsFocused({
      gender: false,
      age: false,
      smoking: false,
      periods: false,
      interestRate: false,
      paymentAmount: false,
    });
  };
  // Function to format the interest rate input
  const formatInterestRateInput = (value: string): string => {
    // Remove any existing percent symbols from the value
    value = value.replace(/%/g, "");

    // Add a percent symbol only if the last character is not already a percent symbol
    if (value[value.length - 1] !== "%") {
      value += "%";
    }

    return value;
  };

  // Function to format the payment amount input
  const formatPaymentAmountInput = (value: string): string => {
    // Remove any existing dollar signs and commas from the value
    value = value.replace(/[$,]/g, "");

    // Split the value into dollars and cents (if present)
    const [dollars, cents] = value.split(".");

    // Add commas for thousands in the dollars part
    const formattedDollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Reconstruct the formatted value with dollars and cents
    if (cents !== undefined) {
      return "$" + formattedDollars + "." + cents;
    } else {
      return "$" + formattedDollars;
    }
  };
  // State to track if input fields have been focused (changed) by the user
  const [inputFieldsFocused, setInputFieldsFocused] = useState({
    gender: false,
    age: false,
    smoking: false,
    periods: false,
    interestRate: false,
    paymentAmount: false,
  });

  const handleInputBlur = () => {
    // If the user didn't change the value and clicked away, reset to the previous value
    if (age === previousAge) {
      setAge(previousAge);
      setAgeDisplay(age);
    }
  };
  const stage1 = (
    <div className="">
      <div className="mb-4 ">
        <div className="flex justify-between">
          <label className="block text-gray-900 font-bold mb-2">Gender</label>
          <label className="text-gray-900 font-bold mb-2 text-right">Age</label>
          <div></div>
        </div>
        <div className="flex items-center">
          <select
            className={`border rounded px-3 py-2 w-full ${
              inputFieldsFocused.gender ? "border-black" : ""
            }`}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            onSelect={(e) => setGenderStatusError(false)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            className={`border rounded px-3  py-2 w-full ${
              inputFieldsFocused.age ? "border-black" : ""
            }`}
            value={ageDisplay}
            onSelect={(e) => setAgeError(false)}
            onChange={(e) => {
              setAgeDisplay(parseInt(e.target.value));
              setAge(parseInt(e.target.value));
            }}
            onBlur={handleInputBlur}
            onClick={() => setAgeDisplay("")}
            min={15}
            max={100}
          />
        </div>
        {genderStatusError && !inputFieldsFocused.gender && (
          <p className="text-green-500 text-left pr-4">
            Please select a gender.
          </p>
        )}
        {ageError && !inputFieldsFocused.age && (
          <p className="text-green-500 text-right pr-4">
            Age must be between 15 and 100.
          </p>
        )}
      </div>
      <div className="mb-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Smoking Status
          </label>
          <select
            className={`border rounded px-3 py-2 w-full ${
              inputFieldsFocused.smoking ? "border-black" : ""
            }`}
            value={smoking}
            onChange={(e) => setSmoking(e.target.value)}
            onSelect={(e) => setSmokingStatusError(false)}
          >
            <option value="">Select Smoking Status</option>
            <option value="smoker">Smoker</option>
            <option value="non-smoker">Non-Smoker</option>
          </select>
        </div>
        {smokingStatusError && !inputFieldsFocused.smoking && (
          <p className="text-green-500 text-left pr-4">
            Please select a smoking status.
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Number of Pay Periods
        </label>
        <input
          type="number"
          className={`border rounded  px-3 py-2 w-full ${
            inputFieldsFocused.periods ? "border-black" : ""
          }`}
          value={periods}
          onSelect={(e) => {
            setPeriods("");
            setPayPeriodError(false);
          }}
          onChange={(e) => {
            setPeriods(e.target.value);
            if (payPeriodError) {
              setPayPeriodError(false);
            }
          }}
          min={0}
          max={85}
        />
        {payPeriodError && !inputFieldsFocused.periods && (
          <p className="text-green-500 text-left pr-4">
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
          className={`border rounded  px-3 py-2 w-full ${
            inputFieldsFocused.interestRate ? "border-black" : ""
          }`}
          value={interestRate}
          onChange={(e) =>
            setInterestRate(formatInterestRateInput(e.target.value))
          }
          onKeyDown={(e) => {
            // Check if the pressed key is the backspace key
            if (e.key === "Backspace") {
              // Handle backspace key here (if needed)
              setInterestRate("");
            }
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Payment Amount
        </label>
        <input
          type="text"
          className={`border rounded px-3 py-2  w-full ${
            inputFieldsFocused.paymentAmount ? "border-black" : ""
          }`}
          value={paymentAmount}
          onChange={(e) =>
            setPaymentAmount(formatPaymentAmountInput(e.target.value))
          }
        />
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover-bg-green-600 mt-4"
        onClick={handleCalculate}
        hidden={disableButton}
      >
        Calculate
      </button>
    </div>
  );
  // Stage 2: Result
  const stage2 = (
    <div className="text-center h-full space-y-12  ">
      <p className="text-xl mb-4 ">
        The Actuarial Present Value of that series of payments is:{" "}
        <span className="text-green-600 font-bold text-3xl">
          {formattedResult || "0"}
        </span>
      </p>
      <div className="py-32">
        <button
          className="bg-blue-500 text-white px-4 py-4 rounded hover:bg-blue-600 "
          onClick={handleBackToStage1}
        >
          Back to Input
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full p-4 bg-slate-200">
      <h1
        className={`text-2xl  ${
          stage === Stages.Input
            ? "text-black font-bold"
            : "text-black font-bold"
        } flex justify-center`}
      >
        {isActuarialMode && stage === Stages.Input
          ? "Actuarial Present Value"
          : "Result"}
      </h1>
      <div>
        {stage === Stages.Input ? (
          <>
            <div className="flex flex-col mb-4">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p>Lakshman Hariharan</p>
                  <p>V1.01</p>
                  <input
                    className="border  w-32 text-gray-500"
                    placeholder="Enter Profile Name"
                  />
                </div>

                <div className="bg-white rounded border-2 p-4 w-full ml-4"></div>
              </div>
            </div>
            {stage1}
          </>
        ) : (
          stage2
        )}
      </div>
    </div>
  );
};

export default Popup;
