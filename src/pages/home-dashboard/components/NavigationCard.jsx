import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationCard = ({ 
  title, 
  description, 
  iconName, 
  route, 
  isPrimary = false,
  onClick,
  gradient = "from-blue-500 to-blue-600"
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (route) {
      navigate(route);
    }
  };

  return (
    <div className={`
      bg-card rounded-xl border border-border p-6 h-full
      transition-all duration-200 hover:shadow-lg hover:scale-[1.02]
      ${isPrimary ? 'ring-2 ring-primary/20' : ''}
    `}>
      <div className="flex flex-col h-full">
        <div className={`
          w-12 h-12 rounded-lg flex items-center justify-center mb-4
          bg-gradient-to-br ${gradient}
        `}>
          <Icon name={iconName} size={24} className="text-white" />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
          {description}
        </p>
        
        <Button
          variant={isPrimary ? "default" : "outline"}
          onClick={handleClick}
          className="w-full"
          iconName="ArrowRight"
          iconPosition="right"
        >
          {isPrimary ? "Get Started" : "Learn More"}
        </Button>
      </div>
    </div>
  );
};

export default NavigationCard;