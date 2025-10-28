import { environmentPaths, ShirtType, videotextures } from "@/lib/textures";
import { useTexture, useVideoTexture } from "@react-three/drei";
import { SectionType, studioTextures } from "./textures";
import * as THREE from "three";
import { useMemo } from "react";

export const useMainStudioTextures = () => {
  return useModifiedTextures(studioTextures.main, true);
};

export const useShirtSectionTextures = (
  shirtType: ShirtType,
  section: SectionType,
  setModifier = true
) => {
  const paths = studioTextures.shirts[shirtType][section];
  return useModifiedTextures(paths, setModifier);
};

export const useShirtEnvCube = (shirtType: ShirtType) => {
  const path = environmentPaths[shirtType];
  const env = useMemo(() => {
    const text = new THREE.CubeTextureLoader()
      .setPath(path)
      .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
    text.colorSpace = THREE.SRGBColorSpace;
    return text;
  }, [path]);

  return env;
};

export const useShirtVideoTexture = (shirtType: ShirtType) => {
  const path = videotextures[shirtType];
  return useVideoTexture(path);
};

function useModifiedTextures(
  paths: Record<string, string>,
  setModifier: boolean
) {
  const textures = useTexture(paths);
  if (setModifier) {
    Object.values(textures).forEach((text) => {
      text.flipY = false;
      text.colorSpace = THREE.SRGBColorSpace;
    });
  }
  return textures;
}
