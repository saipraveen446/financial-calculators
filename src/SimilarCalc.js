import React from "react";
import { Link } from "react-router-dom";

const SimilarCalc = () => {
  const calculators = [
    { name: "PPF Calculator", link: "/ppf-calculator" },
    { name: "SIP/MF Calculator", link: "/mf-returns-calculator" },
    { name: "FD Calculator", link: "/fd-calculator" },
    { name: "EMI Calculator", link: "/emi-calculator" },
    { name: "GST Calculator", link: "/gst-calculator" },
    { name: "HRA Calculator", link: "/hra-calculator" },
    { name: "Interest Calculator", link: "/interest-calculator" },
    { name: "ROI Calculator", link: "/roi-calculator" }
  ];

  return (
    <table className="similar-calc-table">
      <thead>
        <tr>
          <th colSpan="1">Similar Calculators</th>
        </tr>
      </thead>

      <tbody>
      
        {calculators.map((calc, index) => (
          
          <tr key={index}>
            
            <td className="calculator-link">
              <Link to={calc.link}>{calc.name}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimilarCalc;
