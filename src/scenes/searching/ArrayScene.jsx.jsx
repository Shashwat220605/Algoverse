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

  const blockSize = Math.max(
    MIN_BLOCK_SIZE,
    MAX_BLOCK_SIZE * scale
  );

  const spacing = Math.max(
    MIN_SPACING,
    MAX_SPACING * scale
  );

  return {
    blockSize,
    spacing,
  };
}


function CameraController({
  arrayLength,
}) {
  const { camera, size } = useThree();

  useEffect(() => {
    const { spacing } =
      getLayout(arrayLength);

    const totalWidth =
      Math.max(
        1,
        (arrayLength - 1) * spacing
      );

    const fov =
      camera.fov *
      (Math.PI / 180);

    const aspect =
      size.width / size.height;

    /*
     * Calculate the distance needed
     * to fit the complete array.
     */
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
      Math.min(
        3.2,
        cameraZ * 0.22
      ),
      cameraZ
    );

    camera.lookAt(
      0,
      0,
      0
    );

    camera.updateProjectionMatrix();

  }, [
    arrayLength,
    camera,
    size.width,
    size.height,
  ]);

  return null;
}


function ArrayBlock({
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
    left,
    right,
    mid,
  } = variables;

  const isMid =
    mid === index;

  const isInRange =
    left !== null &&
    right !== null &&
    index >= left &&
    index <= right;

  const isEliminated =
    left !== null &&
    right !== null &&
    !isInRange;

  const isFound =
    action === "found" &&
    isMid;


  useEffect(() => {
    if (!groupRef.current) {
      return;
    }

    if (!materialRef.current) {
      return;
    }

    /*
     * Center the entire array.
     */
    const centerOffset =
      -((currentStep.array.length - 1) * spacing) / 2;

    const targetX =
      centerOffset +
      index * spacing;


    let targetScale = 1;

    if (isMid) {
      targetScale = 1.18;
    }

    if (isFound) {
      targetScale = 1.3;
    }


    const targetOpacity =
      isEliminated
        ? 0.12
        : 1;


    gsap.to(
      groupRef.current.position,
      {
        x: targetX,
        duration: 0.65,
        ease: "power3.out",
      }
    );


    gsap.to(
      groupRef.current.scale,
      {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 0.45,
        ease: "back.out(1.5)",
      }
    );


    gsap.to(
      materialRef.current,
      {
        opacity: targetOpacity,
        duration: 0.5,
        ease: "power2.out",
      }
    );

  }, [
    currentStep,
    index,
    spacing,
    isMid,
    isEliminated,
    isFound,
  ]);


  let color =
    "#18181c";

  if (isEliminated) {
    color = "#27272a";
  }

  if (isMid) {
    color = "#7c3aed";
  }

  if (isFound) {
    color = "#22c55e";
  }


  return (
    <group
      ref={groupRef}
      position={[
        0,
        0,
        0,
      ]}
    >

      {/* Main block */}

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
          transparent
          opacity={1}
          roughness={0.2}
          metalness={0.7}
        />

      </mesh>


      {/* Number */}

      <Text
        position={[
          0,
          0,
          blockSize * 0.52,
        ]}
        fontSize={
          blockSize * 0.30
        }
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {value}
      </Text>


      {/* Index */}

      <Text
        position={[
          0,
          -blockSize * 0.72,
          0,
        ]}
        fontSize={
          Math.max(
            0.13,
            blockSize * 0.17
          )
        }
        color="#a1a1aa"
        anchorX="center"
        anchorY="middle"
      >
        {index}
      </Text>


      {/* MID / FOUND */}

      {isMid && (

        <Text
          position={[
            0,
            blockSize * 0.72,
            0,
          ]}
          fontSize={
            Math.max(
              0.13,
              blockSize * 0.18
            )
          }
          color={
            isFound
              ? "#4ade80"
              : "#c4b5fd"
          }
          anchorX="center"
          anchorY="middle"
        >
          {isFound
            ? "FOUND"
            : "MID"}
        </Text>

      )}

    </group>
  );
}


function SceneContent({
  currentStep,
}) {
  const array =
    currentStep.array || [];

  const target =
    currentStep.target;

  const {
    blockSize,
    spacing,
  } = useMemo(
    () => getLayout(array.length),
    [array.length]
  );


  return (
    <>

      {/* Lighting */}

      <ambientLight
        intensity={1.7}
      />

      <directionalLight
        position={[
          5,
          6,
          5,
        ]}
        intensity={4}
      />

      <pointLight
        position={[
          -5,
          2,
          4,
        ]}
        intensity={3}
      />


      {/* Camera */}

      <CameraController
        arrayLength={
          array.length
        }
      />


      {/* Array */}

      {array.map(
        (value, index) => (

          <ArrayBlock
            key={`${index}-${value}`}
            value={value}
            index={index}
            currentStep={
              currentStep
            }
            blockSize={
              blockSize
            }
            spacing={
              spacing
            }
          />

        )
      )}


      {/* Target */}

      <Text
        position={[
          0,
          2.1,
          0,
        ]}
        fontSize={0.24}
        color="#a78bfa"
        anchorX="center"
        anchorY="middle"
      >
        TARGET: {target}
      </Text>


      {/* Controls */}

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


export default function ArrayScene({
  currentStep,
}) {
  return (

    <div className="h-full w-full">

      <Canvas
        camera={{
          position: [
            0,
            2.5,
            8,
          ],
          fov: 45,
        }}
        dpr={[1, 1.5]}
      >

        <SceneContent
          currentStep={
            currentStep
          }
        />

      </Canvas>

    </div>

  );
}