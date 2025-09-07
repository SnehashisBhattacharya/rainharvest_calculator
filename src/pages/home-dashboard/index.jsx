import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import WelcomeHeader from './components/WelcomeHeader';
import NavigationCard from './components/NavigationCard';
import RainfallDataModal from './components/RainfallDataModal';
import QuickStats from './components/QuickStats';

const HomeDashboard = () => {
  const navigate = useNavigate();
  const [isRainfallModalOpen, setIsRainfallModalOpen] = useState(false);

  const navigationCards = [
    {
      title: "Check My Rainwater Harvesting Potential",
      description:
        "Calculate your property's rainwater collection capacity and get a detailed feasibility assessment with cost estimates.",
      iconName: "Calculator",
      route: "/rainwater-calculator",
      isPrimary: true,
      gradient: "from-primary to-blue-700",
    },
    {
      title: "Rainfall in Your City", // ✅ moved up
      description:
        "Explore local rainfall patterns and historical data to understand your area's water harvesting potential.",
      iconName: "CloudRain",
      onClick: () => setIsRainfallModalOpen(true),
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      title: "Why Harvest Rainwater?", // ✅ moved down
      description:
        "Discover the environmental and economic benefits of rainwater harvesting for sustainable water management.",
      iconName: "HelpCircle",
      route: "/learning-center#faq",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      title: "How it Works",
      description:
        "Learn about rainwater harvesting systems, installation processes, and maintenance through visual guides.",
      iconName: "BookOpen",
      route: "/learning-center#how-it-works",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  const handleFAQNavigation = () => {
    navigate("/learning-center", { state: { scrollTo: "faq" } });
  };

  const handleHowItWorksNavigation = () => {
    navigate("/learning-center", { state: { scrollTo: "how-it-works" } });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6 pb-20">
        {/* Welcome Header */}
        <WelcomeHeader />

        {/* Quick Stats */}
        <QuickStats />

        {/* Navigation Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Get Started with Rainwater Harvesting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {navigationCards?.map((card, index) => (
              <NavigationCard
                key={index}
                title={card?.title}
                description={card?.description}
                iconName={card?.iconName}
                route={card?.route}
                isPrimary={card?.isPrimary}
                onClick={
                  card?.onClick ||
                  (card?.route?.includes("#faq")
                    ? handleFAQNavigation
                    : card?.route?.includes("#how-it-works")
                    ? handleHowItWorksNavigation
                    : undefined)
                }
                gradient={card?.gradient}
              />
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🌍</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Join the Sustainable Water Movement
              </h3>
              <p className="text-muted-foreground mb-4">
                Every drop counts in creating a sustainable future. Start your
                rainwater harvesting journey today and contribute to water
                conservation while reducing your utility costs.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <div className="flex items-center gap-2 text-success">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Reduce water bills by up to 40%</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Decrease stormwater runoff</span>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Support groundwater recharge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rainfall Data Modal */}
      <RainfallDataModal
        isOpen={isRainfallModalOpen}
        onClose={() => setIsRainfallModalOpen(false)}
      />

      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default HomeDashboard;
