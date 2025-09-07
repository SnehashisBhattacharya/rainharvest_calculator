import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "What is Rainwater Harvesting?",
      answer: `Rainwater harvesting is the collection and storage of rainwater from surfaces like rooftops, land surfaces, or rock catchments using simple techniques such as jars and pots as well as more complex techniques such as underground check dams.\n\nThis ancient practice helps conserve water, reduce flooding, and provide a sustainable water source for various uses including drinking, irrigation, and groundwater recharge.\n\nThe harvested water can be stored in tanks, cisterns, or used to recharge groundwater aquifers, making it an environmentally friendly and cost-effective water management solution.`
    },
    {
      id: 2,
      question: "Why Should I Harvest Rainwater?",
      answer: `Rainwater harvesting offers numerous benefits for both individuals and communities:\n\n• Reduces water bills by up to 40-50%\n• Provides backup water supply during droughts\n• Reduces stormwater runoff and flooding\n• Improves groundwater levels\n• Reduces soil erosion\n• Provides soft water free from chemicals\n• Environmentally sustainable practice\n• Increases property value\n• Reduces dependency on municipal water supply`
    },
    {
      id: 3,
      question: "How Much Water Can I Harvest?",
      answer: `The amount of water you can harvest depends on several factors:\n\n• Roof area (larger roofs collect more water)\n• Annual rainfall in your area\n• Roof material efficiency (metal roofs are most efficient)\n• Collection system design\n\nFormula: Harvestable Water = Roof Area × Rainfall × Runoff Coefficient × 0.623\n\nFor example, a 1,000 sq ft roof with 30 inches annual rainfall can harvest approximately 18,000 gallons per year, potentially saving $200-400 annually on water bills.`
    },
    {
      id: 4,
      question: "What Are the Different Types of Systems?",
      answer: `There are several types of rainwater harvesting systems:\n\n1. **Surface Runoff Harvesting**\n   - Collection from ground surfaces\n   - Suitable for large areas\n   - Lower water quality\n\n2. **Rooftop Harvesting**\n   - Most common for residential use\n   - Higher water quality\n   - Easy to implement\n\n3. **First Flush Diverters**\n   - Removes initial dirty water\n   - Improves water quality\n   - Essential for potable use\n\n4. **Storage Systems**\n   - Above-ground tanks\n   - Underground cisterns\n   - Flexible bladder systems`
    },
    {
      id: 5,
      question: "Is Harvested Rainwater Safe to Drink?",
      answer: `Rainwater quality depends on collection and storage methods:\n\n**Generally Safe For:**\n• Irrigation and gardening\n• Toilet flushing\n• Laundry (with proper filtration)\n• Car washing\n\n**For Drinking Water:**\n• Requires proper filtration system\n• UV sterilization recommended\n• Regular water quality testing\n• First flush diversion essential\n• Clean storage tanks mandatory\n\nWith proper treatment, rainwater can meet drinking water standards and is often softer and purer than municipal water supplies.`
    },
    {
      id: 6,
      question: "What\'s the Cost and Payback Period?",
      answer: `Investment costs vary based on system complexity:\n\n**Basic System (500-1000 gallons):**\n• Cost: $1,500 - $3,500\n• Payback: 3-7 years\n\n**Advanced System (2000+ gallons):**\n• Cost: $5,000 - $15,000\n• Payback: 5-12 years\n\n**Factors Affecting ROI:**\n• Local water rates\n• System size and complexity\n• Installation costs\n• Maintenance requirements\n• Available rebates and incentives\n\nMany systems pay for themselves through water bill savings, increased property value, and potential tax incentives.`
    }
  ];

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <section className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Get answers to common questions about rainwater harvesting
        </p>
      </div>
      <div className="space-y-4">
        {faqData?.map((faq) => (
          <div
            key={faq?.id}
            className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(faq?.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
              aria-expanded={expandedFAQ === faq?.id}
            >
              <h3 className="font-semibold text-foreground pr-4">{faq?.question}</h3>
              <Icon
                name={expandedFAQ === faq?.id ? "ChevronUp" : "ChevronDown"}
                size={20}
                className={`text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                  expandedFAQ === faq?.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedFAQ === faq?.id && (
              <div className="px-6 py-4 bg-card animate-fade-in">
                <div className="prose prose-sm max-w-none">
                  {faq?.answer?.split('\n')?.map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground mb-3 last:mb-0 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;