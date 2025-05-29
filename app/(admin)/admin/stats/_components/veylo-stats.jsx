import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, XCircle, TrendingUp, Car, IndianRupee } from "lucide-react";

export default function VeyloStats({ cars, testDrives }) {
  return (
    <div className="space-y-10">
      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testDrives.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testDrives.pending}</div>
              <p className="text-xs text-muted-foreground">{((testDrives.pending / testDrives.total) * 100).toFixed(1)}% of bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testDrives.confirmed}</div>
              <p className="text-xs text-muted-foreground">{((testDrives.confirmed / testDrives.total) * 100).toFixed(1)}% of bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testDrives.completed}</div>
              <p className="text-xs text-muted-foreground">{((testDrives.completed / testDrives.total) * 100).toFixed(1)}% of bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
              <XCircle className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testDrives.cancelled}</div>
              <p className="text-xs text-muted-foreground">{((testDrives.cancelled / testDrives.total) * 100).toFixed(1)}% of bookings</p>
            </CardContent>
          </Card>
        </div>

        {/* Booking Status Breakdown */}
        <div className="mt-10 bg-white rounded-lg shadow p-6">
          <h3 className="font-medium text-lg mb-4 text-gray-800">Booking Status Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pending */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Pending</span>
                <span className="font-medium">
                  {testDrives.pending} ({((testDrives.pending / testDrives.total) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${(testDrives.pending / testDrives.total) * 100}%` }}></div>
              </div>
            </div>
            {/* Confirmed */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Confirmed</span>
                <span className="font-medium">
                  {testDrives.confirmed} ({((testDrives.confirmed / testDrives.total) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(testDrives.confirmed / testDrives.total) * 100}%` }}></div>
              </div>
            </div>
            {/* Completed */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Completed</span>
                <span className="font-medium">
                  {testDrives.completed} ({((testDrives.completed / testDrives.total) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(testDrives.completed / testDrives.total) * 100}%` }}></div>
              </div>
            </div>
            {/* Cancelled */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Cancelled</span>
                <span className="font-medium">
                  {testDrives.cancelled} ({((testDrives.cancelled / testDrives.total) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${(testDrives.cancelled / testDrives.total) * 100}%` }}></div>
              </div>
            </div>
            {/* No Show */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>No Show</span>
                <span className="font-medium">
                  {testDrives.noShow} ({((testDrives.noShow / testDrives.total) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: `${(testDrives.noShow / testDrives.total) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
              <Car className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{cars.total}</div>
              <p className="text-xs text-muted-foreground">{cars.available} available, {cars.sold} sold</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Test Drives</CardTitle>
              <Calendar className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{testDrives.total}</div>
              <p className="text-xs text-muted-foreground">{testDrives.pending} pending, {testDrives.confirmed} confirmed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{testDrives.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">From test drives to sales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cars Sold</CardTitle>
              <IndianRupee className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{cars.sold}</div>
              <p className="text-xs text-muted-foreground">{((cars.sold / cars.total) * 100).toFixed(1)}% of inventory</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
