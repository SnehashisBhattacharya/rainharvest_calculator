import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalculatorData } from '../../components/ui/CalculatorDataProvider';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ShareReportModal from '../../components/ui/ShareReportModal';
import ReportHeader from './components/ReportHeader';
import FeasibilityScore from './components/FeasibilityScore';
import HarvestPotential from './components/HarvestPotential';
import SystemRecommendations from './components/SystemRecommendations';
import CostAnalysis from './components/CostAnalysis';
import EnvironmentalImpact from './components/EnvironmentalImpact';
import LocalDataInsights from './components/LocalDataInsights';

const FeasibilityReport = () => {
  const navigate = useNavigate();
  const { calculationResults, reportData, calculatorData, hasResults } = useCalculatorData();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    // If no calculation results exist, redirect to calculator
    if (!hasResults) {
      navigate('/rainwater-calculator');
    }
  }, [hasResults, navigate]);

  const handleDownloadPDF = () => {
    // Mock PDF download functionality
    const reportContent = `
      Rainwater Harvesting Feasibility Report
      Generated: ${new Date()?.toLocaleDateString()}
      
      Feasibility Score: ${calculationResults?.feasibilityScore}%
      Annual Harvest Potential: ${calculationResults?.annualHarvestPotential} gallons
      Cost Savings: $${calculationResults?.costSavings} per year
      Payback Period: ${calculationResults?.paybackPeriod} years
      
      ${reportData?.summary}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rainwater-harvesting-report-${reportData?.reportId || 'report'}.txt`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShareReport = () => {
    setIsShareModalOpen(true);
  };

  const handleBackToCalculator = () => {
    navigate('/rainwater-calculator');
  };

  // Show loading or redirect message if no results
  if (!hasResults) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-medium text-foreground mb-2">
            No report data available
          </div>
          <p className="text-muted-foreground">
            Redirecting to calculator...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Report Header */}
        <ReportHeader
          reportData={reportData}
          onDownloadPDF={handleDownloadPDF}
          onShareReport={handleShareReport}
          onBackToCalculator={handleBackToCalculator}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Primary Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Feasibility Score */}
            <FeasibilityScore
              score={calculationResults?.feasibilityScore}
              status={calculationResults?.feasibilityScore >= 60 ? 'Feasible' : 'Marginal'}
            />

            {/* Harvest Potential */}
            <HarvestPotential
              annualHarvest={calculationResults?.annualHarvestPotential}
              monthlyAverage={calculationResults?.annualHarvestPotential ? Math.round(calculationResults.annualHarvestPotential / 12) : 0}
              dailyAverage={calculationResults?.annualHarvestPotential ? Math.round(calculationResults.annualHarvestPotential / 365) : 0}
            />

            {/* System Recommendations */}
            <SystemRecommendations
              systemSpecs={calculationResults?.systemSpecs}
              recommendations={calculationResults?.recommendations}
            />

            {/* Local Data Insights */}
            <LocalDataInsights
              location={calculatorData?.location}
            />
          </div>

          {/* Right Column - Analysis & Impact */}
          <div className="space-y-6">
            {/* Cost Analysis */}
            <CostAnalysis
              costSavings={calculationResults?.costSavings}
              paybackPeriod={calculationResults?.paybackPeriod}
              systemSpecs={calculationResults?.systemSpecs}
            />

            {/* Environmental Impact */}
            <EnvironmentalImpact
              environmentalImpact={calculationResults?.environmentalImpact}
              annualHarvest={calculationResults?.annualHarvestPotential}
            />
          </div>
        </div>

        {/* Report Summary */}
        {reportData?.summary && (
          <div className="mt-8 bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Executive Summary</h3>
            <p className="text-muted-foreground leading-relaxed">
              {reportData?.summary}
            </p>
          </div>
        )}
      </div>
      {/* Share Modal */}
      <ShareReportModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        reportData={reportData}
      />
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default FeasibilityReport;