import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import "chart.js/auto";
import "../styles.css";
import SimilarCalc from "../SimilarCalc";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const GSTCalculator = () => {
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(6.5);
  const [calculationType, setCalculationType] = useState('exclusive');
  const [gstAmount, setGstAmount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    calculateGST();
  }, [amount, gstRate, calculationType]);


  useEffect(() => {
    const ranges = document.querySelectorAll(".custom-range");
    ranges.forEach((range) => {
      updateRangeBackground(range);
    });


  }, [amount, gstRate]);

  const updateRangeBackground = (range) => {
    const value = range.value;
    const min = range.min;
    const max = range.max;
    const percentage = ((value - min) / (max - min)) * 100;
    range.style.background = `linear-gradient(to right, #0A80A0 ${percentage}%, transparent ${percentage}%)`;
  };

  const calculateGST = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(gstRate) / 100;

    let gst = 0;
    let total = 0;

    if (calculationType === 'exclusive') {
      gst = amt * rate;
      total = amt + gst;
    } else if (calculationType === 'inclusive') {
      gst = amt - amt / (1 + rate);
      total = amt-gst;
    }

    setGstAmount(gst);
    setTotalAmount(total);
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
    labels: ['Base Amount', 'GST Amount'],
    datasets: [
      {
        data: [roundNumber(amount), roundNumber(gstAmount)],
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
          <h1 className="fs-17 fw-bold text-center">GST Calculator</h1>
          <div className="col-12 col-md-6 p-3 pt-5">
            <div className="row">
              <div className="col-12  mb-4 radio-group">
                <input type="radio" id="exclusive"  name="calculationType"  value="exclusive" checked={calculationType === 'exclusive'}  onChange={() => setCalculationType('exclusive')} />
                <label htmlFor="exclusive">GST Exclusive</label>
                <input  type="radio" id="inclusive"  name="calculationType"  value="inclusive"  checked={calculationType === 'inclusive'}  onChange={() => setCalculationType('inclusive')}  />
                <label htmlFor="inclusive">GST Inclusive</label>
              </div>

              <div className=" col-7 col-md-8">
                <label className="form-label">Amount</label>
              </div>
              <div className="col-5 col-md-4">
                <div className="input-group">
                  <input className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  <span className="input-group-text">&#x20B9;</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range" className="form-range custom-range mt-3" id="amountRange" value={amount} onChange={(e) => setAmount(e.target.value)} min="1000" max="1000000" />
                <div className="d-flex justify-content-between">
                  <span>&#x20B9;1000</span>
                  <span>&#x20B9;10,00,000</span>
                </div>
              </div>

              

              <div className=" col-7 col-md-8 mt-4">
                <label className="form-label">Tax Slab (%)</label>
              </div>
              <div className="col-5 col-md-4 mt-4">
                <div className="input-group">
                  <input className="form-control" value={gstRate} onChange={(e) => setGstRate(e.target.value)} />
                  <span className="input-group-text">%</span>
                </div>
              </div>
              <div className="col-12">
                <input type="range" className="form-range custom-range mt-3" id="gstrateRange" value={gstRate} onChange={(e) => setGstRate(e.target.value)} min="1" max="30" />
                <div className="d-flex justify-content-between">
                  <span>1%</span>
                  <span>30%</span>
                </div>
              </div>

            </div>
          </div>

          <div className="col-12 col-md-6 mb-4 p-3">
            <div className="card result-section p-4">
              {gstAmount !== null && (
                <div className="row fs-17 fw-bold">
                  <label className="">Total Payment Details</label>
                  <div className="py-3 d-flex justify-content-center"><Doughnut data={data} options={options} /></div>
                  <hr />

                  <div className="col-8 mt-2">
                    <p>Base Amount</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>{"\u20B9"}{roundAndFormat(amount)}</p>
                  </div>
                  <hr></hr>

                  <div className="col-8 mt-2">
                    <p>GST Amount</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p>{"\u20B9"}{roundAndFormat(gstAmount)}</p>
                  </div>
                  <hr></hr>

                  <div className="totalreturns d-flex ms-2">
                    <div className="col-8 mt-2">
                      <p>Total Amount</p>
                    </div>
                    <div className="col-4 mt-2">
                      <p>{"\u20B9"}{roundAndFormat(totalAmount)}</p>
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
            Our GST calculator is a versatile tool designed to help you calculate GST amounts for both inclusive and exclusive scenarios. By considering the taxable amount and the applicable GST rate, the calculator provides you with the GST amount and the total amount (inclusive or exclusive of GST), aiding in accurate financial calculations.
            <br></br>
            This tool is particularly beneficial for businesses and individuals dealing with GST calculations in their transactions. It offers clarity on the GST component of a transaction, helping in budgeting and financial planning.
          </p>

          <h4>What is GST (Goods and Services Tax)?</h4>
          <p>On 1 July 2017, the Indian government launched the Goods and Services Tax. It replaced various taxes levied by central, state and union territory governments like value-added tax and excise duty, thus driving the vision of ‘One Nation, One Tax’. When GST replaced the previously complex tax system in 2017, tax compliance was simplified.</p>
          <p></p>



          <h4>How to Use the GST Calculator</h4>
          <ol>
            <li>Choose GST Type: Select whether you want to calculate GST inclusive or exclusive amounts.</li>
            <li>Enter Taxable Amount: Input the amount on which GST is to be calculated.</li>
            <li>Enter Tax Slab: Enter the applicable tax slab (e.g., 5%, 12%, 18%, or 28%).</li>
          </ol>
          <h4>Formula for GST Calculation</h4>
          <p>The GST amount can be calculated using the formula:</p>
          <ul>
            <li>For GST Inclusive:</li>
             <p>GST Amount = (Taxable Amount * GST Rate) / (100 + GST Rate)</p>
             <p>Total Amount =Taxable Amount - GST Amount  </p>
            <li>For GST Exclusive: </li>
            <p>GST Amount = Taxable Amount * (GST Rate / 100)</p>
            <p>Total Amount =Taxable Amount + GST Amount  </p>
          </ul>
          <h4>Example Calculation</h4>
          <p>Suppose you have a taxable amount of Rs. 1,000 and the GST rate is 18%.</p>
          <ul>
            <li>For GST Inclusive:GST Amount = (1000 *18 )/ (100+18) = Rs. 152.54</li>  
            <li>For GST Exclusive: GST Amount = 1000 * (18 / 100) = Rs. 180</li>
          </ul>
          <p>Therefore, the total amount for the GST inclusive scenario would be Rs. 1,000 - Rs. 152.54 = 847.46, and for the GST exclusive scenario, it would be Rs. 1,000 + Rs. 180 = Rs. 1,180.</p>
          <h4>Benefits of Using a GST Calculator</h4>
          <ul>
            <li>Accurate Calculation: Get precise GST amounts for inclusive and exclusive scenarios, avoiding manual errors.</li>
            <li>Compliance: Ensure compliance with GST regulations by calculating GST accurately for invoices and transactions.</li>
            <li>Cost Estimation: Estimate the total cost of goods or services including GST, helping in budgeting and pricing decisions.</li>
            <li>Transparency: Provide transparency in transactions by clearly indicating the GST component to customers or clients.</li>
          </ul>
        </div>


        <div className="col-12 col-md-3  ">
          
          <SimilarCalc />
        
        </div>


      </div>
    </div>
  );
};

export default GSTCalculator;
