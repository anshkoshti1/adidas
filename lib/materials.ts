import * as THREE from "three";

export const createMaterial = (textures: Record<string, THREE.Texture>) => {
  const material: Record<string, THREE.Material> = {};
  for (const [key, text] of Object.entries(textures)) {
    material[key] = new THREE.MeshBasicMaterial({ map: text });
  }
  return material;
};
