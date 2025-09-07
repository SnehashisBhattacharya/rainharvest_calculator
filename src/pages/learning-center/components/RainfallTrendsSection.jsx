import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RainfallTrendsSection = () => {
  const [selectedCity, setSelectedCity] = useState('seattle');
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('yearly');

  const cities = [
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'portland', label: 'Portland, OR' },
    { value: 'denver', label: 'Denver, CO' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'atlanta', label: 'Atlanta, GA' }
  ];

  const rainfallData = {
    seattle: {
      yearly: [
        { year: '2019', rainfall: 37.2, average: 38.1 },
        { year: '2020', rainfall: 42.1, average: 38.1 },
        { year: '2021', rainfall: 35.8, average: 38.1 },
        { year: '2022', rainfall: 39.4, average: 38.1 },
        { year: '2023', rainfall: 41.2, average: 38.1 },
        { year: '2024', rainfall: 36.9, average: 38.1 }
      ],
      monthly: [
        { month: 'Jan', rainfall: 5.2, average: 5.1 },
        { month: 'Feb', rainfall: 3.8, average: 3.7 },
        { month: 'Mar', rainfall: 3.6, average: 3.8 },
        { month: 'Apr', rainfall: 2.4, average: 2.5 },
        { month: 'May', rainfall: 1.8, average: 1.9 },
        { month: 'Jun', rainfall: 1.2, average: 1.5 },
        { month: 'Jul', rainfall: 0.8, average: 0.9 },
        { month: 'Aug', rainfall: 1.1, average: 1.2 },
        { month: 'Sep', rainfall: 1.9, average: 1.6 },
        { month: 'Oct', rainfall: 3.4, average: 3.2 },
        { month: 'Nov', rainfall: 5.7, average: 5.9 },
        { month: 'Dec', rainfall: 6.0, average: 6.2 }
      ]
    },
    portland: {
      yearly: [
        { year: '2019', rainfall: 36.8, average: 36.3 },
        { year: '2020', rainfall: 39.2, average: 36.3 },
        { year: '2021', rainfall: 34.1, average: 36.3 },
        { year: '2022', rainfall: 37.9, average: 36.3 },
        { year: '2023', rainfall: 38.7, average: 36.3 },
        { year: '2024', rainfall: 35.4, average: 36.3 }
      ],
      monthly: [
        { month: 'Jan', rainfall: 4.9, average: 4.8 },
        { month: 'Feb', rainfall: 3.5, average: 3.4 },
        { month: 'Mar', rainfall: 3.3, average: 3.5 },
        { month: 'Apr', rainfall: 2.2, average: 2.3 },
        { month: 'May', rainfall: 1.6, average: 1.7 },
        { month: 'Jun', rainfall: 1.0, average: 1.3 },
        { month: 'Jul', rainfall: 0.6, average: 0.7 },
        { month: 'Aug', rainfall: 0.9, average: 1.0 },
        { month: 'Sep', rainfall: 1.7, average: 1.4 },
        { month: 'Oct', rainfall: 3.1, average: 2.9 },
        { month: 'Nov', rainfall: 5.4, average: 5.6 },
        { month: 'Dec', rainfall: 5.8, average: 6.0 }
      ]
    },
    denver: {
      yearly: [
        { year: '2019', rainfall: 15.2, average: 15.8 },
        { year: '2020', rainfall: 17.1, average: 15.8 },
        { year: '2021', rainfall: 14.3, average: 15.8 },
        { year: '2022', rainfall: 16.8, average: 15.8 },
        { year: '2023', rainfall: 18.2, average: 15.8 },
        { year: '2024', rainfall: 14.9, average: 15.8 }
      ],
      monthly: [
        { month: 'Jan', rainfall: 0.6, average: 0.5 },
        { month: 'Feb', rainfall: 0.7, average: 0.6 },
        { month: 'Mar', rainfall: 1.3, average: 1.2 },
        { month: 'Apr', rainfall: 1.8, average: 1.9 },
        { month: 'May', rainfall: 2.4, average: 2.6 },
        { month: 'Jun', rainfall: 1.9, average: 2.0 },
        { month: 'Jul', rainfall: 2.1, average: 2.3 },
        { month: 'Aug', rainfall: 1.8, average: 1.9 },
        { month: 'Sep', rainfall: 1.2, average: 1.1 },
        { month: 'Oct', rainfall: 1.0, average: 0.9 },
        { month: 'Nov', rainfall: 0.8, average: 0.7 },
        { month: 'Dec', rainfall: 0.5, average: 0.6 }
      ]
    },
    austin: {
      yearly: [
        { year: '2019', rainfall: 34.2, average: 32.5 },
        { year: '2020', rainfall: 31.8, average: 32.5 },
        { year: '2021', rainfall: 28.9, average: 32.5 },
        { year: '2022', rainfall: 35.7, average: 32.5 },
        { year: '2023', rainfall: 33.1, average: 32.5 },
        { year: '2024', rainfall: 30.4, average: 32.5 }
      ],
      monthly: [
        { month: 'Jan', rainfall: 1.9, average: 2.0 },
        { month: 'Feb', rainfall: 2.1, average: 2.3 },
        { month: 'Mar', rainfall: 2.8, average: 2.9 },
        { month: 'Apr', rainfall: 2.9, average: 3.1 },
        { month: 'May', rainfall: 4.2, average: 4.6 },
        { month: 'Jun', rainfall: 3.1, average: 3.5 },
        { month: 'Jul', rainfall: 2.0, average: 2.1 },
        { month: 'Aug', rainfall: 2.2, average: 2.4 },
        { month: 'Sep', rainfall: 3.4, average: 3.2 },
        { month: 'Oct', rainfall: 3.0, average: 2.9 },
        { month: 'Nov', rainfall: 2.5, average: 2.4 },
        { month: 'Dec', rainfall: 2.3, average: 2.1 }
      ]
    },
    atlanta: {
      yearly: [
        { year: '2019', rainfall: 50.2, average: 49.7 },
        { year: '2020', rainfall: 52.8, average: 49.7 },
        { year: '2021', rainfall: 47.1, average: 49.7 },
        { year: '2022', rainfall: 48.9, average: 49.7 },
        { year: '2023', rainfall: 51.3, average: 49.7 },
        { year: '2024', rainfall: 46.8, average: 49.7 }
      ],
      monthly: [
        { month: 'Jan', rainfall: 4.1, average: 4.0 },
        { month: 'Feb', rainfall: 4.3, average: 4.2 },
        { month: 'Mar', rainfall: 4.8, average: 4.9 },
        { month: 'Apr', rainfall: 3.6, average: 3.4 },
        { month: 'May', rainfall: 3.9, average: 4.1 },
        { month: 'Jun', rainfall: 4.2, average: 4.5 },
        { month: 'Jul', rainfall: 5.1, average: 5.3 },
        { month: 'Aug', rainfall: 4.8, average: 4.6 },
        { month: 'Sep', rainfall: 3.2, average: 3.5 },
        { month: 'Oct', rainfall: 2.9, average: 2.8 },
        { month: 'Nov', rainfall: 3.8, average: 3.7 },
        { month: 'Dec', rainfall: 4.2, average: 4.0 }
      ]
    }
  };

  const currentData = rainfallData?.[selectedCity]?.[timeRange];
  const currentCity = cities?.find(city => city?.value === selectedCity);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-1">{`${timeRange === 'yearly' ? 'Year' : 'Month'}: ${label}`}</p>
          <p className="text-primary">
            {`Actual: ${payload?.[0]?.value}" rainfall`}
          </p>
          {payload?.[1] && (
            <p className="text-muted-foreground">
              {`Average: ${payload?.[1]?.value}" rainfall`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: currentData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey={timeRange === 'yearly' ? 'year' : 'month'} 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Rainfall (inches)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="rainfall" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="average" 
              stroke="var(--color-muted-foreground)" 
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey={timeRange === 'yearly' ? 'year' : 'month'} 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Rainfall (inches)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="rainfall" 
              stroke="var(--color-primary)" 
              fill="var(--color-primary)"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="average" 
              stroke="var(--color-muted-foreground)" 
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        );
      default:
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey={timeRange === 'yearly' ? 'year' : 'month'} 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Rainfall (inches)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="rainfall" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
            <Line 
              type="monotone" 
              dataKey="average" 
              stroke="var(--color-muted-foreground)" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </BarChart>
        );
    }
  };

  const totalRainfall = currentData?.reduce((sum, item) => sum + item?.rainfall, 0);
  const averageRainfall = currentData?.reduce((sum, item) => sum + item?.average, 0);

  return (
    <section className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Rainfall Trends Analysis</h2>
        <p className="text-muted-foreground">
          Explore historical rainfall data to understand harvesting potential in your area
        </p>
      </div>
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Select City</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
          >
            {cities?.map((city) => (
              <option key={city?.value} value={city?.value}>
                {city?.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Time Range</label>
          <div className="flex gap-2">
            <Button
              variant={timeRange === 'yearly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('yearly')}
              className="flex-1"
            >
              Yearly
            </Button>
            <Button
              variant={timeRange === 'monthly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('monthly')}
              className="flex-1"
            >
              Monthly
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Chart Type</label>
          <div className="flex gap-1">
            {[
              { type: 'bar', icon: 'BarChart3' },
              { type: 'line', icon: 'TrendingUp' },
              { type: 'area', icon: 'Activity' }
            ]?.map((chart) => (
              <Button
                key={chart?.type}
                variant={chartType === chart?.type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setChartType(chart?.type)}
                iconName={chart?.icon}
                className="flex-1"
              />
            ))}
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <Icon name="CloudRain" size={20} className="text-primary" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Rainfall</p>
          <p className="text-xl font-bold text-foreground">
            {totalRainfall?.toFixed(1)}"
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-2">
            <Icon name="Target" size={20} className="text-secondary" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Historical Average</p>
          <p className="text-xl font-bold text-foreground">
            {averageRainfall?.toFixed(1)}"
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
            <Icon name="Droplets" size={20} className="text-accent" />
          </div>
          <p className="text-sm text-muted-foreground mb-1">Harvest Potential</p>
          <p className="text-xl font-bold text-foreground">
            {((totalRainfall * 1000) * 0.623)?.toFixed(0)} gal/1000 sq ft
          </p>
        </div>
      </div>
      {/* Chart */}
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-foreground mb-4">
          {currentCity?.label} - {timeRange === 'yearly' ? 'Annual' : 'Monthly'} Rainfall Trends
        </h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
      {/* Insights */}
      <div className="bg-primary/5 rounded-lg border border-primary/20 p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
            <Icon name="Lightbulb" size={16} className="text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Rainfall Insights</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                • {currentCity?.label} receives an average of {averageRainfall?.toFixed(1)} inches of rainfall {timeRange === 'yearly' ? 'annually' : 'per month'}
              </p>
              <p>
                • A 1,000 sq ft roof could harvest approximately {((averageRainfall * 1000) * 0.623)?.toFixed(0)} gallons of water {timeRange === 'yearly' ? 'per year' : 'monthly'}
              </p>
              <p>
                • Peak rainfall typically occurs during {timeRange === 'monthly' ? 'winter months' : 'wet seasons'}, ideal for system sizing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RainfallTrendsSection;