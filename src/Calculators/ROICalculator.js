import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";
import "../styles.css";


ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ROICalculator = () => {
    const [initialInvestment, setInitialInvestment] = useState(10000);
    const [finalAmount, setFinalAmount] = useState(15000);
    const [duration, setDuration] = useState(5);
    const [roi, setRoi] = useState(null);
    const [simpleAnnualROI, setSimpleAnnualROI] = useState(null);
    const [cagr, setCagr] = useState(null);
    const [totalInvestment, setTotalInvestment] = useState(null);
    const [estimateReturns, setEstimateReturns] = useState(null);

    useEffect(() => {
        calculateROI();
    }, [initialInvestment, finalAmount, duration]);

    useEffect(() => {
        const ranges = document.querySelectorAll(".custom-range");
        ranges.forEach((range) => updateRangeBackground(range));
    }, [initialInvestment, duration, finalAmount]);

    const updateRangeBackground = (range) => {
        const value = Number(range.value);
        const min = Number(range.min) || 0;
        const max = Number(range.max) || 100;
        const percentage = ((value - min) / (max - min)) * 100;
        range.style.background = `linear-gradient(to right, #4361ee ${percentage}%, #eef2f6 ${percentage}%)`;
    };

    const calculateROI = () => {
        const initial = parseFloat(initialInvestment);
        const final = parseFloat(finalAmount);
        const years = parseInt(duration);

        if (initial && final && years && years > 0) {
            const returns = final - initial;
            const roiValue = (returns / initial) * 100;
            const simpleAnnualROIValue = roiValue / years;
            const cagrValue = (Math.pow(final / initial, 1 / years) - 1) * 100;

            setRoi(roiValue);
            setSimpleAnnualROI(simpleAnnualROIValue);
            setCagr(cagrValue);
            setTotalInvestment(initial);
            setEstimateReturns(returns);
        } else {
            setRoi(null);
            setSimpleAnnualROI(null);
            setCagr(null);
            setTotalInvestment(null);
            setEstimateReturns(null);
        }
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
        labels: ["Invested", "Returns"],
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
                        <h1 className="text-gradient">ROI Calculator</h1>
                    </div>

                    <div className="input-field-group">
                        <div className="label-row">
                            <label className="field-label">Initial Investment</label>
                            <div className="field-input-box">
                                <input
                                    type="number"
                                    value={initialInvestment}
                                    onChange={(e) => setInitialInvestment(e.target.value)}
                                />
                                <span>₹</span>
                            </div>
                        </div>
                        <div className="range-slider-wrap">
                            <input
                                type="range"
                                className="custom-range"
                                value={initialInvestment}
                                onChange={(e) => setInitialInvestment(e.target.value)}
                                min="1000"
                                max="1000000"
                            />
                        </div>
                    </div>

                    <div className="input-field-group">
                        <div className="label-row">
                            <label className="field-label">Final Amount</label>
                            <div className="field-input-box">
                                <input
                                    type="number"
                                    value={finalAmount}
                                    onChange={(e) => setFinalAmount(e.target.value)}
                                />
                                <span>₹</span>
                            </div>
                        </div>
                        <div className="range-slider-wrap">
                            <input
                                type="range"
                                className="custom-range"
                                value={finalAmount}
                                onChange={(e) => setFinalAmount(e.target.value)}
                                min="1000"
                                max="1000000"
                            />
                        </div>
                    </div>

                    <div className="input-field-group">
                        <div className="label-row">
                            <label className="field-label">Duration</label>
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
                            Investment Growth
                        </h4>
                        <div className="chart-container" style={{ height: "180px" }}>
                            <Doughnut data={data} options={options} />
                        </div>

                        <div className="result-list">
                            <div className="result-item">
                                <span className="result-label">ROI (Total)</span>
                                <span className="result-value" style={{ color: "#4361ee" }}>
                                    {roi !== null ? `${roi.toFixed(2)}%` : "0%"}
                                </span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">CAGR</span>
                                <span className="result-value" style={{ color: "#00ccce" }}>
                                    {cagr !== null ? `${cagr.toFixed(2)}%` : "0%"}
                                </span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">Est. Returns</span>
                                <span className="result-value">
                                    ₹{roundAndFormat(estimateReturns)}
                                </span>
                            </div>

                            <div className="total-payable-card">
                                <span className="total-label">Final Value</span>
                                <span className="total-amount">₹{roundAndFormat(finalAmount)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="calc-info-section">
                <h1 className="text-gradient">Return on Investment (ROI)</h1>
                <p>
                    ROI is a performance measure used to evaluate the efficiency or profitability of
                    an investment or compare the efficiency of a number of different investments.
                </p>

                <h4>Understanding ROI vs CAGR</h4>
                <ul>
                    <li>
                        <strong>Total ROI:</strong> The absolute percentage return on your
                        investment over the entire period. It doesn't account for the time taken to
                        achieve that return.
                    </li>
                    <li>
                        <strong>CAGR (Compound Annual Growth Rate):</strong> The mean annual growth
                        rate of an investment over a specified period of time longer than one year.
                        It represents the "smoothed" annual return.
                    </li>
                </ul>

                <h4>Calculation Formula</h4>
                <p>Simple ROI = ((Final Value - Initial Cost) / Initial Cost) * 100</p>
                <p>
                    CAGR = [((Final Value / Initial Value) ^ (1 / Time in Years)) - 1] * 100
                </p>
                
                <h4>Example Calculation</h4>
                <p>If you invest ₹10,000 and the final value after 5 years is ₹15,000:</p>
                <p><strong>Total ROI:</strong> ((15,000 - 10,000) / 10,000) * 100 = 50%</p>
                <p><strong>CAGR:</strong> [((15,000 / 10,000) ^ (1 / 5)) - 1] * 100 = 8.45%</p>
            </div>
        </div>
    );
};

export default ROICalculator;

