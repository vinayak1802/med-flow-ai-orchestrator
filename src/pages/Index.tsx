
import { Layout } from "@/components/Layout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { BedOccupancyChart } from "@/components/dashboard/BedOccupancyChart";
import { AppointmentsTable } from "@/components/dashboard/AppointmentsTable";
import {
  BedDouble,
  Calendar,
  Clock,
  Users,
  AlertTriangle,
} from "lucide-react";

const Index = () => {
  // Sample data for bed occupancy chart
  const bedOccupancyData = [
    { name: "Occupied", value: 42, color: "#3498db" },
    { name: "Available", value: 18, color: "#2ecc71" },
    { name: "Reserved", value: 8, color: "#f39c12" },
    { name: "Maintenance", value: 2, color: "#e74c3c" },
  ];

  // Sample data for appointments table
  const appointmentsData = [
    {
      id: "1",
      patient: "John Doe",
      doctor: "Dr. Emily Chen",
      time: "Today, 10:30 AM",
      purpose: "Cardiology Checkup",
      status: "confirmed" as const,
    },
    {
      id: "2",
      patient: "Jane Smith",
      doctor: "Dr. Michael Wong",
      time: "Today, 11:45 AM",
      purpose: "Neurology Consultation",
      status: "waiting" as const,
    },
    {
      id: "3",
      patient: "Robert Johnson",
      doctor: "Dr. Sarah Lee",
      time: "Today, 1:15 PM",
      purpose: "Orthopedic Follow-up",
      status: "rescheduled" as const,
    },
    {
      id: "4",
      patient: "Maria Garcia",
      doctor: "Dr. Rebecca White",
      time: "Today, 2:30 PM",
      purpose: "Cardiology Follow-up",
      status: "confirmed" as const,
    },
    {
      id: "5",
      patient: "William Taylor",
      doctor: "Dr. James Brown",
      time: "Today, 3:45 PM",
      purpose: "General Checkup",
      status: "completed" as const,
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Hospital metrics and management overview
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Patients"
            value="1,284"
            description="Active patients under care"
            icon={Users}
            trend="up"
            trendValue="3.2% from last week"
          />
          <StatsCard
            title="Today's Appointments"
            value="42"
            description="8 require attention"
            icon={Calendar}
            trend="down"
            trendValue="5.1% from yesterday"
          />
          <StatsCard
            title="Bed Occupancy"
            value="70%"
            description="42/60 beds occupied"
            icon={BedDouble}
            trend="up"
            trendValue="2.5% from yesterday"
          />
          <StatsCard
            title="Average Wait Time"
            value="23 min"
            description="For non-emergency cases"
            icon={Clock}
            trend="down"
            trendValue="12% from last month"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <BedOccupancyChart
            data={bedOccupancyData}
            title="Bed Occupancy Status"
            description="Real-time distribution of bed availability"
          />
          <StatsCard
            title="Critical Alerts"
            value="3 Active Alerts"
            description="1 emergency case needs immediate attention"
            icon={AlertTriangle}
            className="bg-red-50 border-red-200"
          />
        </div>

        <AppointmentsTable
          appointments={appointmentsData}
          title="Today's Appointments"
          description="Real-time appointment status and management"
        />
      </div>
    </Layout>
  );
};

export default Index;
