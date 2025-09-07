import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home',
      path: '/home-dashboard',
      icon: 'Home',
      tooltip: 'Dashboard and overview'
    },
    {
      label: 'Calculator',
      path: '/rainwater-calculator',
      icon: 'Calculator',
      tooltip: 'Calculate rainwater potential'
    },
    {
      label: 'Report',
      path: '/feasibility-report',
      icon: 'FileText',
      tooltip: 'View feasibility report'
    },
    {
      label: 'Learn',
      path: '/learning-center',
      icon: 'BookOpen',
      tooltip: 'Educational resources'
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-100">
      <div className="flex h-16 max-w-screen-xl mx-auto">
        {navigationItems?.map((item) => {
          const active = isActive(item?.path);
          
          return (
            <button
              key={item?.path}
              onClick={() => handleTabClick(item?.path)}
              className={`
                flex-1 flex flex-col items-center justify-center px-2 py-2
                transition-all duration-200 ease-out
                hover:bg-muted/50 active:scale-95
                ${active ? 'text-primary' : 'text-muted-foreground'}
              `}
              title={item?.tooltip}
              aria-label={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`mb-1 transition-colors duration-200 ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <span className={`
                text-xs font-medium transition-colors duration-200
                ${active ? 'text-primary' : 'text-muted-foreground'}
              `}>
                {item?.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;