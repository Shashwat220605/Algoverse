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
 * NODE LAYOUT
 * =========================================================
 */

function getLayout(arrayLength) {

  if (arrayLength <= 5) {

    return {
      spacing: 2.05,
      nodeSize: 0.62,
    };

  }


  if (arrayLength <= 8) {

    return {
      spacing: 1.55,
      nodeSize: 0.52,
    };

  }


  return {
    spacing: 1.15,
    nodeSize: 0.42,
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
        5,
        (arrayLength - 1) *
          spacing
      );


    const aspect =
      size.width /
      Math.max(
        1,
        size.height
      );


    const cameraZ =
      Math.max(
        7,
        totalWidth /
          Math.max(
            aspect,
            0.65
          ) *
          1.15
      );


    camera.position.set(
      0,
      1.3,
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
 * ARROW
 * =========================================================
 */

function ListArrow({
  fromX,
  toX,
  y,
  active,
}) {

  const length =
    Math.abs(
      toX - fromX
    );


  const midpoint =
    (fromX + toX) / 2;


  return (
    <group>

      {/* LINE */}

      <mesh
        position={[
          midpoint,
          y,
          0,
        ]}
      >

        <boxGeometry
          args={[
            Math.max(
              0.1,
              length - 0.85
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


      {/* ARROW HEAD */}

      <mesh
        position={[
          toX - 0.42,
          y,
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
 * =========================================================
 * NULL NODE
 * =========================================================
 */

function NullPointer({
  x,
}) {

  return (

    <group
      position={[
        x,
        0,
        0,
      ]}
    >

      <mesh>

        <boxGeometry
          args={[
            0.7,
            0.7,
            0.7,
          ]}
        />

        <meshStandardMaterial
          color="#09090b"
          wireframe
        />

      </mesh>


      <Text
        position={[
          0,
          0,
          0.42,
        ]}
        fontSize={0.16}
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        NULL
      </Text>

    </group>
  );
}


/*
 * =========================================================
 * LINKED LIST NODE
 * =========================================================
 */

function LinkedListNode({
  value,
  index,
  currentStep,
  x,
  nodeSize,
}) {

  const groupRef =
    useRef(null);


  const {
    variables = {},
    action,
  } = currentStep;


  const {
    currentIndex,
    visited = [],
    phase,
  } = variables;


  const isCurrent =
    currentIndex === index;


  const isVisited =
    visited.includes(
      index
    );


  /*
   * =======================================================
   * POSITION ANIMATION
   * =======================================================
   */

  let targetY = 0;

  let targetZ = 0;

  let targetScale = 1;


  if (isVisited) {

    targetY =
      -0.05;

  }


  if (isCurrent) {

    targetY =
      0.45;

    targetZ =
      0.25;

    targetScale =
      1.12;

  }


  if (
    phase === "visit" &&
    isCurrent
  ) {

    targetY =
      0.6;

    targetZ =
      0.4;

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
   * NODE COLOR
   * =======================================================
   */

  let color =
    "#18181c";


  if (isVisited) {

    color =
      "#164e3a";

  }


  if (isCurrent) {

    color =
      "#7c3aed";

  }


  if (
    phase === "visit" &&
    isCurrent
  ) {

    color =
      "#f59e0b";

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

      {/* NODE */}

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


      {/* VALUE */}

      <Text
        position={[
          0,
          0,
          nodeSize + 0.08,
        ]}
        fontSize={
          Math.max(
            0.16,
            nodeSize * 0.48
          )
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
          -nodeSize - 0.28,
          0,
        ]}
        fontSize={
          Math.max(
            0.1,
            nodeSize * 0.25
          )
        }
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        node {index}
      </Text>


      {/* CURRENT */}

      {isCurrent && (

        <Text
          position={[
            0,
            nodeSize + 0.45,
            0,
          ]}
          fontSize={
            Math.max(
              0.11,
              nodeSize * 0.3
            )
          }
          color={
            phase === "visit"
              ? "#fbbf24"
              : "#c4b5fd"
          }
          anchorX="center"
          anchorY="middle"
        >
          {phase === "visit"
            ? "VISIT"
            : "CURRENT"}
        </Text>

      )}


      {/* VISITED */}

      {isVisited &&
        !isCurrent && (

        <Text
          position={[
            0,
            nodeSize + 0.35,
            0,
          ]}
          fontSize={
            Math.max(
              0.09,
              nodeSize * 0.24
            )
          }
          color="#4ade80"
          anchorX="center"
          anchorY="middle"
        >
          VISITED
        </Text>

      )}

    </group>
  );
}


/*
 * =========================================================
 * HEAD LABEL
 * =========================================================
 */

function HeadLabel({
  x,
}) {

  return (

    <group
      position={[
        x,
        1.2,
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
          -0.32,
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
            0.11,
            0.28,
            4,
          ]}
        />

        <meshStandardMaterial
          color="#8b5cf6"
        />

      </mesh>


      <mesh
        position={[
          0,
          -0.48,
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
    visited = [],
    phase,
  } = variables;


  const {
    spacing,
    nodeSize,
  } =
    useMemo(
      () =>
        getLayout(
          array.length
        ),
      [array.length]
    );


  /*
   * =======================================================
   * CENTER THE LIST
   * =======================================================
   */

  const centerOffset =
    -(
      (array.length - 1) *
      spacing
    ) / 2;


  /*
   * =======================================================
   * PHASE LABEL
   * =======================================================
   */

  let phaseLabel =
    "LINKED LIST";


  if (
    phase === "head"
  ) {

    phaseLabel =
      "SET CURRENT = HEAD";

  } else if (
    phase === "check"
  ) {

    phaseLabel =
      "CHECK CURRENT";

  } else if (
    phase === "visit"
  ) {

    phaseLabel =
      "VISIT NODE";

  } else if (
    phase === "visited"
  ) {

    phaseLabel =
      "NODE VISITED";

  } else if (
    phase === "next"
  ) {

    phaseLabel =
      "MOVE TO NEXT";

  } else if (
    phase === "complete"
  ) {

    phaseLabel =
      "TRAVERSAL COMPLETE";

  }


  /*
   * =======================================================
   * NULL POSITION
   * =======================================================
   */

  const nullX =
    centerOffset +
    array.length *
      spacing;


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
          2.3,
          0,
        ]}
        fontSize={0.25}
        color="#e4e4e7"
        anchorX="center"
        anchorY="middle"
      >
        {phaseLabel}
      </Text>


      {/* DESCRIPTION */}

      <Text
        position={[
          0,
          1.9,
          0,
        ]}
        fontSize={0.14}
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        HEAD → NODE → NODE → ... → NULL
      </Text>


      {/* HEAD */}

      {array.length > 0 && (

        <HeadLabel
          x={
            centerOffset
          }
        />

      )}


      {/* ARROWS */}

      {array.map(
        (
          _,
          index
        ) => {

          if (
            index >=
            array.length - 1
          ) {

            return null;

          }


          const fromX =
            centerOffset +
            index *
              spacing;


          const toX =
            centerOffset +
            (index + 1) *
              spacing;


          const arrowActive =
            visited.includes(
              index
            ) ||
            currentIndex ===
              index;


          return (

            <ListArrow
              key={`arrow-${index}`}
              fromX={fromX}
              toX={toX}
              y={0}
              active={
                arrowActive
              }
            />

          );

        }
      )}


      {/* LAST ARROW → NULL */}

      {array.length > 0 && (

        <ListArrow
          fromX={
            centerOffset +
            (array.length - 1) *
              spacing
          }
          toX={
            nullX
          }
          y={0}
          active={
            phase === "complete" ||
            visited.includes(
              array.length - 1
            )
          }
        />

      )}


      {/* NODES */}

      {array.map(
        (
          value,
          index
        ) => (

          <LinkedListNode
            key={`${index}-${value}`}
            value={value}
            index={index}
            currentStep={
              currentStep
            }
            x={
              centerOffset +
              index *
                spacing
            }
            nodeSize={
              nodeSize
            }
          />

        )
      )}


      {/* NULL */}

      <NullPointer
        x={
          nullX +
          0.35
        }
      />


      {/* CURRENT POINTER INFO */}

      {currentIndex !== null &&
        currentIndex !== undefined && (

        <Text
          position={[
            0,
            -1.75,
            0,
          ]}
          fontSize={0.15}
          color="#a78bfa"
          anchorX="center"
          anchorY="middle"
        >
          CURRENT → NODE {currentIndex}
        </Text>

      )}


      {/* VISITED COUNT */}

      <Text
        position={[
          0,
          -2.1,
          0,
        ]}
        fontSize={0.13}
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        VISITED: {visited.length} / {array.length}
      </Text>


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

export default function LinkedListScene({
  currentStep,
}) {

  return (

    <div className="h-full w-full">

      <Canvas
        camera={{
          position: [
            0,
            1.3,
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