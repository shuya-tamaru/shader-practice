import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { fracVertexShader } from "../shaders/fracShader/fracVertexShader";
import { fracFragmentShader } from "../shaders/fracShader/fracFragmentShader";

const gepmetry = new THREE.PlaneGeometry(170, 100, 1000, 1000);
const material = new THREE.ShaderMaterial({
  transparent: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    u_time: { value: 0.0 },
    u_mouse: { value: { x: 0.0, y: 0.0 } },
    u_resolution: { value: { x: 0, y: 0 } },
    u_radius: { value: 20.0 },
  },
  vertexShader: fracVertexShader,
  fragmentShader: fracFragmentShader,
});

const Fract = () => {
  useFrame((state, delta) => {
    material.uniforms.u_time.value++;
  });
  return (
    <>
      <mesh geometry={gepmetry} material={material} />
    </>
  );
};

export default Fract;
