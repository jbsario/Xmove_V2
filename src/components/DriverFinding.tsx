import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DriverFindingProps {
  onCancel: () => void;
  onDriverFound: () => void;
}

const DriverFinding = ({ onCancel, onDriverFound }: DriverFindingProps) => {
  const [status, setStatus] = useState<"searching" | "found">("searching");
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    // Simulate finding driver after 3-5 seconds
    const findDriverTimeout = setTimeout(() => {
      setStatus("found");
      setTimeout(() => {
        onDriverFound();
      }, 2000);
    }, Math.random() * 2000 + 3000);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(findDriverTimeout);
    };
  }, [onDriverFound]);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {status === "searching" ? (
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
            ) : (
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {status === "searching" ? `Finding Driver${dots}` : "Driver Found!"}
          </CardTitle>
          <CardDescription>
            {status === "searching"
              ? "Searching for the nearest available driver"
              : "Your driver is on the way to pickup location"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "found" && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Juan dela Cruz</div>
                  <div className="text-sm text-muted-foreground">Toyota Hiace • ABC-1234</div>
                  <div className="text-sm text-primary">ETA: 10 minutes</div>
                </div>
              </div>
            </div>
          )}
          {status === "searching" && (
            <Button variant="outline" className="w-full" onClick={onCancel}>
              Cancel Search
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverFinding;
