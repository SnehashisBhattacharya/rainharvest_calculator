import React from 'react';

const ProgressIndicator = ({ currentStep, totalSteps, stepLabels }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {stepLabels?.[currentStep - 1]}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {stepLabels?.map((label, index) => (
          <div
            key={index}
            className={`text-xs ${
              index < currentStep 
                ? 'text-primary font-medium' 
                : index === currentStep - 1
                ? 'text-foreground font-medium'
                : 'text-muted-foreground'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;