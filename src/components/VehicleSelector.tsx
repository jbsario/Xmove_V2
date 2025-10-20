import { cn } from "@/lib/utils";
import motorcycleIcon from "@/assets/motorcycle-icon.png";
import vanIcon from "@/assets/van-icon.png";
import truckIcon from "@/assets/truck-icon.png";

interface VehicleSelectorProps {
  selectedVehicle: string;
  onSelect: (vehicle: string) => void;
}

const vehicles = [
  {
    id: "motorcycle",
    name: "Motorcycle",
    description: "Small items, documents",
    capacity: "Up to 20kg",
    icon: motorcycleIcon,
  },
  {
    id: "van",
    name: "Van",
    description: "Medium packages, boxes",
    capacity: "Up to 500kg",
    icon: vanIcon,
  },
  {
    id: "truck",
    name: "Truck",
    description: "Large items, furniture",
    capacity: "Up to 2000kg",
    icon: truckIcon,
  },
];

const VehicleSelector = ({ selectedVehicle, onSelect }: VehicleSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {vehicles.map((vehicle) => (
        <button
          key={vehicle.id}
          onClick={() => onSelect(vehicle.id)}
          className={cn(
            "relative p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md",
            "flex flex-col items-center text-center space-y-3",
            selectedVehicle === vehicle.id
              ? "border-primary bg-primary/5 shadow-md"
              : "border-border bg-card hover:border-primary/50"
          )}
        >
          <img 
            src={vehicle.icon} 
            alt={vehicle.name}
            className="h-20 w-20 object-contain"
          />
          <div>
            <h3 className="font-semibold text-lg text-foreground">{vehicle.name}</h3>
            <p className="text-sm text-muted-foreground">{vehicle.description}</p>
            <p className="text-xs text-primary font-medium mt-1">{vehicle.capacity}</p>
          </div>
          {selectedVehicle === vehicle.id && (
            <div className="absolute top-2 right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
              <svg
                className="h-4 w-4 text-primary-foreground"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default VehicleSelector;
