import React, { useEffect, useState } from "react";
import "../styles.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";


ChartJS.register(ArcElement, Tooltip, Legend, Title);

const FDCalculator = () => {
  const [principalAmount, setPrincipalAmount] = useState(10000);
  const [duration, setDuration] = useState(5);
  const [interestRate, setInterestRate] = useState(6.5);
  const [maturityAmount, setMaturityAmount] = useState(null);
  const [totalInvestment, setTotalInvestment] = useState(null);
  const [estimateReturns, setEstimateReturns] = useState(null);

  useEffect(() => {
    calculateFD();
  }, [principalAmount, duration, interestRate]);

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

  const calculateFD = () => {
    const principal = parseFloat(principalAmount);
    const years = parseInt(duration);
    const rate = parseFloat(interestRate) / 100;
    const amount = principal * Math.pow(1 + rate / 4, 4 * years); // Quarterly compounding

    const totalInvested = principal;
    const interestEarned = amount - totalInvested;

    setMaturityAmount(amount);
    setTotalInvestment(totalInvested);
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
    labels: ['Total Investment', 'Total Interest'],
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
            <h1 className="text-gradient">Fixed Deposit Calculator</h1>
          </div>

          <div className="input-field-group">
            <div className="label-row">
              <label className="field-label">Total Investment</label>
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
                max="15" 
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
                max="25" 
              />
            </div>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="result-sidebar">
          <div className="premium-result-card">
            <h4 style={{textAlign: 'center', marginBottom: '30px', fontWeight: '800', fontFamily: 'Outfit'}}>Maturity Details</h4>
            <div className="chart-container" style={{height: '180px'}}>
              <Doughnut data={data} options={options} />
            </div>

            <div className="result-list">
              <div className="result-item">
                <span className="result-label">Invested Amount</span>
                <span className="result-value">₹{roundAndFormat(totalInvestment)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Est. Returns</span>
                <span className="result-value">₹{roundAndFormat(estimateReturns)}</span>
              </div>
              
              <div className="total-payable-card">
                <span className="total-label">Total Value</span>
                <span className="total-amount">₹{roundAndFormat(maturityAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="calc-info-section">
        <h1 className="text-gradient">Fixed Deposits</h1>
        <p>
          Our FD calculator is an online tool designed to help you estimate the potential returns on your fixed deposit investments. By considering your investment amount, interest rate, and investment duration, the calculator provides you with an accurate estimation of the maturity amount and interest earned over a specified period.
        </p>
        
        <h4>How to Use the FD Calculator</h4>
        <ul>
          <li><strong>Investment Amount:</strong> Decide how much you can afford to invest in a fixed deposit.</li>
          <li><strong>Interest Rate:</strong> Enter the prevalent fixed deposit interest rate offered by your bank.</li>
          <li><strong>Duration:</strong> Specify the duration for which you want to lock in your funds.</li>
        </ul>
        
        <h4>Calculation Logic</h4>
        <p>The maturity amount in a fixed deposit account is calculated using the formula for compound interest:</p>
        <code style={{display: 'block', padding: '16px', background: '#f8f9ff', borderRadius: '12px', border: '1px solid #eef2ff', marginBottom: '16px', fontWeight: '600'}}>
          M = P * (1 + r/n)^(n*t)
        </code>
        <p>Where M is Maturity amount, P is Principal, r is rate, t is years, and n is compounding frequency (usually 4 for quarterly).</p>
        <h4>Example Calculation</h4>
        <p>If you invest ₹10,000 at a 6.5% annual interest rate for 5 years, compounded quarterly:</p>
        <p>M = 10,000 * (1 + 0.065/4)^(4*5) = ₹13,804.20. Your interest earned is ₹3,804.20.</p>
      </div>
    </div>
  );
};

export default FDCalculator;




