import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const InfographicSection = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Collection",
      description: "Rainwater is collected from rooftops and other surfaces",
      details: `The collection phase is the foundation of any rainwater harvesting system. Rain falls on your roof and flows into gutters and downspouts.\n\nKey components include:\n• Clean roof surface\n• Properly installed gutters\n• Downspouts and pipes\n• Leaf guards and screens\n\nRoof material affects collection efficiency - metal roofs are most efficient at 90%, while asphalt shingles achieve about 75% efficiency.`,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
      icon: "CloudRain"
    },
    {
      id: 2,
      title: "Filtration",
      description: "First flush diverters remove initial dirty water and debris",
      details: `Filtration ensures water quality by removing contaminants and debris before storage.\n\nFiltration stages include:\n• First flush diversion (removes initial dirty water)\n• Leaf screens and mesh filters\n• Sediment filters\n• Carbon filters for taste and odor\n• UV sterilization for pathogens\n\nProper filtration can make rainwater suitable for drinking and significantly improves water quality for all uses.`,
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop",
      icon: "Filter"
    },
    {
      id: 3,
      title: "Storage",
      description: "Clean water is stored in tanks or underground cisterns",
      details: `Storage systems preserve harvested rainwater for future use during dry periods.\n\nStorage options include:\n• Above-ground plastic or fiberglass tanks\n• Underground concrete cisterns\n• Flexible bladder systems\n• Modular tank systems\n\nStorage capacity should be sized based on roof area, rainfall patterns, and water usage needs. Typical residential systems range from 500 to 5,000 gallons.`,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      icon: "Database"
    },
    {
      id: 4,
      title: "Distribution",
      description: "Stored water is distributed for various household uses",
      details: `Distribution systems deliver stored rainwater where it's needed throughout your property.\n\nDistribution methods:\n• Gravity-fed systems (for elevated storage)\n• Pump systems for pressurized delivery\n• Separate plumbing for non-potable uses\n• Integration with existing plumbing\n• Automatic switching systems\n\nProper distribution ensures reliable water pressure and seamless integration with your home's water system.`,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
      icon: "Zap"
    }
  ];

  const benefits = [
    {
      icon: "DollarSign",
      title: "Cost Savings",
      description: "Reduce water bills by 30-50%"
    },
    {
      icon: "Droplets",
      title: "Water Security",
      description: "Backup supply during droughts"
    },
    {
      icon: "Leaf",
      title: "Environmental",
      description: "Reduces stormwater runoff"
    },
    {
      icon: "TrendingUp",
      title: "Property Value",
      description: "Increases home resale value"
    }
  ];

  return (
    <section className="bg-card rounded-lg border border-border p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">How Rainwater Harvesting Works</h2>
        <p className="text-muted-foreground">
          Understanding the complete process from collection to distribution
        </p>
      </div>
      {/* Process Steps */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {steps?.map((step, index) => (
            <button
              key={step?.id}
              onClick={() => setActiveStep(step?.id)}
              className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                activeStep === step?.id
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/50 hover:bg-muted/30'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep === step?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={step?.icon} size={16} />
                </div>
                <span className="font-medium text-foreground">{index + 1}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1">{step?.title}</h3>
              <p className="text-sm text-muted-foreground">{step?.description}</p>
            </button>
          ))}
        </div>

        {/* Active Step Details */}
        <div className="bg-muted/30 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Icon name={steps?.find(s => s?.id === activeStep)?.icon} size={20} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {steps?.find(s => s?.id === activeStep)?.title}
                </h3>
              </div>
              <div className="prose prose-sm max-w-none">
                {steps?.find(s => s?.id === activeStep)?.details?.split('\n')?.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground mb-3 last:mb-0 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <Image
                  src={steps?.find(s => s?.id === activeStep)?.image}
                  alt={`${steps?.find(s => s?.id === activeStep)?.title} process`}
                  className="w-full h-64 object-cover rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Benefits Grid */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Key Benefits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits?.map((benefit, index) => (
            <div key={index} className="p-4 bg-muted/30 rounded-lg text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Icon name={benefit?.icon} size={24} className="text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">{benefit?.title}</h4>
              <p className="text-sm text-muted-foreground">{benefit?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfographicSection;