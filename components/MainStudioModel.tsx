import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMainStudioTextures } from "@/lib/useTextures";
import { createMaterial } from "@/lib/materials";
import { studioTextures } from "@/lib/textures";

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh;
  };
};

export function MainStudioModel() {
  const { nodes } = useGLTF(
    "/models/main/MainStudio.glb"
  ) as unknown as GLTFResult;

  const textures = useMainStudioTextures();
  const materials = createMaterial(textures) as Record<
    keyof typeof studioTextures.main,
    THREE.MeshBasicMaterial
  >;

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Environment.geometry}
        material={materials.defaultStudio}
      />
      <mesh
        geometry={nodes.Shirt_White.geometry}
        position={[0.65, 0.7, -0.45]}
        rotation={[0, Math.PI / 9, 0]}
        material={materials.whiteShirt}
      />
      <mesh
        geometry={nodes.Shirt_Sport.geometry}
        position={[0, 0.7, 0]}
        material={materials.sportShirt}
      />
      <mesh
        geometry={nodes.Shirt_Gray.geometry}
        position={[-0.65, 0.7, -0.45]}
        rotation={[0, -Math.PI / 9, 0]}
        material={materials.grayShirt}
      />
      <mesh
        geometry={nodes.Hitbox.geometry}
        scale={[2.52, 1, 1]}
        visible={false}
      />
    </group>
  );
}

useGLTF.preload("/models/main/MainStudio.glb");
