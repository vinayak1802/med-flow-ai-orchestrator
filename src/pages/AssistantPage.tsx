
import { Layout } from "@/components/Layout";
import { ChatInterface } from "@/components/assistant/ChatInterface";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessagesSquare, 
  Users, 
  BarChart3, 
  BedDouble, 
  Calendar, 
  Sparkles 
} from "lucide-react";

const AssistantPage = () => {
  // Sample suggested prompts
  const commonPrompts = [
    {
      icon: Calendar,
      title: "Appointments",
      prompts: [
        "Schedule a new appointment",
        "Reschedule patient John Doe",
        "Show all cardiology appointments",
        "Check Dr. Chen's availability",
      ],
    },
    {
      icon: BedDouble,
      title: "Bed Management",
      prompts: [
        "How many beds are available in ICU?",
        "Allocate a bed for patient Sarah Wilson",
        "Show beds that will be available today",
        "Which department has the most free beds?",
      ],
    },
    {
      icon: Users,
      title: "Patient Management",
      prompts: [
        "Find patient records for James Smith",
        "Update contact details for patient #12345",
        "Show patients admitted in the last 24 hours",
        "List patients scheduled for discharge today",
      ],
    },
    {
      icon: BarChart3,
      title: "Analytics",
      prompts: [
        "Show today's hospital occupancy rate",
        "Compare emergency admissions to last week",
        "What's the average wait time in cardiology?",
        "Generate a report on bed utilization by department",
      ],
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-muted-foreground">
            Get help with hospital management tasks using natural language
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Assistant Features
                </CardTitle>
                <CardDescription>
                  MedFlow AI can help with the following tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="prompts">
                  <TabsList className="w-full">
                    <TabsTrigger value="prompts" className="flex-1">
                      <MessagesSquare className="h-4 w-4 mr-2" />
                      Prompts
                    </TabsTrigger>
                    <TabsTrigger value="help" className="flex-1">
                      <Users className="h-4 w-4 mr-2" />
                      Help
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="prompts" className="space-y-4 mt-4">
                    {commonPrompts.map((category) => (
                      <div key={category.title} className="space-y-2">
                        <div className="flex items-center gap-2 font-medium">
                          <category.icon className="h-4 w-4 text-primary" />
                          {category.title}
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {category.prompts.map((prompt) => (
                            <Button
                              key={prompt}
                              variant="outline"
                              className="justify-start h-auto py-2 px-3 text-sm"
                            >
                              {prompt}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="help" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <h3 className="font-medium">How to use the AI Assistant</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>Ask questions in natural language</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>Request specific actions like scheduling</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>Get real-time updates on hospital status</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>Generate reports and analytics</span>
                        </li>
                      </ul>
                      
                      <h3 className="font-medium mt-4">Capabilities</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>Autonomous appointment scheduling & rescheduling</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>Real-time bed availability tracking</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>Intelligent resource allocation</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span>Patient data management & analysis</span>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssistantPage;
