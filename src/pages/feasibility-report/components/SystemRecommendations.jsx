import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemRecommendations = ({ systemSpecs, recommendations }) => {
  const getStructureIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pit': return 'Circle';
      case 'trench': return 'Minus';
      case 'shaft': return 'Square';
      default: return 'Box';
    }
  };

  const getFilterIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'basic': return 'Filter';
      case 'advanced': return 'Settings';
      default: return 'Filter';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Wrench" size={24} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">System Recommendations</h3>
          <p className="text-sm text-muted-foreground">Optimal setup for your property</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* System Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Database" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Storage Capacity</span>
            </div>
            <div className="text-lg font-bold text-foreground">
              {systemSpecs?.recommendedCapacity ? 
                `${Math.round(systemSpecs?.recommendedCapacity)?.toLocaleString()} gallons` : 
                'Not specified'
              }
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={getFilterIcon(systemSpecs?.filterType)} size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Filter System</span>
            </div>
            <div className="text-lg font-bold text-foreground">
              {systemSpecs?.filterType || 'Standard'} Filtration
            </div>
          </div>
        </div>

        {/* Pump Requirement */}
        {systemSpecs?.pumpRequired && (
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Zap" size={16} className="text-accent" />
              <span className="text-sm font-medium text-foreground">Pump System Required</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Due to your storage capacity requirements, a pump system is recommended for optimal water distribution.
            </p>
          </div>
        )}

        {/* Recommendations List */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="Lightbulb" size={16} className="text-warning" />
            Expert Recommendations
          </h4>
          <div className="space-y-3">
            {recommendations && recommendations?.length > 0 ? (
              recommendations?.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                  <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={12} className="text-success" />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {recommendation}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground italic">
                No specific recommendations available. Consider consulting with a local rainwater harvesting expert.
              </div>
            )}
          </div>
        </div>

        {/* Installation Tips */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="Info" size={16} className="text-primary" />
            Installation Considerations
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Check local building codes</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Ensure proper mosquito control</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Thermometer" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Consider freeze protection</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Wrench" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Plan maintenance access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemRecommendations;