import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Package as PackageIcon } from "lucide-react";
import VehicleSelector from "./VehicleSelector";
import LocationMap from "./LocationMap";
import DriverFinding from "./DriverFinding";

const DeliveryForm = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("motorcycle");
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [isFindingDriver, setIsFindingDriver] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const calculatePrice = (vehicleType: string) => {
    const basePrices = {
      motorcycle: 50,
      van: 150,
      truck: 300,
    };
    const basePrice = basePrices[vehicleType as keyof typeof basePrices] || 50;
    const randomAdd = Math.floor(Math.random() * 50);
    setEstimatedPrice(basePrice + randomAdd);
  };

  const handleConfirmBooking = () => {
    setIsFindingDriver(true);
  };

  const handleCancelSearch = () => {
    setIsFindingDriver(false);
  };

  const handleDriverFound = () => {
    setIsFindingDriver(false);
    setBookingConfirmed(true);
  };

  const handleVehicleSelect = (vehicle: string) => {
    setSelectedVehicle(vehicle);
    calculatePrice(vehicle);
  };

  if (bookingConfirmed) {
    return (
      <section className="py-20 bg-muted/30" id="services">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
              <CardDescription>Your delivery is on the way</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-4">
                <p className="text-lg font-semibold mb-2">Thank you for your order!</p>
                <p className="text-muted-foreground">Track your delivery in real-time</p>
              </div>
              <Button onClick={() => window.location.reload()} variant="outline">
                Book Another Delivery
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30" id="services">
      {isFindingDriver && (
        <DriverFinding onCancel={handleCancelSearch} onDriverFound={handleDriverFound} />
      )}
      
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
              <LocationMap
                label="Pickup Location"
                onLocationSelect={(lat, lng, address) => {
                  setPickupLocation({ lat, lng, address });
                }}
              />
              {pickupLocation && (
                <p className="text-sm text-muted-foreground">
                  Selected: {pickupLocation.address}
                </p>
              )}
            </div>

            {/* Dropoff Location */}
            <div className="space-y-2">
              <LocationMap
                label="Drop-off Location"
                onLocationSelect={(lat, lng, address) => {
                  setDropoffLocation({ lat, lng, address });
                }}
              />
              {dropoffLocation && (
                <p className="text-sm text-muted-foreground">
                  Selected: {dropoffLocation.address}
                </p>
              )}
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
                  <div className="text-3xl font-bold text-primary">₱{estimatedPrice}</div>
                </div>
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={handleConfirmBooking}
                  disabled={!pickupLocation || !dropoffLocation}
                >
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
