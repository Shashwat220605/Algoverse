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


/*
 * =========================================================
 * RESPONSIVE ARRAY LAYOUT
 * =========================================================
 */

function getLayout(arrayLength) {

  if (arrayLength <= 7) {

    return {
      blockSize: 0.95,
      spacing: 1.25,
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
        0.48,
        0.95 * scale
      ),

    spacing:
      Math.max(
        0.62,
        1.25 * scale
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
      1.2,
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

function SearchBlock({
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
    currentIndex,
    checked = [],
    foundIndex,
    phase,
  } = variables;


  /*
   * =======================================================
   * STATE
   * =======================================================
   */

  const isCurrent =
    currentIndex === index;


  const isChecked =
    checked.includes(
      index
    );


  const isFound =
    foundIndex === index;


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


  const x =
    centerOffset +
    index * spacing;


  let targetY = 0;

  let targetZ = 0;

  let targetScale = 1;


  if (isChecked) {

    targetY =
      -0.08;

  }


  if (isCurrent) {

    targetY =
      0.45;

    targetZ =
      0.25;

    targetScale =
      1.12;

  }


  if (isFound) {

    targetY =
      0.7;

    targetZ =
      0.45;

    targetScale =
      1.22;

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
        x,
        y: targetY,
        z: targetZ,

        duration: 0.45,

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
   * COLORS
   * =======================================================
   */

  let color =
    "#18181c";


  if (isChecked) {

    color =
      "#27272a";

  }


  if (isCurrent) {

    color =
      "#7c3aed";

  }


  if (
    phase === "compare" &&
    isCurrent
  ) {

    color =
      "#f59e0b";

  }


  if (isFound) {

    color =
      "#16a34a";

  }


  return (

    <group
      ref={groupRef}
      position={[
        x,
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


      {/* CURRENT */}

      {isCurrent &&
        !isFound && (

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
          color={
            phase === "compare"
              ? "#fbbf24"
              : "#c4b5fd"
          }
          anchorX="center"
          anchorY="middle"
        >
          CHECK
        </Text>

      )}


      {/* FOUND */}

      {isFound && (

        <Text
          position={[
            0,
            blockSize * 0.78,
            0,
          ]}
          fontSize={
            Math.max(
              0.12,
              blockSize * 0.19
            )
          }
          color="#4ade80"
          anchorX="center"
          anchorY="middle"
        >
          FOUND
        </Text>

      )}

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
    variables = {},
  } = currentStep;


  const {
    currentIndex,
    foundIndex,
    phase,
  } = variables;


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


  /*
   * Phase label
   */

  let phaseLabel =
    "LINEAR SEARCH";


  if (
    phase === "checking"
  ) {

    phaseLabel =
      "CHECK ELEMENT";

  } else if (
    phase === "compare"
  ) {

    phaseLabel =
      "COMPARE";

  } else if (
    phase === "notFound"
  ) {

    phaseLabel =
      "NOT A MATCH";

  } else if (
    phase === "found"
  ) {

    phaseLabel =
      "TARGET FOUND";

  } else if (
    phase === "notFoundFinal"
  ) {

    phaseLabel =
      "NOT FOUND";

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


      {/* TITLE */}

      <Text
        position={[
          0,
          2.1,
          0,
        ]}
        fontSize={0.22}
        color="#e4e4e7"
        anchorX="center"
        anchorY="middle"
      >
        {phaseLabel}
      </Text>


      {/* TARGET */}

      <Text
        position={[
          0,
          1.72,
          0,
        ]}
        fontSize={0.15}
        color="#a1a1aa"
        anchorX="center"
        anchorY="middle"
      >
        TARGET: {currentStep.target}
      </Text>


      {/* CURRENT INDEX */}

      {currentIndex !== null &&
        currentIndex !== undefined && (

        <Text
          position={[
            0,
            -1.7,
            0,
          ]}
          fontSize={0.14}
          color="#a78bfa"
          anchorX="center"
          anchorY="middle"
        >
          CHECKING INDEX: {currentIndex}
        </Text>

      )}


      {/* FOUND MESSAGE */}

      {foundIndex !== null &&
        foundIndex !== undefined && (

        <Text
          position={[
            0,
            -2.05,
            0,
          ]}
          fontSize={0.17}
          color="#4ade80"
          anchorX="center"
          anchorY="middle"
        >
          {currentStep.target} FOUND AT INDEX {foundIndex}
        </Text>

      )}


      {/* ARRAY */}

      {array.map(
        (
          value,
          index
        ) => (

          <SearchBlock
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

export default function LinearSearchScene({
  currentStep,
}) {

  return (

    <div className="h-full w-full">

      <Canvas
        camera={{
          position: [
            0,
            1.2,
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