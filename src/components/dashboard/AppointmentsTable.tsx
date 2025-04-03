
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  time: string;
  purpose: string;
  status: "confirmed" | "rescheduled" | "waiting" | "completed" | "canceled";
}

interface AppointmentsTableProps {
  appointments: Appointment[];
  title: string;
  description?: string;
}

export function AppointmentsTable({
  appointments,
  title,
  description,
}: AppointmentsTableProps) {
  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
      case "rescheduled":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80";
      case "waiting":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100/80";
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100/80";
      case "canceled":
        return "bg-red-100 text-red-800 hover:bg-red-100/80";
      default:
        return "";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Clock className="h-4 w-4" />
            <span>View All</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.patient}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.purpose}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(getStatusColor(appointment.status))}
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
