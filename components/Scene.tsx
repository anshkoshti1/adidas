import { ShirtType } from "@/lib/textures";
import { View } from "@react-three/drei";
import React from "react";
import { FirstWhiteModel } from "./FirstWhiteModel";
import { FirstGrayModel } from "./FirstGrayModel";
import { FirstSportModel } from "./FirstSportModel";

type Props = {
  shirtType: ShirtType;
};

const Scene = ({ shirtType }: Props) => {
  return (
    <main className="min-h-screen">
      <section id="first-section" className="h-screen">
        <View className="w-dvw h-dvh">
          {shirtType === "white" && <FirstWhiteModel />}
          {shirtType === "gray" && <FirstGrayModel />}
          {shirtType === "sport" && <FirstSportModel />}
        </View>
      </section>
      {/* <section id="second-section" className="h-screen">
        <View className="w-dvw h-dvh"></View>
      </section>
      <section id="third-section" className="h-screen">
        <View className="w-dvw h-dvh"></View>
      </section> */}
    </main>
  );
};

export default Scene;
