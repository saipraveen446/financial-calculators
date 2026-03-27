import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";
import "../styles.css";

import 'bootstrap-icons/font/bootstrap-icons.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [duration, setDuration] = useState(2); // Tenure in years
  const [interestRate, setInterestRate] = useState(5); // Annual interest rate in percentage
  const [emi, setEMI] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayable, setTotalPayable] = useState(null);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, duration, interestRate]);

  useEffect(() => {
    const ranges = document.querySelectorAll(".custom-range");
    ranges.forEach((range) => {
      updateRangeBackground(range);
    });
  }, [loanAmount, duration, interestRate]);

  const updateRangeBackground = (range) => {
    const value = range.value;
    const min = range.min;
    const max = range.max;
    const percentage = ((value - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #4361ee ${percentage}%, #eef2f6 ${percentage}%)`;
  };

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    const n = parseInt(duration) * 12; // Loan tenure in months

    const emiValue = (principal * rate * (1 + rate) ** n) / (((1 + rate) ** n) - 1);
    const totalPayment = emiValue * n;
    const interest = totalPayment - principal;

    setEMI(emiValue);
    setTotalPayable(totalPayment);
    setTotalInterest(interest);
  };

  const roundNumber = (num) => {
    return num % 1 >= 0.5 ? Math.ceil(num) : Math.floor(num);
  };

  const roundAndFormat = (num) => {
    const roundedNum = roundNumber(num);
    return roundedNum.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const data = {
    labels: ['Total Loan Amount', 'Total Interest'],
    datasets: [
      {
        data: [roundNumber(loanAmount), roundNumber(totalInterest)],
        backgroundColor: ['#4361ee', '#00ccce'],
        hoverBackgroundColor: ['#3a54d4', '#00b8ba'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '75%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          padding: 20,
          font: {
            family: 'Inter',
            size: 12,
            weight: '500'
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
    },
  };

  return (
    <div className="main-content">
      <div className="calc-container">
        
        {/* Left Side: Inputs */}
        <div className="calc-card-main">
          <div className="calc-header-row">
            <a href="/" className="back-button">
              <i className="bi bi-chevron-left"></i>
            </a>
            <h1 className="text-gradient">EMI Calculator</h1>
          </div>

          <div className="input-field-group">
            <div className="label-row">
              <label className="field-label">Loan Amount</label>
              <div className="field-input-box">
                <input 
                  type="number" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(e.target.value)} 
                />
                <span>₹</span>
              </div>
            </div>
            <div className="range-slider-wrap">
              <input 
                type="range" 
                className="custom-range" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(e.target.value)} 
                min="1000" 
                max="10000000" 
              />
            </div>
          </div>

          <div className="input-field-group">
            <div className="label-row">
              <label className="field-label">Rate of Interest (p.a)</label>
              <div className="field-input-box">
                <input 
                  type="number" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(e.target.value)} 
                />
                <span>%</span>
              </div>
            </div>
            <div className="range-slider-wrap">
              <input 
                type="range" 
                className="custom-range" 
                value={interestRate} 
                onChange={(e) => setInterestRate(e.target.value)} 
                min="1" 
                max="30" 
              />
            </div>
          </div>

          <div className="input-field-group">
            <div className="label-row">
              <label className="field-label">Loan Tenure (Years)</label>
              <div className="field-input-box">
                <input 
                  type="number" 
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)} 
                />
                <span>Yrs</span>
              </div>
            </div>
            <div className="range-slider-wrap">
              <input 
                type="range" 
                className="custom-range" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)} 
                min="1" 
                max="30" 
              />
            </div>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="result-sidebar">
          <div className="premium-result-card">
            <h4 style={{textAlign: 'center', marginBottom: '30px', fontWeight: '800', fontFamily: 'Outfit'}}>Repayment Breakup</h4>
            <div className="chart-container" style={{height: '180px'}}>
              <Doughnut data={data} options={options} />
            </div>

            <div className="result-list">
              <div className="result-item">
                <span className="result-label">Monthly EMI</span>
                <span className="result-value">₹{roundAndFormat(emi)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Principal Amount</span>
                <span className="result-value">₹{roundAndFormat(loanAmount)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Total Interest</span>
                <span className="result-value">₹{roundAndFormat(totalInterest)}</span>
              </div>
              
              <div className="total-payable-card">
                <span className="total-label">Total Payment</span>
                <span className="total-amount">₹{roundAndFormat(totalPayable)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="calc-info-section">
        <h1 className="text-gradient">EMI Calculator</h1>
        <p>
          Our EMI calculator is a useful tool designed to help you estimate your monthly installment for a loan. By considering the loan amount, interest rate, and tenure, the calculator provides you with an accurate estimation of the EMI amount, helping you plan your finances effectively.
        </p>
        
        <h4>How to Use the EMI Calculator</h4>
        <ul>
          <li><strong>Enter Loan Amount:</strong> Input the total amount you wish to borrow.</li>
          <li><strong>Input the Interest Rate:</strong> Enter the annual interest rate applicable to your loan.</li>
          <li><strong>Set the Loan Tenure:</strong> Specify the duration over which you intend to repay the loan.</li>
        </ul>
        
        <h4>Formula for EMI Calculation</h4>
        <p>The EMI for a loan can be calculated using the formula:</p>
        <code style={{display: 'block', padding: '16px', background: '#f8f9ff', borderRadius: '12px', border: '1px solid #eef2ff', marginBottom: '16px', fontWeight: '600'}}>
          EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]
        </code>
        <p>Where P is Principal, r is monthly interest rate, and n is tenure in months.</p>
        
        <h4>Example Calculation</h4>
        <p>If you take a loan of ₹5,00,000 at an interest rate of 10.5% p.a. for a tenure of 5 years (60 months), the EMI would be:</p>
        <p>EMI = [5,00,000 x (0.105/12) x (1+(0.105/12))^60] / [(1+(0.105/12))^60 - 1] = ₹10,747</p>
        
        <h4>Benefits of Using our tool</h4>
        <ul>
          <li><strong>Accurate Estimation:</strong> Get a precise estimate of your monthly installment, aiding in budget planning.</li>
          <li><strong>Financial Planning:</strong> Plan your finances effectively by knowing the exact amount you need to set aside for loan repayment.</li>
          <li><strong>Comparison:</strong> Compare different loan options based on EMI amounts to choose the most suitable one.</li>
        </ul>
      </div>
    </div>
  );
};

export default EMICalculator;

