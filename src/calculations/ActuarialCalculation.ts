const ActuarialCalculation = (
  interest: number,
  payPeriods: number,
  gender: string,
  payment: number,
  smokingStatus: string,
  age: number
): number => {
  const discountRateArray: number[] = [];
  const paymentArray: number[] = [];
  // Step 1: Build the discount rate array using n=1,...,payPeriods (1/(1+i)^n)
  let discountRate = 1 / (1 + interest);
  for (let i = 0; i < payPeriods; i++) {
    discountRateArray.push(discountRate);
    discountRate *= 1 / (1 + interest);
  }
  const femaleNonsmokerMortalityArray = [
    0.00032, 0.00035, 0.00038, 0.00041, 0.00043, 0.00044, 0.00044, 0.00045,
    0.00045, 0.00046, 0.00046, 0.00047, 0.00048, 0.00049, 0.0005, 0.00052,
    0.00053, 0.00055, 0.00057, 0.00061, 0.00064, 0.0007, 0.00078, 0.00087,
    0.00098, 0.0011, 0.00124, 0.00138, 0.00152, 0.00166, 0.0018, 0.00196,
    0.00213, 0.00231, 0.0025, 0.00273, 0.00298, 0.00326, 0.00359, 0.00393,
    0.0043, 0.00467, 0.00503, 0.00537, 0.00572, 0.00615, 0.00667, 0.00735,
    0.00822, 0.00927, 0.01041, 0.01164, 0.01286, 0.01408, 0.01537, 0.01688,
    0.01871, 0.02101, 0.02386, 0.02724, 0.03107, 0.03528, 0.03979, 0.04458,
    0.0498, 0.05569, 0.06245, 0.0703, 0.07937, 0.08941, 0.10038, 0.11205,
    0.12446, 0.13743, 0.15112, 0.16544, 0.18062, 0.19699, 0.2152, 0.23652,
    0.26338, 0.30101, 0.35966, 0.46234, 0.64743,
  ]; // Female nonsmoker
  const femaleSmokerMortalityArray = [
    0.00042, 0.00046, 0.0005, 0.00055, 0.00058, 0.00059, 0.0006, 0.00062,
    0.00063, 0.00065, 0.00066, 0.00069, 0.00072, 0.00074, 0.00078, 0.00083,
    0.00087, 0.00092, 0.00097, 0.00105, 0.00111, 0.00123, 0.00139, 0.00157,
    0.00178, 0.00202, 0.00231, 0.00258, 0.00286, 0.00314, 0.00342, 0.00372,
    0.00403, 0.00434, 0.00468, 0.00508, 0.00548, 0.00593, 0.00646, 0.007,
    0.00757, 0.00813, 0.00865, 0.00913, 0.00961, 0.01015, 0.01087, 0.01176,
    0.01299, 0.01437, 0.01593, 0.01746, 0.01903, 0.02042, 0.02198, 0.02363,
    0.02582, 0.02857, 0.03197, 0.03596, 0.04039, 0.04516, 0.05014, 0.05528,
    0.06076, 0.06683, 0.07369, 0.08155, 0.09048, 0.10103, 0.11142, 0.12326,
    0.13442, 0.14705, 0.15868, 0.17206, 0.18604, 0.20093, 0.21735, 0.23652,
    0.26338, 0.30101, 0.35966, 0.46234, 0.64743,
  ];

  const maleNonsmokerMortalityArray = [
    0.00073, 0.00086, 0.00096, 0.00101, 0.00105, 0.00106, 0.00104, 0.001,
    0.00095, 0.0009, 0.00083, 0.00077, 0.00073, 0.00069, 0.00067, 0.00065,
    0.00065, 0.00066, 0.00068, 0.00071, 0.00076, 0.00081, 0.00089, 0.00097,
    0.00107, 0.00118, 0.00131, 0.00145, 0.00161, 0.00177, 0.00196, 0.00217,
    0.0024, 0.00264, 0.00291, 0.00321, 0.00356, 0.00398, 0.00446, 0.00501,
    0.00563, 0.00632, 0.00706, 0.00785, 0.00875, 0.00976, 0.01089, 0.01218,
    0.01367, 0.01536, 0.01723, 0.01925, 0.02143, 0.02376, 0.02631, 0.02919,
    0.03247, 0.03629, 0.04069, 0.04565, 0.05096, 0.05661, 0.06252, 0.06861,
    0.07506, 0.08211, 0.08998, 0.09888, 0.10894, 0.11994, 0.13158, 0.14361,
    0.15587, 0.16806, 0.18033, 0.1928, 0.20561, 0.21907, 0.2336, 0.25072,
    0.27302, 0.30992, 0.36746, 0.4708, 0.6567,
  ];

  const maleSmokerMortalityArray = [
    0.00109, 0.0013, 0.00147, 0.00157, 0.00165, 0.00169, 0.0017, 0.00166,
    0.0016, 0.00154, 0.00145, 0.00137, 0.00133, 0.00129, 0.00129, 0.00131,
    0.00135, 0.0014, 0.00148, 0.00158, 0.0017, 0.00185, 0.00205, 0.00227,
    0.00253, 0.00283, 0.00318, 0.00355, 0.00397, 0.00441, 0.00491, 0.00541,
    0.00596, 0.00653, 0.00717, 0.00786, 0.00865, 0.00954, 0.01057, 0.01172,
    0.01295, 0.01428, 0.01566, 0.01712, 0.01863, 0.02031, 0.02221, 0.02435,
    0.02679, 0.02948, 0.03239, 0.03542, 0.03858, 0.04181, 0.04525, 0.04904,
    0.05325, 0.05806, 0.06348, 0.06939, 0.07593, 0.08265, 0.0894, 0.09605,
    0.10283, 0.11003, 0.11787, 0.12656, 0.13618, 0.14632, 0.15658, 0.16659,
    0.17614, 0.18654, 0.19656, 0.2063, 0.21589, 0.22565, 0.23827, 0.25322,
    0.27302, 0.30992, 0.36746, 0.4708, 0.6567,
  ];

  // Step 2: Construct an array of n length where each value is payment
  for (let i = 0; i < payPeriods; i++) {
    paymentArray.push(payment);
  }

  // Step 3: Calculate the Actuarial Present Value
  let actuarialPresentValue = 0;
  let mortalityArray = []; // initialize mortality array here to conditionally mutate later
  for (let i = 0; i < payPeriods; i++) {
    // Determine the correct mortality array based on gender and smoking status
    if (gender === "female" && smokingStatus === "non-smoker") {
      mortalityArray = femaleNonsmokerMortalityArray;
    } else if (gender === "female" && smokingStatus === "smoker") {
      mortalityArray = femaleSmokerMortalityArray;
    } else if (gender === "male" && smokingStatus === "non-smoker") {
      mortalityArray = maleNonsmokerMortalityArray;
    } else if (gender === "male" && smokingStatus === "smoker") {
      mortalityArray = maleSmokerMortalityArray;
    } else {
      throw new Error("Invalid gender or smoking status");
    }
    const presentValue =
      paymentArray[i] *
      discountRateArray[i] *
      (1 - mortalityArray[i + age - 15]); // 1- mortality is chance of living next year, the fisrt mortality value is age 15

    // Add it to the total
    actuarialPresentValue += presentValue;
  }

  return actuarialPresentValue;
};
// Example usage:
// const result = ActuarialCalculation(0.05, 10, "Male", 1000, "Smoker", 30);
// console.log(result); // Replace with how you want to use the result

export default ActuarialCalculation;
