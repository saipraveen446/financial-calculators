import React, { useState } from "react";
import './styles.css';

const calculatorLinks = [
  { label: "EMI Calculator",      emoji: "💳", href: "/emi-calculator" },
  { label: "SIP / MF Calculator", emoji: "📈", href: "/mf-returns-calculator" },
  { label: "PPF Calculator",      emoji: "🐷", href: "/ppf-calculator" },
  { label: "FD Calculator",       emoji: "🏦", href: "/fd-calculator" },
  { label: "GST Calculator",      emoji: "🧾", href: "/gst-calculator" },
  { label: "HRA Calculator",      emoji: "🏠", href: "/hra-calculator" },
  { label: "Interest Calculator", emoji: "💰", href: "/interest-calculator" },
  { label: "ROI Calculator",      emoji: "📊", href: "/roi-calculator" },
  { label: "NPS Calculator",      emoji: "👴", href: "/nps-calculator" },
];

const CalcHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="calc-header">
      <div className="header-inner">
        {/* Brand */}
        <a href="/" className="header-brand">
          <div className="brand-icon">₹</div>
          <span className="brand-text">Financial <strong>Calculators</strong></span>
        </a>

      </div>
    </header>
  );
};

export default CalcHeader;
