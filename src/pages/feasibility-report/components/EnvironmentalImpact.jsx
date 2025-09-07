import React from 'react';
import Icon from '../../../components/AppIcon';

const EnvironmentalImpact = ({ environmentalImpact, annualHarvest }) => {
  const formatNumber = (num) => {
    if (!num) return '0';
    return new Intl.NumberFormat('en-US')?.format(Math.round(num));
  };

  const carbonReduction = environmentalImpact?.carbonReduction || Math.round(annualHarvest * 0.002);
  const waterConservation = environmentalImpact?.waterConservation || annualHarvest;
  const equivalentTrees = Math.round(carbonReduction / 48); // Average tree absorbs ~48 lbs CO2/year
  const equivalentCars = Math.round(carbonReduction / 4600); // Average car emits ~4600 lbs CO2/year

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Leaf" size={24} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Environmental Impact</h3>
          <p className="text-sm text-muted-foreground">Your contribution to sustainability</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Key Environmental Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-success/5 rounded-lg border border-success/10">
            <div className="text-2xl font-bold text-success mb-1">
              {formatNumber(carbonReduction)} lbs
            </div>
            <div className="text-sm text-foreground font-medium">CO₂ Reduction</div>
            <div className="text-xs text-muted-foreground mt-1">
              Annual carbon footprint reduction
            </div>
          </div>

          <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
            <div className="text-2xl font-bold text-primary mb-1">
              {formatNumber(waterConservation)} gal
            </div>
            <div className="text-sm text-foreground font-medium">Water Conserved</div>
            <div className="text-xs text-muted-foreground mt-1">
              Municipal water system relief
            </div>
          </div>
        </div>

        {/* Impact Equivalents */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="TreePine" size={16} className="text-success" />
            Environmental Equivalents
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="TreePine" size={14} className="text-success" />
                <span className="text-muted-foreground">Trees planted:</span>
              </div>
              <span className="font-medium text-foreground">{equivalentTrees || 1}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Car" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">Cars off road:</span>
              </div>
              <span className="font-medium text-foreground">{equivalentCars || 1}</span>
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="Heart" size={16} className="text-error" />
            Environmental Benefits
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-success/5 rounded-lg">
              <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Droplets" size={12} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Reduces Municipal Water Demand</p>
                <p className="text-xs text-muted-foreground">
                  Decreases strain on local water treatment and distribution systems
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Zap" size={12} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Lowers Energy Consumption</p>
                <p className="text-xs text-muted-foreground">
                  Reduces energy needed for water treatment and pumping
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-secondary/5 rounded-lg">
              <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Shield" size={12} className="text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Prevents Stormwater Runoff</p>
                <p className="text-xs text-muted-foreground">
                  Reduces flooding and erosion while filtering pollutants
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-warning/5 rounded-lg">
              <div className="w-6 h-6 bg-warning/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Recycle" size={12} className="text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Promotes Water Cycle Balance</p>
                <p className="text-xs text-muted-foreground">
                  Helps maintain natural groundwater recharge patterns
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Score */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Sustainability Score</span>
            <span className="text-sm font-bold text-success">Excellent</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-success h-2 rounded-full" style={{ width: '85%' }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Your rainwater harvesting system significantly contributes to environmental sustainability
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalImpact;