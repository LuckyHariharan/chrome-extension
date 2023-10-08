var ActuarialCalculation = function (interest, payPeriods, gender, payment, age) {
    var discountRateArray = [];
    var paymentArray = [];
    // Step 1: Build the discount rate array using n=1,...,payPeriods (1/(1+i)^n)
    var discountRate = 1 / (1 + interest);
    for (var i = 0; i < payPeriods; i++) {
        discountRateArray.push(discountRate);
        discountRate *= 1 / (1 + interest);
    }
    var mortalityArray = [
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
    // Step 2: Construct an array of n length where each value is payment
    for (var i = 0; i < payPeriods; i++) {
        paymentArray.push(payment);
    }
    // Step 3: Calculate the Actuarial Present Value
    var actuarialPresentValue = 0;
    for (var i = 0; i < payPeriods; i++) {
        // Calculate the present value for this period
        var presentValue = paymentArray[i] * discountRateArray[i] * mortalityArray[i];
        // Add it to the total
        actuarialPresentValue += presentValue;
    }
    return actuarialPresentValue;
};
// Example usage:
var result = ActuarialCalculation(0.05, 10, "male", 1000, 30);
console.log(result); // Replace with how you want to use the result
