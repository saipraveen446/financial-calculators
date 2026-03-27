import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";
import "../styles.css";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const GSTCalculator = () => {
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [calculationType, setCalculationType] = useState('exclusive');
  const [gstAmount, setGstAmount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    calculateGST();
  }, [amount, gstRate, calculationType]);

  useEffect(() => {
    const ranges = document.querySelectorAll(".custom-range");
    ranges.forEach((range) => {
      updateRangeBackground(range);
    });
  }, [amount, gstRate]);

  const updateRangeBackground = (range) => {
    const value = range.value;
    const min = range.min;
    const max = range.max;
    const percentage = ((value - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #4361ee ${percentage}%, #eef2f6 ${percentage}%)`;
  };

  const calculateGST = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(gstRate) / 100;

    let gst = 0;
    let total = 0;

    if (calculationType === 'exclusive') {
      gst = amt * rate;
      total = amt + gst;
    } else if (calculationType === 'inclusive') {
      gst = amt - amt / (1 + rate);
      total = amt - gst;
    }

    setGstAmount(gst);
    setTotalAmount(total);
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
    labels: ['Base Amount', 'GST Amount'],
    datasets: [
      {
        data: [roundNumber(calculationType === 'exclusive' ? amount : totalAmount), roundNumber(gstAmount)],
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
            <h1 className="text-gradient">GST Calculator</h1>
          </div>

          <div className="custom-tabs">
            <button 
              className={`tab-btn ${calculationType === 'exclusive' ? 'active' : ''}`}
              onClick={() => setCalculationType('exclusive')}
            >
              GST Exclusive
            </button>
            <button 
              className={`tab-btn ${calculationType === 'inclusive' ? 'active' : ''}`}
              onClick={() => setCalculationType('inclusive')}
            >
              GST Inclusive
            </button>
          </div>

          <div className="input-field-group">
            <div className="label-row">
              <label className="field-label">Total Amount</label>
              <div className="field-input-box">
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                />
                <span>₹</span>
              </div>
            </div>
            <div className="range-slider-wrap">
              <input 
                type="range" 
                className="custom-range" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                min="1000" 
                max="10000000" 
              />
            </div>
          </div>

          <div className="input-field-group">
            <div className="label-row">
              <label className="field-label">Tax Slab (%)</label>
              <div className="field-input-box">
                <input 
                  type="number" 
                  value={gstRate} 
                  onChange={(e) => setGstRate(e.target.value)} 
                />
                <span>%</span>
              </div>
            </div>
            <div className="range-slider-wrap">
              <input 
                type="range" 
                className="custom-range" 
                value={gstRate} 
                onChange={(e) => setGstRate(e.target.value)} 
                min="1" 
                max="30" 
              />
            </div>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="result-sidebar">
          <div className="premium-result-card">
            <h4 style={{textAlign: 'center', marginBottom: '30px', fontWeight: '800', fontFamily: 'Outfit'}}>GST Breakup</h4>
            <div className="chart-container" style={{height: '180px'}}>
              <Doughnut data={data} options={options} />
            </div>

            <div className="result-list">
              <div className="result-item">
                <span className="result-label">Base Amount</span>
                <span className="result-value">₹{roundAndFormat(calculationType === 'exclusive' ? amount : totalAmount)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">GST Amount</span>
                <span className="result-value">₹{roundAndFormat(gstAmount)}</span>
              </div>
              
              <div className="total-payable-card">
                <span className="total-label">Total Amount</span>
                <span className="total-amount">₹{roundAndFormat(calculationType === 'exclusive' ? totalAmount : amount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="calc-info-section">
        <h1 className="text-gradient">
          {calculationType === 'exclusive' ? "GST Exclusive" : "GST Inclusive"}
        </h1>
        <p>
          The Goods and Services Tax (GST) is an indirect tax used in India on the supply of goods and services.
        </p>
        
        {calculationType === 'exclusive' ? (
          <>
            <h4>GST Exclusive Calculation</h4>
            <p>GST Exclusive means the product's price does not include GST. The GST amount is calculated on top of the base amount and then added to get the final total price.</p>
            <code style={{display: 'block', padding: '16px', background: '#f8f9ff', borderRadius: '12px', border: '1px solid #eef2ff', marginBottom: '16px', fontWeight: '600'}}>
              Total = Base Amount + (Base Amount × GST Rate)
            </code>
            <h4>Example Calculation</h4>
            <p>For a base amount of ₹10,000 and 18% GST: Total Amount = 10,000 + (10,000 * 0.18) = ₹11,800.</p>
          </>
        ) : (
          <>
            <h4>GST Inclusive Calculation</h4>
            <p>GST Inclusive means the product's total price already includes the GST amount. To find out the original base price before tax, reverse calculations are performed.</p>
            <code style={{display: 'block', padding: '16px', background: '#f8f9ff', borderRadius: '12px', border: '1px solid #eef2ff', marginBottom: '16px', fontWeight: '600'}}>
              Base Amount = Total Amount / (1 + GST Rate)
            </code>
            <h4>Example Calculation</h4>
            <p>For a total amount of ₹11,800 and 18% GST: Base Amount = 11,800 / (1 + 0.18) = ₹10,000. And GST is ₹1,800.</p>
          </>
        )}
        
        <h4>Benefits of our Calculator</h4>
        <ul>
          <li><strong>Instant Results:</strong> Quick calculation for any tax slab (5%, 12%, 18%, 28%).</li>
          <li><strong>Accurate:</strong> Avoid manual errors in complex inclusive calculations.</li>
          <li><strong>Financial Clarity:</strong> Know exactly how much tax you are paying or charging.</li>
        </ul>
      </div>
    </div>
  );
};

export default GSTCalculator;
