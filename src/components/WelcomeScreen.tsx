import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Heart, Target } from "lucide-react";
import fitnessBot from "@/assets/fitness-bot-hero.png";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleGetStarted = () => {
    setIsVisible(false);
    setTimeout(onGetStarted, 300);
  };

  const features = [
    {
      icon: Dumbbell,
      title: "Personalized Workouts",
      description: "Get custom training plans tailored to your goals"
    },
    {
      icon: Heart,
      title: "Health Tracking",
      description: "Monitor your progress with smart insights"
    },
    {
      icon: Target,
      title: "Goal Achievement",
      description: "Stay motivated with milestone celebrations"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/10 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center">
        
        {/* Hero Section */}
        <div className="animate-bounce-in">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse"></div>
            <img 
              src={fitnessBot} 
              alt="AI Fitness Coach" 
              className="relative w-64 h-36 object-contain animate-float"
            />
          </div>
          
          <h1 className="text-hero mb-4 animate-slide-up">
            Meet Your AI
            <br />
            <span className="gradient-text-accent">Fitness Coach</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md animate-slide-up" style={{animationDelay: '0.2s'}}>
            Get personalized workouts, nutrition advice, and motivation from your intelligent fitness companion
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 w-full max-w-2xl">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="floating-card text-center animate-slide-up"
              style={{animationDelay: `${0.4 + index * 0.1}s`}}
            >
              <feature.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-card-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="space-y-4 animate-slide-up" style={{animationDelay: '0.8s'}}>
          <Button 
            onClick={handleGetStarted}
            className="btn-hero group"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            No signup required • Start your fitness journey today
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-4 w-16 h-16 bg-support/10 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>
    </div>
  );
};