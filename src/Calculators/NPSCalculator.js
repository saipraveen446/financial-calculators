import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import 'chart.js/auto';
import SimilarCalc from '../SimilarCalc';

ChartJS.register(ArcElement, Tooltip, Legend, Title);


const NPSCalculator = () => {
	const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
	const [expectedReturnRate, setExpectedReturnRate] = useState(8);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		// Use CSS variable if available, otherwise fallback to the app's default primary color
		const cssPrimary = getComputedStyle(document.documentElement).getPropertyValue('--cl-primary-color') || '';
		const primaryColor = cssPrimary.trim() || '#0A80A0';
		range.style.background = `linear-gradient(to right, ${primaryColor} ${percentage}%, transparent ${percentage}%)`;
	};

	const calculateNPS = () => {
		const monthsToInvest = Math.max(0, retirementAge - age) * 12;
		const monthlyRate = expectedReturnRate / 100 / 12;

		const futureValueOfInvestment =
			monthlyRate === 0
				? monthlyInvestment * monthsToInvest
				: monthlyInvestment * ((Math.pow(1 + monthlyRate, monthsToInvest) - 1) / monthlyRate) * (1 + monthlyRate);

		const invested = monthlyInvestment * monthsToInvest;
		const interest = futureValueOfInvestment - invested;

		const annuityCorpus = (purchaseAnnuity / 100) * futureValueOfInvestment;
		const lump = futureValueOfInvestment - annuityCorpus;
		const annuityRateMonthly = annuityRate / 100 / 12;
		const annAmt = annuityCorpus;
		const monthlyPension = annuityCorpus * annuityRateMonthly;

		setInvestedAmount(invested);
		setPensionWealth(futureValueOfInvestment);
		setInterestEarned(interest);
		setAnnuityAmount(annAmt);
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
					data: [roundNumber(lumpsum), roundNumber(pensionWealth)],
					// Match other calculators: use fixed color palette so component doesn't depend on external config
					backgroundColor: ['#19B797', '#0A80A0'],
					hoverBackgroundColor: ['#19B797', '#0A80A0'],
				},
			],
	};

	const options = {
		cutout: '70%',
		responsive: false,
		plugins: {
			legend: {
				position: 'right',
				align: 'center',
				labels: { font: { size: 11 }, boxWidth: 20 },
			},
		},
	};

	return (
		<div className="main-content position-relative">
			<div className="card container p-4">
				<a href="/" className="back-button">
					<i className="bi bi-house" />
				</a>

				<div className="row pt-3">
					<h1 className="fs-17 fw-bold text-center">NPS Calculator</h1>

					<div className="col-12 col-md-6 p-4 pt-5">
						<div className="row">
							<div className="col-7 col-md-8">
								<label className="form-label">Monthly Investment</label>
							</div>

							<div className="col-5 col-md-4">
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										value={monthlyInvestment}
										onChange={(e) => setMonthlyInvestment(Number(e.target.value) || 0)}
									/>
									<span className="input-group-text">&#x20B9;</span>
								</div>
							</div>

							<div className="col-12">
								<input
									type="range"
									className="form-range custom-range mt-3"
									id="investmentRange"
									value={monthlyInvestment}
									onChange={(e) => setMonthlyInvestment(Number(e.target.value) || 0)}
									min="500"
									max="100000"
								/>
								<div className="d-flex justify-content-between">
									<span>&#x20B9;500</span>
									<span>&#x20B9;1,00,000</span>
								</div>
							</div>

							<div className="col-7 col-md-8 mt-4">
								<label className="form-label">Expected Return (p.a)</label>
							</div>
							<div className="col-5 col-md-4 mt-4">
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										value={expectedReturnRate}
										onChange={(e) => setExpectedReturnRate(Number(e.target.value) || 0)}
									/>
									<span className="input-group-text">%</span>
								</div>
							</div>

							<div className="col-12">
								<input
									type="range"
									className="form-range custom-range mt-3"
									id="returnRateRange"
									value={expectedReturnRate}
									onChange={(e) => setExpectedReturnRate(Number(e.target.value) || 0)}
									min="0"
									max="20"
								/>
								<div className="d-flex justify-content-between">
									<span>0%</span>
									<span>20%</span>
								</div>
							</div>

							<div className="col-7 col-md-8 mt-4">
								<label className="form-label">Your Age</label>
							</div>
							<div className="col-5 col-md-4 mt-4">
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										value={age}
										onChange={(e) => setAge(Number(e.target.value) || 0)}
									/>
									<span className="input-group-text">Yrs</span>
								</div>
								{error && <p className="text-danger">{error}</p>}
							</div>

							<div className="col-12">
								<input
									type="range"
									className="form-range custom-range mt-3"
									id="ageRange"
									value={age}
									onChange={(e) => setAge(Number(e.target.value) || 0)}
									min="18"
									max="70"
								/>
								<div className="d-flex justify-content-between">
									<span>18 Yrs</span>
									<span>70 Yrs</span>
								</div>
							</div>

							<div className="col-7 col-md-8 mt-4">
								<label className="form-label">Retirement Age</label>
							</div>
							<div className="col-5 col-md-4 mt-4">
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										value={retirementAge}
										onChange={(e) => setRetirementAge(Number(e.target.value) || 0)}
									/>
									<span className="input-group-text">Yrs</span>
								</div>
							</div>
							<div className="col-12">
								<input
									type="range"
									className="form-range custom-range mt-3"
									id="retirementAgeRange"
									value={retirementAge}
									onChange={(e) => setRetirementAge(Number(e.target.value) || 0)}
									min="30"
									max="70"
								/>
								<div className="d-flex justify-content-between">
									<span>30 Yrs</span>
									<span>70 Yrs</span>
								</div>
							</div>

							<div className="col-7 col-md-8 mt-4">
								<label className="form-label">Purchase Annuity</label>
							</div>
							<div className="col-5 col-md-4 mt-4">
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										value={purchaseAnnuity}
										onChange={(e) => setPurchaseAnnuity(Number(e.target.value) || 0)}
									/>
									<span className="input-group-text">%</span>
								</div>
							</div>
							<div className="col-12">
								<input
									type="range"
									className="form-range custom-range mt-3"
									id="annuityRange"
									value={purchaseAnnuity}
									onChange={(e) => setPurchaseAnnuity(Number(e.target.value) || 0)}
									min="0"
									max="100"
								/>
								<div className="d-flex justify-content-between">
									<span>0%</span>
									<span>100%</span>
								</div>
							</div>

							<div className="col-7 col-md-8 mt-4">
								<label className="form-label">Annuity Rate of Interest</label>
							</div>
							<div className="col-5 col-md-4 mt-4">
								<div className="input-group">
									<input
										type="number"
										className="form-control"
										value={annuityRate}
										onChange={(e) => setAnnuityRate(Number(e.target.value) || 0)}
									/>
									<span className="input-group-text">%</span>
								</div>
							</div>
							<div className="col-12">
								<input
									type="range"
									className="form-range custom-range mt-3"
									id="annuityRateRange"
									value={annuityRate}
									onChange={(e) => setAnnuityRate(Number(e.target.value) || 0)}
									min="0"
									max="20"
								/>
								<div className="d-flex justify-content-between">
									<span>0%</span>
									<span>20%</span>
								</div>
							</div>
						</div>
					</div>

					<div className="col-12 col-md-6 p-4">
						<div className="card result-section border-0 p-4">
							<div className="row fs-17 fw-bold">
								<label className="">Total value of your investment</label>
								<div className="py-3 d-flex justify-content-center">
									<Doughnut data={data} options={options} />
								</div>
								<hr />

								<div className="col-8 mt-2">
									<p>Investment Amount</p>
								</div>
								<div className="col-4 mt-2">
									<p>&#x20B9;{roundAndFormat(investedAmount)}</p>
								</div>
								<hr />

								<div className="col-8 mt-2">
									<p>Pension Wealth</p>
								</div>
								<div className="col-4 mt-2">
									<p>&#x20B9;{roundAndFormat(pensionWealth)}</p>
								</div>
								<hr />

								<div className="col-8 mt-2">
									<p>Interest Earned</p>
								</div>
								<div className="col-4 mt-2">
									<p>&#x20B9;{roundAndFormat(interestEarned)}</p>
								</div>
								<hr />

								<div className="col-8 mt-2">
									<p>Annuity Amount</p>
								</div>
								<div className="col-4 mt-2">
									<p>&#x20B9;{roundAndFormat(annuityAmount)}</p>
								</div>
								<hr />

								<div className="col-8 mt-2">
									<p>Lumpsum</p>
								</div>
								<div className="col-4 mt-2">
									<p>&#x20B9;{roundAndFormat(lumpsum)}</p>
								</div>
								<hr />

								<div className="col-8 mt-2">
									<p>Monthly Pension</p>
								</div>
								<div className="col-4 mt-2">
									<p>&#x20B9;{roundAndFormat(pensionPerMonth)}</p>
								</div>
								<hr />

								<a
									type="button"
									href="https://onboard.northeastltd.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="btn btn-secondary btn-sm mx-auto mt-5"
								>
									Invest Now
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="d-md-flex container">
				<div className="col-12 col-md-9 calc-description">
					<p>
						Our NPS calculator is an online tool designed to help you estimate the potential retirement
						corpus and pension you can accumulate through the National Pension System. By considering
						your monthly investment, expected return rate, age, retirement age, purchase annuity
						percentage, and annuity rate, the calculator provides you with an accurate estimation of
						your pension wealth, lumpsum amount, and monthly pension.
					</p>

					<h4>How to Use the NPS Calculator</h4>
					<ol>
						<li>Determine Your Monthly Investment: Decide how much you can afford to invest in the NPS each month.</li>
						<li>Input the Expected Return Rate: Enter the expected annual return rate of your NPS investments.</li>
						<li>Set Your Current Age and Retirement Age: Specify your current age and the age at which you plan to retire.</li>
						<li>Enter the Purchase Annuity Percentage: Specify the percentage of your corpus that will be used to purchase an annuity.</li>
						<li>Input the Annuity Rate: Enter the annual annuity rate that you expect to receive after retirement.</li>
					</ol>

					<h4>Example NPS Calculations</h4>
					<p>
						Mr. X, a 21-year-old central government employee, participates in the National Pension Scheme. He opts to contribute
						Rs. 5,000 monthly towards the scheme. The NPS matures upon reaching 60 years of age for the subscriber. Accordingly,
						Mr. X will contribute for the subsequent 39 years until the scheme's maturity.
					</p>

					<p>
						Mr. X anticipates an annual return on investment (ROI) of 8%. Additionally, he intends to allocate 40% toward purchasing
						an annuity with an expected return rate of 6%.
					</p>

					<p>Upon retirement, the NPS calculator projects the status of Mr. A's pension account as follows:</p>
					<ul>
						<li>Total investment made throughout the period: ₹ 23,40,000</li>
						<li>Pension Wealth generated at retirement: ₹ 1,61,66,897</li>
						<li>Interest Earned at retirement: ₹ 1,38,26,897</li>
						<li>Annuity Amount at retirement: ₹ 64,66,759</li>
						<li>Lumpsum value of the corpus at retirement: ₹ 97,00,138</li>
						<li>Estimated monthly pension: ₹ 32,334</li>
					</ul>

					<h4>Benefits of Using an NPS Calculator</h4>
					<ul>
						<li>Estimate Retirement Corpus: Understand the future value of your NPS investments and the corpus you can accumulate by retirement.</li>
						<li>Informed Financial Decisions: Make better financial decisions based on potential returns and pension amounts.</li>
						<li>Retirement Planning: Plan your retirement effectively with a clear understanding of expected returns and pension amounts.</li>
						<li>Quick Results: Get quick results by simply inputting your monthly investment, return rate, age, and other parameters.</li>
					</ul>
				</div>

				<div className="col-12 col-md-3">
					<SimilarCalc />
				</div>
			</div>
		</div>
	);
};

export default NPSCalculator;