import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sphereFragmentShader } from "../shaders/sphereShader/sphereFragmentShader";
import { sphereVertexShader } from "../shaders/sphereShader/sphereVertexShader";

const gepmetry = new THREE.BoxGeometry(30, 30, 30, 10, 10, 10);
const material = new THREE.ShaderMaterial({
  transparent: true,
  wireframe: true,
  uniforms: {
    u_time: { value: 0.0 },
    u_mouse: { value: { x: 0.0, y: 0.0 } },
    u_resolution: { value: { x: 0, y: 0 } },
    u_radius: { value: 20.0 },
  },
  vertexShader: sphereVertexShader,
  fragmentShader: sphereFragmentShader,
});

const Sphere = () => {
  useFrame((state, delta) => {
    material.uniforms.u_time.value++;
  });
  return (
    <>
      <mesh geometry={gepmetry} material={material} />
    </>
  );
};

export default Sphere;
