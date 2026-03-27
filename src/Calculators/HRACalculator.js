import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";
import "../styles.css";


ChartJS.register(ArcElement, Tooltip, Legend, Title);

const HRACalculator = () => {
  const [basicSalary, setBasicSalary] = useState(540000);
  const [dearnessAllowance, setDearnessAllowance] = useState(0);
  const [hraPercentage, setHraPercentage] = useState(100000);
  const [rentPaid, setRentPaid] = useState(300000);
  const [metroCity, setMetroCity] = useState(false);
  const [exemptHRA, setExemptHRA] = useState("");
  const [taxableHRA, setTaxableHRA] = useState("");

  useEffect(() => {
    calculateHRA();
  }, [basicSalary, hraPercentage, rentPaid, metroCity, dearnessAllowance]);

  useEffect(() => {
    const ranges = document.querySelectorAll(".custom-range");
    ranges.forEach((range) => {
      updateRangeBackground(range);
    });
  }, [basicSalary, hraPercentage, rentPaid, dearnessAllowance]);

  const updateRangeBackground = (range) => {
    const value = range.value;
    const min = range.min;
    const max = range.max;
    const percentage = ((value - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #4361ee ${percentage}%, #eef2f6 ${percentage}%)`;
  };

  const calculateHRA = () => {
    const salary = parseFloat(basicSalary) + parseFloat(dearnessAllowance);
    const hra = parseFloat(hraPercentage);
    const rent = parseFloat(rentPaid);
    const metroMultiplier = metroCity ? 0.50 : 0.40;
    const rentMinus10PercentBasic = rent - (0.10 * salary);

    const hraExempt = Math.max(0, Math.min(hra, metroMultiplier * salary, rentMinus10PercentBasic));
    const hraTaxable = Math.max(0, hra - hraExempt);

    setExemptHRA(hraExempt);
    setTaxableHRA(hraTaxable);
  };

  const roundNumber = (num) => {
    return num % 1 >= 0.5 ? Math.ceil(num) : Math.floor(num);
  };

  const roundAndFormat = (num) => {
    const roundedNum = roundNumber(num);
    return roundedNum.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const data = {
    labels: ["Exempt HRA", "Taxable HRA"],
    datasets: [
      {
        data: [roundNumber(exemptHRA), roundNumber(taxableHRA)],
        backgroundColor: ["#00ccce", "#4361ee"],
        hoverBackgroundColor: ["#00b8ba", "#3a54d4"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "75%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          padding: 20,
          font: {
            family: "Inter",
            size: 12,
            weight: "500",
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
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
            <h1 className="text-gradient">HRA Calculator</h1>
          </div>

          <div className="input-field-group">
            <div className="label-row">
              <label className="field-label">Basic Salary (p.a)</label>
              <div className="field-input-box">
                <input 
                  type="number" 
                  value={basicSalary} 
                  onChange={(e) => setBasicSalary(e.target.value)} 
                />
                <span>₹</span>
              </div>
            </div>
            <div className="range-slider-wrap">
              <input 
                type="range" 
                className="custom-range" 
                value={basicSalary} 
                onChange={(e) => setBasicSalary(e.target.value)} 
                min="10000" 
                max="5000000" 
              />
            </div>
          </div>

          <div className="input-field-group">
            <div className="label-row">
              <label className="field-label">Dearness Allowance (DA)</label>
              <div className="field-input-box">
                <input 
                  type="number" 
                  value={dearnessAllowance} 
                  onChange={(e) => setDearnessAllowance(e.target.value)} 
                />
                <span>₹</span>
              </div>
            </div>
            <div className="range-slider-wrap">
              <input 
                type="range" 
                className="custom-range" 
                value={dearnessAllowance} 
                onChange={(e) => setDearnessAllowance(e.target.value)} 
                min="0" 
                max="1000000" 
              />
            </div>
          </div>

          <div className="input-field-group">
            <div className="label-row">
              <label className="field-label">HRA Received (p.a)</label>
              <div className="field-input-box">
                <input 
                  type="number" 
                  value={hraPercentage} 
                  onChange={(e) => setHraPercentage(e.target.value)} 
                />
                <span>₹</span>
              </div>
            </div>
            <div className="range-slider-wrap">
              <input 
                type="range" 
                className="custom-range" 
                value={hraPercentage} 
                onChange={(e) => setHraPercentage(e.target.value)} 
                min="0" 
                max="2500000" 
              />
            </div>
          </div>

          <div className="input-field-group">
            <div className="label-row">
              <label className="field-label">Actual Rent Paid (p.a)</label>
              <div className="field-input-box">
                <input 
                  type="number" 
                  value={rentPaid} 
                  onChange={(e) => setRentPaid(e.target.value)} 
                />
                <span>₹</span>
              </div>
            </div>
            <div className="range-slider-wrap">
              <input 
                type="range" 
                className="custom-range" 
                value={rentPaid} 
                onChange={(e) => setRentPaid(e.target.value)} 
                min="0" 
                max="2500000" 
              />
            </div>
          </div>

          <div className="input-field-group">
            <label className="field-label" style={{marginBottom: '15px'}}>Do you live in a Metro City?</label>
            <div className="custom-tabs">
              <button 
                className={`tab-btn ${metroCity ? 'active' : ''}`}
                onClick={() => setMetroCity(true)}
              >
                Yes
              </button>
              <button 
                className={`tab-btn ${!metroCity ? 'active' : ''}`}
                onClick={() => setMetroCity(false)}
              >
                No
              </button>
            </div>
            <p style={{fontSize: '12px', color: '#64748b', marginTop: '10px'}}>
              (Metro cities: Delhi, Mumbai, Kolkata, Chennai)
            </p>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="result-sidebar">
          <div className="premium-result-card">
            <h4 style={{textAlign: 'center', marginBottom: '30px', fontWeight: '800', fontFamily: 'Outfit'}}>Tax Exemption</h4>
            <div className="chart-container" style={{height: '180px'}}>
              <Doughnut data={data} options={options} />
            </div>

            <div className="result-list">
              <div className="result-item">
                <span className="result-label">Exempt HRA</span>
                <span className="result-value" style={{color: '#00ccce'}}>₹{roundAndFormat(exemptHRA)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Taxable HRA</span>
                <span className="result-value" style={{color: '#4361ee'}}>₹{roundAndFormat(taxableHRA)}</span>
              </div>
              
              <div className="total-payable-card">
                <span className="total-label">Total HRA</span>
                <span className="total-amount">₹{roundAndFormat(hraPercentage)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="calc-info-section">
        <h1 className="text-gradient">HRA Exemption Guide</h1>
        <p>
          House Rent Allowance (HRA) is a component of your salary provided by your employer to cover your rental expenses. Under Section 10(13A) of the Income Tax Act, you can claim an exemption on this allowance if you live in a rented house.
        </p>
        
        <h4>How is HRA Exemption Calculated?</h4>
        <p>The exempt amount is the <strong>minimum</strong> of the following three:</p>
        <ol>
          <li>Actual HRA received from employer.</li>
          <li>50% of (Basic + DA) for metro cities, or 40% for non-metro cities.</li>
          <li>Actual rent paid minus 10% of (Basic + DA).</li>
        </ol>
        
        <h4>Important Note</h4>
        <p>To claim HRA exemption, you must actually pay rent. If you live in your own house or do not pay rent, the entire HRA received is taxable.</p>
        <h4>Example Calculation</h4>
        <p>Assume a monthly basic salary of ₹40,000 (₹4,80,000 p.a.), HRA received ₹15,000 (₹1,80,000 p.a.), rent paid ₹12,000 (₹1,44,000 p.a.), living in a metro city.</p>
        <p>1. Actual HRA = ₹1,80,000</p>
        <p>2. 50% of Basic = ₹2,40,000</p>
        <p>3. Rent Paid - 10% of Basic = ₹1,44,000 - ₹48,000 = ₹96,000</p>
        <p>The least of these is ₹96,000, so the exempt HRA is ₹96,000. The taxable HRA is ₹1,80,000 - ₹96,000 = ₹84,000.</p>
      </div>
    </div>
  );
};

export default HRACalculator;



