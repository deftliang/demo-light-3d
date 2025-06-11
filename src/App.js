import React, { useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
// eslint-disable-next-line no-unused-vars
import { SpotLight, Html } from "@react-three/drei";
import * as THREE from "three";
import sample from "./sample.jpg";

function Scene() {
  // 使用 useLoader 加载纹理
  const texture = useLoader(THREE.TextureLoader, sample);
  const spotLightRef = useRef();
  const [spotLightPosition, setSpotLightPosition] = useState([0, 0.1, 0]);
  const [spotLightIntensity, setSpotLightIntensity] = useState(10);
  const [angle, setAngle] = useState(0.5);
  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={3} />

      {/* 聚光灯 */}
      <SpotLight
        ref={spotLightRef}
        position={spotLightPosition}
        angle={angle}
        penumbra={0.5}
        intensity={Number(spotLightIntensity)}
        castShadow
        color="#fff"
      />

      {/* 聚光灯控制器 */}
      <Html position={[-4, 3, 0]}>
        <div
          style={{
            background: "rgba(0,0,0,0.8)",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
            userSelect: "none",
          }}
        >
          <div>
            <div>SpotLight Controls</div>
            <label>X: </label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={spotLightPosition[0]}
              onChange={(e) =>
                setSpotLightPosition([
                  parseFloat(e.target.value),
                  spotLightPosition[1],
                  spotLightPosition[2],
                ])
              }
            />
          </div>
          <div>
            <label>Y: </label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={spotLightPosition[1]}
              onChange={(e) =>
                setSpotLightPosition([
                  spotLightPosition[0],
                  parseFloat(e.target.value),
                  spotLightPosition[2],
                ])
              }
            />
          </div>
          <div>
            <label>Z: </label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={spotLightPosition[2]}
              onChange={(e) =>
                setSpotLightPosition([
                  spotLightPosition[0],
                  spotLightPosition[1],
                  parseFloat(e.target.value),
                ])
              }
            />
          </div>
          <div>
            <label>强度: </label>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={spotLightIntensity}
              onChange={(e) => {
                setSpotLightIntensity(parseFloat(e.target.value));
              }}
            />
          </div>
          <div>
            <label>角度: </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={angle}
              onChange={(e) => {
                setAngle(parseFloat(e.target.value));
              }}
            />
          </div>
        </div>
      </Html>

      {/* 平面几何体，用于显示图片 - 调整为垂直放置 */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[1.2 * 4, 1.44 * 4]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  );
}

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
