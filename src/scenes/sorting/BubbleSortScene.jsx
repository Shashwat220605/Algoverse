import { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import gsap from "gsap";

const MAX_BLOCK_SIZE = 1.05;
const MIN_BLOCK_SIZE = 0.55;

const MAX_SPACING = 1.45;
const MIN_SPACING = 0.72;

function getLayout(arrayLength) {
  if (arrayLength <= 7) {
    return {
      blockSize: MAX_BLOCK_SIZE,
      spacing: MAX_SPACING,
    };
  }

  const scale = Math.max(
    0.45,
    7 / arrayLength
  );

  return {
    blockSize: Math.max(
      MIN_BLOCK_SIZE,
      MAX_BLOCK_SIZE * scale
    ),
    spacing: Math.max(
      MIN_SPACING,
      MAX_SPACING * scale
    ),
  };
}

function CameraController({ arrayLength }) {
  const { camera, size } = useThree();

  useEffect(() => {
    const { spacing } = getLayout(arrayLength);

    const totalWidth = Math.max(
      1,
      (arrayLength - 1) * spacing
    );

    const fov = camera.fov * (Math.PI / 180);
    const aspect = size.width / size.height;

    const horizontalDistance =
      totalWidth /
      (
        2 *
        Math.tan(fov / 2) *
        Math.max(aspect, 0.5)
      );

    const cameraZ = Math.max(
      7,
      horizontalDistance * 1.15
    );

    camera.position.set(
      0,
      Math.min(3.2, cameraZ * 0.22),
      cameraZ
    );

    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [
    arrayLength,
    camera,
    size.width,
    size.height,
  ]);

  return null;
}

function SortBlock({
  value,
  index,
  currentStep,
  blockSize,
  spacing,
}) {
  const groupRef = useRef();
  const materialRef = useRef();

  const {
    variables,
    action,
  } = currentStep;

  const {
    comparing = [],
    swapping = [],
    sortedFrom,
  } = variables;

  const isComparing =
    comparing.includes(index);

  const isSwapping =
    swapping.includes(index);

  const isSorted =
    sortedFrom !== undefined &&
    index >= sortedFrom;

  const centerOffset =
    -((currentStep.array.length - 1) * spacing) / 2;

  const targetX =
    centerOffset + index * spacing;

  useEffect(() => {
    if (!groupRef.current) return;
    if (!materialRef.current) return;

    let targetScale = 1;

    if (isComparing) {
      targetScale = 1.12;
    }

    if (isSwapping) {
      targetScale = 1.22;
    }

    const targetY =
      isSwapping ? 0.18 : 0;

    gsap.to(
      groupRef.current.position,
      {
        x: targetX,
        y: targetY,
        duration: 0.55,
        ease: "power3.out",
      }
    );

    gsap.to(
      groupRef.current.scale,
      {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 0.35,
        ease: "back.out(1.5)",
      }
    );
  }, [
    targetX,
    isComparing,
    isSwapping,
    action,
  ]);

  let color = "#18181c";

  if (isSorted) {
    color = "#164e3a";
  }

  if (isComparing) {
    color = "#7c3aed";
  }

  if (isSwapping) {
    color = "#f59e0b";
  }

  return (
    <group
      ref={groupRef}
      position={[targetX, 0, 0]}
    >
      <mesh>
        <boxGeometry
          args={[
            blockSize,
            blockSize,
            blockSize,
          ]}
        />

        <meshStandardMaterial
          ref={materialRef}
          color={color}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      <Text
        position={[
          0,
          0,
          blockSize * 0.52,
        ]}
        fontSize={
          blockSize * 0.3
        }
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {value}
      </Text>

      <Text
        position={[
          0,
          -blockSize * 0.72,
          0,
        ]}
        fontSize={Math.max(
          0.13,
          blockSize * 0.17
        )}
        color="#a1a1aa"
        anchorX="center"
        anchorY="middle"
      >
        {index}
      </Text>

      {isComparing && (
        <Text
          position={[
            0,
            blockSize * 0.72,
            0,
          ]}
          fontSize={Math.max(
            0.13,
            blockSize * 0.17
          )}
          color={
            isSwapping
              ? "#fbbf24"
              : "#c4b5fd"
          }
          anchorX="center"
          anchorY="middle"
        >
          {isSwapping
            ? "SWAP"
            : "COMPARE"}
        </Text>
      )}
    </group>
  );
}

function SceneContent({ currentStep }) {
  const array =
    currentStep.array || [];

  const {
    blockSize,
    spacing,
  } = useMemo(
    () => getLayout(array.length),
    [array.length]
  );

  const sortedFrom =
    currentStep.variables
      ?.sortedFrom;

  return (
    <>
      <ambientLight intensity={1.7} />

      <directionalLight
        position={[5, 6, 5]}
        intensity={4}
      />

      <pointLight
        position={[-5, 2, 4]}
        intensity={3}
      />

      <CameraController
        arrayLength={array.length}
      />

      {array.map((value, index) => (
        <SortBlock
          key={`${index}-${value}`}
          value={value}
          index={index}
          currentStep={currentStep}
          blockSize={blockSize}
          spacing={spacing}
        />
      ))}

      {sortedFrom !== undefined &&
        sortedFrom < array.length && (
          <Text
            position={[0, 2.1, 0]}
            fontSize={0.24}
            color="#4ade80"
            anchorX="center"
            anchorY="middle"
          >
            SORTED SECTION →
          </Text>
        )}

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={40}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

export default function BubbleSortScene({
  currentStep,
}) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [0, 2.5, 8],
          fov: 45,
        }}
        dpr={[1, 1.5]}
      >
        <SceneContent
          currentStep={currentStep}
        />
      </Canvas>
    </div>
  );
}