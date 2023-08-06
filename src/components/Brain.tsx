import { data } from "../libs/data";
import * as THREE from "three";
import { BrainTubes } from "./BrainTubes";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const PATHS = data.economics[0].paths;
const randomRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

let curves: THREE.CatmullRomCurve3[] = [];
for (let i = 0; i < 100; i++) {
  let points = [];
  let length = randomRange(0.1, 1);

  for (let j = 0; j < 100; j++) {
    points.push(
      new THREE.Vector3().setFromSphericalCoords(
        1,
        Math.PI - (j / 100) * Math.PI * length,
        (i / 100) * Math.PI * 2
      )
    );
  }
  let tempCurve = new THREE.CatmullRomCurve3(points);
  curves.push(tempCurve);
}

let brainCUrves: THREE.CatmullRomCurve3[] = [];
PATHS.forEach((path) => {
  let points: THREE.Vector3[] = [];
  for (let i = 0; i < path.length; i += 3) {
    points.push(new THREE.Vector3(path[i], path[i + 1], path[i + 2]));
  }
  let tempCurve = new THREE.CatmullRomCurve3(points);
  brainCUrves.push(tempCurve);
});

type MyPoint = {
  currentOffset: number;
  speed: number;
  curve: THREE.CatmullRomCurve3;
  curPosition: number;
};

const BrainParticles = ({
  allTheCurves,
}: {
  allTheCurves: THREE.CatmullRomCurve3[];
}) => {
  const particleMat = useRef<THREE.ShaderMaterial>(null);
  const brainGeo = useRef<THREE.BufferGeometry>(null);
  let density = 10;
  let numberOfPoints = density * allTheCurves.length;

  const myPoints = useRef<MyPoint[]>([]);
  let positions = useMemo(() => {
    let positions = [];
    for (let i = 0; i < numberOfPoints; i++) {
      positions.push(
        randomRange(-1, 1),
        randomRange(-1, 1),
        randomRange(-1, 1)
      );
    }
    return new Float32Array(positions);
  }, []);

  let randoms = useMemo(() => {
    let nums: number[] = [];
    for (let i = 0; i < numberOfPoints; i++) {
      nums.push(randomRange(0.3, 1.0));
    }
    return new Float32Array(nums);
  }, []);

  useEffect(() => {
    for (let i = 0; i < allTheCurves.length; i++) {
      for (let j = 0; j < density; j++) {
        myPoints.current.push({
          currentOffset: Math.random(),
          speed: Math.random() * 0.01,
          curve: allTheCurves[i],
          curPosition: Math.random(),
        });
      }
    }
  }, []);

  useFrame(() => {
    if (!brainGeo || !brainGeo.current) return;
    let curPositions = brainGeo.current.attributes.position
      .array as Float32Array;

    for (let i = 0; i < myPoints.current.length; i++) {
      myPoints.current[i].curPosition += myPoints.current[i].speed;
      myPoints.current[i].curPosition = myPoints.current[i].curPosition % 1;
      if (!myPoints.current[i].curve) return;
      let curPoint = myPoints.current[i].curve.getPointAt(
        myPoints.current[i].curPosition
      );

      curPositions[i * 3] = curPoint.x;
      curPositions[i * 3 + 1] = curPoint.y;
      curPositions[i * 3 + 2] = curPoint.z;
    }
    brainGeo.current.attributes.position.needsUpdate = true;
  });

  const brainParticleMaterial = useMemo(
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
        },
        vertexShader: /*glsl*/ `
      uniform float time;
      varying vec2 vUv;
      attribute float randoms;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vec4 mvPosition = modelViewMatrix * vec4(position,1.0);
        gl_PointSize = randoms * 2.0 * (1. / -mvPosition.z);
      }
    `,
        fragmentShader: /*glsl*/ `
      uniform float time;
      void main() {
        float disc = length(gl_PointCoord.xy - vec2(0.5));
        float opacity = 0.5*smoothstep(0.5,0.4,disc);
        gl_FragColor = vec4(vec3(opacity),1.0);
      }
    `,
      }),
    []
  );
  return (
    <>
      <points>
        <bufferGeometry attach={"geometry"} ref={brainGeo}>
          <bufferAttribute
            attach="attributes-randoms"
            count={randoms.length}
            array={randoms}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <primitive object={brainParticleMaterial} ref={particleMat} />
      </points>
    </>
  );
};

const Brain = () => {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <BrainTubes allTheCurves={brainCUrves} />
      <BrainParticles allTheCurves={brainCUrves} />
    </>
  );
};

export default Brain;
