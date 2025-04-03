
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  BedDouble,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  BarChart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart as RechartBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Bed {
  id: string;
  number: string;
  wing: string;
  department: string;
  status: "occupied" | "available" | "reserved" | "maintenance";
  patient?: string;
  admissionDate?: string;
  estimatedDischarge?: string;
}

const BedsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Sample data for beds
  const beds: Bed[] = [
    {
      id: "1",
      number: "101-A",
      wing: "East",
      department: "General",
      status: "occupied",
      patient: "John Doe",
      admissionDate: "Oct 12, 2023",
      estimatedDischarge: "Oct 16, 2023",
    },
    {
      id: "2",
      number: "102-A",
      wing: "East",
      department: "General",
      status: "available",
    },
    {
      id: "3",
      number: "103-A",
      wing: "East",
      department: "General",
      status: "reserved",
      patient: "Jane Smith",
      admissionDate: "Oct 15, 2023",
    },
    {
      id: "4",
      number: "201-B",
      wing: "West",
      department: "Cardiology",
      status: "occupied",
      patient: "Robert Johnson",
      admissionDate: "Oct 10, 2023",
      estimatedDischarge: "Oct 18, 2023",
    },
    {
      id: "5",
      number: "202-B",
      wing: "West",
      department: "Cardiology",
      status: "maintenance",
    },
    {
      id: "6",
      number: "301-C",
      wing: "North",
      department: "ICU",
      status: "occupied",
      patient: "Maria Garcia",
      admissionDate: "Oct 14, 2023",
    },
    {
      id: "7",
      number: "302-C",
      wing: "North",
      department: "ICU",
      status: "available",
    },
    {
      id: "8",
      number: "401-D",
      wing: "South",
      department: "Pediatrics",
      status: "occupied",
      patient: "William Taylor",
      admissionDate: "Oct 13, 2023",
      estimatedDischarge: "Oct 17, 2023",
    },
  ];

  // Filter beds based on search term and department filter
  const filteredBeds = beds.filter((bed) => {
    const matchesSearch =
      bed.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bed.wing.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bed.patient &&
        bed.patient.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment =
      departmentFilter === "all" || bed.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  // Bed status analytics data
  const bedStatusData = [
    {
      department: "General",
      Occupied: 1,
      Available: 1,
      Reserved: 1,
      Maintenance: 0,
    },
    {
      department: "Cardiology",
      Occupied: 1,
      Available: 0,
      Reserved: 0,
      Maintenance: 1,
    },
    {
      department: "ICU",
      Occupied: 1,
      Available: 1,
      Reserved: 0,
      Maintenance: 0,
    },
    {
      department: "Pediatrics",
      Occupied: 1,
      Available: 0,
      Reserved: 0,
      Maintenance: 0,
    },
  ];

  // Bed turnover analytics data
  const bedTurnoverData = [
    { day: "Mon", turnover: 5 },
    { day: "Tue", turnover: 7 },
    { day: "Wed", turnover: 4 },
    { day: "Thu", turnover: 8 },
    { day: "Fri", turnover: 6 },
    { day: "Sat", turnover: 3 },
    { day: "Sun", turnover: 2 },
  ];

  // Get bed status class
  const getBedStatusClass = (status: Bed["status"]) => {
    switch (status) {
      case "occupied":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "reserved":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "maintenance":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bed Management</h1>
            <p className="text-muted-foreground">
              Monitor and manage bed allocation throughout the hospital
            </p>
          </div>
        </div>

        <Tabs defaultValue="beds">
          <TabsList>
            <TabsTrigger value="beds">Bed Status</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="beds" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Hospital Beds</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search beds or patients..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <Select
                        value={departmentFilter}
                        onValueChange={setDepartmentFilter}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Cardiology">Cardiology</SelectItem>
                          <SelectItem value="ICU">ICU</SelectItem>
                          <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBeds.map((bed) => (
                    <Card key={bed.id} className="overflow-hidden">
                      <div
                        className={cn(
                          "h-2",
                          bed.status === "occupied" && "bg-blue-500",
                          bed.status === "available" && "bg-green-500",
                          bed.status === "reserved" && "bg-yellow-500",
                          bed.status === "maintenance" && "bg-red-500"
                        )}
                      ></div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-xl font-semibold flex items-center gap-2">
                              <BedDouble className="h-5 w-5" />
                              Bed {bed.number}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {bed.wing} Wing • {bed.department}
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={getBedStatusClass(bed.status)}
                          >
                            {bed.status.charAt(0).toUpperCase() + bed.status.slice(1)}
                          </Badge>
                        </div>

                        {bed.patient && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="font-medium">{bed.patient}</div>
                            <div className="text-sm text-muted-foreground flex flex-col gap-1 mt-1">
                              <div>Admitted: {bed.admissionDate}</div>
                              {bed.estimatedDischarge && (
                                <div>Est. Discharge: {bed.estimatedDischarge}</div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="mt-4 flex gap-2">
                          {bed.status === "available" && (
                            <Button size="sm" className="w-full">
                              Assign Patient
                            </Button>
                          )}
                          {bed.status === "occupied" && (
                            <>
                              <Button size="sm" variant="outline">
                                Update
                              </Button>
                              <Button size="sm" variant="outline">
                                Discharge
                              </Button>
                            </>
                          )}
                          {bed.status === "reserved" && (
                            <Button size="sm" className="w-full">
                              Check In
                            </Button>
                          )}
                          {bed.status === "maintenance" && (
                            <Button size="sm" className="w-full">
                              Mark Available
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {filteredBeds.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No beds match your search criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Discharges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {beds
                    .filter((bed) => bed.estimatedDischarge)
                    .sort((a, b) => {
                      if (!a.estimatedDischarge || !b.estimatedDischarge) return 0;
                      return new Date(a.estimatedDischarge).getTime() - new Date(b.estimatedDischarge).getTime();
                    })
                    .slice(0, 3)
                    .map((bed) => (
                      <div key={bed.id} className="flex justify-between items-center p-3 rounded-md border">
                        <div>
                          <div className="font-medium">
                            {bed.patient} (Bed {bed.number})
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {bed.department} • {bed.estimatedDischarge}
                          </div>
                        </div>
                        <Button size="sm">Process</Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Bed Status by Department
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartBarChart
                        data={bedStatusData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Occupied" stackId="a" fill="#3b82f6" />
                        <Bar dataKey="Available" stackId="a" fill="#22c55e" />
                        <Bar dataKey="Reserved" stackId="a" fill="#eab308" />
                        <Bar dataKey="Maintenance" stackId="a" fill="#ef4444" />
                      </RechartBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Bed Turnover Rate (Last 7 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartBarChart
                        data={bedTurnoverData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="turnover" fill="#3b82f6" />
                      </RechartBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default BedsPage;
