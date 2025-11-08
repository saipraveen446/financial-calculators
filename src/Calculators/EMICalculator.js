import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";
import "../styles.css";
import SimilarCalc from "../SimilarCalc";
import 'bootstrap-icons/font/bootstrap-icons.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [duration, setDuration] = useState(2); // Tenure in years
  const [interestRate, setInterestRate] = useState(5); // Annual interest rate in percentage
  const [emi, setEMI] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayable, setTotalPayable] = useState(null);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, duration, interestRate]);

  useEffect(() => {
    const ranges = document.querySelectorAll(".custom-range");
    ranges.forEach((range) => {
      updateRangeBackground(range);
    });

  }, [loanAmount, duration,interestRate]);

  const updateRangeBackground = (range) => {
    const value = range.value;
    const min = range.min;
    const max = range.max;
    const percentage = ((value - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #0A80A0 ${percentage}%, transparent ${percentage}%)`;
  };

  const calculateEMI = () => {

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    const n = parseInt(duration) * 12; // Loan tenure in months

    const emiValue = (principal * rate * (1 + rate) ** n) / (((1 + rate) ** n) - 1);
    const totalPayment = emiValue * n;
    const interest = totalPayment - principal;

    setEMI(emiValue);
    setTotalPayable(totalPayment);
    setTotalInterest(interest);
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
    labels: ['Total Loan Amount', 'Total Interest'],
    datasets: [
      {
        data: [roundNumber(loanAmount), roundNumber(totalInterest)],
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
       
          <h1 className="fs-17 fw-bold text-center">EMI Calculator</h1>
          <div className="col-12 col-md-6 p-3 pt-5">
            <div className="row">
              <div className=" col-7 col-md-8">
                <label className="form-label">Loan Amount</label>
              </div>
              <div className="col-5 col-md-4">
                <div className="input-group">
                  <input className="form-control" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
                  <span className="input-group-text">&#x20B9;</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range" className="form-range custom-range mt-3" id="loanRange" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} min="1000" max="1000000" />
                <div className="d-flex justify-content-between">
                  <span>&#x20B9;1000</span>
                  <span>&#x20B9;10,00,000</span>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className=" col-7 col-md-8">
                <label className="form-label">Rate of interest(p.a)</label>
              </div>
              <div className="col-5 col-md-4">
                <div className="input-group">
                  <input className="form-control" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                  <span className="input-group-text">%</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range" className="form-range custom-range mt-3" id="interestRange" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} min="1" max="30" />
                <div className="d-flex justify-content-between">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

            </div>

            <div className="row mt-4">
              <div className=" col-7 col-md-8">
                <label className="form-label">Loan Tenure (in years)</label>
              </div>
              <div className="col-5 col-md-4">
                <div className="input-group">
                  <input className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />
                  <span className="input-group-text">Yrs</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range" className="form-range custom-range mt-3" id="durationRange" value={duration} onChange={(e) => setDuration(e.target.value)} min="1" max="30" />
                <div className="d-flex justify-content-between">
                  <span>1 yr</span>
                  <span>30 yrs</span>
                </div>
              </div>
            </div>

            
          </div>

          <div className="col-12 col-md-6 mb-4 p-3">
            <div className="card result-section p-4">
              {emi && (
                <div className="row fs-17 fw-bold">
                  <label className="">Total Payment Details</label>
                  <div className="py-3 d-flex justify-content-center"><Doughnut data={data} options={options} /></div>
                  <hr />

                  <div className="col-8 mt-2">
                    <p>Monthly EMI</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>{"\u20B9"}{roundAndFormat(emi)}</p>
                  </div>
                  <hr></hr>

                  <div className="col-8 mt-2">
                    <p>Principal Amount</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>{"\u20B9"}{roundAndFormat(loanAmount)}</p>
                  </div>
                  <hr></hr>

                  <div className="col-8 mt-2">
                    <p>Total Interest</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>{"\u20B9"}{roundAndFormat(totalInterest)}</p>
                  </div>
                  <hr></hr>

                  <div className="totalreturns d-flex ms-2">
                    <div className="col-8 mt-2">
                      <p>Total Payment</p>
                    </div>
                    <div className="col-4 mt-2">
                      <p>{"\u20B9"}{roundAndFormat(totalPayable)}</p>
                    </div>

                  </div>
                  
                  {/* <a type="button" href="https://onboard.northeastltd.com/" target="blank" className=" btn btn-secondary btn-sm mx-auto mt-5">Invest Now</a> */}

                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      <div className="d-md-flex container">
        <div className="col-12 col-md-9 calc-description ">
          <p>
            Our EMI calculator is a useful tool designed to help you estimate your monthly installment for a loan. By considering the loan amount, interest rate, and tenure, the calculator provides you with an accurate estimation of the EMI amount, helping you plan your finances effectively.
            <br></br>
            This tool is particularly beneficial for individuals planning to take a loan but unsure about the monthly repayment amount. It offers clarity on the financial commitment required for the loan, aiding in informed decision-making and efficient budget planning.
          </p>
          <h4>How to Use the EMI Calculator</h4>
          <ol>
            <li>Enter Loan Amount: Input the total amount you wish to borrow.</li>
            <li>Input the Interest Rate: Enter the annual interest rate applicable to your loan.</li>
            <li>Set the Loan Tenure: Specify the duration over which you intend to repay the loan.</li>
          </ol>
          <h4>Formula for EMI Calculation</h4>
          <p>The EMI for a loan can be calculated using the formula:</p>
          <p>EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]</p>
          <p>Where:</p>
          <p>EMI = Equated Monthly Installment</p>
          <p>P = Loan amount (principal)</p>
          <p>r = Monthly interest rate (annual rate / 12)</p>
          <p>n = Loan tenure in months</p>
          <p>For example, if you borrow Rs. 1,00,000 for a period of 5 years at an annual interest rate of 10%, then your monthly EMI will be:</p>
          <p>EMI = [1,00,000 x 0.008333 x (1+0.008333)^60] / [(1+0.008333)^60 - 1] = Rs. 2,125</p>
          <h4>Benefits of Using an EMI Calculator</h4>
          <ul>
            <li>Accurate Estimation: Get a precise estimate of your monthly installment, aiding in budget planning.</li>
            <li>Financial Planning: Plan your finances effectively by knowing the exact amount you need to set aside for loan repayment.</li>
            <li>Comparison: Compare different loan options based on EMI amounts to choose the most suitable one.</li>
            <li>Time-Saving: Save time by quickly calculating your EMI online, without the need for manual calculations.</li>
          </ul>
        </div>


        <div className="col-12 col-md-3  ">
          
          <SimilarCalc />
        
        </div>


      </div>
    </div>
  );
};

export default EMICalculator;

