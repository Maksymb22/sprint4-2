import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Send, X, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "What's driving my revenue growth this month?",
  "Which marketing channel has the best ROI?",
  "Why did my conversion rate drop?",
  "Show me my top performing campaigns",
];

export const AIChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI analytics assistant. I can help you understand your data, identify opportunities, and answer questions about your business performance. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const getAIResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes("revenue") || lowerQuestion.includes("growth")) {
      return "Your revenue is up 12.3% this month, driven primarily by increased organic traffic (+22.5%) and improved conversion rates in your paid social campaigns. The biggest growth came from Facebook Ads (ROAS of 4.7x) and your e-commerce channel which saw an 82% increase in sales.";
    }
    if (lowerQuestion.includes("roi") || lowerQuestion.includes("channel")) {
      return "Based on your current data, paid social media has the best ROI at 4.0x average ROAS. Specifically: Facebook Ads (4.7x), LinkedIn Ads (3.8x), and Google Ads (3.2x). I recommend increasing budget allocation to Facebook Ads as it's showing the strongest performance with increasing trend.";
    }
    if (lowerQuestion.includes("conversion") || lowerQuestion.includes("drop")) {
      return "Your conversion rate decreased by 2.4% in the last 24 hours. Analysis shows this coincides with: 1) Higher bounce rate on landing pages (up 15%), 2) Slower page load times (avg 4.2s vs 2.1s normal), and 3) Increased cart abandonment. I recommend A/B testing your checkout flow and optimizing page speed.";
    }
    return "I've analyzed your question. Based on your current dashboard data, I can provide insights on revenue trends, conversion optimization, campaign performance, and more. Could you provide more specific details about what metric or time period you'd like to explore?";
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
        size="icon"
      >
        <Sparkles className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card
      className={`fixed right-6 z-50 shadow-2xl border-primary/20 ${
        isMinimized ? "bottom-6 w-80" : "bottom-6 w-96 h-[600px]"
      } transition-all`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-primary/10 to-purple-600/10">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">AI Assistant</CardTitle>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(600px-73px)]">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t">
              <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-1.5 px-2"
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about your data..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}

      {isMinimized && (
        <CardContent className="p-3">
          <p className="text-sm text-muted-foreground text-center">
            Click to expand and chat with AI
          </p>
        </CardContent>
      )}
    </Card>
  );
};
