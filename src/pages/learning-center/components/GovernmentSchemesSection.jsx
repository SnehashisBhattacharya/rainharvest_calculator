import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GovernmentSchemesSection = () => {
  const schemes = [
    {
      id: 1,
      title: "Federal Rainwater Harvesting Tax Credit",
      description: "Get up to 30% tax credit on rainwater harvesting system installation costs",
      amount: "Up to $2,000",
      eligibility: "Residential properties with systems installed after 2023",
      deadline: "December 31, 2025",
      status: "Active",
      link: "#",
      type: "Federal"
    },
    {
      id: 2,
      title: "State Water Conservation Rebate Program",
      description: "Cash rebates for water-efficient systems including rainwater harvesting",
      amount: "$500 - $1,500",
      eligibility: "Homeowners in participating counties",
      deadline: "Ongoing",
      status: "Active",
      link: "#",
      type: "State"
    },
    {
      id: 3,
      title: "Municipal Green Building Incentive",
      description: "Property tax reduction for sustainable water management systems",
      amount: "5-10% tax reduction",
      eligibility: "Properties meeting green building standards",
      deadline: "Annual application",
      status: "Active",
      link: "#",
      type: "Local"
    },
    {
      id: 4,
      title: "USDA Rural Water Development Grant",
      description: "Grants for rural communities implementing water conservation projects",
      amount: "Up to $50,000",
      eligibility: "Rural communities under 10,000 population",
      deadline: "March 31, 2025",
      status: "Active",
      link: "#",
      type: "Federal"
    }
  ];

  const resources = [
    {
      title: "EPA WaterSense Program",
      description: "Guidelines and certification for water-efficient products",
      icon: "Shield",
      link: "#"
    },
    {
      title: "State Water Resources Board",
      description: "Local regulations and permit requirements",
      icon: "FileText",
      link: "#"
    },
    {
      title: "Green Building Council",
      description: "LEED certification and sustainable building practices",
      icon: "Award",
      link: "#"
    },
    {
      title: "Water Conservation Alliance",
      description: "Educational resources and best practices",
      icon: "BookOpen",
      link: "#"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success border-success/20';
      case 'Ending Soon':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Expired':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Federal':
        return 'bg-primary/10 text-primary';
      case 'State':
        return 'bg-secondary/10 text-secondary';
      case 'Local':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <section className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Government Schemes & Incentives</h2>
        <p className="text-muted-foreground">
          Explore available financial incentives and support programs for rainwater harvesting
        </p>
      </div>
      {/* Active Schemes */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Available Incentives</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {schemes?.map((scheme) => (
            <div key={scheme?.id} className="border border-border rounded-lg p-6 hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(scheme?.type)}`}>
                      {scheme?.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(scheme?.status)}`}>
                      {scheme?.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{scheme?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{scheme?.description}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Incentive Amount:</span>
                  <span className="font-semibold text-primary">{scheme?.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Deadline:</span>
                  <span className="text-sm font-medium text-foreground">{scheme?.deadline}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Eligibility:</strong> {scheme?.eligibility}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
                className="w-full"
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Resources */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Additional Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resources?.map((resource, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={resource?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{resource?.title}</h4>
                <p className="text-sm text-muted-foreground">{resource?.description}</p>
              </div>
              <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
      {/* Call to Action */}
      <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="Info" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-1">Need Help Finding Incentives?</h4>
            <p className="text-sm text-muted-foreground">
              Contact your local water authority or environmental agency for region-specific programs and requirements.
            </p>
          </div>
          <Button variant="outline" iconName="Phone" iconPosition="left">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GovernmentSchemesSection;