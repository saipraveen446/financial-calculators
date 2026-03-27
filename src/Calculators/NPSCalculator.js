import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import 'chart.js/auto';
import "../styles.css";


ChartJS.register(ArcElement, Tooltip, Legend, Title);

const NPSCalculator = () => {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [expectedReturnRate, setExpectedReturnRate] = useState(10);
    const [age, setAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [purchaseAnnuity, setPurchaseAnnuity] = useState(40);
    const [annuityRate, setAnnuityRate] = useState(6);

    const [investedAmount, setInvestedAmount] = useState(0);
    const [pensionWealth, setPensionWealth] = useState(0);
    const [interestEarned, setInterestEarned] = useState(0);
    const [annuityAmount, setAnnuityAmount] = useState(0);
    const [lumpsum, setLumpsum] = useState(0);
    const [pensionPerMonth, setPensionPerMonth] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (age < 18 || age > 70) {
            setError('Age must be between 18 and 70.');
        } else {
            setError('');
            calculateNPS();
        }
    }, [monthlyInvestment, expectedReturnRate, age, retirementAge, purchaseAnnuity, annuityRate]);

    useEffect(() => {
        const ranges = document.querySelectorAll('.custom-range');
        ranges.forEach((range) => updateRangeBackground(range));
    }, [monthlyInvestment, expectedReturnRate, age, retirementAge, purchaseAnnuity, annuityRate]);

    const updateRangeBackground = (range) => {
        const value = Number(range.value);
        const min = Number(range.min) || 0;
        const max = Number(range.max) || 100;
        const percentage = ((value - min) / (max - min)) * 100;
        range.style.background = `linear-gradient(to right, #4361ee ${percentage}%, #eef2f6 ${percentage}%)`;
    };

    const calculateNPS = () => {
        const monthsToInvest = Math.max(0, retirementAge - age) * 12;
        const monthlyRate = expectedReturnRate / 100 / 12;

        const invested = monthlyInvestment * monthsToInvest;
        
        // NPS corpus compound calculation
        const futureValueOfInvestment =
            monthlyRate === 0
                ? invested
                : monthlyInvestment * ((Math.pow(1 + monthlyRate, monthsToInvest) - 1) / monthlyRate) * (1 + monthlyRate);

        const interest = futureValueOfInvestment - invested;

        const annuityCorpus = (purchaseAnnuity / 100) * futureValueOfInvestment;
        const lump = futureValueOfInvestment - annuityCorpus;
        
        // Annuity calculation (usually annual rate / 12 for monthly pension)
        const annuityRateMonthly = annuityRate / 100 / 12;
        const monthlyPension = annuityCorpus * annuityRateMonthly;

        setInvestedAmount(invested);
        setPensionWealth(futureValueOfInvestment);
        setInterestEarned(interest);
        setAnnuityAmount(annuityCorpus);
        setLumpsum(lump);
        setPensionPerMonth(monthlyPension);
    };

    const roundNumber = (num) => (num % 1 >= 0.5 ? Math.ceil(num) : Math.floor(num));

    const roundAndFormat = (num) => {
        const roundedNum = roundNumber(Number(num) || 0);
        return roundedNum.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    };

    const data = {
        labels: ['Lumpsum Amount', 'Pension Wealth'],
        datasets: [
            {
                data: [roundNumber(lumpsum), roundNumber(annuityAmount)],
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
                        <h1 className="text-gradient">NPS Calculator</h1>
                    </div>

                    <div className="input-field-group">
                        <div className="label-row">
                            <label className="field-label">Monthly Investment</label>
                            <div className="field-input-box">
                                <input 
                                    type="number" 
                                    value={monthlyInvestment} 
                                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))} 
                                />
                                <span>₹</span>
                            </div>
                        </div>
                        <div className="range-slider-wrap">
                            <input 
                                type="range" 
                                className="custom-range" 
                                value={monthlyInvestment} 
                                onChange={(e) => setMonthlyInvestment(Number(e.target.value))} 
                                min="500" 
                                max="100000" 
                            />
                        </div>
                    </div>

                    <div className="input-field-group">
                        <div className="label-row">
                            <label className="field-label">Expected Return (p.a)</label>
                            <div className="field-input-box">
                                <input 
                                    type="number" 
                                    value={expectedReturnRate} 
                                    onChange={(e) => setExpectedReturnRate(Number(e.target.value))} 
                                />
                                <span>%</span>
                            </div>
                        </div>
                        <div className="range-slider-wrap">
                            <input 
                                type="range" 
                                className="custom-range" 
                                value={expectedReturnRate} 
                                onChange={(e) => setExpectedReturnRate(Number(e.target.value))} 
                                min="1" 
                                max="20" 
                            />
                        </div>
                    </div>

                    <div className="input-field-group">
                        <div className="split-row" style={{ gap: '32px' }}>
                            <div className="split-col" style={{ flex: '0 0 45%' }}>
                                <div className="label-row" style={{ marginBottom: '8px' }}>
                                    <label className="field-label">Current Age</label>
                                    <div className="field-input-box" style={{ minWidth: '80px', padding: '6px 12px' }}>
                                        <input 
                                            type="number" 
                                            value={age} 
                                            onChange={(e) => setAge(Number(e.target.value))} 
                                        />
                                        <span style={{ fontSize: '0.85rem' }}>Yrs</span>
                                    </div>
                                </div>
                                <div className="range-slider-wrap">
                                    <input 
                                        type="range" 
                                        className="custom-range" 
                                        value={age} 
                                        onChange={(e) => setAge(Number(e.target.value))} 
                                        min="18" 
                                        max="60" 
                                    />
                                </div>
                            </div>
                            <div className="split-col" style={{ flex: '0 0 45%' }}>
                                <div className="label-row" style={{ marginBottom: '8px' }}>
                                    <label className="field-label">Retirement Age</label>
                                    <div className="field-input-box" style={{ minWidth: '80px', padding: '6px 12px' }}>
                                        <input 
                                            type="number" 
                                            value={retirementAge} 
                                            onChange={(e) => setRetirementAge(Number(e.target.value))} 
                                        />
                                        <span style={{ fontSize: '0.85rem' }}>Yrs</span>
                                    </div>
                                </div>
                                <div className="range-slider-wrap">
                                    <input 
                                        type="range" 
                                        className="custom-range" 
                                        value={retirementAge} 
                                        onChange={(e) => setRetirementAge(Number(e.target.value))} 
                                        min="50" 
                                        max="70" 
                                    />
                                </div>
                            </div>
                        </div>
                        {error && <p style={{color: '#ff4d4d', fontSize: '12px', marginTop: '5px'}}>{error}</p>}
                    </div>

                    <div className="input-field-group">
                        <div className="label-row">
                            <label className="field-label">Annuity Purchase (%)</label>
                            <div className="field-input-box">
                                <input 
                                    type="number" 
                                    value={purchaseAnnuity} 
                                    onChange={(e) => setPurchaseAnnuity(Number(e.target.value))} 
                                />
                                <span>%</span>
                            </div>
                        </div>
                        <div className="range-slider-wrap">
                            <input 
                                type="range" 
                                className="custom-range" 
                                value={purchaseAnnuity} 
                                onChange={(e) => setPurchaseAnnuity(Number(e.target.value))} 
                                min="40" 
                                max="100" 
                            />
                        </div>
                    </div>

                    <div className="input-field-group">
                        <div className="label-row">
                            <label className="field-label">Annuity Interest Rate</label>
                            <div className="field-input-box">
                                <input 
                                    type="number" 
                                    value={annuityRate} 
                                    onChange={(e) => setAnnuityRate(Number(e.target.value))} 
                                />
                                <span>%</span>
                            </div>
                        </div>
                        <div className="range-slider-wrap">
                            <input 
                                type="range" 
                                className="custom-range" 
                                value={annuityRate} 
                                onChange={(e) => setAnnuityRate(Number(e.target.value))} 
                                min="1" 
                                max="15" 
                            />
                        </div>
                    </div>
                </div>

                <div className="result-sidebar">
                    <div className="premium-result-card">
                        <h4 style={{textAlign: 'center', marginBottom: '30px', fontWeight: '800', fontFamily: 'Outfit'}}>Retirement Corpus</h4>
                        <div className="chart-container" style={{height: '180px'}}>
                            <Doughnut data={data} options={options} />
                        </div>

                        <div className="result-list">
                            <div className="result-item">
                                <span className="result-label">Investment Amount</span>
                                <span className="result-value">₹{roundAndFormat(investedAmount)}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">Pension Wealth</span>
                                <span className="result-value">₹{roundAndFormat(pensionWealth)}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">Interest Earned</span>
                                <span className="result-value">₹{roundAndFormat(interestEarned)}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">Annuity Amount</span>
                                <span className="result-value">₹{roundAndFormat(annuityAmount)}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">Lumpsum</span>
                                <span className="result-value">₹{roundAndFormat(lumpsum)}</span>
                            </div>
                            <div className="total-payable-card">
                                <span className="total-label">Monthly Pension</span>
                                <span className="total-amount">₹{roundAndFormat(pensionPerMonth)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="calc-info-section">
                <h1 className="text-gradient">National Pension System (NPS)</h1>
                <p>
                    The National Pension System (NPS) is a voluntary, long-term retirement savings scheme designed to enable systematic savings during your working life. It is regulated by the Pension Fund Regulatory and Development Authority (PFRDA).
                </p>
                
                <h4>Why Invest in NPS?</h4>
                <ul>
                    <li><strong>Dual Benefit:</strong> Offers both a lump sum amount and a regular monthly pension after retirement.</li>
                    <li><strong>Tax Savings:</strong> Additional tax deduction of up to ₹50,000 under Section 80CCD(1B), over and above the ₹1.5 lakh limit of Section 80C.</li>
                    <li><strong>Flexibility:</strong> Choice of investment options (Active or Auto choice) and Pension Fund Managers.</li>
                </ul>

                <h4>How it works?</h4>
                <p>Upon reaching the age of 60 (or retirement), you can withdraw up to 60% of the corpus as a tax-free lump sum. The remaining 40% (minimum) must be used to purchase an annuity from a PFRDA-listed insurance company, which provides you with a regular monthly pension.</p>
                
                <h4>Example Calculation</h4>
                <p>If you invest ₹5,000 monthly from age 30 to 60 (30 years) with an expected 10% return, your total investment is ₹18,00,000. Your estimated corpus will be roughly ₹1.13 Crores. If you allocate 40% to an annuity at 6% rate, you receive a lumpsum of ₹67.8 Lakhs and a monthly pension of roughly ₹22,600.</p>
            </div>
        </div>
    );
};

export default NPSCalculator;
