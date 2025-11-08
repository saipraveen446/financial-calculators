import React from "react";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import PPFCalculator from "./Calculators/PPFCalculator";
import FDCalculator from "./Calculators/FDCalculator";
import EMICalculator from "./Calculators/EMICalculator";
import AllCalculators from "./Calculators";
import GSTCalculator from "./Calculators/GSTCalculator";
import HRACalculator from "./Calculators/HRACalculator";
import SipLumpsumCalculator from "./Calculators/SipLumpsumCalculator";
import InterestCalculator from "./Calculators/InterestCalculator";
import ROICalculator from "./Calculators/ROICalculator";
import NPSCalculator from "./Calculators/NPSCalculator";

const RoutePages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AllCalculators />} />

                <Route path="/ppf-calculator" element={<PPFCalculator />} />

                <Route path="/mf-returns-calculator" element={<SipLumpsumCalculator/>} />

                <Route path="/fd-calculator" element={<FDCalculator />} />

                <Route path="/emi-calculator" element={<EMICalculator />} />

                <Route path="/gst-calculator" element={<GSTCalculator />} />

                <Route path="/hra-calculator" element={<HRACalculator />} />

                <Route path="/interest-calculator" element={<InterestCalculator />} />

                <Route path="/roi-calculator" element={<ROICalculator />} />

                <Route path="/nps-calculator" element={<NPSCalculator />} />

            </Routes>
        </BrowserRouter>
    );
}

export default RoutePages;
