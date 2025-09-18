import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { NewConversationScreen } from "@/components/NewConversationScreen";
import { ChatScreen } from "@/components/ChatScreen";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { PremiumScreen } from "@/components/PremiumScreen";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  BarChart3, 
  Crown,
  Home
} from "lucide-react";

type Screen = 'welcome' | 'new-conversation' | 'chat' | 'progress' | 'premium';

interface ConversationData {
  name: string;
  category: string;
  mode: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [conversationData, setConversationData] = useState<ConversationData | null>(null);

  const handleGetStarted = () => {
    setCurrentScreen('new-conversation');
  };

  const handleCreateConversation = (name: string, category: string, mode: string) => {
    setConversationData({ name, category, mode });
    setCurrentScreen('chat');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
    setConversationData(null);
  };

  const handleBack = () => {
    if (currentScreen === 'new-conversation') {
      setCurrentScreen('welcome');
    } else if (currentScreen === 'chat') {
      setCurrentScreen('new-conversation');
    } else {
      setCurrentScreen('welcome');
    }
  };

  // Navigation component for screens that need it
  const NavigationBar = () => (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card/90 backdrop-blur-lg border border-border/50 rounded-2xl p-2 shadow-[var(--shadow-floating)]">
        <div className="flex space-x-2">
          <Button
            onClick={handleBackToWelcome}
            variant="ghost"
            size="sm"
            className={`p-3 rounded-xl ${currentScreen === 'welcome' ? 'bg-primary/10 text-primary' : ''}`}
          >
            <Home className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => setCurrentScreen('new-conversation')}
            variant="ghost"
            size="sm"
            className={`p-3 rounded-xl ${currentScreen === 'new-conversation' || currentScreen === 'chat' ? 'bg-primary/10 text-primary' : ''}`}
          >
            <MessageSquare className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => setCurrentScreen('progress')}
            variant="ghost"
            size="sm"
            className={`p-3 rounded-xl ${currentScreen === 'progress' ? 'bg-primary/10 text-primary' : ''}`}
          >
            <BarChart3 className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => setCurrentScreen('premium')}
            variant="ghost"
            size="sm"
            className={`p-3 rounded-xl ${currentScreen === 'premium' ? 'bg-accent/10 text-accent' : ''}`}
          >
            <Crown className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
      
      case 'new-conversation':
        return (
          <NewConversationScreen 
            onCreateConversation={handleCreateConversation}
            onBack={handleBack}
          />
        );
      
      case 'chat':
        return conversationData ? (
          <ChatScreen 
            conversationName={conversationData.name}
            category={conversationData.category}
            mode={conversationData.mode}
            onBack={handleBack}
          />
        ) : null;
      
      case 'progress':
        return <ProgressDashboard onBack={handleBack} />;
      
      case 'premium':
        return <PremiumScreen onBack={handleBack} />;
      
      default:
        return <WelcomeScreen onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="relative">
      {renderScreen()}
      {currentScreen !== 'welcome' && currentScreen !== 'chat' && <NavigationBar />}
    </div>
  );
};

export default Index;
