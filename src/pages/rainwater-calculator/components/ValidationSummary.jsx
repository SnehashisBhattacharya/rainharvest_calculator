import React from 'react';
import Icon from '../../../components/AppIcon';

const ValidationSummary = ({ errors, isVisible }) => {
  const errorEntries = Object.entries(errors)?.filter(([_, error]) => error);
  
  if (!isVisible || errorEntries?.length === 0) {
    return null;
  }

  return (
    <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 bg-error/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon name="AlertCircle" size={14} className="text-error" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-error mb-2">Please fix the following errors:</h4>
          <ul className="space-y-1">
            {errorEntries?.map(([field, error]) => (
              <li key={field} className="text-sm text-error flex items-center gap-2">
                <Icon name="X" size={12} className="flex-shrink-0" />
                {error}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ValidationSummary;