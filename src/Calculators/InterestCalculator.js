import React, { useEffect, useState } from "react";
import "../styles.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";


ChartJS.register(ArcElement, Tooltip, Legend, Title);

const InterestCalculator = () => {
  const [principalAmount, setPrincipalAmount] = useState(10000);
  const [duration, setDuration] = useState(5);
  const [interestRate, setInterestRate] = useState(10);
  const [calculatorType, setCalculatorType] = useState("simple");
  const [maturityAmount, setMaturityAmount] = useState(null);
  const [totalInvestment, setTotalInvestment] = useState(null);
  const [estimateReturns, setEstimateReturns] = useState(null);

  useEffect(() => {
    calculateInterest();
  }, [principalAmount, duration, interestRate, calculatorType]);

  useEffect(() => {
    const ranges = document.querySelectorAll(".custom-range");
    ranges.forEach((range) => {
      updateRangeBackground(range);
    });
  }, [principalAmount, duration, interestRate]);

  const updateRangeBackground = (range) => {
    const value = range.value;
    const min = range.min;
    const max = range.max;
    const percentage = ((value - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #4361ee ${percentage}%, #eef2f6 ${percentage}%)`;
  };

  const calculateInterest = () => {
    const principal = parseFloat(principalAmount);
    const years = parseInt(duration);
    const rate = parseFloat(interestRate) / 100;
  
    let amount, interestEarned;
  
    if (calculatorType === "simple") {
      amount = principal + principal * rate * years;
    } else {
      amount = principal * Math.pow(1 + rate, years); 
    }
  
    interestEarned = amount - principal;
  
    setMaturityAmount(amount);
    setTotalInvestment(principal);
    setEstimateReturns(interestEarned);
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
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [roundNumber(totalInvestment), roundNumber(estimateReturns)],
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
            <h1 className="text-gradient">Interest Calculator</h1>
          </div>

          <div className="custom-tabs">
            <button 
              className={`tab-btn ${calculatorType === 'simple' ? 'active' : ''}`}
              onClick={() => setCalculatorType('simple')}
            >
              Simple Interest
            </button>
            <button 
              className={`tab-btn ${calculatorType === 'compound' ? 'active' : ''}`}
              onClick={() => setCalculatorType('compound')}
            >
              Compound Interest
            </button>
          </div>

          <div className="input-field-group">
            <div className="label-row">
              <label className="field-label">Principal Amount</label>
              <div className="field-input-box">
                <input 
                  type="number" 
                  value={principalAmount} 
                  onChange={(e) => setPrincipalAmount(e.target.value)} 
                />
                <span>₹</span>
              </div>
            </div>
            <div className="range-slider-wrap">
              <input 
                type="range" 
                className="custom-range" 
                value={principalAmount} 
                onChange={(e) => setPrincipalAmount(e.target.value)} 
                min="1000" 
                max="10000000" 
              />
            </div>
          </div>

          <div className="input-field-group">
            <div className="label-row">
              <label className="field-label">Interest Rate (p.a)</label>
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
                max="50" 
              />
            </div>
          </div>

          <div className="input-field-group">
            <div className="label-row">
              <label className="field-label">Time Period (Years)</label>
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
            <h4 style={{textAlign: 'center', marginBottom: '30px', fontWeight: '800', fontFamily: 'Outfit'}}>Capital Growth</h4>
            <div className="chart-container" style={{height: '180px'}}>
              <Doughnut data={data} options={options} />
            </div>

            <div className="result-list">
              <div className="result-item">
                <span className="result-label">Principal</span>
                <span className="result-value">₹{roundAndFormat(totalInvestment)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Total Interest</span>
                <span className="result-value">₹{roundAndFormat(estimateReturns)}</span>
              </div>
              
              <div className="total-payable-card">
                <span className="total-label">Total Amount</span>
                <span className="total-amount">₹{roundAndFormat(maturityAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="calc-info-section">
        <h1 className="text-gradient">
          {calculatorType === "simple" ? "Simple Interest" : "Compound Interest"}
        </h1>
        <p>
          Interest is the cost of borrowing money or the reward for saving it. Our calculator helps you instantly compute your capital growth.
        </p>
        
        {calculatorType === "simple" ? (
          <>
            <h4>Simple Interest Explained</h4>
            <p>Simple interest is calculated only on the principal amount (the initial amount borrowed or invested). It does not take into account interest earned in previous periods, resulting in slow, linear growth.</p>
            <code style={{display: 'block', padding: '16px', background: '#f8f9ff', borderRadius: '12px', border: '1px solid #eef2ff', marginBottom: '16px', fontWeight: '600'}}>
              Simple Interest = (Principal * Rate * Time) / 100
            </code>
            <h4>Example Calculation</h4>
            <p>If you invest ₹10,000 for 5 years at an annual interest rate of 10%:</p>
            <p>Interest = (10,000 * 10 * 5) / 100 = ₹5,000.</p>
            <p>Total Maturity Amount = ₹15,000.</p>
          </>
        ) : (
          <>
            <h4>Compound Interest Explained</h4>
            <p>Compound interest is "interest on interest." It is calculated on the principal amount plus any interest that has already been added in prior years. This leads to exponential growth over time.</p>
            <code style={{display: 'block', padding: '16px', background: '#f8f9ff', borderRadius: '12px', border: '1px solid #eef2ff', marginBottom: '16px', fontWeight: '600'}}>
              Maturity Amount = Principal * (1 + Rate)^Time
            </code>
            <h4>Example Calculation</h4>
            <p>If you invest ₹10,000 for 5 years at an annual compound interest rate of 10%:</p>
            <p>Amount = 10,000 * (1 + 0.10)^5 = ₹16,105.</p>
            <p>Total Interest Earned = ₹6,105.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default InterestCalculator;
