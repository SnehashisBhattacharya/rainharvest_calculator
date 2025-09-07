import React from 'react';
import { Helmet } from 'react-helmet';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FAQSection from './components/FAQSection';
import InfographicSection from './components/InfographicSection';
import GovernmentSchemesSection from './components/GovernmentSchemesSection';
import RainfallTrendsSection from './components/RainfallTrendsSection';

const LearningCenter = () => {
  return (
    <>
      <Helmet>
        <title>Learning Center - RainHarvest Calculator</title>
        <meta name="description" content="Learn about rainwater harvesting through comprehensive guides, FAQs, government schemes, and rainfall data analysis." />
        <meta name="keywords" content="rainwater harvesting, water conservation, sustainability, government schemes, rainfall trends" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div>
                <h1 className="text-xl font-bold text-foreground">Learning Center</h1>
                <p className="text-sm text-muted-foreground">
                  Master rainwater harvesting with expert guidance
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
          <div className="space-y-8">
            {/* FAQ Section */}
            <FAQSection />

            {/* How It Works Infographic */}
            <InfographicSection />

            {/* Government Schemes */}
            <GovernmentSchemesSection />

            {/* Rainfall Trends */}
            <RainfallTrendsSection />
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomTabNavigation />
      </div>
    </>
  );
};

export default LearningCenter;