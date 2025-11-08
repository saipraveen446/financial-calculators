import React, { useEffect, useState} from "react";
import "../styles.css";
import { Doughnut } from "react-chartjs-2";
import {Chart as ChartJS,ArcElement,Tooltip,Legend,Title,} from "chart.js";
import "chart.js/auto";
import SimilarCalc from "../SimilarCalc";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PPFCalculator = () => {

  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [duration, setDuration] = useState(15);
  const [errorMessage, setErrorMessage] = useState("");
  const interestRate = 7.1;
  const [maturityAmount, setMaturityAmount] = useState(null);
  const [totalInvestment, setTotalInvestment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  useEffect( () =>{
    calculatePPF();
  }, [ investmentAmount, duration]
  )

  
  useEffect(() => {
    updateRangeBackground(investmentAmount, "investmentRange");
    updateRangeBackground(duration, "durationRange");
  }, [investmentAmount, duration]);


  const updateRangeBackground = (value, id) => {
    const range = document.getElementById(id);
    const percentage = ((value - range.min) / (range.max - range.min)) * 100;
    range.style.background = `linear-gradient(to right, #0A80A0 ${percentage}%, transparent ${percentage}%)`;
  };

  const calculatePPF = () => {

   
    const principal = parseFloat(investmentAmount);
    const years = parseInt(duration);
    const rate = parseFloat(interestRate) / 100;
    let amount = 0;

    if(years<15){
      setErrorMessage("Not allowed 15 years below.");
      setMaturityAmount(null);
      setTotalInvestment(null);
      setTotalInterest(null);
      return;
    }else{

      
    for (let i = 1; i <= years; i++) {
      amount += principal;
      amount += amount * rate;
    }

    const totalInvested = principal * years;
    const interestEarned = amount - totalInvested

    // errorMessage =(years>15) ?setErrorMessage("not allowed  below 15 "):setErrorMessage("");

    setMaturityAmount(amount);
    setTotalInvestment(totalInvested);
    setTotalInterest(interestEarned);

    }

    setErrorMessage("");

   
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

  // graph
  const data = {
    labels: ['Total Investment', 'Total Interest'],
    datasets: [
      {
        data: [roundNumber(totalInvestment),roundNumber(totalInterest)],
        backgroundColor: ['#19B797', '#0A80A0'],
        hoverBackgroundColor: ['#19B797', '#0A80A0'],
      
      },
    ],
  };

  const options = {
    cutout: '70%', // Adjust this value to decrease the radius
    responsive: false,   
    radius: "100%",
    plugins: {
      legend: {
        position:'right',
        align:'center',
        labels: {
          font: {
            size: 11
        },
        boxWidth: 20,      
        }
      },
    },
  };

  const formula = "M= P * [({( 1+i ) ^ n } - 1) / i]";
  
  return (
    
    <div className="main-content position-relative">
      <div className="card container   p-4 ">
      <a href="/" class="back-button">
          <i class="bi bi-house"></i>
        </a>
        <div className="row pt-3 ">
        <h1 className="fs-17 fw-bold text-center">PPF Calculator</h1>
          <div className="col-12 col-md-6 p-4 pt-5">         
            <div className="row">
              <div className=" col-7 col-md-8">
                <label className="form-label">Yearly Investment Amount</label>
              </div>
              <div className="col-5 col-md-4">
                <div className="input-group"> 
                    <input className=" form-control" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} />
                    <span class="input-group-text" >&#x20B9;</span>
                </div>
              </div>
              <div className="col-12">
                  <input type="range" className="form-range custom-range mt-3" id="investmentRange" value={investmentAmount} onChange={(e) => setInvestmentAmount(e.target.value)} min="1000" max="1000000" />
                  <div className="d-flex justify-content-between">
                    <span>&#x20B9;500</span>
                    <span>&#x20B9;10,00,000</span>
                  </div>
              </div>

              <div className=" col-7 col-md-8 mt-4">
                <label className="form-label">Time period(in years)</label>
              </div>
              <div className="col-5 col-md-4 mt-4">
                <div className="input-group">
                  <input className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />
                  <span class="input-group-text" >Yrs</span>
                </div>
                {errorMessage && (
                  <p className="text-danger">{errorMessage}</p>
                )}
                 
              </div>
              <div className="col-12">
                  <input type="range" className="form-range custom-range mt-3" id="durationRange" value={duration} onChange={(e) => setDuration(e.target.value)} min="15" max="50" />
                  <div className="d-flex justify-content-between">
                    <span>15 yrs</span>
                    <span>50 yrs</span>
                  </div>
              </div>

              <div className=" col-7 col-md-8 mt-4">
                <label className="form-label">Expected Return Rate</label>
              </div>
              <div className="col-5 col-md-4 mt-4">
                <input className="form-control" value={interestRate} disabled />
              </div>
               
            </div>
          </div>

          <div className="col-12  col-md-6 mb-4 p-3">
            <div className="card result-section  border-0 p-4">
            {maturityAmount && (
              <div className="row  fs-17 fw-bold">
                <label className="">Total value of your investment</label>
                <div className="py-3 d-flex justify-content-center"><Doughnut data={data} options={options} /></div>
                <hr />
 
                <div className="col-8 mt-2">
                  <p>Total Investment Amount</p>
                </div>
                <div className="col-4 mt-2">
                    <p >{"\u20B9"}{roundAndFormat(totalInvestment)}</p>
                </div>
                <hr/>
               
                <div className="col-8 mt-2">
                   <p >Estimated Returns</p>
                </div>
                <div className="col-4 mt-2">
                  <p >{"\u20B9"}{roundAndFormat(totalInterest)}</p>
                </div>
                <hr/>
                
                <div className="totalreturns d-flex ms-2">
                  <div className="col-8 mt-2">
                    <p >Total Returns</p>
                  </div>
                  <div className="col-4 mt-2">
                    <p >{"\u20B9"}{roundAndFormat(maturityAmount)}</p>
                  </div>
                </div>
                 
                <a type="button" href="https://onboard.northeastltd.com/" target="blank" className=" btn btn-secondary btn-sm mx-auto mt-5">Invest Now</a>

              </div>
                          
            )}   
            </div>
          </div>       
        </div>       
      </div>


      <div className="d-md-flex container mt-3">
       
      <div className="col-12 col-md-8 calc-description ">
        
          <p>
          Our PPF calculator is an online tool designed to help you estimate the potential returns on your PPF investments. By considering your investment amount, interest rate, and investment duration, the calculator provides you with an accurate estimation of the maturity amount and interest earned over a specified period.
           <br></br>
          This tool is particularly beneficial for those planning to invest in PPF but unsure about the investment amount or the expected returns. It offers clarity on the future value of your investments, aiding in informed financial decisions and efficient savings planning.
                          
          </p>
          <h4>How to Use the PPF Calculator</h4>
         <ol>
          <li>Determine Your Investment Amount: Decide how much you can afford to invest regularly (monthly, quarterly, or yearly).</li>
          <li>Input the Interest Rate: Enter the prevalent PPF interest rate.</li>
          <li>Set the Duration: The default tenure for a PPF account is 15 years.</li>
         </ol>


         <h4>Formula for PPF Calculation</h4>
         <p>The maturity amount in a PPF account is calculated using the formula:</p>
         
         <p>{formula} </p>
         <p>M = Maturity amount</p>
         <p>P = Annual installments</p>
         <p>i = Interest rate</p>
         <p>n = Number of years</p>

         <p>Let's consider an example where you plan to invest Rs. 1,50,000 in their PPF investment for a period of 15 years at an interest rate of 7.1%, then his/her maturity sum at the closing year will be equal to Rs. 40,68,209.</p>

         <p>M = 1,50,000* [({(1+0.071)^15}-1)/0.071]= 40,68,209  </p>

         <h4>Benefits of Using a PPF Calculator</h4>
         <ul>
          <li>Estimate Future Value: Understand the future value of your PPF investments. </li>
          <li>Informed Financial Decisions: Make better financial decisions based on potential returns. </li>
          <li>Savings Planning: Plan your savings effectively with a clear understanding of expected returns.</li>
          <li>Quick Results: Investors can get quick results by simply inputting their contribution amount, interest rate, and investment duration.</li>
         </ul>
         
      </div>
      <div className="col-12 col-md-4 ">        
        <SimilarCalc />     
      </div>

    </div>

    </div>

  );
};

export default PPFCalculator;