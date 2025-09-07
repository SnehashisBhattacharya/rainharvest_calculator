import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = () => {
  const stats = [
    {
      icon: 'Droplets',
      value: '2.5B',
      label: 'Gallons Saved',
      description: 'Water conserved through rainwater harvesting',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: 'Home',
      value: '150K+',
      label: 'Properties Assessed',
      description: 'Successful feasibility calculations completed',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: 'DollarSign',
      value: '$12M',
      label: 'Cost Savings',
      description: 'Total estimated savings for users',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      icon: 'Leaf',
      value: '85%',
      label: 'Carbon Reduction',
      description: 'Average environmental impact improvement',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Making a Difference Together
        </h2>
        <p className="text-muted-foreground">
          Join thousands of users creating sustainable water solutions
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg border border-border p-4 text-center">
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat?.value}
            </div>
            <div className="text-sm font-medium text-foreground mb-1">
              {stat?.label}
            </div>
            <div className="text-xs text-muted-foreground leading-tight">
              {stat?.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;