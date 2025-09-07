import React from 'react';

import Select from '../../../components/ui/Select';

const HouseholdDetailsForm = ({ 
  dwellers, 
  onDwellersChange, 
  soilType, 
  onSoilTypeChange,
  errors 
}) => {
  const soilTypeOptions = [
    { value: 'clay', label: 'Clay Soil', description: 'Low permeability - good for surface storage' },
    { value: 'sandy', label: 'Sandy Soil', description: 'High permeability - ideal for recharge pits' },
    { value: 'loamy', label: 'Loamy Soil', description: 'Balanced drainage - versatile for most systems' },
    { value: 'rocky', label: 'Rocky/Hard Soil', description: 'Poor infiltration - requires surface storage' },
    { value: 'mixed', label: 'Mixed Soil', description: 'Combination of soil types' },
    { value: 'unknown', label: 'Not Sure', description: 'We\'ll provide general recommendations' }
  ];

  const dwellerOptions = [
    { value: '1', label: '1 person' },
    { value: '2', label: '2 people' },
    { value: '3', label: '3 people' },
    { value: '4', label: '4 people' },
    { value: '5', label: '5 people' },
    { value: '6', label: '6 people' },
    { value: '7', label: '7 people' },
    { value: '8', label: '8 people' },
    { value: '9', label: '9 people' },
    { value: '10+', label: '10 or more people' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Number of Dwellers"
          placeholder="Select household size"
          options={dwellerOptions}
          value={dwellers}
          onChange={onDwellersChange}
          error={errors?.dwellers}
          required
          description="Total number of people living in the property"
        />

        <Select
          label="Soil Type (Optional)"
          placeholder="Select soil type"
          options={soilTypeOptions}
          value={soilType}
          onChange={onSoilTypeChange}
          error={errors?.soilType}
          description="Helps determine the best harvesting system for your property"
        />
      </div>
      <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-secondary text-sm font-medium">🌱</span>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">Water Usage Estimates</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Average daily water usage per person: 80-100 gallons</p>
              <p>• Household activities: drinking, cooking, bathing, cleaning</p>
              <p>• Rainwater can supplement 30-70% of non-potable needs</p>
              <p>• Soil type affects storage and recharge system design</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-accent text-sm font-medium">🔍</span>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">Soil Type Identification</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• <strong>Clay:</strong> Sticky when wet, hard when dry, slow drainage</p>
              <p>• <strong>Sandy:</strong> Gritty texture, drains quickly, loose structure</p>
              <p>• <strong>Loamy:</strong> Smooth texture, holds moisture well, dark color</p>
              <p>• <strong>Rocky:</strong> Visible stones, hard to dig, poor water retention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseholdDetailsForm;