import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import "./App.css";
import Sphere from "./components/Sphere";
import Interface from "./components/Interface";
import { useState } from "react";
import Fract from "./components/Fract";

const getToy = (toy: number) => {
  const component = toy === 0 ? <Sphere /> : toy === 1 ? <Fract /> : <></>;
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
          near: 0.1,
          far: 200,
          position: [0, 0, 60],
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
