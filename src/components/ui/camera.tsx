"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Camera as CameraIcon, X, Download, CameraOff } from "lucide-react";

type CameraProps = {
  onCapture?: (imageData: string) => void;
  trigger?: React.ReactNode;
  className?: string;
};

export function Camera({ onCapture, trigger, className }: CameraProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Permission state is tracked internally but not currently exposed
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    console.log("Starting camera...");

    // Check if we're in a browser environment
    console.log(
      "Window:",
      typeof window !== "undefined" ? "Available" : "Undefined"
    );
    console.log(
      "navigator.mediaDevices:",
      navigator.mediaDevices ? "Available" : "Undefined"
    );
    const hasGetUserMedia = !!(
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia
    );
    console.log(
      "getUserMedia:",
      hasGetUserMedia ? "Available" : "Not available"
    );

    if (typeof window === "undefined") {
      const errorMsg = "Error: Window is not defined (are you in a browser?)";
      console.error(errorMsg);
      setError(errorMsg);
      return;
    }

    if (!hasGetUserMedia) {
      const errorMsg = "Error: MediaDevices API not supported in this browser";
      console.error(errorMsg);
      setError(errorMsg);
      return;
    }

    try {
      console.log("Requesting camera access...");
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };
      console.log("Using constraints:", constraints);

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log("Got stream:", stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        console.log("Video stream attached to video element");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check permissions.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, []);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) return;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image data URL
      const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);
      setCapturedImage(imageDataUrl);

      // Call the onCapture callback if provided
      if (onCapture) {
        onCapture(imageDataUrl);
      }
    }
  }, [onCapture]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  const downloadImage = useCallback(() => {
    if (!capturedImage) return;

    const link = document.createElement("a");
    link.href = capturedImage;
    link.download = `photo-${new Date().toISOString()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [capturedImage]);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      setCapturedImage(null);
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setError(null);
    }
  };

  // Default trigger button if none provided
  const defaultTrigger = (
    <Button type="button" variant="outline" size="icon">
      <CameraIcon className="h-4 w-4" />
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <div className={className}>
        <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Take a photo</DialogTitle>
          </DialogHeader>

          <Card className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            {error ? (
              <CardContent className="flex h-full flex-col items-center justify-center gap-4 bg-gray-100 p-4 text-center dark:bg-gray-800">
                <CameraOff className="h-12 w-12 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {error}
                </p>
                <Button variant="outline" onClick={startCamera}>
                  Retry
                </Button>
              </CardContent>
            ) : capturedImage ? (
              <div className="relative h-full w-full">
                <div className="relative h-full w-full">
                  {/* Using img tag is necessary for dynamic camera capture preview */}
                  {/* Next.js Image component doesn't work with data URLs in this context */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={retakePhoto}
                    className="h-12 w-12 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    onClick={downloadImage}
                    className="h-12 w-12 rounded-full"
                  >
                    <Download className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative h-full w-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <Button
                    onClick={captureImage}
                    className="h-16 w-16 rounded-full p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30"
                    variant="ghost"
                    size="icon"
                  >
                    <Camera className="h-8 w-8 text-white" />
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Hidden canvas for image capture */}
          <canvas ref={canvasRef} className="hidden" />
        </DialogContent>
      </div>
    </Dialog>
  );
}
