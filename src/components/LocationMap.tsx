import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface LocationMapProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  initialLocation?: { lat: number; lng: number };
  label: string;
}

const LocationMap = ({ onLocationSelect, initialLocation, label }: LocationMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [isTokenSet, setIsTokenSet] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !isTokenSet) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: initialLocation ? [initialLocation.lng, initialLocation.lat] : [121.0244, 14.5547], // Manila
      zoom: 13,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add marker on click
    map.current.on("click", async (e) => {
      const { lng, lat } = e.lngLat;

      if (marker.current) {
        marker.current.setLngLat([lng, lat]);
      } else {
        marker.current = new mapboxgl.Marker({ color: "#f97316" })
          .setLngLat([lng, lat])
          .addTo(map.current!);
      }

      // Get address from coordinates (reverse geocoding)
      const address = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      onLocationSelect(lat, lng, address);
    });

    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, mapboxToken, initialLocation, onLocationSelect]);

  if (!isTokenSet) {
    return (
      <Card className="p-4">
        <Label htmlFor="mapbox-token">{label} - Enter Mapbox Token</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Get your free token at{" "}
          <a
            href="https://mapbox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <div className="flex gap-2">
          <Input
            id="mapbox-token"
            type="text"
            placeholder="pk.eyJ1..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <button
            onClick={() => setIsTokenSet(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Set
          </button>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <Label className="mb-2 block">{label} - Click on map to pin location</Label>
      <div ref={mapContainer} className="h-[300px] w-full rounded-lg border" />
    </div>
  );
};

export default LocationMap;
