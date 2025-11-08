import React, { useEffect, useState } from "react";
import "../styles.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";
import SimilarCalc from "../SimilarCalc";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const InterestCalculator = () => {
  const [principalAmount, setPrincipalAmount] = useState(10000);
  const [duration, setDuration] = useState(5);
  const [interestRate, setInterestRate] = useState(6);
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

  }, [principalAmount, duration,interestRate]);

  const updateRangeBackground = (range) => {
    const value = range.value;
    const min = range.min;
    const max = range.max;
    const percentage = ((value - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #0A80A0 ${percentage}%, transparent ${percentage}%)`;
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
    labels: ['Total Investment', 'Total Interest'],
    datasets: [
      {
        data: [roundNumber(totalInvestment), roundNumber(estimateReturns)],
        backgroundColor: ['#19B797', '#0A80A0'],
        hoverBackgroundColor: ['#19B797', '#0A80A0'],
      },
    ],
  };

  const options = {
    cutout: '70%',
    responsive: false,
    radius: "100%",
    plugins: {
      legend: {
        position: 'right',
        align: 'center',
        labels: {
          font: {
            size: 11
          },
          boxWidth: 20,
        }
      },
    },
  };

  return (
    <div className="main-content position-relative">
      <div className="card container rounded   p-4">
        <a href="/" class="back-button">
          <i class="bi bi-house"></i>
        </a>
        <div className="row pt-3">
          <h1 className="fs-17 fw-bold text-center">Interest Calculator</h1>
          <div className="col-12 col-md-6 p-3 pt-5">
            <div className="row">
              <div className="col-12 radio-group mb-3">
                <input type="radio" name="calculatorType" id="simpleInterest" value="simple" checked={calculatorType === "simple"} onChange={(e) => setCalculatorType(e.target.value)} />
                <label htmlFor="simpleInterest">Simple Interest</label>
                <input  type="radio"   name="calculatorType" id="compoundInterest" value="compound" checked={calculatorType === "compound"} onChange={(e) => setCalculatorType(e.target.value)}  />
                <label htmlFor="compoundInterest">Compound Interest</label>
               
              </div>

              <div className=" col-7 col-md-8">
                <label className="form-label">Principal Amount</label>
              </div>
              <div className=" col-5 col-md-4">
                <div className="input-group">
                  <input className="form-control" value={principalAmount} onChange={(e) => setPrincipalAmount(e.target.value)} />
                  <span className="input-group-text">&#x20B9;</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range" className="form-range custom-range mt-3"  id="amountRange" value={principalAmount} onChange={(e) => setPrincipalAmount(e.target.value)} min="1000" max="1000000" />
                <div className="d-flex justify-content-between">
                  <span>&#x20B9;1000</span>
                  <span>&#x20B9;10,00,000</span>
                </div>
              </div>

              <div className="col-7 col-md-8 mt-4">
                <label className="form-label">Duration (in years)</label>
              </div>
              <div className="col-5 col-md-4 mt-4">
                <div className="input-group">
                  <input className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />
                  <span className="input-group-text">Yrs</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range" className="form-range custom-range mt-3" id="durationRange"  value={duration} onChange={(e) => setDuration(e.target.value)} min="1" max="30" />
                <div className="d-flex justify-content-between">
                  <span>1 yr</span>
                  <span>30 yrs</span>
                </div>
              </div>

              <div className="col-7 col-md-8 mt-4">
                <label className="form-label">Interest Rate (Annual %)</label>
              </div>
              <div className="col-5 col-md-4 mt-4">
                <div className="input-group">
                  <input className="form-control" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                  <span className="input-group-text">%</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range" className="form-range custom-range mt-3" id="interestRange" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} min="1" max="50" />
                <div className="d-flex justify-content-between">
                  <span>1%</span>
                  <span>50%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-4 p-3">
            <div className="card result-section p-4">
              {maturityAmount && (
                <div className="row fs-17 fw-bold">
                  <label className="">Total value of your investment</label>
                  <div className="py-3 d-flex justify-content-center"><Doughnut data={data} options={options} /></div>
                  <hr />

                  <div className="col-8 mt-2">
                    <p>Principal Amount</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>{"\u20B9"}{roundAndFormat(totalInvestment)}</p>
                  </div>
                  <hr></hr>

                  <div className="col-8 mt-2">
                    <p>Total interest</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>{"\u20B9"}{roundAndFormat(estimateReturns)}</p>
                  </div>
                  <hr></hr>

                  <div className="totalreturns d-flex ms-2">
                    <div className="col-8 mt-2">
                      <p>Total Amount</p>
                    </div>
                    <div className="col-4 mt-2">
                      <p>{"\u20B9"}{roundAndFormat(maturityAmount)}</p>
                    </div>
                  </div>

                  <a type="button" href="https://onboard.northeastltd.com/" target="blank" className=" btn btn-secondary btn-sm mx-auto mt-5">Invest Now</a>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      <div className="d-md-flex container">
        <div className="col-12 col-md-9 calc-description  ">

        <h4>Simple Interest Calculator:</h4>
        <p>Our Simple Interest Calculator helps you determine the interest accrued on a principal amount over a specified time period. It's a handy tool for calculating the interest on loans or investments where the interest is calculated only on the principal amount.</p>

        <h4>How to Use:</h4>
        <ol>
          <li>Principal Amount: Enter the initial amount.</li>
          <li>Interest Rate: Input the annual interest rate.</li>
          <li>Time Period: Specify the duration in years.</li>
        </ol>

        <h4>Formula for Simple interest Calculation</h4>
        <p >{`SI= P * R* T/100`}</p>
          <p>SI = SImple Interest</p>
          <p>P = principal amount</p>
          <p>R = Rate of interest</p>
          <p>T = Time</p>
       


        <h4>Example Calculation:</h4>
        <p>If you  invested an amount of Rs. 15000 at an interest rate of 5% for almost 2 years. So his SI will be calculated as Rs. (15000 X 5 X 2/100) which is equal to Rs.16500.</p>

        <h4>Compound Interest Calculator:</h4>
        <p>Our Compound Interest Calculator helps you estimate the growth of your investment or loan over time, taking into account the compounding of interest. It's useful for understanding how your money can grow exponentially over time.</p>

        <h4>How to Use:</h4>
        <ol>
          <li>Principal Amount:Enter the initial amount.</li>
          <li>Interest Rate:Input the annual interest rate.</li>
          <li>Time Period:Specify the duration in years.</li>
        </ol>

        <h4>Formula for Compound interest Calculation</h4>
        <p>{`A = P (1 + r/n) ^ nt`}</p>
        <p>A = Compound Interest</p>
          <p>P = principal amount</p>
          <p>r = Rate of interest</p>
          <p>t = Number of years</p>
          <p>n = Number of compounded interests in a year</p>
       
       
        <h4>Example Calculation:</h4>
        <p>If you  invest Rs. 50,000 with an annual interest rate of 10% for 5 years, total interest is 30,526 and  the total amount is 80,526 </p>

        </div>

        <div className="col-12 col-md-3  ">         
          <SimilarCalc /> 
        </div>

      </div>
    </div>
  );
};

export default InterestCalculator;
