import React from 'react';
import Icon from '../../../components/AppIcon';

const CostAnalysis = ({ costSavings, paybackPeriod, systemSpecs }) => {
  const formatCurrency = (amount) => {
    if (!amount) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const estimateSystemCost = (capacity) => {
    if (!capacity) return 2500;
    // Rough estimate: $2-4 per gallon of storage capacity
    return Math.round(capacity * 3);
  };

  const systemCost = estimateSystemCost(systemSpecs?.recommendedCapacity);
  const monthlySavings = costSavings ? Math.round(costSavings / 12) : 0;
  const fiveYearSavings = costSavings ? costSavings * 5 : 0;
  const tenYearSavings = costSavings ? costSavings * 10 : 0;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="DollarSign" size={24} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Cost Analysis</h3>
          <p className="text-sm text-muted-foreground">Investment and savings breakdown</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-success/5 rounded-lg border border-success/10">
            <div className="text-2xl font-bold text-success mb-1">
              {formatCurrency(costSavings)}
            </div>
            <div className="text-sm text-foreground font-medium">Annual Savings</div>
            <div className="text-xs text-muted-foreground mt-1">
              Water bill reduction
            </div>
          </div>

          <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/10">
            <div className="text-2xl font-bold text-warning mb-1">
              {formatCurrency(systemCost)}
            </div>
            <div className="text-sm text-foreground font-medium">System Cost</div>
            <div className="text-xs text-muted-foreground mt-1">
              Estimated installation
            </div>
          </div>

          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
            <div className="text-2xl font-bold text-primary mb-1">
              {paybackPeriod ? `${paybackPeriod} yrs` : 'N/A'}
            </div>
            <div className="text-sm text-foreground font-medium">Payback Period</div>
            <div className="text-xs text-muted-foreground mt-1">
              Return on investment
            </div>
          </div>
        </div>

        {/* Monthly Breakdown */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            Monthly Impact
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Water bill savings:</span>
              <span className="font-medium text-success">{formatCurrency(monthlySavings)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">System maintenance:</span>
              <span className="font-medium text-foreground">~$15</span>
            </div>
          </div>
        </div>

        {/* Long-term Projections */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            Long-term Savings Projection
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">5 Years</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-success">{formatCurrency(fiveYearSavings)}</div>
                <div className="text-xs text-muted-foreground">Total savings</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">10 Years</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-success">{formatCurrency(tenYearSavings)}</div>
                <div className="text-xs text-muted-foreground">Total savings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="PieChart" size={16} className="text-primary" />
            System Cost Breakdown
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Storage tank & materials:</span>
              <span className="font-medium text-foreground">{formatCurrency(systemCost * 0.4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Installation & labor:</span>
              <span className="font-medium text-foreground">{formatCurrency(systemCost * 0.35)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Filtration system:</span>
              <span className="font-medium text-foreground">{formatCurrency(systemCost * 0.15)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Permits & misc:</span>
              <span className="font-medium text-foreground">{formatCurrency(systemCost * 0.1)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostAnalysis;