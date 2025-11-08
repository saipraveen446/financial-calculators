import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";
import SimilarCalc from "../SimilarCalc";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const HRACalculator = () => {
  const [basicSalary, setBasicSalary] = useState(540000);
  const [dearnessAllowance, setDearnessAllowance] = useState(0);
  const [hraPercentage, setHraPercentage] = useState(100000);
  const [rentPaid, setRentPaid] = useState(300000);
  const [metroCity, setMetroCity] = useState(false);
  const [exemptHRA, setExemptHRA] = useState("");
  const [taxableHRA, setTaxableHRA] = useState("");

  useEffect(() => {
    calculateHRA();
  }, [basicSalary, hraPercentage, rentPaid, metroCity, dearnessAllowance]);

  useEffect(() => {
    const ranges = document.querySelectorAll(".custom-range");
    ranges.forEach((range) => {
      updateRangeBackground(range);
    });
  }, [basicSalary, hraPercentage, rentPaid, dearnessAllowance]);

  const updateRangeBackground = (range) => {
    const value = range.value;
    const min = range.min;
    const max = range.max;
    const percentage = ((value - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #0A80A0 ${percentage}%, transparent ${percentage}%)`;
  };

  const calculateHRA = () => {
    const salary = parseFloat(basicSalary)+parseFloat(dearnessAllowance);
    const hra = parseFloat(hraPercentage);
    const rent = parseFloat(rentPaid);
    // const dearness = parseFloat(dearnessAllowance);
    const metroMultiplier = metroCity ? 0.50 : 0.40;
    const rentMinus10PercentBasic = rent - (0.10 * salary);

    const hraExempt = Math.min( hra, metroMultiplier * salary, rentMinus10PercentBasic);
    const hraTaxable = hra - hraExempt;


    setExemptHRA(hraExempt);
    setTaxableHRA(hraTaxable);

    // console.log(hraExempt);
    // console.log(hraTaxable);
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
    labels: ["Exempt HRA", "Taxable HRA"],
    datasets: [
      {
        data: [roundNumber(exemptHRA), roundNumber(taxableHRA)],
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
      <div className="card container rounded shadow border-0 p-4">
      <a href="/" class="back-button">
          <i class="bi bi-house"></i>
        </a>                                  
        <div className="row pt-3">
          <h1 className="fs-17 fw-bold text-center">HRA Calculator</h1>
          <div className="col-12 col-md-6 p-3 pt-5">
            <div className="row">
              <div className="col-7 col-md-8">
                <label className="form-label">Basic Salary(p.a)</label>
              </div>
              <div className="col-5 col-md-4">
                <div className="input-group">
                  <input className="form-control"  value={basicSalary}   onChange={(e) => setBasicSalary(e.target.value)}    />
                  <span className="input-group-text">&#x20B9;</span>
                </div>
              </div>
              <div className="col-12">
                <input
                  type="range"  className="form-range custom-range mt-3"  value={basicSalary}  onChange={(e) => setBasicSalary(e.target.value)}
                  min="10000"
                  max="2500000"
                />
                <div className="d-flex justify-content-between">
                  <span>&#x20B9;10,000</span>
                  <span>&#x20B9;25,00,0000</span>
                </div>
              </div>

              <div className="col-7 col-md-8 mt-4">
                <label className="form-label">Dearness Allowance</label>
              </div>
              <div className="col-5 col-md-4 mt-4">
                <div className="input-group">
                  <input className="form-control"  value={dearnessAllowance}  onChange={(e) => setDearnessAllowance(e.target.value)}  />
                  <span className="input-group-text">&#x20B9;</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range"  className="form-range custom-range mt-3"  value={dearnessAllowance}  onChange={(e) => setDearnessAllowance(e.target.value)}  min="10000"  max="2500000"  />
                <div className="d-flex justify-content-between">
                 <span>&#x20B9;10,000</span>
                  <span>&#x20B9;25,00,0000</span>
                </div>
              </div>

              <div className="col-7 col-md-8 mt-4">
                <label className="form-label">HRA Received</label>
              </div>
              <div className="col-5 col-md-4 mt-4">
                <div className="input-group">
                  <input  className="form-control"  value={hraPercentage}  onChange={(e) => setHraPercentage(e.target.value)}  />
                  <span className="input-group-text">&#x20B9;</span>
                </div>
              </div>
              <div className="col-12">
                <input  type="range"  className="form-range custom-range mt-3"  value={hraPercentage}  onChange={(e) => setHraPercentage(e.target.value)}  min="10000"  max="2500000"  />
                <div className="d-flex justify-content-between">
                 <span>&#x20B9;10,000</span>
                  <span>&#x20B9;25,00,0000</span>
                </div>
              </div>

              <div className="col-7 col-md-8 mt-4">
                <label className="form-label">Rent Paid</label>
              </div>
              <div className="col-5 col-md-4 mt-4">
                <div className="input-group">
                  <input  className="form-control"  value={rentPaid}  onChange={(e) => setRentPaid(e.target.value)}  />
                  <span className="input-group-text">&#x20B9;</span>
                </div>
              </div>
              <div className="col-12">
                <input  type="range"  className="form-range custom-range mt-3"  value={rentPaid}  onChange={(e) => setRentPaid(e.target.value)}  min="10000"  max="2500000"  />
                <div className="d-flex justify-content-between">
                  <span>&#x20B9;10,000</span>
                  <span>&#x20B9;25,00,0000</span>
                </div>
              </div>


              <div className="col-7 mt-4">
                <label className="form-label">Working in Metro City</label>
              </div>

              <div className="col-5 radio-group">
                <input type="radio"  name="metroCity"  id="metroCityYes"  checked={metroCity}  onChange={() => setMetroCity(true)}  />
                <label htmlFor="metroCityYes">Yes</label>
                <input  type="radio" name="metroCity"  id="metroCityNo"  checked={!metroCity}  onChange={() => setMetroCity(false)} />
                <label htmlFor="metroCityNo">No</label>
              </div>
 
            </div>
          </div>

          <div className="col-12 col-md-6 mb-4 p-3">
            <div className="card result-section p-4">
              {exemptHRA !=='' && taxableHRA !=='' && (
                <div className="row fs-17 fw-bold">
                  <label className="">HRA Calculation Details</label>
                  <div className="py-3 d-flex justify-content-center">
                    <Doughnut data={data} options={options} />
                  </div>

                  <hr />
                  <div className="col-8 mt-2">
                    <p>Exempt HRA</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>&#x20B9;{roundAndFormat(exemptHRA)}</p>
                  </div>
                  <hr />
                  <div className="col-8 mt-2">
                    <p>Taxable HRA</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>&#x20B9;{roundAndFormat(taxableHRA)}</p>
                  </div>
                  <hr />
                  <a type="button"  href="https://onboard.northeastltd.com/"  target="blank"  className="btn btn-secondary btn-sm mx-auto mt-5"  > Invest Now  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      <div className="d-md-flex container">
        <div className="col-12 col-md-9 calc-description ">
          <p>
            Our HRA calculator is a useful tool designed to assist you in calculating your House Rent Allowance (HRA) exemption along with Dearness Allowance (DA). By considering your salary, actual rent paid, HRA received, DA received, and the city of residence, the calculator provides you with the HRA exemption amount as per the Income Tax Act, aiding in accurate tax planning.
            <br></br>
            This tool is particularly beneficial for salaried individuals claiming HRA exemption in their income tax returns. It offers clarity on the calculation methodology and ensures compliance with tax regulations, helping in maximizing tax savings.
          </p>
          <h4>How to Use the HRA Calculator</h4>
          <ol>
            <li>Enter Basic Salary: Input your basic salary, which is used to calculate the HRA exemption.</li>
            <li>Enter Dearness Allowance (DA): Input the Dearness Allowance received by you from your employer.</li>
            <li>Input Actual Rent Paid: Enter the actual rent paid by you for the accommodation.</li>
            <li>Enter HRA Received: Input the House Rent Allowance received by you from your employer.</li>
            <li>Select City: Choose the city where you reside, as HRA exemption is calculated based on the city's rental laws.</li>
          </ol>
          <h4>Formula for HRA Calculation</h4>
          <p>The HRA exemption can be calculated using the following formula:</p>
          <ol>
            <li>Actual HRA Received</li>
            <li>50% of the salary for  metro city</li>
            <li>40% of the salary for non metro city</li>
            <li>Actual rent – 10% of salary (basic salary + commissions + dearness allowance)</li>
          </ol>
          <h4>Example Calculation</h4>
          <p>Suppose your basic salary is Rs. 5,00,000 p.a, actual rent paid is Rs. 2,50,000 per month, HRA received is Rs. 1,50,000 per month, and you reside in a metro city.</p>
          <p> HRA is Rs. 1,50,000</p>
          <p>50% of Salary is Rs. 2,50,000</p>
          <p>Actual rent (2,50,000) – 10% of salary (50,000) is Rs. 2,00,000</p>
          <p>HRA Exemption: Rs. 1,50,000.</p>


         


          <h4>Benefits of Using an HRA Calculator</h4>
          <ul>
            <li>Accurate Calculation: Get precise HRA exemption amounts, avoiding manual errors in tax calculations.</li>
            <li>Tax Savings: Maximize your tax savings by claiming the correct HRA exemption as per the tax laws.</li>
            <li>Compliance: Ensure compliance with tax regulations by calculating HRA exemption accurately.</li>
            <li>Financial Planning: Plan your finances better by knowing the exact amount of HRA exemption you can claim.</li>
          </ul>
        </div>


        <div className="col-12 col-md-3  ">
          
          <SimilarCalc />
        
        </div>


      </div>
    </div>
  );
};

export default HRACalculator;



