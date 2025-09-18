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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border/50">
      <div className="flex justify-center px-6 py-3">
        <div className="flex space-x-8">
          <Button
            onClick={handleBackToWelcome}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 h-auto ${currentScreen === 'welcome' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            onClick={() => setCurrentScreen('new-conversation')}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 h-auto ${currentScreen === 'new-conversation' || currentScreen === 'chat' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Chat</span>
          </Button>
          <Button
            onClick={() => setCurrentScreen('progress')}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 h-auto ${currentScreen === 'progress' ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">Progress</span>
          </Button>
          <Button
            onClick={() => setCurrentScreen('premium')}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 p-2 h-auto ${currentScreen === 'premium' ? 'text-accent' : 'text-muted-foreground'}`}
          >
            <Crown className="w-5 h-5" />
            <span className="text-xs">Premium</span>
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
    <div className="relative min-h-screen">
      <div className={`${currentScreen !== 'welcome' && currentScreen !== 'chat' ? 'pb-20' : ''}`}>
        {renderScreen()}
      </div>
      {currentScreen !== 'welcome' && currentScreen !== 'chat' && <NavigationBar />}
    </div>
  );
};

export default Index;
