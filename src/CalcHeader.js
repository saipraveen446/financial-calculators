import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import './styles.css';

const CalcHeader = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark align-items-center nav-sticky"
    >
      <div className="container">
        <Navbar.Brand className="logo mr-3" href="/">
        <h4 className="m-0 text-gradient">Financial Calculators</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default CalcHeader;
