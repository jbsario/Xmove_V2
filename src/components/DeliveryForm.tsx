import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Package as PackageIcon } from "lucide-react";
import VehicleSelector from "./VehicleSelector";

const DeliveryForm = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("motorcycle");
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

  const calculatePrice = (vehicleType: string) => {
    const basePrices = {
      motorcycle: 8,
      van: 25,
      truck: 45,
    };
    const basePrice = basePrices[vehicleType as keyof typeof basePrices] || 8;
    const randomAdd = Math.floor(Math.random() * 10);
    setEstimatedPrice(basePrice + randomAdd);
  };

  const handleVehicleSelect = (vehicle: string) => {
    setSelectedVehicle(vehicle);
    calculatePrice(vehicle);
  };

  return (
    <section className="py-20 bg-muted/30" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Book Your Delivery</h2>
          <p className="text-muted-foreground text-lg">Fast, reliable, and affordable delivery at your fingertips</p>
        </div>

        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Delivery Details</CardTitle>
            <CardDescription>Fill in the information below to get an instant quote</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pickup Location */}
            <div className="space-y-2">
              <Label htmlFor="pickup" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Pickup Location
              </Label>
              <Input 
                id="pickup" 
                placeholder="Enter pickup address" 
                className="h-12"
              />
            </div>

            {/* Dropoff Location */}
            <div className="space-y-2">
              <Label htmlFor="dropoff" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-secondary" />
                Drop-off Location
              </Label>
              <Input 
                id="dropoff" 
                placeholder="Enter delivery address" 
                className="h-12"
              />
            </div>

            {/* Package Details */}
            <div className="space-y-2">
              <Label htmlFor="package" className="flex items-center gap-2">
                <PackageIcon className="h-4 w-4 text-primary" />
                Package Details
              </Label>
              <Textarea 
                id="package" 
                placeholder="Describe your package (size, weight, special handling)" 
                rows={3}
              />
            </div>

            {/* Vehicle Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Select Vehicle Type</Label>
              <VehicleSelector 
                selectedVehicle={selectedVehicle} 
                onSelect={handleVehicleSelect} 
              />
            </div>

            {/* Price Display */}
            {estimatedPrice > 0 && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Estimated Price</div>
                  <div className="text-3xl font-bold text-primary">${estimatedPrice}</div>
                </div>
                <Button variant="hero" size="lg">
                  Confirm Booking
                </Button>
              </div>
            )}

            {estimatedPrice === 0 && (
              <Button 
                variant="default" 
                size="lg" 
                className="w-full"
                onClick={() => calculatePrice(selectedVehicle)}
              >
                Get Quote
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DeliveryForm;
