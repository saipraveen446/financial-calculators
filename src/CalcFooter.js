import React from 'react';
import './styles.css';

export default function CalcFooter() {
  return (
    <footer className="calc-footer-slim">
      <span>© {new Date().getFullYear()} Financial Calculators — Developed ❤️ by <strong>Sai Praveen</strong></span>
      <span className="footer-slim-email">saipraveensanapalli@gmail.com</span>
    </footer>
  );
}
