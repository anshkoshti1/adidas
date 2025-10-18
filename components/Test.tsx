"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Cube } from "./Cube";

const Test = () => {
  return (
    <Canvas style={{ position: "fixed" }}>
      <Environment preset="studio" />
      <OrbitControls />
      <mesh position={[-1,0,0]}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* <mesh position={[1,0,0]} scale={1.5}>
        <boxGeometry />
        <meshBasicMaterial color="orange" />
      </mesh> */}
      <Cube />
    </Canvas>
  );
};

export default Test;
