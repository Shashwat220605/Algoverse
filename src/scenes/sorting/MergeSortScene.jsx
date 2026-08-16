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

function getLayout(
  arrayLength
) {
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
 * ARRAY BLOCK
 * =========================================================
 */

function MergeBlock({
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
    left,
    mid,
    right,
    leftIndex,
    rightIndex,
    writeIndex,
    comparing = [],
    merging = [],
    sortedRanges = [],
    phase,
  } = variables;


  /*
   * Is inside current left half?
   */

  const isLeftHalf =
    left !== null &&
    left !== undefined &&
    mid !== null &&
    mid !== undefined &&
    index >= left &&
    index <= mid;


  /*
   * Is inside current right half?
   */

  const isRightHalf =
    mid !== null &&
    mid !== undefined &&
    right !== null &&
    right !== undefined &&
    index > mid &&
    index <= right;


  /*
   * Is currently being compared?
   */

  const isComparing =
    comparing.includes(
      index
    );


  /*
   * Is being written into merged section?
   */

  const isMerging =
    merging.includes(
      index
    );


  /*
   * Is current write position?
   */

  const isWrite =
    writeIndex !== null &&
    writeIndex !== undefined &&
    index === writeIndex;


  /*
   * Is part of a completed sorted range?
   */

  const isInSortedRange =
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
   * Lift left half.
   */

  if (
    isLeftHalf &&
    phase !== "complete"
  ) {
    targetY = 0.18;
  }


  /*
   * Lift right half.
   */

  if (
    isRightHalf &&
    phase !== "complete"
  ) {
    targetY = 0.32;
  }


  /*
   * Comparison gets more lift.
   */

  if (isComparing) {
    targetY = 0.55;
    targetZ = 0.25;
  }


  /*
   * Merging gets highest lift.
   */

  if (isMerging) {
    targetY = 0.72;
    targetZ = 0.35;
  }


  /*
   * =======================================================
   * SCALE
   * =======================================================
   */

  let targetScale = 1;


  if (isLeftHalf) {
    targetScale = 1.03;
  }


  if (isRightHalf) {
    targetScale = 1.03;
  }


  if (isComparing) {
    targetScale = 1.12;
  }


  if (isWrite) {
    targetScale = 1.18;
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
   * COLOR
   * =======================================================
   */

  let color =
    "#18181c";


  /*
   * Completed sorted ranges
   */

  if (isInSortedRange) {
    color =
      "#164e3a";
  }


  /*
   * Left half
   */

  if (
    isLeftHalf &&
    !isInSortedRange
  ) {
    color =
      "#4c1d95";
  }


  /*
   * Right half
   */

  if (
    isRightHalf &&
    !isInSortedRange
  ) {
    color =
      "#164e63";
  }


  /*
   * Comparison
   */

  if (isComparing) {
    color =
      "#f97316";
  }


  /*
   * Write / merge
   */

  if (isWrite) {
    color =
      "#f59e0b";
  }


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
          roughness={0.22}
          metalness={0.65}
        />

      </mesh>


      {/* Value */}

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


      {/* Index */}

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


      {/* Compare */}

      {isComparing && (

        <Text
          position={[
            0,
            blockSize * 0.75,
            0,
          ]}
          fontSize={
            Math.max(
              0.11,
              blockSize * 0.17
            )
          }
          color="#fdba74"
          anchorX="center"
          anchorY="middle"
        >
          COMPARE
        </Text>

      )}


      {/* Write */}

      {isWrite && (

        <Text
          position={[
            0,
            blockSize * 0.75,
            0,
          ]}
          fontSize={
            Math.max(
              0.11,
              blockSize * 0.17
            )
          }
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          WRITE
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
      endX - startX + spacing
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
    left,
    mid,
    right,
    phase,
    writeIndex,
  } = variables;


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


      {/* Left range */}

      <RangeMarker
        left={left}
        right={mid}
        spacing={spacing}
        arrayLength={array.length}
        label="LEFT HALF"
        color="#a78bfa"
        y={1.45}
      />


      {/* Right range */}

      <RangeMarker
        left={
          mid !== null &&
          mid !== undefined
            ? mid + 1
            : null
        }
        right={right}
        spacing={spacing}
        arrayLength={array.length}
        label="RIGHT HALF"
        color="#67e8f9"
        y={1.1}
      />


      {/* Blocks */}

      {array.map(
        (
          value,
          index
        ) => (

          <MergeBlock
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


      {/* Phase */}

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
        {phase === "split"
          ? "DIVIDE"
          : phase === "compare"
            ? "COMPARE"
            : phase === "write"
              ? "MERGE"
              : phase === "merged"
                ? "MERGED"
                : phase === "complete"
                  ? "SORTED"
                  : "MERGE SORT"}
      </Text>


      {/* Write index */}

      {writeIndex !== null &&
        writeIndex !== undefined && (

        <Text
          position={[
            0,
            1.75,
            0,
          ]}
          fontSize={0.14}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          WRITE POSITION: {writeIndex}
        </Text>

      )}


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


/*
 * =========================================================
 * MAIN COMPONENT
 * =========================================================
 */

export default function MergeSortScene({
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