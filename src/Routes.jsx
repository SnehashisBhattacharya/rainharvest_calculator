import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import CalculatorDataProvider from "components/ui/CalculatorDataProvider";
import NotFound from "pages/NotFound";
import HomeDashboard from './pages/home-dashboard';
import RainwaterCalculator from './pages/rainwater-calculator';
import LearningCenter from './pages/learning-center';
import FeasibilityReport from './pages/feasibility-report';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <CalculatorDataProvider>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<FeasibilityReport />} />
            <Route path="/home-dashboard" element={<HomeDashboard />} />
            <Route path="/rainwater-calculator" element={<RainwaterCalculator />} />
            <Route path="/learning-center" element={<LearningCenter />} />
            <Route path="/feasibility-report" element={<FeasibilityReport />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </CalculatorDataProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;