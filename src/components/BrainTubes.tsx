import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const Tube = ({ curve }: { curve: THREE.CatmullRomCurve3 }) => {
  const brainMat = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  useFrame(({ clock, mouse }) => {
    if (brainMat && brainMat.current) {
      brainMat.current.uniforms.time.value = clock.getElapsedTime();
      brainMat.current.uniforms.mouse.value = new THREE.Vector3(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      );
    }
  });
  const brainMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        wireframe: false,
        uniforms: {
          time: { value: 0.0 },
          color: { value: new THREE.Color(0.1, 0.3, 0.6) },
          mouse: { value: new THREE.Vector3(0, 0, 0) },
        },
        vertexShader: /*glsl*/ `
      uniform float time;
      varying vec2 vUv;
      varying float vProgress;
      uniform vec3 mouse;
      void main() {
        vUv = uv;
        vProgress = smoothstep(-1.,1., sin(vUv.x * 8.0 + time*3.0));

        vec3 p = position;
        float maxDist = 0.05;
        float dist = length(mouse - p);
        if(dist < maxDist){
          vec3 dir = normalize(mouse - p);
          dir*=(1. - dist/maxDist);
          p-=dir * 0.01;
        }
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
        fragmentShader: /*glsl*/ `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying float vProgress;
      void main() {
        vec3 finalColor = mix(color,color*0.25,vProgress);
        float hideCorner = smoothstep(0.,0.1,vUv.x);
        float hideCorner2 = smoothstep(1.0,0.9,vUv.x);
        gl_FragColor.rgba = vec4(finalColor, hideCorner*hideCorner2);
      }
    `,
      }),
    []
  );

  return (
    <mesh>
      <tubeGeometry args={[curve, 640, 0.001, 2, false]} />
      <primitive object={brainMaterial} ref={brainMat} />
    </mesh>
  );
};

export const BrainTubes = ({
  allTheCurves,
}: {
  allTheCurves: THREE.CatmullRomCurve3[];
}) => {
  return (
    <>
      {allTheCurves.map((curve, i) => {
        return <Tube curve={curve} key={i} />;
      })}
    </>
  );
};
