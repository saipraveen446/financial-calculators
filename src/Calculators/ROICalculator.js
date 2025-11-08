import React, { useEffect, useState } from "react";
import "../styles.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";
import SimilarCalc from "../SimilarCalc";

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
    ranges.forEach((range) => {
      updateRangeBackground(range);
    });

  }, [initialInvestment, duration,finalAmount]);

  const updateRangeBackground = (range) => {
    const value = range.value;
    const min = range.min;
    const max = range.max;
    const percentage = ((value - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #0A80A0 ${percentage}%, transparent ${percentage}%)`;
  };

  const calculateROI = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalAmount);
    const years = parseInt(duration);

    if (initial && final && years && years > 0) {
      const returns = final - initial;
      const roiValue = (returns / initial) * 100;
      const simpleAnnualROIValue = roiValue / years;
      const cagrValue = (Math.pow((final / initial), (1 / years)) - 1) * 100;

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
    labels: ['Total Investment', 'Total Returns'],
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
      <div className="card container rounded shadow border-0 p-4">
        <a href="/" className="back-button">
          <i className="bi bi-house"></i>
        </a>
        <div className="row pt-3">
          <h1 className="fs-17 fw-bold text-center">ROI Calculator</h1>
          <div className="col-12 col-md-6 p-3 pt-5">
            <div className="row">
              <div className="col-7 col-md-8">
                <label className="form-label">Initial Investment</label>
              </div>
              <div className="col-5 col-md-4">
                <div className="input-group">
                  <input className="form-control" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} />
                  <span className="input-group-text">&#x20B9;</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range" className="form-range custom-range mt-3" id="investmentRange" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} min="1000" max="1000000" />
                <div className="d-flex justify-content-between">
                  <span>&#x20B9;1000</span>
                  <span>&#x20B9;10,00,000</span>
                </div>
              </div>

              <div className="col-7 col-md-8 mt-4">
                <label className="form-label">Final Amount</label>
              </div>
              <div className="col-5 col-md-4 mt-4">
                <div className="input-group">
                  <input className="form-control" value={finalAmount} onChange={(e) => setFinalAmount(e.target.value)} />
                  <span className="input-group-text">&#x20B9;</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range" className="form-range custom-range mt-3" id="finalamtRange" value={finalAmount} onChange={(e) => setFinalAmount(e.target.value)} min="1000" max="1000000" />
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
              {roi !== null && simpleAnnualROI !== null && cagr !== null &&(
                <div className="row fs-17 fw-bold">
                  <label className="">Total value of your investment</label>
                  <div className="py-3 d-flex justify-content-center"><Doughnut data={data} options={options} /></div>
                  <hr />

                  <div className="col-8 mt-2">
                    <p>Estimated Returns</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>{"\u20B9"}{roundAndFormat(estimateReturns)}</p>
                  </div>
                  <hr></hr>

                  <div className="col-8 mt-2">
                    <p>Total ROI</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>{roi}%</p>
                  </div>
                  <hr />

                  <div className="col-8 mt-2">
                    <p>Simple Annual ROI</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>{simpleAnnualROI}%</p>
                  </div>
                  <hr/>

                  <div className="col-8 mt-2">
                    <p>Compound Annual Growth Rate (CAGR)</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>{cagr.toFixed(2)}%</p>
                  </div>

                  <a type="button" href="https://onboard.northeastltd.com/" target="blank" className="btn btn-secondary btn-sm mx-auto mt-5">Invest Now</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      <div className="d-md-flex container">
        <div className="col-12 col-md-8 calc-description  ">
          <h4>ROI Calculator:</h4>
          <p>Our Return on Investment (ROI) Calculator helps you determine the profitability of an investment. By calculating the ROI, you can assess the efficiency of your investments and make informed financial decisions.</p>

          <h4>How to Use:</h4>
          <ol>
            <li>Initial Investment: Enter the initial amount invested.</li>
            <li>Final Value: Input the final value of the investment after the specified period.</li>
            <li>Time Period: Specify the duration of the investment.</li>
          </ol>

          <h4>Formula for ROI Calculation:</h4>
          <p>{`ROI = [(Final Value - Initial Investment) / Initial Investment] * 100`}</p>
          <p>ROI = Return on Investment</p>
          <p>Final Value = Value of the investment at the end of the period</p>
          <p>Initial Investment = Principal amount invested</p>

          <h4>Example Calculation:</h4>
          <p>If you invest Rs. 10,000 and after 3 years the investment's value is Rs. 15,000, the ROI would be:
          ROI = [(15,000 - 10,000) / 10,000] * 100 = 50%</p>

        </div>

        <div className="col-12 col-md-4  ">         
          <SimilarCalc /> 
        </div>

      </div>
    </div>
  );
};

export default ROICalculator;

