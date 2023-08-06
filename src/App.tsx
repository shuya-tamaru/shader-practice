import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";

import "./App.css";
import Sphere from "./components/Sphere";
import Interface from "./components/Interface";
import Fract from "./components/Fract";
import Domain from "./components/Domain";
import Brain from "./components/Brain";

const getToy = (toy: number) => {
  // const component = toy === 0 ? <Sphere/> : toy === 1 ? <Fract /> : <Domain />;
  const component = toy === 0 ? <Brain /> : toy === 1 ? <Fract /> : <Domain />;
  return component;
};

function App() {
  const [toy, setToy] = useState<number>(0);

  return (
    <>
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          background: "#000",
        }}
        camera={{
          fov: 75,
          near: 0.01,
          far: 20000,
          position: [0, 0, 0.3],
        }}
      >
        <OrbitControls makeDefault />
        {getToy(toy)}
      </Canvas>
      <Interface setToy={setToy} />
    </>
  );
}

export default App;
