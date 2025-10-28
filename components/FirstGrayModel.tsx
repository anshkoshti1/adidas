import * as THREE from "three";
import { useGLTF, useMask } from "@react-three/drei";
import { useShirtSectionTextures } from "@/lib/useTextures";
import { createMaterial } from "@/lib/materials";
import { TextureKey } from "@/lib/textures";
import Masking from "./Masking";
import { useRef } from "react";
import useFirstAnimation from "@/lib/useFirstAnimation";

type GLTFResult = {
  nodes: {
    [name: string]: THREE.Mesh;
  };
};

export function FirstGrayModel() {
  const { nodes } = useGLTF(
    "/models/gray/GrayStudio.glb"
  ) as unknown as GLTFResult;

  const stencil = useMask(1);
  const shirtRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const maskRef = useRef<THREE.Mesh>(null);

  const texture = useShirtSectionTextures("gray", "first");
  const materials = createMaterial(texture, stencil) as Record<
    TextureKey<"gray", "first">,
    THREE.MeshBasicMaterial
  >;

  useFirstAnimation(groupRef, shirtRef, maskRef);

  return (
    <group>
      <Masking ref={maskRef} />
      <group ref={groupRef} dispose={null}>
        <mesh
          ref={shirtRef}
          geometry={nodes.Shirt_Gray.geometry}
          material={materials.shirt}
          position={[0, 0.7, 0]}
        />
        <mesh geometry={nodes.Floor.geometry} material={materials.floor} />
        <mesh geometry={nodes.Wall.geometry} material={materials.wall} />
        <mesh geometry={nodes.Asset.geometry} material={materials.assets} />
      </group>
    </group>
  );
}
