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


const MAX_BLOCK_SIZE = 0.95;
const MIN_BLOCK_SIZE = 0.48;

const MAX_SPACING = 1.25;
const MIN_SPACING = 0.62;


/*
 * =========================================================
 * RESPONSIVE LAYOUT
 * =========================================================
 */

function getLayout(arrayLength) {

  if (arrayLength <= 7) {

    return {
      blockSize:
        MAX_BLOCK_SIZE,

      spacing:
        MAX_SPACING,
    };

  }


  const scale =
    Math.max(
      0.45,
      7 / arrayLength
    );


  return {

    blockSize:
      Math.max(
        MIN_BLOCK_SIZE,
        MAX_BLOCK_SIZE * scale
      ),

    spacing:
      Math.max(
        MIN_SPACING,
        MAX_SPACING * scale
      ),

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

    const {
      spacing,
    } =
      getLayout(
        arrayLength
      );


    const totalWidth =
      Math.max(
        1,
        (arrayLength - 1) *
          spacing
      );


    const aspect =
      size.width /
      Math.max(
        size.height,
        1
      );


    const cameraZ =
      Math.max(
        7,
        totalWidth /
          Math.max(
            aspect,
            0.6
          ) *
          1.25
      );


    camera.position.set(
      0,
      2.8,
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
 * QUICK SORT BLOCK
 * =========================================================
 */

function QuickBlock({
  value,
  index,
  currentStep,
  blockSize,
  spacing,
}) {

  const groupRef =
    useRef(null);


  const {
    variables = {},
    action,
  } = currentStep;


  const {
    low,
    high,
    pivotIndex,
    leftPointer,
    rightPointer,
    comparing = [],
    swapping = [],
    sortedRanges = [],
    phase,
  } = variables;


  /*
   * Current partition
   */

  const inCurrentRange =
    low !== null &&
    low !== undefined &&
    high !== null &&
    high !== undefined &&
    index >= low &&
    index <= high;


  /*
   * Pivot
   */

  const isPivot =
    pivotIndex !== null &&
    pivotIndex !== undefined &&
    index === pivotIndex;


  /*
   * Left pointer
   */

  const isLeftPointer =
    leftPointer !== null &&
    leftPointer !== undefined &&
    index === leftPointer;


  /*
   * Right pointer
   */

  const isRightPointer =
    rightPointer !== null &&
    rightPointer !== undefined &&
    index === rightPointer;


  /*
   * Comparison
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
   * Sorted pivot/range
   */

  const isSorted =
    sortedRanges.some(
      ([rangeLeft, rangeRight]) =>
        index >= rangeLeft &&
        index <= rangeRight
    );


  /*
   * =======================================================
   * POSITION
   * =======================================================
   */

  const centerOffset =
    -(
      (currentStep.array.length - 1) *
      spacing
    ) / 2;


  const normalX =
    centerOffset +
    index * spacing;


  let targetY = 0;

  let targetZ = 0;


  /*
   * Current partition gets a
   * small lift.
   */

  if (
    inCurrentRange &&
    !isSorted
  ) {

    targetY = 0.12;

  }


  /*
   * Pivot gets lifted.
   */

  if (isPivot) {

    targetY = 0.55;
    targetZ = 0.25;

  }


  /*
   * Comparison gets lifted.

   */

  if (isComparing) {

    targetY = 0.48;
    targetZ = 0.25;

  }


  /*
   * Swap gets the biggest lift.
   */

  if (isSwapping) {

    targetY = 0.75;
    targetZ = 0.4;

  }


  /*
   * =======================================================
   * SCALE
   * =======================================================
   */

  let targetScale = 1;


  if (
    inCurrentRange &&
    !isSorted
  ) {

    targetScale =
      1.02;

  }


  if (isPivot) {

    targetScale =
      1.17;

  }


  if (isComparing) {

    targetScale =
      1.1;

  }


  if (isSwapping) {

    targetScale =
      1.18;

  }


  /*
   * =======================================================
   * ANIMATION
   * =======================================================
   */

  useEffect(() => {

    if (!groupRef.current) {
      return;
    }


    gsap.to(
      groupRef.current.position,
      {
        x: normalX,
        y: targetY,
        z: targetZ,

        duration: 0.5,

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
    normalX,
    targetY,
    targetZ,
    targetScale,
    action,
    phase,
  ]);


  /*
   * =======================================================
   * COLORS
   * =======================================================
   */

  let color =
    "#18181c";


  /*
   * Sorted
   */

  if (isSorted) {

    color =
      "#164e3a";

  }


  /*
   * Current partition
   */

  if (
    inCurrentRange &&
    !isSorted
  ) {

    color =
      "#27272a";

  }


  /*
   * Comparison
   */

  if (isComparing) {

    color =
      "#7c3aed";

  }


  /*
   * Pivot

   */

  if (isPivot) {

    color =
      "#f59e0b";

  }


  /*
   * Swap
   */

  if (isSwapping) {

    color =
      "#ef4444";

  }


  /*
   * =======================================================
   * BLOCK
   * =======================================================
   */

  return (

    <group
      ref={groupRef}
      position={[
        normalX,
        0,
        0,
      ]}
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
          color={color}
          roughness={0.2}
          metalness={0.7}
        />

      </mesh>


      {/* VALUE */}

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


      {/* INDEX */}

      <Text
        position={[
          0,
          -blockSize * 0.72,
          0,
        ]}
        fontSize={
          Math.max(
            0.11,
            blockSize * 0.17
          )
        }
        color="#a1a1aa"
        anchorX="center"
        anchorY="middle"
      >
        {index}
      </Text>


      {/* PIVOT */}

      {isPivot && (

        <Text
          position={[
            0,
            blockSize * 0.75,
            0,
          ]}
          fontSize={
            Math.max(
              0.12,
              blockSize * 0.18
            )
          }
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          PIVOT
        </Text>

      )}


      {/* COMPARISON */}

      {isComparing &&
        !isPivot && (

        <Text
          position={[
            0,
            blockSize * 0.75,
            0,
          ]}
          fontSize={
            Math.max(
              0.11,
              blockSize * 0.16
            )
          }
          color="#c4b5fd"
          anchorX="center"
          anchorY="middle"
        >
          COMPARE
        </Text>

      )}


      {/* SWAP */}

      {isSwapping && (

        <Text
          position={[
            0,
            blockSize * 0.75,
            0,
          ]}
          fontSize={
            Math.max(
              0.11,
              blockSize * 0.16
            )
          }
          color="#fca5a5"
          anchorX="center"
          anchorY="middle"
        >
          SWAP
        </Text>

      )}


      {/* LEFT POINTER */}

      {isLeftPointer &&
        !isPivot &&
        !isComparing &&
        !isSwapping && (

        <Text
          position={[
            0,
            -blockSize * 1.02,
            0,
          ]}
          fontSize={
            Math.max(
              0.1,
              blockSize * 0.15
            )
          }
          color="#67e8f9"
          anchorX="center"
          anchorY="middle"
        >
          I
        </Text>

      )}


      {/* RIGHT POINTER */}

      {isRightPointer &&
        !isPivot &&
        !isComparing &&
        !isSwapping && (

        <Text
          position={[
            0,
            -blockSize * 1.22,
            0,
          ]}
          fontSize={
            Math.max(
              0.1,
              blockSize * 0.15
            )
          }
          color="#a78bfa"
          anchorX="center"
          anchorY="middle"
        >
          J
        </Text>

      )}

    </group>

  );
}


/*
 * =========================================================
 * RANGE MARKER
 * =========================================================
 */

function RangeMarker({
  left,
  right,
  spacing,
  arrayLength,
  label,
  color,
  y,
}) {

  if (
    left === null ||
    left === undefined ||
    right === null ||
    right === undefined ||
    left > right
  ) {

    return null;

  }


  const centerOffset =
    -(
      (arrayLength - 1) *
      spacing
    ) / 2;


  const startX =
    centerOffset +
    left * spacing;


  const endX =
    centerOffset +
    right * spacing;


  const centerX =
    (startX + endX) / 2;


  const width =
    Math.max(
      spacing,
      endX -
        startX +
        spacing
    );


  return (

    <group
      position={[
        centerX,
        y,
        -0.25,
      ]}
    >

      <mesh>

        <boxGeometry
          args={[
            width,
            0.025,
            0.025,
          ]}
        />

        <meshBasicMaterial
          color={color}
        />

      </mesh>


      <Text
        position={[
          0,
          0.16,
          0,
        ]}
        fontSize={0.13}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

    </group>

  );
}


/*
 * =========================================================
 * SCENE CONTENT
 * =========================================================
 */

function SceneContent({
  currentStep,
}) {

  const array =
    currentStep?.array || [];


  const {
    blockSize,
    spacing,
  } =
    useMemo(
      () =>
        getLayout(
          array.length
        ),
      [array.length]
    );


  const {
    variables = {},
  } = currentStep;


  const {
    low,
    high,
    pivotIndex,
    phase,
  } = variables;


  let phaseLabel =
    "QUICK SORT";


  if (
    phase === "pivot"
  ) {

    phaseLabel =
      "CHOOSE PIVOT";

  } else if (
    phase === "compare"
  ) {

    phaseLabel =
      "COMPARE";

  } else if (
    phase === "moveLeft"
  ) {

    phaseLabel =
      "MOVE POINTER";

  } else if (
    phase === "swap"
  ) {

    phaseLabel =
      "SWAP";

  } else if (
    phase === "pivotSwap"
  ) {

    phaseLabel =
      "PLACE PIVOT";

  } else if (
    phase === "partitionComplete"
  ) {

    phaseLabel =
      "PARTITION DONE";

  } else if (
    phase === "leftPartition"
  ) {

    phaseLabel =
      "LEFT PARTITION";

  } else if (
    phase === "rightPartition"
  ) {

    phaseLabel =
      "RIGHT PARTITION";

  } else if (
    phase === "complete"
  ) {

    phaseLabel =
      "SORTED";

  }


  return (
    <>

      {/* LIGHTING */}

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


      {/* CAMERA */}

      <CameraController
        arrayLength={
          array.length
        }
      />


      {/* ACTIVE RANGE */}

      <RangeMarker
        left={low}
        right={high}
        spacing={spacing}
        arrayLength={
          array.length
        }
        label="ACTIVE PARTITION"
        color="#a78bfa"
        y={1.45}
      />


      {/* ARRAY */}

      {array.map(
        (
          value,
          index
        ) => (

          <QuickBlock
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


      {/* PHASE */}

      <Text
        position={[
          0,
          2.05,
          0,
        ]}
        fontSize={0.22}
        color="#e4e4e7"
        anchorX="center"
        anchorY="middle"
      >
        {phaseLabel}
      </Text>


      {/* PIVOT VALUE */}

      {pivotIndex !== null &&
        pivotIndex !== undefined &&
        pivotIndex < array.length && (

        <Text
          position={[
            0,
            1.72,
            0,
          ]}
          fontSize={0.15}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          PIVOT: {array[pivotIndex]}
        </Text>

      )}


      {/* CONTROLS */}

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


/*
 * =========================================================
 * MAIN COMPONENT
 * =========================================================
 */

export default function QuickSortScene({
  currentStep,
}) {

  return (

    <div className="h-full w-full">

      <Canvas
        camera={{
          position: [
            0,
            2.8,
            8,
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