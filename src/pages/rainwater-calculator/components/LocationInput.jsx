import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LocationInput = ({ value, onChange, error }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionError, setDetectionError] = useState('');

  const cityOptions = [
    { value: 'new-york', label: 'New York, NY' },
    { value: 'los-angeles', label: 'Los Angeles, CA' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'houston', label: 'Houston, TX' },
    { value: 'phoenix', label: 'Phoenix, AZ' },
    { value: 'philadelphia', label: 'Philadelphia, PA' },
    { value: 'san-antonio', label: 'San Antonio, TX' },
    { value: 'san-diego', label: 'San Diego, CA' },
    { value: 'dallas', label: 'Dallas, TX' },
    { value: 'san-jose', label: 'San Jose, CA' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'jacksonville', label: 'Jacksonville, FL' },
    { value: 'fort-worth', label: 'Fort Worth, TX' },
    { value: 'columbus', label: 'Columbus, OH' },
    { value: 'charlotte', label: 'Charlotte, NC' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'indianapolis', label: 'Indianapolis, IN' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'denver', label: 'Denver, CO' },
    { value: 'washington', label: 'Washington, DC' }
  ];

  const handleAutoDetect = () => {
    if (!navigator.geolocation) {
      setDetectionError('Geolocation is not supported by this browser');
      return;
    }

    setIsDetecting(true);
    setDetectionError('');

    navigator.geolocation?.getCurrentPosition(
      (position) => {
        // Mock reverse geocoding - in real app would use actual service
        const mockCities = ['new-york', 'los-angeles', 'chicago', 'houston', 'phoenix'];
        const randomCity = mockCities?.[Math.floor(Math.random() * mockCities?.length)];
        const selectedCity = cityOptions?.find(city => city?.value === randomCity);
        
        onChange(selectedCity?.value || '');
        setIsDetecting(false);
      },
      (error) => {
        let errorMessage = 'Unable to detect location';
        switch (error?.code) {
          case error?.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error?.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error?.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        setDetectionError(errorMessage);
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Select
            label="Location"
            placeholder="Select your city"
            options={cityOptions}
            value={value}
            onChange={onChange}
            error={error}
            searchable
            required
            description="Choose your city to get accurate rainfall data"
          />
        </div>
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={handleAutoDetect}
            disabled={isDetecting}
            loading={isDetecting}
            iconName="MapPin"
            iconPosition="left"
            className="whitespace-nowrap"
          >
            {isDetecting ? 'Detecting...' : 'Auto-detect'}
          </Button>
        </div>
      </div>

      {detectionError && (
        <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <Icon name="AlertTriangle" size={16} className="text-warning flex-shrink-0" />
          <p className="text-sm text-warning">{detectionError}</p>
        </div>
      )}
    </div>
  );
};

export default LocationInput;