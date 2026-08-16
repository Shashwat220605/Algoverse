import {
  useEffect,
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
 * STACK NODE
 * =========================================================
 */

function StackNode({
  value,
  index,
  total,
  currentStep,
}) {

  const ref =
    useRef(null);


  const {
    variables = {},
  } = currentStep;


  const {
    pushedValue,
    removedValue,
    topIndex,
    phase,
  } = variables;


  const isTop =
    index ===
    total - 1;


  const isPeekTop =
    topIndex === index;


  const isPushed =
    pushedValue === value &&
    (
      phase ===
        "create-node" ||
      phase ===
        "connect-node"
    );


  const isRemoved =
    removedValue === value &&
    (
      phase ===
        "save-top" ||
      phase ===
        "move-top" ||
      phase ===
        "delete"
    );


  let color =
    "#18181c";


  let scale = 1;


  if (isTop) {
    color = "#7c3aed";
  }


  if (isPeekTop) {

    color = "#2563eb";

    scale = 1.1;

  }


  if (isPushed) {

    color = "#f59e0b";

    scale = 1.12;

  }


  if (isRemoved) {

    color = "#dc2626";

    scale = 1.12;

  }


  /*
   * Stack grows upward.
   */

  const y =
    index * 1.15;


  useEffect(() => {

    if (!ref.current) {
      return;
    }


    gsap.to(
      ref.current.position,
      {
        y,

        duration: 0.5,

        ease: "power3.out",
      }
    );


    gsap.to(
      ref.current.scale,
      {
        x:
          isRemoved
            ? 0.05
            : scale,

        y:
          isRemoved
            ? 0.05
            : scale,

        z:
          isRemoved
            ? 0.05
            : scale,

        duration:
          isRemoved
            ? 0.45
            : 0.35,

        ease:
          isRemoved
            ? "power2.in"
            : "back.out(1.4)",
      }
    );

  }, [
    y,
    scale,
    isRemoved,
  ]);


  return (

    <group
      ref={ref}
      position={[
        0,
        y,
        0,
      ]}
    >

      <mesh>

        <boxGeometry
          args={[
            2.4,
            0.9,
            0.9,
          ]}
        />

        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.6}
        />

      </mesh>


      <Text
        position={[
          0,
          0,
          0.48,
        ]}
        fontSize={0.32}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {value}
      </Text>


      <Text
        position={[
          -1.55,
          0,
          0,
        ]}
        fontSize={0.14}
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        {index}
      </Text>


      {isTop && !isRemoved && (

        <Text
          position={[
            1.65,
            0,
            0,
          ]}
          fontSize={0.14}
          color="#a78bfa"
          anchorX="left"
          anchorY="middle"
        >
          TOP
        </Text>

      )}


      {isPushed && (

        <Text
          position={[
            1.65,
            0.3,
            0,
          ]}
          fontSize={0.13}
          color="#fbbf24"
          anchorX="left"
          anchorY="middle"
        >
          PUSH
        </Text>

      )}


      {isRemoved && (

        <Text
          position={[
            1.65,
            0.3,
            0,
          ]}
          fontSize={0.13}
          color="#f87171"
          anchorX="left"
          anchorY="middle"
        >
          POP
        </Text>

      )}


      {isPeekTop && (

        <Text
          position={[
            1.65,
            -0.3,
            0,
          ]}
          fontSize={0.13}
          color="#60a5fa"
          anchorX="left"
          anchorY="middle"
        >
          PEEK
        </Text>

      )}

    </group>
  );
}


/*
 * =========================================================
 * STACK BASE
 * =========================================================
 */

function StackBase({
  total,
}) {

  const height =
    Math.max(
      2,
      total * 1.15
    );


  return (

    <mesh
      position={[
        0,
        (height - 1.15) / 2,
        -0.55,
      ]}
    >

      <boxGeometry
        args={[
          2.8,
          height,
          0.15,
        ]}
      />

      <meshStandardMaterial
        color="#27272a"
        roughness={0.5}
        metalness={0.3}
      />

    </mesh>
  );
}


/*
 * =========================================================
 * CAMERA
 * =========================================================
 */

function CameraController({
  total,
}) {

  const {
    camera,
    size,
  } = useThree();


  useEffect(() => {

    const height =
      Math.max(
        4,
        total * 1.15
      );


    const aspect =
      size.width /
      Math.max(
        1,
        size.height
      );


    camera.position.set(
      5,
      height / 2,
      Math.max(
        7,
        9 /
          Math.max(
            aspect,
            0.7
          )
      )
    );


    camera.lookAt(
      0,
      height / 2,
      0
    );


    camera.updateProjectionMatrix();

  }, [
    total,
    camera,
    size.width,
    size.height,
  ]);


  return null;
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
    phase,
    topValue,
  } = variables;


  let title =
    "STACK";


  let subtitle =
    "LAST IN → FIRST OUT";


  if (
    phase ===
    "create-node"
  ) {

    title =
      "CREATE NEW NODE";

    subtitle =
      "PREPARING PUSH";

  }


  if (
    phase ===
    "connect-node"
  ) {

    title =
      "CONNECT NEW NODE";

    subtitle =
      "NEW NODE → OLD TOP";

  }


  if (
    phase ===
    "update-top"
  ) {

    title =
      "UPDATE TOP";

    subtitle =
      "TOP → NEW NODE";

  }


  if (
    phase ===
    "save-top"
  ) {

    title =
      "SAVE CURRENT TOP";

    subtitle =
      "TEMP → TOP";

  }


  if (
    phase ===
    "move-top"
  ) {

    title =
      "MOVE TOP";

    subtitle =
      "TOP → NEXT NODE";

  }


  if (
    phase ===
    "delete"
  ) {

    title =
      "DELETE OLD TOP";

    subtitle =
      "REMOVE NODE";

  }


  if (
    phase ===
    "read-top"
  ) {

    title =
      "READ TOP";

    subtitle =
      `TOP = ${topValue}`;

  }


  if (
    phase ===
    "complete"
  ) {

    if (
      topValue !==
      null &&
      topValue !==
      undefined
    ) {

      title =
        "PEEK COMPLETE";

      subtitle =
        `TOP = ${topValue}`;

    } else {

      title =
        "STACK OPERATION COMPLETE";

      subtitle =
        "LIFO";

    }

  }


  const stackHeight =
    Math.max(
      4,
      array.length *
        1.15
    );


  return (

    <>

      <ambientLight
        intensity={1.6}
      />


      <directionalLight
        position={[
          5,
          8,
          5,
        ]}
        intensity={4}
      />


      <pointLight
        position={[
          -5,
          3,
          4,
        ]}
        intensity={3}
      />


      <CameraController
        total={
          array.length
        }
      />


      <Text
        position={[
          0,
          stackHeight + 1,
          0,
        ]}
        fontSize={0.3}
        color="#e4e4e7"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>


      <Text
        position={[
          0,
          stackHeight + 0.55,
          0,
        ]}
        fontSize={0.14}
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        {subtitle}
      </Text>


      <group
        position={[
          0,
          -1.5,
          0,
        ]}
      >

        <StackBase
          total={
            array.length
          }
        />


        {array.map(
          (
            value,
            index
          ) => (

            <StackNode
              key={`${index}-${value}`}
              value={value}
              index={index}
              total={
                array.length
              }
              currentStep={
                currentStep
              }
            />

          )
        )}

      </group>


      <Text
        position={[
          -3.4,
          -2.4,
          0,
        ]}
        fontSize={0.15}
        color="#71717a"
        anchorX="left"
        anchorY="middle"
      >
        PUSH → ADD
        {"   "}
        POP → REMOVE
        {"   "}
        PEEK → READ
      </Text>


      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={25}
        enableDamping
        dampingFactor={0.08}
      />

    </>
  );
}


/*
 * =========================================================
 * EXPORT
 * =========================================================
 */

export default function StackScene({
  currentStep,
}) {

  return (

    <div className="h-full w-full">

      <Canvas
        camera={{
          position: [
            5,
            4,
            9,
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