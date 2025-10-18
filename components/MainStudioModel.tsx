import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useMainStudioTextures } from "@/lib/useTextures";
import { createMaterial } from "@/lib/materials";
import { studioTextures } from "@/lib/textures";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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

  const shirts = [
    {
      position: [0.65, 0.7, -0.45] as [number, number, number],
      rotation: [0, Math.PI / 9, 0] as [number, number, number],
      geometry: nodes.Shirt_White.geometry,
      material: materials.whiteShirt,
      hoverMaterial: materials.whiteStudio,
      slug: "white",
    },
    {
      position: [0, 0.7, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      geometry: nodes.Shirt_Sport.geometry,
      material: materials.sportShirt,
      hoverMaterial: materials.redStudio,
      slug: "sport",
    },
    {
      position: [-0.65, 0.7, -0.45] as [number, number, number],
      rotation: [0, -Math.PI / 9, 0] as [number, number, number],
      geometry: nodes.Shirt_Gray.geometry,
      material: materials.grayShirt,
      hoverMaterial: materials.grayStudio,
      slug: "gray",
    },
  ];

  const [envMaterial, setEnvMaterial] = useState<THREE.MeshBasicMaterial>(
    materials.defaultStudio
  );
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const tlRefs = useRef<GSAPTimeline[]>([]);
  useGSAP(() => {
    if (!meshRefs.current) return;
    meshRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      tlRefs.current[index] = gsap
        .timeline({ paused: true })
        .to(mesh.rotation, { y: 0, duration: 0.5, ease: "power1.inOut" }, "<")
        .to(
          mesh.scale,
          {
            x: 1.05,
            y: 1.05,
            z: 1.05,
            duration: 0.5,
            ease: "power1.inOut",
          },
          "<"
        );
    });
  });

  function enterHandler(index: number, material: THREE.MeshBasicMaterial) {
    document.body.style.cursor = "pointer";
    setEnvMaterial(material);
    tlRefs.current[index].play();
  }

  function leaveHandler(index: number) {
    document.body.style.cursor = "auto";
    tlRefs.current[index].reverse();
  }
  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Environment.geometry}
        material={envMaterial}
      />
      {shirts.map((shirt, i) => (
        <mesh
          key={i}
          ref={(m) => {
            if (!m) return;
            meshRefs.current[i] = m;
          }}
          geometry={shirt.geometry}
          material={shirt.material}
          position={shirt.position}
          rotation={shirt.rotation}
          onPointerEnter={() => enterHandler(i, shirt.hoverMaterial)}
          onPointerLeave={() => leaveHandler(i)}
        />
      ))}
      <mesh
        geometry={nodes.Hitbox.geometry}
        scale={[2.52, 1, 1]}
        visible={false}
        onPointerLeave={() => setEnvMaterial(materials.defaultStudio)}
      />
    </group>
  );
}

useGLTF.preload("/models/main/MainStudio.glb");
