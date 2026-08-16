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
 * =====================================================
 * LAYOUT
 * =====================================================
 */

function getLayout(length) {

  if (length <= 5) {
    return {
      spacing: 2.1,
      nodeSize: 0.62,
    };
  }

  if (length <= 8) {
    return {
      spacing: 1.55,
      nodeSize: 0.52,
    };
  }

  return {
    spacing: 1.2,
    nodeSize: 0.42,
  };
}


/*
 * =====================================================
 * CAMERA
 * =====================================================
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
    } = getLayout(
      arrayLength
    );


    const width =
      Math.max(
        6,
        (arrayLength - 1) *
          spacing
      );


    const aspect =
      size.width /
      Math.max(
        1,
        size.height
      );


    camera.position.set(
      0,
      1.1,
      Math.max(
        8,
        (width /
          Math.max(
            aspect,
            0.65
          )) *
          1.1
      )
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
 * =====================================================
 * ARROW
 * =====================================================
 */

function Arrow({
  fromX,
  toX,
  active = false,
}) {

  const length =
    Math.abs(
      toX - fromX
    );


  const midpoint =
    (fromX + toX) / 2;


  return (

    <group>

      <mesh
        position={[
          midpoint,
          0,
          0,
        ]}
      >

        <boxGeometry
          args={[
            Math.max(
              0.1,
              length - 0.8
            ),
            0.045,
            0.045,
          ]}
        />

        <meshStandardMaterial
          color={
            active
              ? "#8b5cf6"
              : "#3f3f46"
          }
        />

      </mesh>


      <mesh
        position={[
          toX - 0.4,
          0,
          0,
        ]}
        rotation={[
          0,
          0,
          -Math.PI / 2,
        ]}
      >

        <coneGeometry
          args={[
            active
              ? 0.12
              : 0.09,

            active
              ? 0.28
              : 0.22,

            4,
          ]}
        />

        <meshStandardMaterial
          color={
            active
              ? "#8b5cf6"
              : "#52525b"
          }
        />

      </mesh>

    </group>
  );
}


/*
 * =====================================================
 * NODE
 * =====================================================
 */

function Node({
  value,
  index,
  x,
  nodeSize,
  currentStep,
}) {

  const ref =
    useRef(null);


  const {
    variables = {},
  } = currentStep;


  const {
    currentIndex,
    deleteIndex,
    previousIndex,
    phase,
  } = variables;


  const isCurrent =
    currentIndex === index;


  const isPrevious =
    previousIndex === index;


  const isDeleteTarget =
    deleteIndex === index;


  const isBeingRemoved =
    isDeleteTarget &&
    (
      phase ===
        "delete-head" ||
      phase ===
        "redirect"
    );


  let y = 0;
  let z = 0;
  let scale = 1;


  if (isCurrent) {

    y = 0.45;
    z = 0.25;
    scale = 1.1;

  }


  if (isPrevious) {

    y = 0.3;
    z = 0.15;

  }


  if (isDeleteTarget) {

    y = 0.55;
    z = 0.35;
    scale = 1.12;

  }


  useEffect(() => {

    if (!ref.current) {
      return;
    }


    gsap.to(
      ref.current.position,
      {
        x,
        y,
        z,

        duration: 0.45,

        ease: "power3.out",
      }
    );


    gsap.to(
      ref.current.scale,
      {
        x:
          isBeingRemoved
            ? 0.05
            : scale,

        y:
          isBeingRemoved
            ? 0.05
            : scale,

        z:
          isBeingRemoved
            ? 0.05
            : scale,

        duration:
          isBeingRemoved
            ? 0.5
            : 0.35,

        ease:
          isBeingRemoved
            ? "power2.in"
            : "back.out(1.4)",
      }
    );

  }, [
    x,
    y,
    z,
    scale,
    isBeingRemoved,
  ]);


  let color =
    "#18181c";


  if (isPrevious) {
    color = "#2563eb";
  }


  if (isCurrent) {
    color = "#7c3aed";
  }


  if (isDeleteTarget) {
    color = "#dc2626";
  }


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

        <sphereGeometry
          args={[
            nodeSize,
            32,
            32,
          ]}
        />

        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.65}
        />

      </mesh>


      <Text
        position={[
          0,
          0,
          nodeSize + 0.08,
        ]}
        fontSize={
          Math.max(
            0.15,
            nodeSize * 0.48
          )
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
          -nodeSize - 0.25,
          0,
        ]}
        fontSize={
          Math.max(
            0.09,
            nodeSize * 0.25
          )
        }
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        node {index}
      </Text>


      {isDeleteTarget && (

        <Text
          position={[
            0,
            nodeSize + 0.42,
            0,
          ]}
          fontSize={0.13}
          color="#f87171"
          anchorX="center"
          anchorY="middle"
        >
          DELETE
        </Text>

      )}


      {isCurrent &&
        !isDeleteTarget && (

          <Text
            position={[
              0,
              nodeSize + 0.4,
              0,
            ]}
            fontSize={0.13}
            color="#c4b5fd"
            anchorX="center"
            anchorY="middle"
          >
            CURRENT
          </Text>

        )}


      {isPrevious &&
        !isCurrent &&
        !isDeleteTarget && (

          <Text
            position={[
              0,
              nodeSize + 0.4,
              0,
            ]}
            fontSize={0.12}
            color="#60a5fa"
            anchorX="center"
            anchorY="middle"
          >
            PREVIOUS
          </Text>

        )}

    </group>
  );
}


/*
 * =====================================================
 * HEAD
 * =====================================================
 */

function Head({
  x,
}) {

  return (

    <group
      position={[
        x,
        1.15,
        0,
      ]}
    >

      <Text
        fontSize={0.18}
        color="#c4b5fd"
        anchorX="center"
        anchorY="middle"
      >
        HEAD
      </Text>


      <mesh
        position={[
          0,
          -0.35,
          0,
        ]}
      >

        <boxGeometry
          args={[
            0.04,
            0.3,
            0.04,
          ]}
        />

        <meshStandardMaterial
          color="#8b5cf6"
        />

      </mesh>

    </group>
  );
}


/*
 * =====================================================
 * SCENE CONTENT
 * =====================================================
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
    deleteIndex,
    previousIndex,
    phase,
  } = variables;


  const {
    spacing,
    nodeSize,
  } = useMemo(
    () =>
      getLayout(
        array.length
      ),
    [array.length]
  );


  const centerOffset =
    -(
      (array.length - 1) *
      spacing
    ) / 2;


  let title =
    "LINKED LIST DELETION";


  if (phase === "start") {
    title =
      "SELECT NODE TO DELETE";
  }


  if (
    phase ===
      "start-traversal"
  ) {
    title =
      "START FROM HEAD";
  }


  if (
    phase === "traverse" ||
    phase === "move"
  ) {
    title =
      "TRAVERSE TO PREVIOUS NODE";
  }


  if (
    phase ===
    "previous-found"
  ) {
    title =
      "FOUND PREVIOUS NODE";
  }


  if (
    phase === "redirect"
  ) {
    title =
      "REDIRECT POINTER";
  }


  if (
    phase ===
    "delete-head"
  ) {
    title =
      "UPDATE HEAD";
  }


  if (
    phase === "deleted"
  ) {
    title =
      "NODE REMOVED";
  }


  if (
    phase === "complete"
  ) {
    title =
      "DELETION COMPLETE";
  }


  return (

    <>

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


      <CameraController
        arrayLength={
          array.length
        }
      />


      <Text
        position={[
          0,
          2.3,
          0,
        ]}
        fontSize={0.24}
        color="#e4e4e7"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>


      <Text
        position={[
          0,
          1.9,
          0,
        ]}
        fontSize={0.13}
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        FIND PREVIOUS → REDIRECT LINK → DELETE NODE
      </Text>


      {array.length > 0 && (

        <Head
          x={centerOffset}
        />

      )}


      {array.map(
        (_, index) => {

          if (
            index >=
            array.length - 1
          ) {
            return null;
          }


          const fromX =
            centerOffset +
            index * spacing;


          const toX =
            centerOffset +
            (index + 1) *
              spacing;


          const active =
            previousIndex ===
              index ||
            currentIndex ===
              index ||
            deleteIndex ===
              index;


          return (

            <Arrow
              key={`arrow-${index}`}
              fromX={fromX}
              toX={toX}
              active={active}
            />

          );
        }
      )}


      {array.length > 0 && (

        <Text
          position={[
            centerOffset +
              array.length *
                spacing -
              0.15,
            0,
            0,
          ]}
          fontSize={0.14}
          color="#71717a"
          anchorX="left"
          anchorY="middle"
        >
          → NULL
        </Text>

      )}


      {array.map(
        (
          value,
          index
        ) => (

          <Node
            key={`${index}-${value}`}
            value={value}
            index={index}
            x={
              centerOffset +
              index * spacing
            }
            nodeSize={
              nodeSize
            }
            currentStep={
              currentStep
            }
          />

        )
      )}


      {currentIndex !==
        null &&
        currentIndex !==
          undefined && (

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
            CURRENT → NODE{" "}
            {currentIndex}
          </Text>

        )}


      {previousIndex !==
        null &&
        previousIndex !==
          undefined && (

          <Text
            position={[
              0,
              -2.0,
              0,
            ]}
            fontSize={0.13}
            color="#60a5fa"
            anchorX="center"
            anchorY="middle"
          >
            PREVIOUS → NODE{" "}
            {previousIndex}
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


/*
 * =====================================================
 * EXPORT
 * =====================================================
 */

export default function LinkedListDeletionScene({
  currentStep,
}) {

  return (

    <div className="h-full w-full">

      <Canvas
        camera={{
          position: [
            0,
            1,
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