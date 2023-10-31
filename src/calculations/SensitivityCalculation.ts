import ActuarialCalculation from "./ActuarialCalculation";

export const SensitivityCalculation = (
  baseInterest: number,
  payPeriods: number,
  gender: string,
  payment: number,
  smokingStatus: string,
  age: number
) => {
  // Define a range for sensitivity testing (e.g., -0.001 to 0.001)
  const sensitivityRange = 0.001;
  const APV = ActuarialCalculation(
    baseInterest,
    payPeriods,
    gender,
    payment,
    smokingStatus,
    age
  );

  let cashValue65 = NaN;
  if (age <= 65) {
    const discountFactor = Math.pow(1 + baseInterest, 65 - age);
    cashValue65 = APV * discountFactor;
  }
  // Calculate cash values using the ActuarialCalculation function or other method
  const lowerRangeAPV = ActuarialCalculation(
    baseInterest - sensitivityRange,
    payPeriods,
    gender,
    payment,
    smokingStatus,
    age
  );

  let lowerCashValue65 = NaN; // Initialize with NaN (or any other default value)
  let lowerCashValue85 = NaN;

  if (age <= 65) {
    const discountFactor = Math.pow(
      1 + baseInterest - sensitivityRange,
      65 - age
    );
    lowerCashValue65 = lowerRangeAPV * discountFactor;
  }
  if (age <= 85) {
    const discountFactor = Math.pow(
      1 + baseInterest - sensitivityRange,
      85 - age
    );
    lowerCashValue85 = lowerRangeAPV * discountFactor;
  }

  const higherRangeAPV = ActuarialCalculation(
    baseInterest + sensitivityRange,
    payPeriods,
    gender,
    payment,
    smokingStatus,
    age
  );

  let higherCashValue65 = NaN; // Initialize with NaN (or any other default value)
  let higherCashValue85 = NaN;

  if (age <= 65) {
    const discountFactor = Math.pow(
      1 + baseInterest + sensitivityRange,
      65 - age
    );
    higherCashValue65 = higherRangeAPV * discountFactor;
  }
  if (age <= 85) {
    const discountFactor = Math.pow(
      1 + baseInterest + sensitivityRange,
      85 - age
    );
    higherCashValue85 = higherRangeAPV * discountFactor;
  }

  // Create the results object
  const results = {
    lowerRangeAPV,
    lowerCashValue65,
    lowerCashValue85,
    higherRangeAPV,
    higherCashValue65,
    higherCashValue85,
    cashValue65,
  };

  return results;
};
