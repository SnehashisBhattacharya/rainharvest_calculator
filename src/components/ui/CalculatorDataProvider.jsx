import React, { createContext, useContext, useState, useCallback } from 'react';

const CalculatorDataContext = createContext();

export const useCalculatorData = () => {
  const context = useContext(CalculatorDataContext);
  if (!context) {
    throw new Error('useCalculatorData must be used within a CalculatorDataProvider');
  }
  return context;
};

const CalculatorDataProvider = ({ children }) => {
  const [calculatorData, setCalculatorData] = useState({
    // Property Information
    propertyType: '',
    roofArea: '',
    roofMaterial: '',
    location: '',
    
    // Rainfall Data
    averageRainfall: '',
    rainyDays: '',
    
    // Water Usage
    householdSize: '',
    dailyWaterUsage: '',
    
    // System Preferences
    storageCapacity: '',
    systemType: '',
    budget: '',
    
    // Validation
    errors: {},
    isValid: false
  });

  const [calculationResults, setCalculationResults] = useState({
    feasibilityScore: null,
    annualHarvestPotential: null,
    costSavings: null,
    paybackPeriod: null,
    environmentalImpact: null,
    recommendations: [],
    systemSpecs: {},
    isCalculated: false
  });

  const [reportData, setReportData] = useState({
    generatedAt: null,
    reportId: null,
    summary: '',
    detailedAnalysis: {},
    charts: [],
    actionItems: []
  });

  const updateCalculatorData = useCallback((field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev?.errors,
        [field]: null // Clear error when field is updated
      }
    }));
  }, []);

  const updateMultipleFields = useCallback((updates) => {
    setCalculatorData(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const setFieldError = useCallback((field, error) => {
    setCalculatorData(prev => ({
      ...prev,
      errors: {
        ...prev?.errors,
        [field]: error
      }
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setCalculatorData(prev => ({
      ...prev,
      errors: {}
    }));
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    const data = calculatorData;

    // Required field validation
    if (!data?.propertyType) errors.propertyType = 'Property type is required';
    if (!data?.roofArea || data?.roofArea <= 0) errors.roofArea = 'Valid roof area is required';
    if (!data?.roofMaterial) errors.roofMaterial = 'Roof material is required';
    if (!data?.location) errors.location = 'Location is required';
    if (!data?.averageRainfall || data?.averageRainfall <= 0) errors.averageRainfall = 'Valid rainfall data is required';
    if (!data?.householdSize || data?.householdSize <= 0) errors.householdSize = 'Household size is required';
    if (!data?.dailyWaterUsage || data?.dailyWaterUsage <= 0) errors.dailyWaterUsage = 'Daily water usage is required';

    const isValid = Object.keys(errors)?.length === 0;

    setCalculatorData(prev => ({
      ...prev,
      errors,
      isValid
    }));

    return isValid;
  }, [calculatorData]);

  const calculateResults = useCallback(async () => {
    if (!validateForm()) {
      return false;
    }

    // Simulate calculation process
    const data = calculatorData;
    
    // Mock calculation logic
    const roofEfficiency = data?.roofMaterial === 'metal' ? 0.9 : 
                         data?.roofMaterial === 'tile' ? 0.8 : 0.7;
    
    const annualHarvest = (data?.roofArea * data?.averageRainfall * roofEfficiency * 0.623); // Convert to gallons
    const feasibilityScore = Math.min(100, (annualHarvest / (data?.dailyWaterUsage * 365)) * 100);
    const costSavings = annualHarvest * 0.004; // Approximate cost per gallon
    const systemCost = data?.storageCapacity * 2.5; // Approximate cost per gallon storage
    const paybackPeriod = systemCost / costSavings;

    const results = {
      feasibilityScore: Math.round(feasibilityScore),
      annualHarvestPotential: Math.round(annualHarvest),
      costSavings: Math.round(costSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      environmentalImpact: {
        carbonReduction: Math.round(annualHarvest * 0.002), // kg CO2
        waterConservation: Math.round(annualHarvest)
      },
      recommendations: generateRecommendations(feasibilityScore, data),
      systemSpecs: {
        recommendedCapacity: Math.min(data?.storageCapacity || 1000, annualHarvest / 4),
        filterType: data?.roofMaterial === 'metal' ? 'Basic' : 'Advanced',
        pumpRequired: data?.storageCapacity > 500
      },
      isCalculated: true
    };

    setCalculationResults(results);

    // Generate report data
    const report = {
      generatedAt: new Date()?.toISOString(),
      reportId: `RH-${Date.now()}`,
      summary: generateSummary(results, data),
      detailedAnalysis: results,
      charts: generateChartData(results, data),
      actionItems: generateActionItems(results, data)
    };

    setReportData(report);
    return true;
  }, [calculatorData, validateForm]);

  const generateRecommendations = (score, data) => {
    const recommendations = [];
    
    if (score >= 80) {
      recommendations?.push('Excellent feasibility - proceed with full system installation');
    } else if (score >= 60) {
      recommendations?.push('Good feasibility - consider phased implementation');
    } else if (score >= 40) {
      recommendations?.push('Moderate feasibility - focus on high-efficiency components');
    } else {
      recommendations?.push('Low feasibility - consider supplementary water sources');
    }

    if (data?.roofMaterial === 'asphalt') {
      recommendations?.push('Consider upgrading to metal roofing for better water quality');
    }

    if (data?.storageCapacity < 500) {
      recommendations?.push('Increase storage capacity for better water security');
    }

    return recommendations;
  };

  const generateSummary = (results, data) => {
    return `Based on your ${data?.roofArea} sq ft ${data?.roofMaterial} roof and ${data?.averageRainfall}" annual rainfall, 
            your property has a ${results?.feasibilityScore}% feasibility score for rainwater harvesting. 
            You can potentially harvest ${results?.annualHarvestPotential} gallons annually, 
            saving approximately $${results?.costSavings} per year.`;
  };

  const generateChartData = (results, data) => {
    return [
      {
        type: 'feasibility',
        data: {
          score: results?.feasibilityScore,
          breakdown: {
            rainfall: 25,
            roofArea: 20,
            efficiency: 15,
            usage: 40
          }
        }
      },
      {
        type: 'savings',
        data: {
          monthly: results?.costSavings / 12,
          annual: results?.costSavings,
          projected: Array.from({ length: 10 }, (_, i) => results?.costSavings * (i + 1))
        }
      }
    ];
  };

  const generateActionItems = (results, data) => {
    const items = [];
    
    if (results?.feasibilityScore >= 60) {
      items?.push({
        priority: 'high',
        task: 'Contact local contractors for system quotes',
        timeline: '1-2 weeks'
      });
    }

    items?.push({
      priority: 'medium',
      task: 'Research local permits and regulations',
      timeline: '2-3 weeks'
    });

    if (results?.systemSpecs?.pumpRequired) {
      items?.push({
        priority: 'medium',
        task: 'Plan electrical requirements for pump system',
        timeline: '3-4 weeks'
      });
    }

    return items;
  };

  const resetCalculator = useCallback(() => {
    setCalculatorData({
      propertyType: '',
      roofArea: '',
      roofMaterial: '',
      location: '',
      averageRainfall: '',
      rainyDays: '',
      householdSize: '',
      dailyWaterUsage: '',
      storageCapacity: '',
      systemType: '',
      budget: '',
      errors: {},
      isValid: false
    });

    setCalculationResults({
      feasibilityScore: null,
      annualHarvestPotential: null,
      costSavings: null,
      paybackPeriod: null,
      environmentalImpact: null,
      recommendations: [],
      systemSpecs: {},
      isCalculated: false
    });

    setReportData({
      generatedAt: null,
      reportId: null,
      summary: '',
      detailedAnalysis: {},
      charts: [],
      actionItems: []
    });
  }, []);

  const contextValue = {
    // Data
    calculatorData,
    calculationResults,
    reportData,
    
    // Actions
    updateCalculatorData,
    updateMultipleFields,
    setFieldError,
    clearErrors,
    validateForm,
    calculateResults,
    resetCalculator,
    
    // Computed values
    isFormValid: calculatorData?.isValid,
    hasResults: calculationResults?.isCalculated,
    hasErrors: Object.keys(calculatorData?.errors)?.length > 0
  };

  return (
    <CalculatorDataContext.Provider value={contextValue}>
      {children}
    </CalculatorDataContext.Provider>
  );
};

export default CalculatorDataProvider;