import React from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';


const AllCalculators = () => {
    const navigate = useNavigate();

    return (
        <div>
         <div className="calc-container container">
            
                <div className="row p-5 mt-4 m-md-5  ">

                    <div className="singlecalc col-12 col-md-6 col-lg-4 d-flex" onClick={()=> navigate("/ppf-calculator")}>
                        <div className="card shadow border-0 calc-card p-3 m-2">
                            <img className="img-fluid" width="40px;" height="auto" src="/images/piggybank.png" alt="calc"/>
                            <h3 className="pt-2  fs-4">PPF Calculator</h3>
                            <p className="pt-2  fs-6 text-muted">Calculate public provident fund retuns</p>
                        </div>
                    </div>


                    <div className="singlecalc col-12 col-md-6 col-lg-4 " onClick={()=> navigate("/mf-returns-calculator")}>
                        <div className="card shadow border-0 calc-card p-3 m-2">
                            <img className="img-fluid" width="40px;" height="auto" src="/images/rupeebagcoin.png" alt="calc"/>
                            <h3 className="pt-2  fs-4">SIP/MF Calculator</h3>
                            <p className="pt-2  fs-6 text-muted">Calculate Sip /Mutual funds retuns </p>
                        </div>
                    </div>



                    <div className="singlecalc col-12 col-md-6 col-lg-4" onClick={()=> navigate("/fd-calculator")} >

                        <div className="card shadow border-0 calc-card p-3 m-2">
                            <img className="img-fluid" width="40px;" height="auto" src="/images/money.png" alt="calc"/>
                            <h3 className="pt-2  fs-4">FD Calculator</h3>
                            <p className="pt-2  fs-6 text-muted">Calculate Fixed Deposite retuns</p>
                        </div>
                    </div>

                    <div className="singlecalc col-12 col-md-6 col-lg-4" onClick={()=> navigate("/emi-calculator")}>
                        <div className="card shadow border-0 calc-card p-3 m-2">
                            <img className="img-fluid" width="40px;" height="auto" src="/images/calc.png" alt="calc"/>
                            <h3 className="pt-2  fs-4">EMI Calculator</h3>
                            <p className="pt-2  fs-6 text-muted">Calculate your personal, car, home loan</p>
                        </div>
                    </div>

                    

                    <div className="singlecalc col-12 col-md-6 col-lg-4" onClick={()=> navigate("/gst-calculator")}>
                        <div className="card shadow border-0 calc-card p-3 m-2">
                            <img className="img-fluid" width="40px;" height="auto" src="/images/tax.png" alt="calc"/>
                            <h3 className="pt-2  fs-4">GST Calculator</h3>
                            <p className="pt-2  fs-6 text-muted">Calculate payable GST Amount </p>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4" onClick={()=> navigate("/hra-calculator")}>
                        <div className="card shadow border-0 calc-card p-3 m-2">
                            <img className="img-fluid" width="40px;" height="auto" src="/images/hra.png" alt="calc"/>
                            <h3 className="pt-2  fs-4">HRA Calculator</h3>
                            <p className="pt-2  fs-6 text-muted">Calculate your House rent allowance</p>
                        </div>
                    </div>

                    <div className="singlecalc col-12 col-md-6 col-lg-4" onClick={()=> navigate("/interest-calculator")}>
                        <div className="card shadow border-0 calc-card p-3 m-2">
                            <img className="img-fluid" width="40px;" height="auto" src="/images/get-money.png" alt="calc"/>
                            <h3 className="pt-2  fs-4">Interest Calculator</h3>
                            <p className="pt-2  fs-6 text-muted">Calculate simple and Compound Interest.</p>
                        </div>
                    </div>

                    <div className="singlecalc col-12 col-md-6 col-lg-4" onClick={()=> navigate("/roi-calculator")}>
                        <div className="card shadow border-0 calc-card p-3 m-2">
                            <img className="img-fluid" width="40px;" height="auto" src="/images/roi.png" alt="calc"/>
                            <h3 className="pt-2  fs-4">ROI Calculator</h3>
                            <p className="pt-2  fs-6 text-muted">Calculate your Return on Investment</p>
                        </div>
                    </div>



                    <div className="col-12 col-md-6 col-lg-4" onClick={()=> navigate("/nps-calculator")}>
                        <div className="card shadow border-0 calc-card p-3 m-2">
                            <img className="img-fluid" width="40px;" height="auto" src="/images/retirement.png" alt="calc"/>
                            <h3 className="pt-2  fs-4">NPS Calculator</h3>
                            <p className="pt-2  fs-6 text-muted">Calculate your National pension scheme</p>
                        </div>
                    </div>
            
                </div>    
            </div>
        </div>         
            
    );
}

export default AllCalculators;