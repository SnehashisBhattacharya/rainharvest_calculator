import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportHeader = ({ reportData, onDownloadPDF, onShareReport, onBackToCalculator }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Rainwater Harvesting Feasibility Report
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} />
              <span>Generated: {formatDate(reportData?.generatedAt)}</span>
            </div>
            <div className="hidden sm:block text-muted-foreground">•</div>
            <div className="flex items-center gap-2">
              <Icon name="FileText" size={16} />
              <span>Report ID: {reportData?.reportId || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onBackToCalculator}
            iconName="ArrowLeft"
            iconPosition="left"
            className="order-3 sm:order-1"
          >
            Back to Calculator
          </Button>
          
          <Button
            variant="outline"
            onClick={onDownloadPDF}
            iconName="Download"
            iconPosition="left"
            className="order-2"
          >
            Download PDF
          </Button>
          
          <Button
            variant="default"
            onClick={onShareReport}
            iconName="Share2"
            iconPosition="left"
            className="order-1 sm:order-3"
          >
            Share Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;