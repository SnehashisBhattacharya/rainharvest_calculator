import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalculatorData } from '../../components/ui/CalculatorDataProvider';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import LocationInput from './components/LocationInput';
import PropertyDetailsForm from './components/PropertyDetailsForm';
import HouseholdDetailsForm from './components/HouseholdDetailsForm';
import FormActions from './components/FormActions';
import ProgressIndicator from './components/ProgressIndicator';
import ValidationSummary from './components/ValidationSummary';
import Icon from '../../components/AppIcon';

const RainwaterCalculator = () => {
  const navigate = useNavigate();
  const { 
    calculatorData, 
    updateCalculatorData, 
    validateForm, 
    calculateResults,
    resetCalculator 
  } = useCalculatorData();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const stepLabels = ['Location', 'Property Details', 'Household Info', 'Review'];
  const totalSteps = stepLabels?.length;

  // Form state
  const [formData, setFormData] = useState({
    location: calculatorData?.location || '',
    roofArea: calculatorData?.roofArea || '',
    roofType: calculatorData?.roofType || '',
    openSpace: calculatorData?.openSpace || '',
    dwellers: calculatorData?.householdSize || '',
    soilType: calculatorData?.soilType || ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Sync with calculator data context
    setFormData({
      location: calculatorData?.location || '',
      roofArea: calculatorData?.roofArea || '',
      roofType: calculatorData?.roofMaterial || '',
      openSpace: calculatorData?.openSpace || '',
      dwellers: calculatorData?.householdSize || '',
      soilType: calculatorData?.soilType || ''
    });
  }, [calculatorData]);

  const validateCurrentStep = () => {
    const newErrors = {};

    switch (currentStep) {
      case 1: // Location
        if (!formData?.location) {
          newErrors.location = 'Please select your location';
        }
        break;
      case 2: // Property Details
        if (!formData?.roofArea || parseFloat(formData?.roofArea) <= 0) {
          newErrors.roofArea = 'Please enter a valid roof area';
        }
        if (!formData?.roofType) {
          newErrors.roofType = 'Please select your roof type';
        }
        if (formData?.openSpace && parseFloat(formData?.openSpace) < 0) {
          newErrors.openSpace = 'Open space area cannot be negative';
        }
        break;
      case 3: // Household Details
        if (!formData?.dwellers) {
          newErrors.dwellers = 'Please select the number of dwellers';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      setShowValidation(false);
    } else {
      setShowValidation(true);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setShowValidation(false);
  };

  const handleSubmit = async () => {
    // Validate all steps
    const allErrors = {};
    
    if (!formData?.location) allErrors.location = 'Location is required';
    if (!formData?.roofArea || parseFloat(formData?.roofArea) <= 0) allErrors.roofArea = 'Valid roof area is required';
    if (!formData?.roofType) allErrors.roofType = 'Roof type is required';
    if (!formData?.dwellers) allErrors.dwellers = 'Number of dwellers is required';
    if (formData?.openSpace && parseFloat(formData?.openSpace) < 0) allErrors.openSpace = 'Open space cannot be negative';

    if (Object.keys(allErrors)?.length > 0) {
      setErrors(allErrors);
      setShowValidation(true);
      return;
    }

    setIsSubmitting(true);
    setShowValidation(false);

    try {
      // Update calculator data context
      updateCalculatorData('location', formData?.location);
      updateCalculatorData('roofArea', parseFloat(formData?.roofArea));
      updateCalculatorData('roofMaterial', formData?.roofType);
      updateCalculatorData('openSpace', parseFloat(formData?.openSpace) || 0);
      updateCalculatorData('householdSize', parseInt(formData?.dwellers));
      updateCalculatorData('soilType', formData?.soilType);
      
      // Mock rainfall data based on location
      const mockRainfallData = {
        'new-york': 47.3,
        'los-angeles': 14.9,
        'chicago': 36.9,
        'houston': 49.8,
        'phoenix': 8.3,
        'philadelphia': 41.5,
        'san-antonio': 32.3,
        'san-diego': 10.3,
        'dallas': 37.6,
        'san-jose': 15.8
      };
      
      updateCalculatorData('averageRainfall', mockRainfallData?.[formData?.location] || 35.0);
      updateCalculatorData('dailyWaterUsage', parseInt(formData?.dwellers) * 85); // 85 gallons per person
      updateCalculatorData('storageCapacity', 1000); // Default storage capacity

      // Simulate calculation delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Calculate results
      const success = await calculateResults();
      
      if (success) {
        navigate('/feasibility-report');
      }
    } catch (error) {
      console.error('Calculation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      location: '',
      roofArea: '',
      roofType: '',
      openSpace: '',
      dwellers: '',
      soilType: ''
    });
    setErrors({});
    setCurrentStep(1);
    setShowValidation(false);
    resetCalculator();
  };

  const isFormValid = formData?.location && formData?.roofArea && formData?.roofType && formData?.dwellers;
  const hasData = Object.values(formData)?.some(value => value !== '');

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <LocationInput
            value={formData?.location}
            onChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
            error={errors?.location}
          />
        );
      case 2:
        return (
          <PropertyDetailsForm
            roofArea={formData?.roofArea}
            onRoofAreaChange={(value) => setFormData(prev => ({ ...prev, roofArea: value }))}
            roofType={formData?.roofType}
            onRoofTypeChange={(value) => setFormData(prev => ({ ...prev, roofType: value }))}
            openSpace={formData?.openSpace}
            onOpenSpaceChange={(value) => setFormData(prev => ({ ...prev, openSpace: value }))}
            errors={errors}
          />
        );
      case 3:
        return (
          <HouseholdDetailsForm
            dwellers={formData?.dwellers}
            onDwellersChange={(value) => setFormData(prev => ({ ...prev, dwellers: value }))}
            soilType={formData?.soilType}
            onSoilTypeChange={(value) => setFormData(prev => ({ ...prev, soilType: value }))}
            errors={errors}
          />
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Review Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-medium text-foreground">
                      {formData?.location ? 
                        formData?.location?.split('-')?.map(word => 
                          word?.charAt(0)?.toUpperCase() + word?.slice(1)
                        )?.join(' ') 
                        : 'Not selected'
                      }
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Roof Area:</span>
                    <p className="font-medium text-foreground">{formData?.roofArea} m²</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Roof Type:</span>
                    <p className="font-medium text-foreground">
                      {formData?.roofType ? formData?.roofType?.toUpperCase() : 'Not selected'}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-muted-foreground">Open Space:</span>
                    <p className="font-medium text-foreground">{formData?.openSpace || 0} m²</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Household Size:</span>
                    <p className="font-medium text-foreground">
                      {formData?.dwellers} {parseInt(formData?.dwellers) === 1 ? 'person' : 'people'}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Soil Type:</span>
                    <p className="font-medium text-foreground">
                      {formData?.soilType ? 
                        formData?.soilType?.charAt(0)?.toUpperCase() + formData?.soilType?.slice(1) 
                        : 'Not specified'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Calculator" size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Rainwater Calculator</h1>
              <p className="text-sm text-muted-foreground">Calculate your rainwater harvesting potential</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24">
        <div className="bg-card rounded-lg border border-border p-6 md:p-8">
          <ProgressIndicator 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
            stepLabels={stepLabels} 
          />

          <ValidationSummary errors={errors} isVisible={showValidation} />

          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
            {currentStep < totalSteps ? (
              <>
                <div className="flex gap-3 flex-1">
                  {currentStep > 1 && (
                    <button
                      onClick={handlePrevious}
                      disabled={isSubmitting}
                      className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      ← Previous
                    </button>
                  )}
                </div>
                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium"
                >
                  Next →
                </button>
              </>
            ) : (
              <FormActions
                onSubmit={handleSubmit}
                onReset={handleReset}
                isSubmitting={isSubmitting}
                isFormValid={isFormValid}
                hasData={hasData}
              />
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-muted/30 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="HelpCircle" size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Our calculator uses your property details and local rainfall data to estimate your rainwater harvesting potential.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => navigate('/learning-center')}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Learn More →
                </button>
                <span className="text-muted-foreground">•</span>
                <button
                  onClick={() => navigate('/learning-center')}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View Examples →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomTabNavigation />
    </div>
  );
};

export default RainwaterCalculator;