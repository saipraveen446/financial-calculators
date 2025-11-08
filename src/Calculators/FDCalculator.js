import React, { useEffect, useState } from "react";
import "../styles.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";
import SimilarCalc from "../SimilarCalc";

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

  }, [principalAmount, duration,interestRate]);

  const updateRangeBackground = (range) => {
    const value = range.value;
    const min = range.min;
    const max = range.max;
    const percentage = ((value - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #0A80A0 ${percentage}%, transparent ${percentage}%)`;
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
        data: [roundNumber(totalInvestment), roundNumber(estimateReturns )],
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
      <div className="card container rounded shadow border-0 p-4">
      <a href="/" class="back-button">
          <i class="bi bi-house"></i>
        </a>
        <div className="row pt-3">
          <h1 className="fs-17 fw-bold text-center">FD Calculator</h1>
          <div className="col-12 col-md-6 p-4 pt-5">
            <div className="row">
              <div className=" col-6 col-md-8">
                <label className="form-label">Principal Amount</label>
              </div>
              <div className="col-6 col-md-4">
                <div className="input-group">
                  <input className="form-control" value={principalAmount} onChange={(e) => setPrincipalAmount(e.target.value)} />
                  <span className="input-group-text">&#x20B9;</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range" className="form-range custom-range mt-3" id="investmentRange" value={principalAmount} onChange={(e) => setPrincipalAmount(e.target.value)} min="1000" max="1000000" />
                <div className="d-flex justify-content-between">
                  <span>&#x20B9;1000</span>
                  <span>&#x20B9;10,00,000</span>
                </div>
              </div>

              <div className=" col-7 col-md-8 mt-4">
                <label className="form-label">Duration (in years)</label>
              </div>
              <div className="col-5 col-md-4 mt-4">
                <div className="input-group">
                  <input className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />
                  <span className="input-group-text">Yrs</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range" className="form-range custom-range mt-3" id="durationRange" value={duration} onChange={(e) => setDuration(e.target.value)} min="1" max="10" />
                <div className="d-flex justify-content-between">
                  <span>1 yr</span>
                  <span>25 yrs</span>
                </div>
              </div>

              <div className=" col-7 col-md-8 mt-4">
                <label className="form-label">Interest Rate (Annual %)</label>
              </div>
              <div className="col-5 col-md-4 mt-4">
                <div className="input-group">
                  <input className="form-control" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                  <span className="input-group-text">%</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range" className="form-range custom-range mt-3" id="interestRange" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} min="1" max="15" />
                <div className="d-flex justify-content-between">
                  <span>1%</span>
                  <span>15%</span>
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
                    <p>Investment Amount</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>{"\u20B9"}{roundAndFormat(totalInvestment)}</p>
                  </div>
                  <hr></hr>

                  <div className="col-8 mt-2">
                    <p>Estimated Returns</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>{"\u20B9"}{roundAndFormat(estimateReturns)}</p>
                  </div>
                  <hr></hr>


                  <div className="totalreturns d-flex ms-2">
                    <div className="col-8 mt-2">
                      <p>Total Returns</p>
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
        <div className="col-12 col-md-9 calc-description ">
          <p>
            Our FD calculator is an online tool designed to help you estimate the potential returns on your fixed deposit investments. By considering your investment amount, interest rate, and investment duration, the calculator provides you with an accurate estimation of the maturity amount and interest earned over a specified period.
            <br></br>
            This tool is particularly beneficial for those planning to invest in fixed deposits but unsure about the investment amount or the expected returns. It offers clarity on the future value of your investments, aiding in informed financial decisions and efficient savings planning.
          </p>
          <h4>How to Use the FD Calculator</h4>
          <ol>
            <li>Determine Your Investment Amount: Decide how much you can afford to invest in a fixed deposit.</li>
            <li>Input the Interest Rate: Enter the prevalent fixed deposit interest rate.</li>
            <li>Set the Duration: Specify the duration for which you want to invest in the fixed deposit.</li>
          </ol>
          
          <h4>Formula for Compound Interest FD Calculation</h4>
          <p>The maturity amount in a fixed deposit account is calculated using the formula:</p>
          <p>M = P * (1 + r/n)^(n*t)</p>
          <p>Where:</p>
          <p>M = Maturity amount</p>
          <p>P = Principal amount </p>
          <p>r = rate of interest</p>
          <p>t = Number of years </p>
          <p>n = Number of compounded interests in a year</p>
          
          
          <p>For example, if you invest Rs. 10,000 in a fixed deposit for a period of 3 years at an annual interest rate of 10%, then your maturity amount will be: Rs. 13,449 </p>
           <p>M = 10,000 [1+ (0.10/4)] ^ (4*3)</p>
          <p>M= 10,000 (1 + 0.025) ^ (12) = 13,449</p>
         
          <h4>Benefits of Using an FD Calculator</h4>
          <ul>
            <li>Estimate Future Value: Understand the future value of your fixed deposit investments.</li>
            <li>Informed Financial Decisions: Make better financial decisions based on potential returns.</li>
            <li>Savings Planning: Plan your savings effectively with a clear understanding of expected returns.</li>
            <li>Quick Results: Get quick results by simply inputting your investment amount, interest rate, and investment duration.</li>
          </ul>
        </div>


        <div className="col-12 col-md-3  ">
          
          <SimilarCalc />
        
        </div>


      </div>
    </div>
  );
};

export default FDCalculator;




