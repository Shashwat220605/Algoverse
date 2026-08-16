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
 * QUEUE NODE
 * =========================================================
 */

function QueueNode({
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
    value: enqueueValue,
    removedValue,
    frontIndex,
    phase,
  } = variables;


  const isFront =
    index === 0;


  const isRear =
    index === total - 1;


  const isNewNode =
    value === enqueueValue &&
    (
      phase === "create-node" ||
      phase === "connect-node"
    );


  const isRemoved =
    value === removedValue &&
    (
      phase === "save-front" ||
      phase === "move-front" ||
      phase === "delete"
    );


  const isFrontHighlighted =
    frontIndex === index;


  let color =
    "#18181c";


  let scale = 1;


  /*
   * Front highlight.
   */

  if (isFront) {
    color = "#2563eb";
  }


  /*
   * Rear highlight.
   */

  if (
    isRear &&
    !isFront
  ) {
    color = "#7c3aed";
  }


  /*
   * Enqueue highlight.
   */

  if (isNewNode) {
    color = "#f59e0b";
    scale = 1.12;
  }


  /*
   * Dequeue highlight.
   */

  if (isRemoved) {
    color = "#dc2626";
    scale = 1.12;
  }


  /*
   * Front operation highlight.
   */

  if (isFrontHighlighted) {
    color = "#2563eb";
    scale = 1.1;
  }


  const x =
    index * 1.75;


  useEffect(() => {
    if (!ref.current) {
      return;
    }


    gsap.to(
      ref.current.position,
      {
        x,

        duration: 0.5,

        ease: "power3.out",
      }
    );


    gsap.to(
      ref.current.scale,
      {
        x: isRemoved
          ? 0.05
          : scale,

        y: isRemoved
          ? 0.05
          : scale,

        z: isRemoved
          ? 0.05
          : scale,

        duration: isRemoved
          ? 0.45
          : 0.35,

        ease: isRemoved
          ? "power2.in"
          : "back.out(1.4)",
      }
    );

  }, [
    x,
    scale,
    isRemoved,
  ]);


  return (
    <group
      ref={ref}
      position={[
        x,
        0,
        0,
      ]}
    >

      <mesh>

        <boxGeometry
          args={[
            1.35,
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
        fontSize={0.3}
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
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        {index}
      </Text>


      {isFront && !isRemoved && (
        <Text
          position={[
            0,
            0.75,
            0,
          ]}
          fontSize={0.14}
          color="#60a5fa"
          anchorX="center"
          anchorY="middle"
        >
          FRONT
        </Text>
      )}


      {isRear && !isRemoved && (
        <Text
          position={[
            0,
            -1.0,
            0,
          ]}
          fontSize={0.14}
          color="#a78bfa"
          anchorX="center"
          anchorY="middle"
        >
          REAR
        </Text>
      )}


      {isNewNode && (
        <Text
          position={[
            0,
            1.05,
            0,
          ]}
          fontSize={0.13}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          ENQUEUE
        </Text>
      )}


      {isRemoved && (
        <Text
          position={[
            0,
            1.05,
            0,
          ]}
          fontSize={0.13}
          color="#f87171"
          anchorX="center"
          anchorY="middle"
        >
          DEQUEUE
        </Text>
      )}


      {isFrontHighlighted && (
        <Text
          position={[
            0,
            1.05,
            0,
          ]}
          fontSize={0.13}
          color="#60a5fa"
          anchorX="center"
          anchorY="middle"
        >
          FRONT
        </Text>
      )}

    </group>
  );
}


/*
 * =========================================================
 * QUEUE ARROW
 * =========================================================
 */

function QueueArrow({
  index,
}) {
  return (
    <Text
      position={[
        index * 1.75 + 0.85,
        0,
        0,
      ]}
      fontSize={0.28}
      color="#52525b"
      anchorX="center"
      anchorY="middle"
    >
      →
    </Text>
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

    const width =
      Math.max(
        5,
        total * 1.75
      );


    const aspect =
      size.width /
      Math.max(
        1,
        size.height
      );


    camera.position.set(
      width / 2,
      3.5,
      Math.max(
        8,
        12 /
          Math.max(
            aspect,
            0.7
          )
      )
    );


    camera.lookAt(
      width / 2,
      0,
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
    frontValue,
  } = variables;


  let title =
    "QUEUE";


  let subtitle =
    "FIRST IN → FIRST OUT";


  /*
   * ENQUEUE
   */

  if (
    phase === "create-node"
  ) {
    title =
      "CREATE NEW NODE";

    subtitle =
      "PREPARING ENQUEUE";
  }


  if (
    phase === "connect-node"
  ) {
    title =
      "CONNECT TO REAR";

    subtitle =
      "REAR → NEW NODE";
  }


  if (
    phase === "update-rear"
  ) {
    title =
      "UPDATE REAR";

    subtitle =
      "REAR → NEW NODE";
  }


  /*
   * DEQUEUE
   */

  if (
    phase === "save-front"
  ) {
    title =
      "SAVE FRONT";

    subtitle =
      "TEMP → FRONT";
  }


  if (
    phase === "move-front"
  ) {
    title =
      "MOVE FRONT";

    subtitle =
      "FRONT → NEXT NODE";
  }


  if (
    phase === "delete"
  ) {
    title =
      "REMOVE FRONT";

    subtitle =
      "DELETE NODE";
  }


  /*
   * FRONT
   */

  if (
    phase === "read-front"
  ) {
    title =
      "READ FRONT";

    subtitle =
      `FRONT = ${frontValue}`;
  }


  /*
   * COMPLETE
   */

  if (
    phase === "complete"
  ) {

    if (
      frontValue !== null &&
      frontValue !== undefined
    ) {
      title =
        "FRONT COMPLETE";

      subtitle =
        `FRONT = ${frontValue}`;

    } else {
      title =
        "QUEUE OPERATION COMPLETE";

      subtitle =
        "FIFO";
    }
  }


  const centerX =
    Math.max(
      0,
      (array.length - 1) *
        1.75 /
        2
    );


  return (
    <>

      <ambientLight
        intensity={1.6}
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
          centerX,
          3,
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
          centerX,
          2.5,
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
          0,
          0,
        ]}
      >

        {array.map(
          (
            value,
            index
          ) => (
            <QueueNode
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


        {array
          .slice(0, -1)
          .map(
            (
              _,
              index
            ) => (
              <QueueArrow
                key={
                  `arrow-${index}`
                }
                index={
                  index
                }
              />
            )
          )}

      </group>


      <Text
        position={[
          centerX,
          -1.8,
          0,
        ]}
        fontSize={0.16}
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        REMOVE ← FRONT
        {"       "}
        REAR → INSERT
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

export default function QueueScene({
  currentStep,
}) {
  return (
    <div className="h-full w-full">

      <Canvas
        camera={{
          position: [
            5,
            3,
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