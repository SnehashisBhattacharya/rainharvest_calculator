import React from 'react';
import Icon from '../../../components/AppIcon';

const FeasibilityScore = ({ score, status }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-success/10 border-success/20';
    if (score >= 60) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  const getStatusIcon = (score) => {
    if (score >= 80) return 'CheckCircle';
    if (score >= 60) return 'AlertCircle';
    return 'XCircle';
  };

  const getStatusText = (score) => {
    if (score >= 80) return 'Highly Feasible';
    if (score >= 60) return 'Moderately Feasible';
    return 'Low Feasibility';
  };

  return (
    <div className={`bg-card rounded-lg border-2 p-6 ${getScoreBackground(score)}`}>
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${getScoreBackground(score)}`}>
          <Icon 
            name={getStatusIcon(score)} 
            size={32} 
            className={getScoreColor(score)}
          />
        </div>
        
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Feasibility Assessment
        </h2>
        
        <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
          {score}%
        </div>
        
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getScoreBackground(score)} ${getScoreColor(score)}`}>
          <Icon name={getStatusIcon(score)} size={16} />
          {getStatusText(score)}
        </div>
        
        <div className="mt-4 w-full bg-muted rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              score >= 80 ? 'bg-success' : 
              score >= 60 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${Math.min(score, 100)}%` }}
          />
        </div>
        
        <p className="text-sm text-muted-foreground mt-3">
          Based on your property characteristics and local conditions
        </p>
      </div>
    </div>
  );
};

export default FeasibilityScore;