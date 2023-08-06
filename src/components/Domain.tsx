import { useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Domain = () => {
  // const r = 10;
  // const rHalf = r / 2;
  // const particleNum = 100;
  // const maxVelocity = 0.1;
  // const pointMaterial = new THREE.PointsMaterial();
  // const geometry = new THREE.BoxGeometry(r, r, r);
  // const material = new THREE.MeshBasicMaterial({
  //   opacity: 0,
  //   transparent: true,
  // });
  // const box = new THREE.Mesh(geometry, material);
  // const frameBox = new THREE.BoxHelper(box, 0x111111);

  // const particlePositions = new Float32Array(particleNum * 3);
  // const particles = new THREE.BufferGeometry();
  // const particleVelocity: THREE.Vector3[] = [];
  // const segments = particleNum * particleNum;
  // const positions = new Float32Array(segments * 3);
  // const lineGeometry = new THREE.BufferGeometry();
  // const { scene } = useThree();
  // for (let i = 0; i < particleNum; i++) {
  //   particlePositions[i * 3] = Math.random() * r - r / 2.0;
  //   particlePositions[i * 3 + 1] = Math.random() * r - r / 2.0;
  //   particlePositions[i * 3 + 2] = Math.random() * r - r / 2.0;

  //   particleVelocity[i] = new THREE.Vector3();
  //   particleVelocity[i].x = -1 + Math.random() * 2.0;
  //   particleVelocity[i].y = -1 + Math.random() * 2.0;
  //   particleVelocity[i].z = -1 + Math.random() * 2.0;

  //   particleVelocity[i].multiplyScalar(maxVelocity / Math.sqrt(3.0));
  // }

  // particles.setAttribute(
  //   "position",
  //   new THREE.BufferAttribute(particlePositions, 3).setUsage(
  //     THREE.DynamicDrawUsage
  //   )
  // );

  // let pointCloud = new THREE.Points(particles, pointMaterial);
  // scene.add(pointCloud);
  // pointCloud.geometry.attributes.position.needsUpdate = true;

  // lineGeometry.setAttribute(
  //   "position",
  //   new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
  // );
  // const lineMaterial = new THREE.LineBasicMaterial({
  //   color: 0xffffff,
  // });
  // const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  // scene.add(lineMesh);

  // const mesh = useRef(null);
  // useHelper(mesh.current && mesh, THREE.BoxHelper, "0x111111");
  // useFrame(() => {
  //   for (let i = 0; i < particleNum; i++) {
  //     particlePositions[i * 3] += particleVelocity[i].x;
  //     particlePositions[i * 3 + 1] += particleVelocity[i].y;
  //     particlePositions[i * 3 + 2] += particleVelocity[i].z;
  //     if (
  //       particlePositions[i * 3] < -rHalf ||
  //       particlePositions[i * 3] > rHalf
  //     ) {
  //       particleVelocity[i].x *= -1;
  //     }
  //     if (
  //       particlePositions[i * 3 + 1] < -rHalf ||
  //       particlePositions[i * 3 + 1] > rHalf
  //     ) {
  //       particleVelocity[i].y *= -1;
  //     }
  //     if (
  //       particlePositions[i * 3 + 2] < -rHalf ||
  //       particlePositions[i * 3 + 2] > rHalf
  //     ) {
  //       particleVelocity[i].z *= -1;
  //     }

  //     //線の頂点座標に速度を加算
  //     for (let j = i + 1; j < particleNum; j++) {
  //       let linePositions = lineMesh.geometry.attributes.position;
  //       linePositions.setXYZ(
  //         0,
  //         particlePositions[i * 3],
  //         particlePositions[i * 3 + 1],
  //         particlePositions[i * 3 + 2]
  //       );
  //       linePositions.setXYZ(
  //         1,
  //         particlePositions[j * 3],
  //         particlePositions[j * 3 + 1],
  //         particlePositions[j * 3 + 2]
  //       );
  //     }
  //   }
  //   lineMesh.geometry.attributes.position.needsUpdate = true;
  //   pointCloud.geometry.attributes.position.needsUpdate = true;
  // });

  return (
    <>{/* <mesh ref={mesh} geometry={geometry} material={material} /> */}</>
  );
};

export default Domain;
