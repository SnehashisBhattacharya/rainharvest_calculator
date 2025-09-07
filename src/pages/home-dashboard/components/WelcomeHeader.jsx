import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Droplets" size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome to RainHarvest Calculator
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Discover your property's rainwater harvesting potential and contribute to sustainable water management. 
            Calculate feasibility, generate detailed reports, and learn about eco-friendly water conservation practices.
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2 text-success">
              <Icon name="Leaf" size={16} />
              <span>Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Icon name="Calculator" size={16} />
              <span>Free Assessment</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <Icon name="Award" size={16} />
              <span>Expert Guidance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;