import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Footprints, 
  Flame, 
  Droplets, 
  Calendar,
  Trophy,
  TrendingUp,
  Target,
  Clock
} from "lucide-react";

interface ProgressDashboardProps {
  onBack: () => void;
}

interface ProgressData {
  steps: { current: number; target: number };
  calories: { current: number; target: number };
  water: { current: number; target: number };
  streak: number;
  weeklyGoals: number;
  activeMinutes: number;
}

export const ProgressDashboard = ({ onBack }: ProgressDashboardProps) => {
  const [progress, setProgress] = useState<ProgressData>({
    steps: { current: 7842, target: 10000 },
    calories: { current: 1840, target: 2200 },
    water: { current: 6, target: 8 },
    streak: 12,
    weeklyGoals: 4,
    activeMinutes: 45
  });

  const [animatedValues, setAnimatedValues] = useState({
    steps: 0,
    calories: 0,
    water: 0
  });

  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        const progressRatio = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progressRatio, 3);

        setAnimatedValues({
          steps: Math.floor(progress.steps.current * easeOut),
          calories: Math.floor(progress.calories.current * easeOut),
          water: Math.floor(progress.water.current * easeOut)
        });

        currentStep++;
        if (currentStep > steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    animateCounters();
  }, [progress]);

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const CircularProgress = ({ 
    percentage, 
    size = 120, 
    strokeWidth = 8, 
    color = "primary" 
  }: { 
    percentage: number; 
    size?: number; 
    strokeWidth?: number; 
    color?: string; 
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`hsl(var(--${color}))`}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
      </div>
    );
  };

  const stats = [
    {
      icon: Footprints,
      label: "Steps",
      current: animatedValues.steps,
      target: progress.steps.target,
      unit: "",
      color: "primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Flame,
      label: "Calories",
      current: animatedValues.calories,
      target: progress.calories.target,
      unit: "kcal",
      color: "accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Droplets,
      label: "Water",
      current: animatedValues.water,
      target: progress.water.target,
      unit: "glasses",
      color: "support",
      bgColor: "bg-support/10"
    }
  ];

  const achievements = [
    { icon: Trophy, title: "12-Day Streak", description: "Keep going strong!" },
    { icon: Target, title: "Weekly Goals", description: `${progress.weeklyGoals}/5 completed` },
    { icon: Clock, title: "Active Today", description: `${progress.activeMinutes} minutes` }
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
          <h1 className="text-2xl font-bold gradient-text-primary">Progress</h1>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">Today</p>
          <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="floating-card text-center animate-bounce-in"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="relative mb-4 mx-auto w-fit">
                <CircularProgress 
                  percentage={getProgressPercentage(stat.current, stat.target)}
                  color={stat.color}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <stat.icon className={`w-6 h-6 text-${stat.color} mb-1`} />
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-2xl font-bold gradient-text-primary">
                  {stat.current.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  of {stat.target.toLocaleString()} {stat.unit}
                </p>
                <p className={`text-xs font-medium text-${stat.color}`}>
                  {Math.round(getProgressPercentage(stat.current, stat.target))}% complete
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.title}
                className="floating-card flex items-center space-x-4 animate-slide-up"
                style={{animationDelay: `${0.6 + index * 0.1}s`}}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <achievement.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="floating-card text-center bg-gradient-to-r from-primary/5 to-accent/5 animate-slide-up" style={{animationDelay: '1s'}}>
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold gradient-text-hero mb-2">
              Amazing Progress!
            </h3>
            <p className="text-muted-foreground mb-4">
              You're {Math.round(getProgressPercentage(progress.steps.current, progress.steps.target))}% closer to your daily step goal. 
              Keep up the fantastic work!
            </p>
            <Button className="btn-accent">
              View Weekly Summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};