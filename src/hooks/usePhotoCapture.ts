import { useState, useCallback } from "react";

export function usePhotoCapture(onPhotoCapture?: (photoDataUrl: string) => void) {
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const capturePhoto = useCallback(
    (captureFunction: () => string) => {
      try {
        const photoDataUrl = captureFunction();
        setCapturedPhoto(photoDataUrl);
        onPhotoCapture?.(photoDataUrl);
        return photoDataUrl;
      } catch (err) {
        const error = err as Error;
        setError(`Erro ao capturar foto: ${error.message}`);
        return null;
      }
    },
    [onPhotoCapture]
  );

  const downloadPhoto = useCallback((photoDataUrl: string, filename: string) => {
    try {
      const link = document.createElement("a");
      link.download = filename;
      link.href = photoDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      const error = err as Error;
      setError(`Erro ao baixar foto: ${error.message}`);
    }
  }, []);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setCapturedPhoto(result);
          onPhotoCapture?.(result);
        }
      };
      reader.onerror = () => {
        setError("Erro ao ler o arquivo de imagem.");
      };
      reader.readAsDataURL(file);
    },
    [onPhotoCapture]
  );

  const resetPhoto = useCallback(() => {
    setCapturedPhoto(null);
  }, []);

  return {
    capturedPhoto,
    error,
    capturePhoto,
    downloadPhoto,
    handleFileUpload,
    resetPhoto,
    setError,
  };
}
