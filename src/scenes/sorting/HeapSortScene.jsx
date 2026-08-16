import {
  useEffect,
  useMemo,
  useRef,
} from "react";

import {
  Canvas,
  useThree,
} from "@react-three/fiber";

import {
  OrbitControls,
  Text,
} from "@react-three/drei";

import gsap from "gsap";
import * as THREE from "three";


/*
 * =========================================================
 * TREE POSITIONS
 * =========================================================
 */

function getTreePosition(
  index,
  arrayLength
) {
  if (index === 0) {
    return {
      x: 0,
      y: 1.7,
    };
  }


  const level =
    Math.floor(
      Math.log2(index + 1)
    );


  const firstIndex =
    Math.pow(2, level) - 1;


  const positionInLevel =
    index - firstIndex;


  const nodesInLevel =
    Math.pow(2, level);


  const width =
    Math.min(
      8.5,
      Math.max(
        4.5,
        arrayLength * 0.8
      )
    );


  const spacing =
    width /
    Math.max(
      1,
      nodesInLevel
    );


  const x =
    (
      positionInLevel -
      (nodesInLevel - 1) / 2
    ) * spacing;


  const y =
    1.7 -
    level * 1.55;


  return {
    x,
    y,
  };
}


/*
 * =========================================================
 * CAMERA
 * =========================================================
 */

function CameraController({
  arrayLength,
}) {

  const {
    camera,
    size,
  } = useThree();


  useEffect(() => {

    const aspect =
      size.width /
      Math.max(
        1,
        size.height
      );


    const cameraZ =
      Math.max(
        8,
        11 / Math.max(
          aspect,
          0.65
        )
      );


    camera.position.set(
      0,
      1,
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


/*
 * =========================================================
 * EDGE
 * =========================================================
 */

function HeapEdge({
  from,
  to,
  color,
}) {

  const start =
    new THREE.Vector3(
      from.x,
      from.y,
      -0.15
    );


  const end =
    new THREE.Vector3(
      to.x,
      to.y,
      -0.15
    );


  const direction =
    new THREE.Vector3()
      .subVectors(
        end,
        start
      );


  const length =
    direction.length();


  const midpoint =
    new THREE.Vector3()
      .addVectors(
        start,
        end
      )
      .multiplyScalar(
        0.5
      );


  const angle =
    Math.atan2(
      direction.y,
      direction.x
    );


  return (
    <mesh
      position={[
        midpoint.x,
        midpoint.y,
        midpoint.z,
      ]}
      rotation={[
        0,
        0,
        angle,
      ]}
    >

      <boxGeometry
        args={[
          length,
          0.035,
          0.035,
        ]}
      />

      <meshBasicMaterial
        color={color}
      />

    </mesh>
  );
}


/*
 * =========================================================
 * HEAP NODE
 * =========================================================
 */

function HeapNode({
  value,
  index,
  currentStep,
}) {

  const groupRef =
    useRef(null);


  const {
    variables = {},
    action,
  } = currentStep;


  const {
    heapSize,
    currentIndex,
    largest,
    leftChild,
    rightChild,
    comparing = [],
    swapping = [],
    sorted = [],
    phase,
  } = variables;


  const {
    x,
    y,
  } =
    getTreePosition(
      index,
      currentStep.array.length
    );


  /*
   * Is inside active heap?
   */

  const isInHeap =
    index <
    heapSize;


  /*
   * Is sorted?
   */

  const isSorted =
    sorted.includes(
      index
    );


  /*
   * Current node
   */

  const isCurrent =
    index ===
    currentIndex;


  /*
   * Largest node

   */

  const isLargest =
    index ===
    largest;


  /*
   * Comparing

   */

  const isComparing =
    comparing.includes(
      index
    );


  /*
   * Swapping

   */

  const isSwapping =
    swapping.includes(
      index
    );


  /*
   * =======================================================
   * ANIMATION
   * =======================================================
   */

  let targetY = y;

  let targetZ = 0;

  let targetScale = 1;


  if (
    isCurrent &&
    isInHeap
  ) {

    targetY += 0.18;

  }


  if (isLargest) {

    targetY += 0.3;

    targetZ =
      0.25;

    targetScale =
      1.12;

  }


  if (isComparing) {

    targetY += 0.35;

    targetZ =
      0.35;

    targetScale =
      1.12;

  }


  if (isSwapping) {

    targetY += 0.55;

    targetZ =
      0.5;

    targetScale =
      1.2;

  }


  useEffect(() => {

    if (!groupRef.current) {
      return;
    }


    gsap.to(
      groupRef.current.position,
      {
        x,
        y: targetY,
        z: targetZ,

        duration: 0.55,

        ease:
          "power3.out",
      }
    );


    gsap.to(
      groupRef.current.scale,
      {
        x: targetScale,
        y: targetScale,
        z: targetScale,

        duration: 0.3,

        ease:
          "back.out(1.4)",
      }
    );

  }, [
    x,
    targetY,
    targetZ,
    targetScale,
    action,
    phase,
  ]);


  /*
   * =======================================================
   * COLOR
   * =======================================================
   */

  let color =
    "#18181c";


  if (isSorted) {

    color =
      "#164e3a";

  }


  if (
    isInHeap &&
    !isSorted
  ) {

    color =
      "#27272a";

  }


  if (isCurrent) {

    color =
      "#4c1d95";

  }


  if (isLargest) {

    color =
      "#f59e0b";

  }


  if (isComparing) {

    color =
      "#7c3aed";

  }


  if (isSwapping) {

    color =
      "#ef4444";

  }


  return (

    <group
      ref={groupRef}
      position={[
        x,
        y,
        0,
      ]}
    >

      <mesh>

        <sphereGeometry
          args={[
            0.48,
            32,
            32,
          ]}
        />

        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.7}
        />

      </mesh>


      <Text
        position={[
          0,
          0,
          0.52,
        ]}
        fontSize={0.27}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {value}
      </Text>


      <Text
        position={[
          0,
          -0.7,
          0,
        ]}
        fontSize={0.13}
        color="#a1a1aa"
        anchorX="center"
        anchorY="middle"
      >
        index {index}
      </Text>


      {isLargest && (

        <Text
          position={[
            0,
            0.72,
            0,
          ]}
          fontSize={0.13}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          LARGEST
        </Text>

      )}


      {isComparing && (

        <Text
          position={[
            0,
            0.72,
            0,
          ]}
          fontSize={0.13}
          color="#c4b5fd"
          anchorX="center"
          anchorY="middle"
        >
          COMPARE
        </Text>

      )}


      {isSwapping && (

        <Text
          position={[
            0,
            0.72,
            0,
          ]}
          fontSize={0.13}
          color="#fca5a5"
          anchorX="center"
          anchorY="middle"
        >
          SWAP
        </Text>

      )}

    </group>

  );
}


/*
 * =========================================================
 * SCENE
 * =========================================================
 */

function SceneContent({
  currentStep,
}) {

  const array =
    currentStep?.array || [];


  const {
    variables = {},
  } = currentStep;


  const {
    heapSize,
    currentIndex,
    largest,
    leftChild,
    rightChild,
    phase,
  } = variables;


  /*
   * Phase label
   */

  let phaseLabel =
    "HEAP SORT";


  if (
    phase === "buildHeap" ||
    phase === "buildNode"
  ) {

    phaseLabel =
      "BUILD MAX HEAP";

  } else if (
    phase === "heapify"
  ) {

    phaseLabel =
      "HEAPIFY";

  } else if (
    phase === "compareLeft" ||
    phase === "compareRight"
  ) {

    phaseLabel =
      "COMPARE";

  } else if (
    phase === "swap" ||
    phase === "extractSwap"
  ) {

    phaseLabel =
      "SWAP";

  } else if (
    phase === "extract"
  ) {

    phaseLabel =
      "EXTRACT MAX";

  } else if (
    phase === "restoreHeap"
  ) {

    phaseLabel =
      "RESTORE HEAP";

  } else if (
    phase === "sortedValue"
  ) {

    phaseLabel =
      "SORTED";

  } else if (
    phase === "complete"
  ) {

    phaseLabel =
      "SORTED";

  }


  /*
   * =======================================================
   * EDGES
   * =======================================================
   */

  const edges = [];


  for (
    let i = 0;
    i < array.length;
    i++
  ) {

    const left =
      2 * i + 1;

    const right =
      2 * i + 2;


    const parentPosition =
      getTreePosition(
        i,
        array.length
      );


    if (
      left < array.length
    ) {

      const childPosition =
        getTreePosition(
          left,
          array.length
        );


      edges.push(
        <HeapEdge
          key={`left-${i}`}
          from={parentPosition}
          to={childPosition}
          color={
            left < heapSize
              ? "#3f3f46"
              : "#18181c"
          }
        />
      );

    }


    if (
      right < array.length
    ) {

      const childPosition =
        getTreePosition(
          right,
          array.length
        );


      edges.push(
        <HeapEdge
          key={`right-${i}`}
          from={parentPosition}
          to={childPosition}
          color={
            right < heapSize
              ? "#3f3f46"
              : "#18181c"
          }
        />
      );

    }

  }


  return (
    <>

      <ambientLight
        intensity={1.7}
      />


      <directionalLight
        position={[
          5,
          7,
          6,
        ]}
        intensity={4}
      />


      <pointLight
        position={[
          -5,
          3,
          5,
        ]}
        intensity={3}
      />


      <CameraController
        arrayLength={
          array.length
        }
      />


      {/* TITLE */}

      <Text
        position={[
          0,
          3.15,
          0,
        ]}
        fontSize={0.25}
        color="#e4e4e7"
        anchorX="center"
        anchorY="middle"
      >
        {phaseLabel}
      </Text>


      {/* HEAP SIZE */}

      <Text
        position={[
          0,
          2.75,
          0,
        ]}
        fontSize={0.14}
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        HEAP SIZE: {heapSize}
      </Text>


      {/* EDGES */}

      {edges}


      {/* NODES */}

      {array.map(
        (
          value,
          index
        ) => (

          <HeapNode
            key={`${index}-${value}`}
            value={value}
            index={index}
            currentStep={
              currentStep
            }
          />

        )
      )}


      {/* CURRENT NODE INFO */}

      {currentIndex !== null &&
        currentIndex !== undefined && (

        <Text
          position={[
            -4.2,
            -2.6,
            0,
          ]}
          fontSize={0.14}
          color="#a1a1aa"
          anchorX="left"
          anchorY="middle"
        >
          CURRENT: {currentIndex}
        </Text>

      )}


      {largest !== null &&
        largest !== undefined && (

        <Text
          position={[
            0,
            -2.6,
            0,
          ]}
          fontSize={0.14}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          LARGEST: {largest}
        </Text>

      )}


      {leftChild !== null &&
        leftChild !== undefined && (

        <Text
          position={[
            2.2,
            -2.6,
            0,
          ]}
          fontSize={0.14}
          color="#67e8f9"
          anchorX="center"
          anchorY="middle"
        >
          LEFT: {leftChild}
        </Text>

      )}


      {rightChild !== null &&
        rightChild !== undefined && (

        <Text
          position={[
            3.7,
            -2.6,
            0,
          ]}
          fontSize={0.14}
          color="#a78bfa"
          anchorX="center"
          anchorY="middle"
        >
          RIGHT: {rightChild}
        </Text>

      )}


      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={35}
        enableDamping
        dampingFactor={0.08}
      />

    </>
  );
}


/*
 * =========================================================
 * MAIN COMPONENT
 * =========================================================
 */

export default function HeapSortScene({
  currentStep,
}) {

  return (

    <div className="h-full w-full">

      <Canvas
        camera={{
          position: [
            0,
            1,
            10,
          ],
          fov: 45,
        }}

        dpr={[
          1,
          1.5,
        ]}
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