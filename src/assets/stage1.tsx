// const stage1 = (
//     <div className="">
//       <div className="mb-4 ">
//         <div className="flex justify-between">
//           <label className="block text-gray-900 font-bold mb-2">Gender</label>
//           <label className="text-gray-900 font-bold mb-2 text-right">Age</label>
//           <div></div>
//         </div>
//         <div className="flex items-center">
//           <select
//             className={`border rounded px-3 py-2 w-full ${
//               inputFieldsFocused.gender ? "border-black" : ""
//             }`}
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             onSelect={(e) => setGenderStatusError(false)}
//             onBlur={() => handleInputBlur("gender")}
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//           <input
//             type="number"
//             className={`border rounded px-3  py-2 w-full ${
//               inputFieldsFocused.age ? "border-black" : ""
//             }`}
//             value={age}
//             onSelect={(e) => setAgeError(false)}
//             onChange={(e) => {
//               setAge(parseInt(e.target.value));
//             }}
//             min={15}
//             max={100}
//             onBlur={() => handleInputBlur("age")}
//           />
//         </div>
//         {genderStatusError && !inputFieldsFocused.gender && (
//           <p className="text-green-500 text-left pr-4">
//             Please select a gender.
//           </p>
//         )}
//         {ageError && !inputFieldsFocused.age && (
//           <p className="text-green-500 text-left pr-4">
//             Age must be between 15 and 100.
//           </p>
//         )}
//       </div>
//       <div className="mb-4">
//         <div>
//           <label className="block text-gray-700 font-bold mb-2">
//             Smoking Status
//           </label>
//           <select
//             className={`border rounded px-3 py-2 w-full ${
//               inputFieldsFocused.smoking ? "border-black" : ""
//             }`}
//             value={smoking}
//             onChange={(e) => setSmoking(e.target.value)}
//             onSelect={(e) => setSmokingStatusError(false)}
//             onBlur={() => handleInputBlur("smoking")}
//           >
//             <option value="">Select Smoking Status</option>
//             <option value="smoker">Smoker</option>
//             <option value="non-smoker">Non-Smoker</option>
//           </select>
//         </div>
//         {smokingStatusError && !inputFieldsFocused.smoking && (
//           <p className="text-green-500 text-left pr-4">
//             Please select a smoking status.
//           </p>
//         )}
//       </div>

//       <div className="mb-4">
//         <label className="block text-gray-700 font-bold mb-2">
//           Number of Pay Periods
//         </label>
//         <input
//           type="number"
//           className={`border rounded  px-3 py-2 w-full ${
//             inputFieldsFocused.periods ? "border-black" : ""
//           }`}
//           value={periods}
//           onSelect={(e) => {
//             setPeriods("");
//             setPayPeriodError(false);
//           }}
//           onChange={(e) => {
//             setPeriods(e.target.value);
//             if (payPeriodError) {
//               setPayPeriodError(false);
//             }
//           }}
//           min={0}
//           max={85}
//           onBlur={() => handleInputBlur("periods")}
//         />
//         {payPeriodError && !inputFieldsFocused.periods && (
//           <p className="text-green-500 text-right pr-4">
//             The sum of Pay Periods and Age must not exceed 100.
//           </p>
//         )}
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 font-bold mb-2">
//           Interest Rate
//         </label>
//         <input
//           type="text"
//           className={`border rounded  px-3 py-2 w-full ${
//             inputFieldsFocused.interestRate ? "border-black" : ""
//           }`}
//           value={interestRate}
//           onChange={(e) =>
//             setInterestRate(formatInterestRateInput(e.target.value))
//           }
//           onKeyDown={(e) => {
//             // Check if the pressed key is the backspace key
//             if (e.key === "Backspace") {
//               // Handle backspace key here (if needed)
//               setInterestRate("");
//             }
//           }}
//           onBlur={() => handleInputBlur("interestRate")}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-gray-700 font-bold mb-2">
//           Payment Amount
//         </label>
//         <input
//           type="text"
//           className={`border rounded px-3 py-2  w-full ${
//             inputFieldsFocused.paymentAmount ? "border-black" : ""
//           }`}
//           value={paymentAmount}
//           onChange={(e) =>
//             setPaymentAmount(formatPaymentAmountInput(e.target.value))
//           }
//           onBlur={() => handleInputBlur("paymentAmount")}
//         />
//       </div>
//       <button
//         className="bg-green-500 text-white px-4 py-2 rounded hover-bg-green-600 mt-4"
//         onClick={handleCalculate}
//         hidden={disableButton}
//       >
//         Calculate
//       </button>
//     </div>
//   );
