import React from 'react';
import Button from '../../../components/ui/Button';

const FormActions = ({ 
  onSubmit, 
  onReset, 
  isSubmitting, 
  isFormValid, 
  hasData 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
      <Button
        onClick={onSubmit}
        disabled={!isFormValid || isSubmitting}
        loading={isSubmitting}
        iconName="Calculator"
        iconPosition="left"
        className="flex-1 sm:flex-none sm:min-w-[200px]"
      >
        {isSubmitting ? 'Calculating...' : 'Calculate Potential'}
      </Button>

      <Button
        variant="outline"
        onClick={onReset}
        disabled={!hasData || isSubmitting}
        iconName="RotateCcw"
        iconPosition="left"
        className="flex-1 sm:flex-none"
      >
        Reset Form
      </Button>
    </div>
  );
};

export default FormActions;