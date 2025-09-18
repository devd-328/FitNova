import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dumbbell, 
  Utensils, 
  Activity, 
  Target, 
  Calendar,
  Zap,
  Brain,
  Clock,
  ArrowLeft
} from "lucide-react";

interface NewConversationScreenProps {
  onCreateConversation: (name: string, category: string, mode: string) => void;
  onBack: () => void;
}

export const NewConversationScreen = ({ onCreateConversation, onBack }: NewConversationScreenProps) => {
  const [conversationName, setConversationName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMode, setSelectedMode] = useState("detailed");

  const categories = [
    { id: "workout", icon: Dumbbell, label: "Workout Plans", color: "primary" },
    { id: "nutrition", icon: Utensils, label: "Nutrition Guide", color: "accent" },
    { id: "cardio", icon: Activity, label: "Cardio Training", color: "support" },
    { id: "goals", icon: Target, label: "Goal Setting", color: "primary" },
    { id: "schedule", icon: Calendar, label: "Schedule Plan", color: "accent" },
    { id: "motivation", icon: Zap, label: "Motivation", color: "support" }
  ];

  const modes = [
    { 
      id: "quick", 
      icon: Clock, 
      title: "Quick Tips", 
      description: "Fast answers and immediate guidance",
      color: "accent"
    },
    { 
      id: "detailed", 
      icon: Brain, 
      title: "Detailed Plan", 
      description: "Comprehensive coaching and step-by-step plans",
      color: "primary"
    }
  ];

  const handleCreate = () => {
    if (conversationName.trim() && selectedCategory) {
      onCreateConversation(conversationName.trim(), selectedCategory, selectedMode);
    }
  };

  const isValid = conversationName.trim() && selectedCategory;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/5 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 animate-slide-up">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="mr-3 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold gradient-text-primary">New Conversation</h1>
        </div>

        {/* Conversation Name Input */}
        <div className="mb-8 animate-slide-up" style={{animationDelay: '0.1s'}}>
          <label className="block text-sm font-medium text-foreground mb-3">
            What would you like to work on?
          </label>
          <Input
            type="text"
            placeholder="e.g., Leg Day Plan, Meal Prep Guide"
            value={conversationName}
            onChange={(e) => setConversationName(e.target.value)}
            className="w-full px-4 py-3 text-lg rounded-xl border-2 border-border/50 focus:border-primary focus:ring-primary bg-card"
          />
        </div>

        {/* Category Selection */}
        <div className="mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <label className="block text-sm font-medium text-foreground mb-4">
            Choose a category
          </label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  floating-card p-4 text-center transition-all duration-300 cursor-pointer
                  ${selectedCategory === category.id 
                    ? 'ring-2 ring-primary shadow-[var(--shadow-glow)] scale-105' 
                    : 'hover:scale-105'
                  }
                `}
              >
                <category.icon 
                  className={`w-8 h-8 mx-auto mb-2 ${
                    selectedCategory === category.id 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  }`} 
                />
                <span className={`text-sm font-medium ${
                  selectedCategory === category.id 
                    ? 'text-primary' 
                    : 'text-foreground'
                }`}>
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selection */}
        <div className="mb-8 animate-slide-up" style={{animationDelay: '0.3s'}}>
          <label className="block text-sm font-medium text-foreground mb-4">
            AI Coaching Mode
          </label>
          <div className="space-y-3">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`
                  w-full floating-card p-4 text-left transition-all duration-300 cursor-pointer
                  ${selectedMode === mode.id 
                    ? 'ring-2 ring-primary shadow-[var(--shadow-glow)]' 
                    : 'hover:scale-[1.02]'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <mode.icon 
                    className={`w-6 h-6 mt-1 ${
                      selectedMode === mode.id 
                        ? 'text-primary' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      selectedMode === mode.id 
                        ? 'text-primary' 
                        : 'text-foreground'
                    }`}>
                      {mode.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {mode.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Create Button */}
        <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
          <Button 
            onClick={handleCreate}
            disabled={!isValid}
            className={`w-full ${isValid ? 'btn-hero' : 'btn-ghost'} transition-all duration-300`}
          >
            Start Conversation
          </Button>
        </div>
      </div>
    </div>
  );
};