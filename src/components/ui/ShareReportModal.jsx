import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ShareReportModal = ({ isOpen, onClose, reportData }) => {
  const [shareMethod, setShareMethod] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShareMethod(null);
      setEmail('');
      setMessage('');
      setShareSuccess(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (!isSharing) {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      handleClose();
    }
  };

  const generateShareText = () => {
    if (!reportData) return '';
    
    return `🌧️ My Rainwater Harvesting Report

📊 Feasibility Score: ${reportData?.detailedAnalysis?.feasibilityScore || 'N/A'}%
💧 Annual Harvest Potential: ${reportData?.detailedAnalysis?.annualHarvestPotential || 'N/A'} gallons
💰 Estimated Annual Savings: $${reportData?.detailedAnalysis?.costSavings || 'N/A'}

${reportData?.summary || 'Check out my rainwater harvesting feasibility analysis!'}

Calculate your own potential at RainHarvest Calculator`;
  };

  const handleWhatsAppShare = async () => {
    setIsSharing(true);
    
    try {
      const shareText = generateShareText();
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      
      // Check if we're on mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i?.test(navigator.userAgent);
      
      if (isMobile) {
        window.location.href = whatsappUrl;
      } else {
        window.open(whatsappUrl, '_blank');
      }
      
      setShareSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      console.error('WhatsApp share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleEmailShare = async () => {
    if (!email?.trim()) return;
    
    setIsSharing(true);
    
    try {
      const shareText = generateShareText();
      const subject = 'My Rainwater Harvesting Feasibility Report';
      const body = `${message ? message + '\n\n' : ''}${shareText}`;
      
      // Create mailto link
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      
      setShareSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      console.error('Email share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return;
    
    setIsSharing(true);
    
    try {
      await navigator.share({
        title: 'Rainwater Harvesting Report',
        text: generateShareText(),
        url: window.location?.origin
      });
      
      setShareSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      if (error?.name !== 'AbortError') {
        console.error('Native share failed:', error);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = async () => {
    setIsSharing(true);
    
    try {
      const shareText = generateShareText();
      await navigator.clipboard?.writeText(shareText);
      
      setShareSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      console.error('Copy failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-1000 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-t-lg sm:rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Share Report</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            disabled={isSharing}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {shareSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Check" size={24} className="text-success" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Shared Successfully!</h3>
              <p className="text-muted-foreground">Your report has been shared.</p>
            </div>
          ) : !shareMethod ? (
            <div className="space-y-3">
              <p className="text-muted-foreground mb-6">Choose how you'd like to share your rainwater harvesting report:</p>
              
              {/* Native Share (if available) */}
              {navigator.share && (
                <Button
                  variant="outline"
                  onClick={handleNativeShare}
                  disabled={isSharing}
                  className="w-full justify-start"
                  iconName="Share"
                  iconPosition="left"
                >
                  Share via System
                </Button>
              )}

              {/* WhatsApp */}
              <Button
                variant="outline"
                onClick={handleWhatsAppShare}
                disabled={isSharing}
                className="w-full justify-start"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Share via WhatsApp
              </Button>

              {/* Email */}
              <Button
                variant="outline"
                onClick={() => setShareMethod('email')}
                disabled={isSharing}
                className="w-full justify-start"
                iconName="Mail"
                iconPosition="left"
              >
                Share via Email
              </Button>

              {/* Copy */}
              <Button
                variant="outline"
                onClick={handleCopyLink}
                disabled={isSharing}
                className="w-full justify-start"
                iconName="Copy"
                iconPosition="left"
              >
                Copy Report Text
              </Button>
            </div>
          ) : shareMethod === 'email' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShareMethod(null)}
                  className="h-8 w-8"
                >
                  <Icon name="ArrowLeft" size={16} />
                </Button>
                <h3 className="font-medium">Share via Email</h3>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Personal Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e?.target?.value)}
                  placeholder="Add a personal message..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <Button
                onClick={handleEmailShare}
                disabled={!email?.trim() || isSharing}
                loading={isSharing}
                className="w-full"
                iconName="Send"
                iconPosition="left"
              >
                Send Email
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ShareReportModal;