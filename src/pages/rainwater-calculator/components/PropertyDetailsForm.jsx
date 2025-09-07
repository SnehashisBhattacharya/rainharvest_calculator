import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PropertyDetailsForm = ({ 
  roofArea, 
  onRoofAreaChange, 
  roofType, 
  onRoofTypeChange, 
  openSpace, 
  onOpenSpaceChange,
  errors 
}) => {
  const roofTypeOptions = [
    { value: 'rcc', label: 'RCC (Reinforced Concrete Cement)', description: 'Flat concrete roof - excellent for water collection' },
    { value: 'tile', label: 'Clay Tile', description: 'Traditional clay tiles - good water quality' },
    { value: 'metal', label: 'Metal Roofing', description: 'Corrugated iron or steel - high efficiency' },
    { value: 'asphalt', label: 'Asphalt Shingles', description: 'Common residential roofing - moderate efficiency' },
    { value: 'slate', label: 'Slate', description: 'Natural stone tiles - excellent durability' },
    { value: 'thatch', label: 'Thatch', description: 'Traditional straw/palm - requires filtration' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Roof Area"
          type="number"
          placeholder="Enter roof area"
          value={roofArea}
          onChange={(e) => onRoofAreaChange(e?.target?.value)}
          error={errors?.roofArea}
          required
          min="1"
          description="Total roof area in square meters (m²)"
          className="w-full"
        />

        <Input
          label="Open Space Area"
          type="number"
          placeholder="Enter open space area"
          value={openSpace}
          onChange={(e) => onOpenSpaceChange(e?.target?.value)}
          error={errors?.openSpace}
          min="0"
          description="Additional catchment area in square meters (m²)"
          className="w-full"
        />
      </div>
      <Select
        label="Roof Type"
        placeholder="Select your roof material"
        options={roofTypeOptions}
        value={roofType}
        onChange={onRoofTypeChange}
        error={errors?.roofType}
        required
        description="Different materials have varying water collection efficiency"
      />
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-primary text-sm font-medium">💡</span>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">Measurement Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Measure the horizontal projection of your roof, not the sloped surface</li>
              <li>• Include all roof sections that drain to accessible gutters</li>
              <li>• Open space includes courtyards, driveways, and paved areas</li>
              <li>• Use online maps or property documents for accurate measurements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsForm;