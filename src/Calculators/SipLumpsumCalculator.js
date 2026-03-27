import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";
import "../styles.css";


ChartJS.register(ArcElement, Tooltip, Legend, Title);

const SipLumpsumCalculator = () => {
    const [investmentType, setInvestmentType] = useState("sip");
    const [principalAmount, setPrincipalAmount] = useState(10000);
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [duration, setDuration] = useState(5);
    const [interestRate, setInterestRate] = useState(12);
    const [maturityAmount, setMaturityAmount] = useState(null);
    const [totalInvestment, setTotalInvestment] = useState(null);
    const [estimateReturns, setEstimateReturns] = useState(null);

    useEffect(() => {
        calculateInvestment();
    }, [investmentType, principalAmount, monthlyInvestment, duration, interestRate]);

    useEffect(() => {
        const ranges = document.querySelectorAll(".custom-range");
        ranges.forEach((range) => updateRangeBackground(range));
    }, [investmentType, monthlyInvestment, principalAmount, duration, interestRate]);

    const updateRangeBackground = (range) => {
        const value = Number(range.value);
        const min = Number(range.min) || 0;
        const max = Number(range.max) || 100;
        const percentage = ((value - min) / (max - min)) * 100;
        range.style.background = `linear-gradient(to right, #4361ee ${percentage}%, #eef2f6 ${percentage}%)`;
    };

    const calculateInvestment = () => {
        const years = parseInt(duration);
        const rate = parseFloat(interestRate) / 100;
        let totalInvested, maturityValue;

        if (investmentType === "sip") {
            const months = years * 12;
            const monthlyRate = rate / 12;
            totalInvested = monthlyInvestment * months;
            maturityValue =
                monthlyInvestment *
                ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
                (1 + monthlyRate);
        } else {
            const principal = parseFloat(principalAmount);
            totalInvested = principal;
            maturityValue = principal * Math.pow(1 + rate / 1, 1 * years);
        }

        const interestEarned = maturityValue - totalInvested;
        setMaturityAmount(maturityValue);
        setTotalInvestment(totalInvested);
        setEstimateReturns(interestEarned);
    };

    const roundNumber = (num) => (num % 1 >= 0.5 ? Math.ceil(num) : Math.floor(num));

    const roundAndFormat = (num) => {
        const roundedNum = roundNumber(num);
        return roundedNum.toLocaleString("en-IN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    };

    const data = {
        labels: ["Invested", "Interest"],
        datasets: [
            {
                data: [roundNumber(totalInvestment), roundNumber(estimateReturns)],
                backgroundColor: ["#4361ee", "#00ccce"],
                hoverBackgroundColor: ["#3a54d4", "#00b8ba"],
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
                    font: { family: "Inter", size: 12, weight: "500" },
                    usePointStyle: true,
                    pointStyle: "circle",
                },
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
                        <h1 className="text-gradient">SIP/Lumpsum Calculator</h1>
                    </div>

                    <div className="custom-tabs">
                        <button
                            className={`tab-btn ${investmentType === "sip" ? "active" : ""}`}
                            onClick={() => setInvestmentType("sip")}
                        >
                            SIP
                        </button>
                        <button
                            className={`tab-btn ${investmentType === "lumpsum" ? "active" : ""}`}
                            onClick={() => setInvestmentType("lumpsum")}
                        >
                            Lumpsum
                        </button>
                    </div>

                    <div className="input-field-group">
                        <div className="label-row">
                            <label className="field-label">
                                {investmentType === "sip" ? "Monthly Investment" : "Total Investment"}
                            </label>
                            <div className="field-input-box">
                                <input
                                    type="number"
                                    value={investmentType === "sip" ? monthlyInvestment : principalAmount}
                                    onChange={(e) =>
                                        investmentType === "sip"
                                            ? setMonthlyInvestment(Number(e.target.value))
                                            : setPrincipalAmount(Number(e.target.value))
                                    }
                                />
                                <span>₹</span>
                            </div>
                        </div>
                        <div className="range-slider-wrap">
                            <input
                                type="range"
                                className="custom-range"
                                value={investmentType === "sip" ? monthlyInvestment : principalAmount}
                                onChange={(e) =>
                                    investmentType === "sip"
                                        ? setMonthlyInvestment(Number(e.target.value))
                                        : setPrincipalAmount(Number(e.target.value))
                                }
                                min={investmentType === "sip" ? "500" : "1000"}
                                max={investmentType === "sip" ? "100000" : "1000000"}
                            />
                        </div>
                    </div>

                    <div className="input-field-group">
                        <div className="label-row">
                            <label className="field-label">Expected Return Rate</label>
                            <div className="field-input-box">
                                <input
                                    type="number"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                />
                                <span>%</span>
                            </div>
                        </div>
                        <div className="range-slider-wrap">
                            <input
                                type="range"
                                className="custom-range"
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                min="1"
                                max="30"
                            />
                        </div>
                    </div>

                    <div className="input-field-group">
                        <div className="label-row">
                            <label className="field-label">Time Period</label>
                            <div className="field-input-box">
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                />
                                <span>Yrs</span>
                            </div>
                        </div>
                        <div className="range-slider-wrap">
                            <input
                                type="range"
                                className="custom-range"
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                min="1"
                                max="40"
                            />
                        </div>
                    </div>
                </div>

                <div className="result-sidebar">
                    <div className="premium-result-card">
                        <h4
                            style={{
                                textAlign: "center",
                                marginBottom: "30px",
                                fontWeight: "800",
                                fontFamily: "Outfit",
                            }}
                        >
                            Future Wealth
                        </h4>
                        <div className="chart-container" style={{ height: "180px" }}>
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
                <h1 className="text-gradient">
                    {investmentType === "sip" ? "Systematic Investment Plan (SIP)" : "Lumpsum Investment"}
                </h1>
                <p>
                    {investmentType === "sip"
                        ? "SIP is a method of investing in mutual funds where an investor chooses a regular interval (usually monthly) to invest a fixed amount of money."
                        : "A Lumpsum investment is a one-time major investment made by an investor in a particular scheme or financial instrument."}
                </p>

                <h4>{investmentType === "sip" ? "Benefits of SIP" : "Benefits of Lumpsum"}</h4>
                <ul>
                    {investmentType === "sip" ? (
                        <>
                            <li>
                                <strong>Rupee Cost Averaging:</strong> Automated buying of more units
                                when markets are low.
                            </li>
                            <li>
                                <strong>Compounding Power:</strong> Small amounts invested regularly grow
                                significantly over time.
                            </li>
                            <li>
                                <strong>Discipline:</strong> Encourages a regular saving habit.
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <strong>Convenience:</strong> One-time process, no need to monitor
                                monthly payments.
                            </li>
                            <li>
                                <strong>Market Timing:</strong> Potential for high returns if invested
                                during market dips.
                            </li>
                            <li>
                                <strong>Lower Costs:</strong> Often involves lower transaction costs
                                than multiple small investments.
                            </li>
                        </>
                    )}
                </ul>

                <h4>How it is calculated?</h4>
                <p>
                    {investmentType === "sip"
                        ? "The formula used is M = P × ({[1 + i]^n – 1} / i) × (1 + i), where M is maturity amount, P is monthly payment, i is periodic interest rate, and n is number of payments."
                        : "The formula used is A = P(1 + r/n)^nt, where A is maturity amount, P is principal, r is annual interest rate, n is compounding frequency, and t is time in years."}
                </p>
                
                <h4>Example Calculation</h4>
                <p>
                    {investmentType === "sip"
                        ? "If you invest ₹5,000 monthly in a SIP for 5 years at an expected 12% return, your total investment is ₹3,00,000. Your estimated return is ₹1,12,432, bringing the total value to ₹4,12,432."
                        : "If you invest a lumpsum of ₹10,000 for 5 years at a 12% expected return, your total investment is ₹10,000. Your estimated return will be ₹7,623, bringing the total value to ₹17,623."}
                </p>
            </div>
        </div>
    );
};

export default SipLumpsumCalculator;
