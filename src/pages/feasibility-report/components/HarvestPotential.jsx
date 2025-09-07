import React from 'react';
import Icon from '../../../components/AppIcon';

const HarvestPotential = ({ annualHarvest, monthlyAverage, dailyAverage }) => {
  const formatNumber = (num) => {
    if (!num) return '0';
    return new Intl.NumberFormat('en-US')?.format(Math.round(num));
  };

  const calculateMonthly = (annual) => Math.round(annual / 12);
  const calculateDaily = (annual) => Math.round(annual / 365);

  const monthly = monthlyAverage || calculateMonthly(annualHarvest);
  const daily = dailyAverage || calculateDaily(annualHarvest);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Droplets" size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Water Harvest Potential</h3>
          <p className="text-sm text-muted-foreground">Estimated collection capacity</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Annual Harvest */}
        <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
          <div className="text-3xl font-bold text-primary mb-1">
            {formatNumber(annualHarvest)}
          </div>
          <div className="text-sm font-medium text-foreground mb-1">Gallons per Year</div>
          <div className="text-xs text-muted-foreground">
            Primary harvest estimate
          </div>
        </div>

        {/* Monthly and Daily Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-xl font-bold text-foreground mb-1">
              {formatNumber(monthly)}
            </div>
            <div className="text-sm text-muted-foreground">Gallons/Month</div>
          </div>
          
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-xl font-bold text-foreground mb-1">
              {formatNumber(daily)}
            </div>
            <div className="text-sm text-muted-foreground">Gallons/Day</div>
          </div>
        </div>

        {/* Water Usage Comparison */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Usage Equivalents</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Toilet flushes (1.6 gal each):</span>
              <span className="font-medium text-foreground">{formatNumber(annualHarvest / 1.6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Washing machine loads (25 gal each):</span>
              <span className="font-medium text-foreground">{formatNumber(annualHarvest / 25)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Garden watering (10 gal/session):</span>
              <span className="font-medium text-foreground">{formatNumber(annualHarvest / 10)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarvestPotential;