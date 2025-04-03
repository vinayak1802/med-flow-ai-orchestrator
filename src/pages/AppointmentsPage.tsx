
import { Layout } from "@/components/Layout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  CalendarPlus, 
  RefreshCcw, 
  Check, 
  X, 
  Clock, 
  Calendar as CalendarIcon 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useState } from "react";

const AppointmentsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample data for appointments
  const upcomingAppointments = [
    {
      id: "1",
      patient: "John Doe",
      doctor: "Dr. Emily Chen",
      department: "Cardiology",
      date: "Oct 15, 2023",
      time: "10:30 AM",
      status: "confirmed",
    },
    {
      id: "2",
      patient: "Jane Smith",
      doctor: "Dr. Michael Wong",
      department: "Neurology",
      date: "Oct 15, 2023",
      time: "11:45 AM",
      status: "pending",
    },
    {
      id: "3",
      patient: "Robert Johnson",
      doctor: "Dr. Sarah Lee",
      department: "Orthopedics",
      date: "Oct 16, 2023",
      time: "1:15 PM",
      status: "rescheduled",
    },
    {
      id: "4",
      patient: "Maria Garcia",
      doctor: "Dr. Rebecca White",
      department: "Cardiology",
      date: "Oct 17, 2023",
      time: "2:30 PM",
      status: "confirmed",
    },
  ];

  const recommendedChanges = [
    {
      id: "1",
      patient: "Emily Wilson",
      originalTime: "Oct 15, 2:30 PM",
      suggestedTime: "Oct 16, 10:15 AM",
      reason: "Doctor unavailable - emergency case",
      priority: "high",
    },
    {
      id: "2",
      patient: "Michael Brown",
      originalTime: "Oct 17, 11:00 AM",
      suggestedTime: "Oct 17, 3:45 PM",
      reason: "Optimize doctor schedule",
      priority: "medium",
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Appointment Management</h1>
            <p className="text-muted-foreground">
              Schedule, reschedule, and monitor patient appointments
            </p>
          </div>
          <div className="flex gap-2">
            <Button>
              <CalendarPlus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="mb-4">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                  <TabsTrigger value="canceled">Canceled</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">
                            {appointment.patient}
                          </TableCell>
                          <TableCell>{appointment.doctor}</TableCell>
                          <TableCell>{appointment.department}</TableCell>
                          <TableCell>
                            {appointment.date}, {appointment.time}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn(
                                appointment.status === "confirmed" && "bg-green-100 text-green-800 border-green-200",
                                appointment.status === "pending" && "bg-yellow-100 text-yellow-800 border-yellow-200",
                                appointment.status === "rescheduled" && "bg-blue-100 text-blue-800 border-blue-200"
                              )}
                            >
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="ghost">
                                <RefreshCcw className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="past">
                  <div className="flex flex-col items-center justify-center py-12">
                    <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Past appointments will appear here</p>
                  </div>
                </TabsContent>
                <TabsContent value="canceled">
                  <div className="flex flex-col items-center justify-center py-12">
                    <X className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Canceled appointments will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <RefreshCcw className="h-5 w-5" />
                  AI-Recommended Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedChanges.map((change) => (
                    <div
                      key={change.id}
                      className={cn(
                        "p-3 rounded-lg border",
                        change.priority === "high" 
                          ? "bg-red-50 border-red-200" 
                          : "bg-blue-50 border-blue-200"
                      )}
                    >
                      <div className="font-medium">{change.patient}</div>
                      <div className="text-sm mt-1 flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span className="line-through">{change.originalTime}</span>
                        <span>→</span>
                        <span>{change.suggestedTime}</span>
                      </div>
                      <div className="text-sm mt-1">{change.reason}</div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="default" className="h-7 px-2 text-xs">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                          Ignore
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AppointmentsPage;
