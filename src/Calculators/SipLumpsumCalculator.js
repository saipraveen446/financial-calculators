import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";
import SimilarCalc from "../SimilarCalc";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const SipLumpsumCalculator = () => {
  const [investmentType, setInvestmentType] = useState("sip");
  const [principalAmount, setPrincipalAmount] = useState(10000); // For Lump Sum
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000); // For SIP
  const [duration, setDuration] = useState(5); // Duration in years
  const [interestRate, setInterestRate] = useState(12); // Annual interest rate
  const [maturityAmount, setMaturityAmount] = useState(null);
  const [totalInvestment, setTotalInvestment] = useState(null);
  const [estimateReturns, setEstimateReturns] = useState(null);

  useEffect(() => {
    calculateInvestment();
  }, [investmentType, principalAmount, monthlyInvestment, duration, interestRate]);


  useEffect(() => {
    const ranges = document.querySelectorAll(".custom-range");
    ranges.forEach((range) => {
      updateRangeBackground(range);
    });
  }, [investmentType, monthlyInvestment, principalAmount, duration, interestRate]);


  const updateRangeBackground = (range) => {
    const value = range.value;
    const min = range.min;
    const max = range.max;
    const percentage = ((value - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #0A80A0 ${percentage}%, transparent ${percentage}%)`;
  };


  const calculateInvestment = () => {
    const years = parseInt(duration);
    const rate = parseFloat(interestRate) / 100;
    let totalInvested, maturityValue;

    if (investmentType === "sip") {
      const months = years * 12;
      const monthlyRate = rate / 12;
      totalInvested = monthlyInvestment * months;
      maturityValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      const principal = parseFloat(principalAmount);
      totalInvested = principal;
      maturityValue = principal * Math.pow(1 + rate / 1, 1 * years); // Annual compounding
    }

    const interestEarned = maturityValue - totalInvested;
    setMaturityAmount(maturityValue);
    setTotalInvestment(totalInvested);
    setEstimateReturns(interestEarned);
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
    labels: ["Total Investment", "Total Interest"],
    datasets: [
      {
        data: [roundNumber(totalInvestment), roundNumber(estimateReturns)],
        backgroundColor: ["#19B797", "#0A80A0"],
        hoverBackgroundColor: ["#19B797", "#0A80A0"],
      },
    ],
  };

  const options = {
    cutout: "70%",
    responsive: false,
    radius: "100%",
    plugins: {
      legend: {
        position: "right",
        align: "center",
        labels: {
          font: {
            size: 11,
          },
          boxWidth: 20,
        },
      },
    },
  };

  return (
    <div className="main-content position-relative">
      <div className="card container rounded  p-4">
      <a href="/" class="back-button">
          <i class="bi bi-house"></i>
        </a>
        <div className="row pt-3">
          <h1 className="fs-17 fw-bold text-center">SIP/LUMPSUM MF Calculator</h1>
          <div className="col-12 col-md-6 p-3 pt-5">
            <div className="row">
              {/* <div className="col-8">
                <label className="form-label">Investment Type</label>
              </div> */}
              <div className="col-12 radio-group">
                <input type="radio"  id="sip"  name="investmentType"  value="sip"  checked={investmentType === "sip"}  onChange={(e) => setInvestmentType(e.target.value)}  />
                <label htmlFor="sip">SIP</label>
                <input  type="radio"  id="lumpsum" name="investmentType"  value="lumpsum"  checked={investmentType === "lumpsum"}  onChange={(e) => setInvestmentType(e.target.value)} />
                <label htmlFor="lumpsum">Lump Sum</label>
              </div>
              {investmentType === "sip" ? (
                <>
                  <div className=" col-7 col-md-8 mt-4">
                    <label className="form-label">Monthly Investment</label>
                  </div>
                  <div className="col-5 col-md-4 mt-4">
                    <div className="input-group">
                      <input  className="form-control"  value={monthlyInvestment}  onChange={(e) => setMonthlyInvestment(e.target.value)}  />
                      <span className="input-group-text">&#x20B9;</span>
                    </div>
                  </div>
                  <div className="col-12">
                    <input type="range" className="form-range custom-range mt-3" id="monthlyinvestmentRange" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)}  min="500" max="100000"  />
                    <div className="d-flex justify-content-between">
                      <span>&#x20B9;500</span>
                      <span>&#x20B9;1,00,000</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className=" col-7 col-md-8 mt-4">
                    <label className="form-label">Total Investment</label>
                  </div>
                  <div className="col-5 col-md-4 mt-4">
                    <div className="input-group">
                      <input  className="form-control"  value={principalAmount}  onChange={(e) => setPrincipalAmount(e.target.value)}  />
                      <span className="input-group-text">&#x20B9;</span>
                    </div>
                  </div>
                  <div className="col-12">
                    <input  type="range" className="form-range custom-range mt-3" id="yearlyinvestmentRange" value={principalAmount}   onChange={(e) => setPrincipalAmount(e.target.value)}  min="1000"  max="1000000"  />
                    <div className="d-flex justify-content-between">
                      <span>&#x20B9;1000</span>
                      <span>&#x20B9;10,00,000</span>
                    </div>
                  </div>
                </>
              )}

              <div className=" col-7 col-md-8 mt-4">
                <label className="form-label">Duration (in years)</label>
              </div>
              <div className="col-5 col-md-4 mt-4">
                <div className="input-group">
                  <input  className="form-control" value={duration}  onChange={(e) => setDuration(e.target.value)}  />
                  <span className="input-group-text">Yrs</span>
                </div>
              </div>
              <div className="col-12">
                <input  type="range" className="form-range custom-range mt-3"  id="durationRange" value={duration} onChange={(e) => setDuration(e.target.value)} min="1"  max="30" />
                <div className="d-flex justify-content-between">
                  <span>1 yr</span>
                  <span>30 yrs</span>
                </div>
              </div>

              <div className=" col-7 col-md-8 mt-4">
                <label className="form-label">Interest Rate (Annual %)</label>
              </div>
              <div className="col-5 col-md-4 mt-4">
                <div className="input-group">
                  <input  className="form-control" value={interestRate}  onChange={(e) => setInterestRate(e.target.value)} />
                  <span className="input-group-text">%</span>
                </div>
              </div>
              <div className="col-12">
                <input  type="range" className="form-range custom-range mt-3" id="interestRange" value={interestRate}  onChange={(e) => setInterestRate(e.target.value)}  min="1"  max="20"  />
                <div className="d-flex justify-content-between">
                  <span>1%</span>
                  <span>20%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-4 p-3">
            <div className="card result-section  p-4">
              {maturityAmount && (
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
                  
                  <a type="button"  href="https://onboard.northeastltd.com/"  target="blank"  className=" btn btn-secondary btn-sm mx-auto mt-5">  Invest Now </a>

                </div>
              )}
            </div>
          </div>
        </div>


      </div>

      <div className="d-md-flex container   ">

      <div className="col-12 col-md-9 calc-description  ">
          <h3>Systematic Investment Plan Calculator </h3>
          <p>
            Our SIP calculator helps you estimate the future value of your investments made through a Systematic Investment Plan (SIP). By considering your monthly investment amount, expected rate of return, and investment duration, the calculator provides an accurate estimation of the maturity amount and returns earned.
            <br />
            This tool is particularly beneficial for those planning to invest regularly in mutual funds but unsure about the potential returns. It offers clarity on the future value of your investments, aiding in informed financial decisions and efficient savings planning.
          </p>
          <h4>How to Use the SIP Calculator</h4>
          <ol>
            <li>Determine Your Monthly Investment: Decide how much you can afford to invest monthly.</li>
            <li>Input the Expected Rate of Return: Enter the annual expected rate of return on your investments.</li>
            <li>Set the Duration: Input the number of years you plan to invest.</li>
          </ol>

          <h4>Formula for SIP Calculation</h4>
          <p>The maturity amount in an SIP is calculated using the formula:</p>
          <p className="formula">{`M = P *({[1 + i]^n - 1} / i) * (1 + i)`}</p>
          <p>M = Maturity amount</p>
          <p>P = Monthly investment amount</p>
          {/* <p>r = Annual interest rate</p> */}
          <p>i =  Monthly interest rate (annual rate / 12)</p>
          <p>n= Number of months</p>

          <p>
            Let's consider an example where you plan to invest Rs. 5,000 monthly for a period of 12 months at an annual interest rate of 12%. The maturity sum at the end of the period will be equal to Rs. 64,047:
          </p>

          <p className="formula">{`M = 5,000X ({[1 +0.01 ]^{12} – 1} / 0.01) x (1 + 0.01)`}=64,047</p>

          <h4>Advantages of SIP (Systematic Investment Plan)</h4>
          <ul>
            <li>Easy and Regular Investing: SIP makes investing simple by allowing you to invest regularly without worrying about market timing. It's like a recurring deposit for your investments.</li>
            <li>Better Returns with Less Risk: SIPs use a strategy called rupee cost averaging. This means you buy more units when prices are low and fewer units when prices are high, reducing the average cost of your investment over time.</li>
            <li>Start Small, Grow Big: You can start investing in SIPs with as little as ₹500 per month. This makes it easy for anyone to start investing and gradually increase their investment over time.</li>
            <li>Expert Management and Diversification: SIPs invest in mutual funds, which are managed by professional fund managers. These managers spread your investment across different companies and sectors, reducing risk.</li>
          </ul>
        

          <h3>Lump sum Calculator</h3>
          <p>
          Our Lump Sum calculator helps you estimate the future value of a one-time investment. By considering your initial investment amount, expected rate of return, and investment duration, the calculator provides an accurate estimation of the maturity amount and returns earned.
          </p>
          <p>
          This tool is beneficial for those looking to invest a lump sum amount but unsure about the potential returns. It offers clarity on the future value of your investments, aiding in informed financial decisions and efficient savings planning.
          </p>

          <h4>How to Use the SIP Calculator</h4>
          <ol>
            <li>Input Your Initial Investment: Enter the amount you are planning to invest as a lump sum.</li>
            <li>Expected Rate of Return: Enter the annual expected rate of return on your investment.</li>
            <li>Set the Duration: Input the number of years you plan to invest.</li>
          </ol>

          <h4>Formula for SIP Calculation</h4>
          <p>The maturity amount in an SIP is calculated using the formula:</p>
          <p className="formula">{`A = P (1 + r/n) ^ nt`}</p>
          <p>A = Estimated Returns</p>
          <p>P = Monthly investment amount</p>
          <p>r = Return rate</p>
          <p>t = Duration of investment</p>
          <p>n= Number of compounded interests in a year</p>

          <p>
            Let's consider an example where you plan to invest Rs. 15, 00,000 for a period of 5 years at retuns of 12%. The maturity sum at the end of the period will be equal to Rs. 26, 43, 513:
          </p>

          <p className="formula">{`A =  Rs. 15, 00,000 (1 + 12%) ^ 5`}=26,43,513</p>

          <h4>Advantages of  Lump Sum Investments</h4>
          <ul>
            <li>Immediate Investment: You can invest a large sum of money upfront, which can potentially lead to higher returns compared to regular investments.</li>
            <li>No Commitment to Regular Payments: Unlike SIPs, where you need to invest regularly, lump sum investments require only a one-time commitment.</li>
            <li>Greater Potential for Growth: Lump sum investments have a longer time to grow compared to investments made over time through SIPs.</li>
            <li>Tax Benefits: Depending on the investment, lump sum investments may offer tax benefits or deductions.</li>
          </ul>
       

        </div>

        <div className="col-12 col-md-3  ">        
          <SimilarCalc />    
        </div>

      </div>

     
    </div>
  );
};




export default SipLumpsumCalculator;
