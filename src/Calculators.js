import React from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';

const calculators = [
  {
    route: "/emi-calculator",
    icon: "/images/loan.png",
    title: "EMI Calculator",
    desc: "Calculate home, car & personal loan EMIs",
  },
  {
    route: "/mf-returns-calculator",
    icon: "/images/profits.png",
    title: "SIP / MF Calculator",
    desc: "Estimate Mutual Fund & SIP returns",
  },
  {
    route: "/ppf-calculator",
    icon: "/images/piggybank.png",
    title: "PPF Calculator",
    desc: "Calculate Public Provident Fund returns",
  },
  {
    route: "/fd-calculator",
    icon: "/images/rupeebag.png",
    title: "FD Calculator",
    desc: "Plan your Fixed Deposit maturity",
  },
  {
    route: "/gst-calculator",
    icon: "/images/tax.png",
    title: "GST Calculator",
    desc: "Calculate payable GST amount instantly",
  },
  {
    route: "/hra-calculator",
    icon: "/images/home.png",
    title: "HRA Calculator",
    desc: "Check House Rent Allowance exemption",
  },
  {
    route: "/interest-calculator",
    icon: "/images/interest-rate.png",
    title: "Interest Calculator",
    desc: "Simple & Compound Interest tools",
  },
  {
    route: "/roi-calculator",
    icon: "/images/roi.png",
    title: "ROI Calculator",
    desc: "Check your Return on Investment %",
  },
  {
    route: "/nps-calculator",
    icon: "/images/retirement.png",
    title: "NPS Calculator",
    desc: "National Pension Scheme corpus tool",
  },
];

const AllCalculators = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-title-row">
        <h1 className="home-title">
          Smart <span className="text-gradient">Financial Tools</span>
        </h1>
        <p className="home-subtitle">Premium, fast & accurate calculators for your daily needs</p>
      </div>

      <div className="home-grid">
        {calculators.map((calc, idx) => (
          <div
            key={idx}
            className="premium-card hc-card"
            onClick={() => navigate(calc.route)}
          >
            <div className="hc-header">
              <img src={calc.icon} alt={calc.title} className="hc-icon-img" />
              <h3 className="hc-title">{calc.title}</h3>
            </div>
            <p className="hc-desc">{calc.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCalculators;