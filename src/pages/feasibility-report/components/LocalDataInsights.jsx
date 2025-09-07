import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const LocalDataInsights = ({ location }) => {
  // Mock rainfall data for demonstration
  const rainfallData = [
    { month: 'Jan', rainfall: 2.1, average: 2.5 },
    { month: 'Feb', rainfall: 2.8, average: 2.9 },
    { month: 'Mar', rainfall: 3.2, average: 3.1 },
    { month: 'Apr', rainfall: 3.8, average: 3.5 },
    { month: 'May', rainfall: 4.2, average: 4.0 },
    { month: 'Jun', rainfall: 3.9, average: 3.7 },
    { month: 'Jul', rainfall: 4.1, average: 3.8 },
    { month: 'Aug', rainfall: 3.7, average: 3.9 },
    { month: 'Sep', rainfall: 3.3, average: 3.4 },
    { month: 'Oct', rainfall: 2.9, average: 3.0 },
    { month: 'Nov', rainfall: 2.4, average: 2.6 },
    { month: 'Dec', rainfall: 2.0, average: 2.3 }
  ];

  const totalRainfall = rainfallData?.reduce((sum, month) => sum + month?.rainfall, 0);
  const averageRainfall = rainfallData?.reduce((sum, month) => sum + month?.average, 0);

  // Mock groundwater and aquifer data
  const groundwaterData = {
    depth: '15-25 feet',
    quality: 'Good',
    aquiferType: 'Unconfined',
    rechargeRate: 'Moderate',
    seasonalVariation: 'Low to Moderate'
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="MapPin" size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Local Data Insights</h3>
          <p className="text-sm text-muted-foreground">
            {location || 'Your area'} environmental conditions
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Rainfall Chart */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="CloudRain" size={16} className="text-primary" />
            Monthly Rainfall Pattern
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rainfallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  label={{ value: 'Inches', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-foreground)'
                  }}
                />
                <Bar dataKey="rainfall" fill="var(--color-primary)" name="Current Year" />
                <Bar dataKey="average" fill="var(--color-muted)" name="10-Year Average" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div className="text-center p-2 bg-primary/5 rounded">
              <div className="font-bold text-primary">{totalRainfall?.toFixed(1)}"</div>
              <div className="text-muted-foreground">Current Year</div>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <div className="font-bold text-foreground">{averageRainfall?.toFixed(1)}"</div>
              <div className="text-muted-foreground">10-Year Average</div>
            </div>
          </div>
        </div>

        {/* Groundwater Information */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="Waves" size={16} className="text-secondary" />
            Groundwater Characteristics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-muted-foreground">Water Table Depth:</span>
                <span className="text-sm font-medium text-foreground">{groundwaterData?.depth}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-muted-foreground">Water Quality:</span>
                <span className="text-sm font-medium text-success">{groundwaterData?.quality}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-muted-foreground">Aquifer Type:</span>
                <span className="text-sm font-medium text-foreground">{groundwaterData?.aquiferType}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-muted-foreground">Recharge Rate:</span>
                <span className="text-sm font-medium text-warning">{groundwaterData?.rechargeRate}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="text-sm text-muted-foreground">Seasonal Variation:</span>
                <span className="text-sm font-medium text-foreground">{groundwaterData?.seasonalVariation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Climate Insights */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="Thermometer" size={16} className="text-warning" />
            Climate Considerations
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 p-2 bg-success/5 rounded">
              <Icon name="Sun" size={14} className="text-warning" />
              <span className="text-muted-foreground">Peak season: May-August</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-primary/5 rounded">
              <Icon name="Snowflake" size={14} className="text-primary" />
              <span className="text-muted-foreground">Dry season: December-February</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-secondary/5 rounded">
              <Icon name="Wind" size={14} className="text-secondary" />
              <span className="text-muted-foreground">Moderate evaporation rate</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-warning/5 rounded">
              <Icon name="CloudRain" size={14} className="text-primary" />
              <span className="text-muted-foreground">Reliable precipitation pattern</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalDataInsights;