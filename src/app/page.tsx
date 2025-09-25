"use client";

import { Camera } from "@/components/ui/camera";
import { Button } from "@/components/ui/button";
import { Camera as CameraIcon } from "lucide-react";

export default function Home() {
  const handleCapture = (imageData: string) => {
    console.log("Image captured:", imageData);
    // You can handle the captured image data here
    // For example, upload it to a server or save it in state
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-2xl font-bold">Camera App</h1>
        <div className="flex justify-center">
          <Camera
            onCapture={handleCapture}
            trigger={
              <Button>
                <CameraIcon className="mr-2 h-4 w-4" />
                Open Camera
              </Button>
            }
          />
        </div>
      </div>
    </main>
  );
}
