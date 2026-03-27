import React, { useEffect, useState} from "react";
import { Doughnut } from "react-chartjs-2";
import {Chart as ChartJS,ArcElement,Tooltip,Legend,Title,} from "chart.js";
import "chart.js/auto";
import "../styles.css";


ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PPFCalculator = () => {
    const [investmentAmount, setInvestmentAmount] = useState(10000);
    const [duration, setDuration] = useState(15);
    const [errorMessage, setErrorMessage] = useState("");
    const interestRate = 7.1;
    const [maturityAmount, setMaturityAmount] = useState(null);
    const [totalInvestment, setTotalInvestment] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);

    useEffect(() => {
        calculatePPF();
    }, [investmentAmount, duration]);

    useEffect(() => {
        const ranges = document.querySelectorAll(".custom-range");
        ranges.forEach((range) => updateRangeBackground(range));
    }, [investmentAmount, duration]);

    const updateRangeBackground = (range) => {
        const value = Number(range.value);
        const min = Number(range.min) || 0;
        const max = Number(range.max) || 100;
        const percentage = ((value - min) / (max - min)) * 100;
        range.style.background = `linear-gradient(to right, #4361ee ${percentage}%, #eef2f6 ${percentage}%)`;
    };

    const calculatePPF = () => {
        const principal = parseFloat(investmentAmount);
        const years = parseInt(duration);
        const rate = parseFloat(interestRate) / 100;
        let amount = 0;

        if (years < 15) {
            setErrorMessage("PPF has a minimum lock-in period of 15 years.");
            setMaturityAmount(null);
            setTotalInvestment(null);
            setTotalInterest(null);
            return;
        } else {
            for (let i = 1; i <= years; i++) {
                amount += principal;
                amount += amount * rate;
            }

            const totalInvested = principal * years;
            const interestEarned = amount - totalInvested;

            setMaturityAmount(amount);
            setTotalInvestment(totalInvested);
            setTotalInterest(interestEarned);
        }
        setErrorMessage("");
    };

    const roundNumber = (num) => (num % 1 >= 0.5 ? Math.ceil(num) : Math.floor(num));

    const roundAndFormat = (num) => {
        const roundedNum = roundNumber(num);
        return roundedNum.toLocaleString('en-IN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };

    const data = {
        labels: ['Invested', 'Interest'],
        datasets: [
            {
                data: [roundNumber(totalInvestment), roundNumber(totalInterest)],
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
                    font: { family: 'Inter', size: 12, weight: '500' },
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
        },
    };

    return (
        <div className="main-content">
            <div className="calc-container">
                <div className="calc-card-main">
                    <div className="calc-header-row">
                        <a href="/" className="back-button">
                            <i className="bi bi-chevron-left"></i>
                        </a>
                        <h1 className="text-gradient" >PPF Calculator</h1>
                    </div>

                    <div className="input-field-group">
                        <div className="label-row">
                            <label className="field-label">Yearly Investment</label>
                            <div className="field-input-box">
                                <input 
                                    type="number" 
                                    value={investmentAmount} 
                                    onChange={(e) => setInvestmentAmount(e.target.value)} 
                                />
                                <span>₹</span>
                            </div>
                        </div>
                        <div className="range-slider-wrap">
                            <input 
                                type="range" 
                                className="custom-range" 
                                value={investmentAmount} 
                                onChange={(e) => setInvestmentAmount(e.target.value)} 
                                min="500" 
                                max="150000" 
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
                                min="15" 
                                max="50" 
                            />
                        </div>
                        {errorMessage && <p style={{color: '#ff4d4d', fontSize: '12px', marginTop: '5px'}}>{errorMessage}</p>}
                    </div>

                    <div className="input-field-group">
                        <div className="label-row">
                            <label className="field-label">Interest Rate</label>
                            <div className="field-input-box disabled">
                                <input type="text" value={interestRate} disabled />
                                <span>%</span>
                            </div>
                        </div>
                        <p style={{fontSize: '12px', color: '#64748b', marginTop: '10px'}}>
                            (Current fixed rate set by Government of India)
                        </p>
                    </div>
                </div>

                <div className="result-sidebar">
                    <div className="premium-result-card">
                        <h4 style={{textAlign: 'center', marginBottom: '30px', fontWeight: '800', fontFamily: 'Outfit'}}>Maturity Value</h4>
                        <div className="chart-container" style={{height: '180px'}}>
                            <Doughnut data={data} options={options} />
                        </div>

                        <div className="result-list">
                            <div className="result-item">
                                <span className="result-label">Total Invested</span>
                                <span className="result-value">₹{roundAndFormat(totalInvestment)}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">Total Interest</span>
                                <span className="result-value">₹{roundAndFormat(totalInterest)}</span>
                            </div>
                            
                            <div className="total-payable-card">
                                <span className="total-label">Maturity Amount</span>
                                <span className="total-amount">₹{roundAndFormat(maturityAmount)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="calc-info-section">
                <h1 className="text-gradient">Public Provident Fund (PPF)</h1>
                <p>
                    The Public Provident Fund (PPF) is a popular long-term investment option in India that offers safety with attractive interest rates and returns that are fully exempt from tax.
                </p>
                
                <h4>Key Features of PPF</h4>
                <ul>
                    <li><strong>Tax Benefits:</strong> Contributions (up to ₹1.5 lakh), interest earned, and maturity proceeds are all tax-exempt (EEE status).</li>
                    <li><strong>Lock-in Period:</strong> 15 years, but can be extended in blocks of 5 years.</li>
                    <li><strong>Safety:</strong> Backed by the Government of India, making it a zero-risk investment.</li>
                    <li><strong>Investment Limits:</strong> Minimum ₹500 and Maximum ₹1,50,000 per financial year.</li>
                </ul>

                <h4>How is interest calculated?</h4>
                <p>The interest is calculated on the lowest balance in the account between the 5th and the end of the month. It's compounded annually and credited to the account at the end of each financial year.</p>

                <h4>Example Calculation</h4>
                <p>If you invest ₹10,000 every year for 15 years at an interest rate of 7.1% p.a., your total investment is ₹1,50,000. Under current PPF rules, the estimated return is ₹1,21,214, bringing your maturity amount to ₹2,71,214.</p>
            </div>
        </div>
    );
};

export default PPFCalculator;