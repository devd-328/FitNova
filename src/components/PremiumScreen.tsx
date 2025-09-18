import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Crown,
  MessageSquare,
  Target,
  BarChart3,
  Calendar,
  Users,
  Zap,
  Check,
  Star
} from "lucide-react";

interface PremiumScreenProps {
  onBack: () => void;
}

export const PremiumScreen = ({ onBack }: PremiumScreenProps) => {
  const premiumFeatures = [
    {
      icon: MessageSquare,
      title: "Unlimited Chats",
      description: "No limits on conversations with your AI coach",
      highlight: true
    },
    {
      icon: Target,
      title: "Personalized Coaching",
      description: "Custom workout and nutrition plans just for you",
      highlight: true
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Detailed progress tracking and insights",
      highlight: false
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI-powered workout and meal planning",
      highlight: false
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Join exclusive fitness challenges and groups",
      highlight: false
    },
    {
      icon: Zap,
      title: "Priority Support",
      description: "Get faster responses and premium assistance",
      highlight: false
    }
  ];

  const plans = [
    {
      name: "Monthly",
      price: "$9.99",
      period: "/month",
      popular: false,
      discount: null
    },
    {
      name: "Yearly",
      price: "$99.99",
      period: "/year",
      popular: true,
      discount: "Save 17%"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-card/50 backdrop-blur-sm border-b border-border/30">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold gradient-text-primary">Go Premium</h1>
        </div>
        <Crown className="w-6 h-6 text-accent" />
      </div>

      <div className="p-6 max-w-2xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-slide-up">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-accent to-accent-glow flex items-center justify-center mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold gradient-text-hero">
            Unlock Your Full Potential
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Get unlimited access to personalized coaching, advanced features, and exclusive content
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`
                floating-card text-center relative
                ${plan.popular 
                  ? 'ring-2 ring-accent shadow-[var(--shadow-accent)] scale-105' 
                  : ''
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-accent to-accent-glow text-accent-foreground px-4 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="pt-4">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                {plan.discount && (
                  <p className="text-sm text-accent font-medium mb-2">{plan.discount}</p>
                )}
                <div className="mb-4">
                  <span className="text-3xl font-bold gradient-text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <Button 
                  className={plan.popular ? 'btn-hero w-full' : 'btn-accent w-full'}
                >
                  {plan.popular ? 'Get Premium' : 'Choose Plan'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground text-center">
            Everything you get with Premium
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {premiumFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className="floating-card flex items-start space-x-4 animate-slide-up"
                style={{animationDelay: `${0.4 + index * 0.1}s`}}
              >
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                  ${feature.highlight 
                    ? 'bg-gradient-to-r from-accent to-accent-glow text-white' 
                    : 'bg-primary/10 text-primary'
                  }
                `}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground flex items-center">
                    {feature.title}
                    {feature.highlight && (
                      <Check className="w-4 h-4 ml-2 text-accent" />
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="floating-card text-center bg-gradient-to-r from-primary/5 to-accent/5 animate-slide-up" style={{animationDelay: '1s'}}>
          <h3 className="text-xl font-bold gradient-text-hero mb-2">
            Ready to Transform Your Fitness?
          </h3>
          <p className="text-muted-foreground mb-6">
            Join thousands of users who've achieved their goals with Premium coaching
          </p>
          <div className="space-y-3">
            <Button className="btn-hero w-full max-w-sm">
              Start 7-Day Free Trial
            </Button>
            <p className="text-xs text-muted-foreground">
              Cancel anytime • No commitment required
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center space-y-4 animate-slide-up" style={{animationDelay: '1.2s'}}>
          <div className="flex justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-accent fill-current" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            "This app changed my life! The AI coach is incredibly helpful and motivating."
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            - Sarah M., Premium User
          </p>
        </div>
      </div>
    </div>
  );
};