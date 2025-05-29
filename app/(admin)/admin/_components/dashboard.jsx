"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent} from "@/components/ui/tabs";
import { Car, Calendar, TrendingUp, Info, IndianRupee } from "lucide-react";

export function Dashboard({ initialData }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!initialData || !initialData.success) {
    return (
      <Alert variant="destructive">
        <Info className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {initialData?.error || "Failed to load dashboard data"}
        </AlertDescription>
      </Alert>
    );
  }

  const { cars, testDrives } = initialData.data;

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
      >

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Cars
                </CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cars.total}</div>
                <p className="text-xs text-muted-foreground">
                  {cars.available} available, {cars.sold} sold
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Conversion Rate
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {testDrives.total > 0 ? ((cars.sold / testDrives.total) * 100).toFixed(1) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  From test drives to sales
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cars Sold</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cars.sold}</div>
                <p className="text-xs text-muted-foreground">
                  {((cars.sold / cars.total) * 100).toFixed(1)}% of inventory
                </p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Test Drives
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{testDrives.total}</div>
                <p className="text-xs text-muted-foreground">
                  {testDrives.pending} pending, {testDrives.confirmed} confirmed
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dealership Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-sm mb-2">Car Listing</h3>
                    <div className="flex items-center mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: `${(cars.available / cars.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">
                        {((cars.available / cars.total) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Available Listing capacity
                    </p>
                
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-sm mb-2">
                      Test Drive Success
                    </h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{
                            width: `${
                              (testDrives.completed / (testDrives.total || 1)) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm">
                        {(
                          (testDrives.completed / (testDrives.total || 1)) *
                          100
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Completed test drives
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-blue-600">
                      {cars.sold}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">Cars Sold</p>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-amber-600">
                      {testDrives.pending + testDrives.confirmed}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Upcoming Test Drives
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl font-bold text-green-600">
                      {((cars.available / (cars.total || 1)) * 100).toFixed(0)}%
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Inventory Utilization
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}