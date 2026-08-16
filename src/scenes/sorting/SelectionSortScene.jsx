import { useEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import gsap from "gsap";


const MAX_BLOCK_SIZE = 1.05;
const MIN_BLOCK_SIZE = 0.55;

const MAX_SPACING = 1.45;
const MIN_SPACING = 0.72;


/*
 * =========================================================
 * RESPONSIVE ARRAY LAYOUT
 * =========================================================
 */

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


/*
 * =========================================================
 * CAMERA CONTROLLER
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
    } = getLayout(arrayLength);


    const totalWidth =
      Math.max(
        1,
        (arrayLength - 1) *
          spacing
      );


    const fov =
      camera.fov *
      (Math.PI / 180);


    const aspect =
      size.width /
      Math.max(
        size.height,
        1
      );


    const horizontalDistance =
      totalWidth /
      (
        2 *
        Math.tan(fov / 2) *
        Math.max(
          aspect,
          0.5
        )
      );


    const cameraZ =
      Math.max(
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


/*
 * =========================================================
 * ARRAY BLOCK
 * =========================================================
 */

function SelectionBlock({
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
    i,
    j,
    minIndex,
    sortedFrom,
    comparing = [],
    swapping = [],
  } = variables;


  /*
   * Current position being filled.
   */

  const isCurrent =
    i !== null &&
    i !== undefined &&
    index === i &&
    !swapping.includes(index);


  /*
   * Current comparison.

   */

  const isComparing =
    comparing.includes(index);


  /*
   * Current minimum.

   */

  const isMinimum =
    minIndex !== null &&
    minIndex !== undefined &&
    index === minIndex;


  /*
   * Currently swapping.

   */

  const isSwapping =
    swapping.includes(index);


  /*
   * Already sorted.

   */

  const isSorted =
    sortedFrom !== undefined &&
    sortedFrom !== null &&
    index < sortedFrom;


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


  /*
   * Give the minimum a small lift.
   */

  let targetY = 0;


  if (isMinimum) {
    targetY = 0.35;
  }


  /*
   * Current position gets a
   * slightly smaller lift.
   */

  if (isCurrent) {
    targetY = 0.15;
  }


  /*
   * Swapping blocks rise more.
   */

  if (isSwapping) {
    targetY = 0.65;
  }


  /*
   * Minimum comes toward camera.
   */

  let targetZ = 0;


  if (isMinimum) {
    targetZ = 0.35;
  }


  if (isSwapping) {
    targetZ = 0.5;
  }


  /*
   * =======================================================
   * SCALE
   * =======================================================
   */

  let targetScale = 1;


  if (isComparing) {
    targetScale = 1.08;
  }


  if (isCurrent) {
    targetScale = 1.08;
  }


  if (isMinimum) {
    targetScale = 1.16;
  }


  if (isSwapping) {
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
    normalX,
    targetY,
    targetZ,
    targetScale,
    isCurrent,
    isComparing,
    isMinimum,
    isSwapping,
    action,
  ]);


  /*
   * =======================================================
   * COLOR
   * =======================================================
   */

  let color =
    "#18181c";


  /*
   * Sorted section
   */

  if (isSorted) {
    color =
      "#164e3a";
  }


  /*
   * Current position
   */

  if (isCurrent) {
    color =
      "#06b6d4";
  }


  /*
   * Comparison

   */

  if (isComparing) {
    color =
      "#7c3aed";
  }


  /*
   * Minimum

   */

  if (isMinimum) {
    color =
      "#f59e0b";
  }


  /*
   * Swapping

   */

  if (isSwapping) {
    color =
      "#ef4444";
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


      {/* =================================================
          ARRAY BLOCK
      ================================================== */}

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


      {/* =================================================
          VALUE
      ================================================== */}

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


      {/* =================================================
          INDEX
      ================================================== */}

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


      {/* =================================================
          CURRENT POSITION LABEL
      ================================================== */}

      {isCurrent && (

        <Text
          position={[
            0,
            blockSize * 0.75,
            0,
          ]}
          fontSize={
            Math.max(
              0.12,
              blockSize * 0.17
            )
          }
          color="#67e8f9"
          anchorX="center"
          anchorY="middle"
        >
          CURRENT
        </Text>

      )}


      {/* =================================================
          MINIMUM LABEL
      ================================================== */}

      {isMinimum && (

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
          MIN
        </Text>

      )}


      {/* =================================================
          COMPARE LABEL
      ================================================== */}

      {isComparing &&
        !isMinimum &&
        !isCurrent && (

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


      {/* =================================================
          SWAP LABEL
      ================================================== */}

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

    </group>
  );
}


/*
 * =========================================================
 * SELECTION SORT SCENE CONTENT
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
  } = useMemo(
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
    i,
    minIndex,
    sortedFrom,
  } = variables;


  return (
    <>


      {/* =================================================
          LIGHTING
      ================================================== */}

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


      {/* =================================================
          CAMERA
      ================================================== */}

      <CameraController
        arrayLength={
          array.length
        }
      />


      {/* =================================================
          ARRAY
      ================================================== */}

      {array.map(
        (
          value,
          index
        ) => (

          <SelectionBlock
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


      {/* =================================================
          CURRENT POSITION
      ================================================== */}

      {i !== null &&
        i !== undefined &&
        i < array.length && (

        <Text
          position={[
            0,
            2.05,
            0,
          ]}
          fontSize={0.22}
          color="#67e8f9"
          anchorX="center"
          anchorY="middle"
        >
          POSITION: {i}
        </Text>

      )}


      {/* =================================================
          MINIMUM INDICATOR
      ================================================== */}

      {minIndex !== null &&
        minIndex !== undefined &&
        minIndex < array.length && (

        <Text
          position={[
            0,
            1.68,
            0,
          ]}
          fontSize={0.17}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          MINIMUM: {array[minIndex]}
        </Text>

      )}


      {/* =================================================
          SORTED SECTION
      ================================================== */}

      {sortedFrom !==
        undefined &&
        sortedFrom !== null && (

        <Text
          position={[
            0,
            1.38,
            0,
          ]}
          fontSize={0.14}
          color="#4ade80"
          anchorX="center"
          anchorY="middle"
        >
          SORTED: 0 →{" "}
          {Math.max(
            0,
            sortedFrom - 1
          )}
        </Text>

      )}


      {/* =================================================
          CONTROLS
      ================================================== */}

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

export default function SelectionSortScene({
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