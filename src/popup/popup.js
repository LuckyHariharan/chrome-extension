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
        }
        else {
            return formattedDollars;
        }
    };
    const fadeIn = {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }, // Updated leave opacity to 0
    };
    const transitions = useTransition(true, Object.assign({}, fadeIn));
    return (React.createElement("div", { className: "w-full p-4 bg-gray-100" },
        React.createElement("h1", { className: "text-4xl text-green-500 mb-4 flex justify-center " }, stage === Stages.Input ? "Actuarial Calculator" : "Result"),
        transitions((styles) => (React.createElement(animated.div, { style: Object.assign(Object.assign({}, styles), { width: "100%" }) },
            stage === Stages.Input && (React.createElement("div", null,
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { className: "block text-gray-700 font-bold mb-2" }, "Gender"),
                    React.createElement("select", { className: "border rounded px-3 py-2 w-full", value: gender, onChange: (e) => setGender(e.target.value) },
                        React.createElement("option", { value: "" }, "Select Gender"),
                        React.createElement("option", { value: "male" }, "Male"),
                        React.createElement("option", { value: "female" }, "Female"))),
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { className: "block text-gray-700 font-bold mb-2" }, "Smoking Status"),
                    React.createElement("select", { className: "border rounded px-3 py-2 w-full", value: smoking, onChange: (e) => setSmoking(e.target.value) },
                        React.createElement("option", { value: "" }, "Select Smoking Status"),
                        React.createElement("option", { value: "smoker" }, "Smoker"),
                        React.createElement("option", { value: "non-smoker" }, "Non-Smoker"))),
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { className: "block text-gray-700 font-bold mb-2" }, "Number of Pay Periods"),
                    React.createElement("input", { type: "text", className: "border rounded px-3 py-2 w-full", value: periods, onChange: (e) => setPeriods(e.target.value) })),
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { className: "block text-gray-700 font-bold mb-2" }, "Interest Rate"),
                    React.createElement("input", { type: "text", className: "border rounded px-3 py-2 w-full", value: interestRate, onChange: (e) => setInterestRate(formatInterestRateInput(e.target.value)) })),
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { className: "block text-gray-700 font-bold mb-2" }, "Payment Amount"),
                    React.createElement("input", { type: "text", className: "border rounded px-3 py-2 w-full", value: paymentAmount, onChange: (e) => setPaymentAmount(formatPaymentAmountInput(e.target.value)) })),
                React.createElement("button", { className: "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4", onClick: handleCalculate }, "Calculate"))),
            stage === Stages.Result && (React.createElement("div", { className: "text-center h-full space-y-12" },
                React.createElement("p", { className: "text-xl mb-4" },
                    "The Actuarial Present Value of that series of payments is:",
                    " ",
                    React.createElement("span", { className: "text-green-500 font-bold text-3xl" },
                        "$",
                        result || 0)),
                React.createElement("button", { className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600", onClick: handleBackToStage1 }, "Back to Input"))))))));
};
export default Popup;
