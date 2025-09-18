import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Send, 
  ArrowLeft, 
  Zap, 
  Calendar, 
  HelpCircle,
  MoreHorizontal,
  Bot,
  User
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatScreenProps {
  conversationName: string;
  category: string;
  mode: string;
  onBack: () => void;
}

export const ChatScreen = ({ conversationName, category, mode, onBack }: ChatScreenProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hey! I'm your AI fitness coach. I'm excited to help you with ${conversationName.toLowerCase()}! What specific goals would you like to achieve?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: Zap, label: "Track Calories", action: "I want to track my calorie intake for today" },
    { icon: Calendar, label: "Start Workout", action: "Let's start my workout for today" },
    { icon: HelpCircle, label: "Ask Question", action: "I have a question about my fitness routine" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(content.trim()),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const responses = [
      "That's a great goal! Let me create a personalized plan for you. Based on your preferences, I recommend starting with 3-4 workouts per week.",
      "Excellent choice! For nutrition, focus on whole foods and aim for a balanced macro ratio. Would you like me to suggest some meal ideas?",
      "Perfect! I'll help you track your progress. Let's set up some key metrics to monitor your improvement over time.",
      "Great question! Consistency is key to success. I recommend starting with small, manageable changes that you can maintain long-term."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-foreground">{conversationName}</h1>
            <p className="text-xs text-muted-foreground capitalize">{category} • {mode} mode</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="p-2">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-accent text-accent-foreground'
              }`}>
                {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`${
                message.sender === 'user' 
                  ? 'chat-bubble-user' 
                  : 'chat-bubble-bot'
              }`}>
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-bounce-in">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="chat-bubble-bot">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <p className="text-xs mt-1 opacity-70">CoachBot is thinking...</p>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-card/50 backdrop-blur-sm border-t border-border/50">
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {quickActions.map((action, index) => (
            <Button
              key={action.label}
              onClick={() => handleQuickAction(action.action)}
              className="btn-ghost flex-shrink-0 text-xs px-3 py-2"
            >
              <action.icon className="w-4 h-4 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about fitness..."
            className="flex-1 rounded-xl border-2 border-border/50 focus:border-primary"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(inputMessage);
              }
            }}
          />
          <Button 
            onClick={() => handleSendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isTyping}
            className="btn-hero px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};