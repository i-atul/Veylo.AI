"use client";
import React from "react";
import { useState } from "react";
import { useEffect, useCallback } from "react";


function EmiCalculatorFn({price = 1500 }) {
  const [loanAmount, setLoanAmount] = useState(price);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(60);
  const [emi, setEmi] = useState(0);

  const calculateEMI = useCallback(() => {
    const principal = parseFloat(loanAmount) - parseFloat(downPayment);
    const ratePerMonth = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm);

    if (principal <= 0) {
      setEmi("0.00");
      return;
    }

    const emiAmount =
      (principal *
        ratePerMonth *
        Math.pow(1 + ratePerMonth, numberOfPayments)) /
      (Math.pow(1 + ratePerMonth, numberOfPayments) - 1);

    setEmi(emiAmount.toFixed(2));
  }, [loanAmount, downPayment, interestRate, loanTerm]);

  useEffect(() => {
    calculateEMI();
  }, [calculateEMI]);

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    setter(value);
  };

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto pr-1">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center font-roboto">
          Veylo Car Loan EMI Calculator
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">
              Loan Amount (USD)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                value={loanAmount}
                onChange={handleInputChange(setLoanAmount)}
                className="w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                min="1000"
                max="1000000"
                step="1000"
              />
              <input
                type="number"
                value={loanAmount}
                onChange={handleInputChange(setLoanAmount)}
                className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1000"
                max="1000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Down Payment (USD)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                value={downPayment}
                onChange={handleInputChange(setDownPayment)}
                className="w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                min="0"
                max={loanAmount}
                step="1000"
              />
              <input
                type="number"
                value={downPayment}
                onChange={handleInputChange(setDownPayment)}
                className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max={loanAmount}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Interest Rate (%)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                value={interestRate}
                onChange={handleInputChange(setInterestRate)}
                className="w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                min="1"
                max="20"
                step="0.1"
              />
              <input
                type="number"
                value={interestRate}
                onChange={handleInputChange(setInterestRate)}
                className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="20"
                step="0.1"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Loan Term (months)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                value={loanTerm}
                onChange={handleInputChange(setLoanTerm)}
                className="w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                min="12"
                max="84"
                step="12"
              />
              <input
                type="number"
                value={loanTerm}
                onChange={handleInputChange(setLoanTerm)}
                className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="12"
                max="84"
              />
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#F8F9FA] rounded-lg">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
              Monthly Payment (EMI)
            </h2>
            <div className="text-3xl font-bold text-center text-[#2C3E50]">
              ${emi}
            </div>
            <div className="mt-4 text-center text-gray-600">
              Principal Amount: ${(loanAmount - downPayment).toLocaleString()}
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600 text-center">
            This is an estimate. Actual EMI may vary based on additional fees
            and taxes.
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmiCalculatorFn


