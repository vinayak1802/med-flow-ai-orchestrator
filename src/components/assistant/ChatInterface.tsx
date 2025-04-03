
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Send, Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello, I am MedFlow AI Assistant. How can I help you today? I can help you with appointment scheduling, bed management, patient information, and more.",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      let responseContent = "";
      
      if (input.toLowerCase().includes("appointment")) {
        responseContent = "I can help you schedule, reschedule, or cancel appointments. Would you like me to check available slots for a particular doctor or specialty?";
      } else if (input.toLowerCase().includes("bed") || input.toLowerCase().includes("room")) {
        responseContent = "Currently we have 15 available beds in general wards and 3 in the ICU. Would you like me to check availability for a specific department?";
      } else if (input.toLowerCase().includes("emergency")) {
        responseContent = "I've flagged this as an emergency. Dr. Carter has been notified and is available in Emergency Room 2. Would you like me to inform any other staff members?";
      } else {
        responseContent = "I'm here to help with hospital management tasks. You can ask about appointments, bed availability, patient information, or emergency protocols.";
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-[calc(100vh-2rem)] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          MedFlow AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start gap-3 max-w-[80%]">
                  {message.sender === "ai" && (
                    <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                      <Bot className="h-4 w-4" />
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
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
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 bg-secondary text-secondary-foreground">
                      <span className="text-xs">DR</span>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex w-full items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
