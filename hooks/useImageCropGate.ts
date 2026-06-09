"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  aspectRatiosMatch,
  getImageDimensionsFromFile,
  type CropTarget,
} from "@/lib/image-crop";

export interface CropSession {
  imageSrc: string;
  aspect: number;
  originalFile: File;
  targetLabel?: string;
}

interface UseImageCropGateOptions {
  getCropTarget: () => CropTarget | null;
  targetLabel?: string;
}

export function useImageCropGate({
  getCropTarget,
  targetLabel,
}: UseImageCropGateOptions) {
  const [cropSession, setCropSession] = useState<CropSession | null>(null);
  const getCropTargetRef = useRef(getCropTarget);
  const targetLabelRef = useRef(targetLabel);
  const originalFileRef = useRef<File | null>(null);
  const cropSrcRef = useRef<string | null>(null);

  getCropTargetRef.current = getCropTarget;
  targetLabelRef.current = targetLabel;

  const revokeCropSrc = useCallback(() => {
    if (cropSrcRef.current) {
      URL.revokeObjectURL(cropSrcRef.current);
      cropSrcRef.current = null;
    }
  }, []);

  const clearCropSession = useCallback(() => {
    revokeCropSrc();
    setCropSession(null);
  }, [revokeCropSrc]);

  useEffect(() => {
    return () => {
      revokeCropSrc();
    };
  }, [revokeCropSrc]);

  const finalizeFile = useCallback(
    async (file: File): Promise<{ file: File; needsCrop: boolean }> => {
      originalFileRef.current = file;
      const target = getCropTargetRef.current();

      if (!target || target.width <= 0 || target.height <= 0) {
        return { file, needsCrop: false };
      }

      const dimensions = await getImageDimensionsFromFile(file);
      const matches = aspectRatiosMatch(
        dimensions.width,
        dimensions.height,
        target.width,
        target.height
      );

      if (matches) {
        clearCropSession();
        return { file, needsCrop: false };
      }

      revokeCropSrc();
      const imageSrc = URL.createObjectURL(file);
      cropSrcRef.current = imageSrc;
      setCropSession({
        imageSrc,
        aspect: target.width / target.height,
        originalFile: file,
        targetLabel: targetLabelRef.current,
      });

      return { file, needsCrop: true };
    },
    [clearCropSession, revokeCropSrc]
  );

  const reevaluateCrop = useCallback(async () => {
    const original = originalFileRef.current;
    if (!original) return null;

    const result = await finalizeFile(original);
    return result.needsCrop ? null : result.file;
  }, [finalizeFile]);

  const cancelCrop = useCallback(() => {
    originalFileRef.current = null;
    clearCropSession();
  }, [clearCropSession]);

  const completeCrop = useCallback(
    (croppedFile: File) => {
      originalFileRef.current = croppedFile;
      clearCropSession();
      return croppedFile;
    },
    [clearCropSession]
  );

  const resetOriginal = useCallback(() => {
    originalFileRef.current = null;
    clearCropSession();
  }, [clearCropSession]);

  return {
    cropSession,
    finalizeFile,
    reevaluateCrop,
    completeCrop,
    cancelCrop,
    resetOriginal,
    hasOriginalFile: () => originalFileRef.current !== null,
  };
}
