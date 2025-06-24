
import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Plus, Package, Calendar, DollarSign, Users } from 'lucide-react';

const VendorDashboard = () => {
  const { state } = useApp();

  if (!state.user || state.user.type !== 'vendor') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-vaikunta-charcoal mb-4">Access Denied</h1>
          <p className="text-gray-600">You need to be logged in as a vendor to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-vaikunta-charcoal mb-2">
          Welcome back, {state.user.name}!
        </h1>
        <p className="text-gray-600">Manage your vendor account and services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,420</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+4 new this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Services</CardTitle>
            <CardDescription>Manage your event services and offerings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Wedding Photography</h3>
                  <p className="text-sm text-gray-600">Starting at $800</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Event Catering</h3>
                  <p className="text-sm text-gray-600">Starting at $25/person</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
              <Button className="w-full bg-vaikunta-gold hover:bg-vaikunta-gold/90">
                <Plus className="w-4 h-4 mr-2" />
                Add New Service
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Your latest customer bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Sarah & Mike's Wedding</h3>
                  <p className="text-sm text-gray-600">June 15, 2024</p>
                </div>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Confirmed</span>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Corporate Event</h3>
                  <p className="text-sm text-gray-600">June 22, 2024</p>
                </div>
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Birthday Party</h3>
                  <p className="text-sm text-gray-600">June 30, 2024</p>
                </div>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">New</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboard;
