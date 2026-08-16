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
 * NODE POSITION
 * =========================================================
 */

function getPosition(
  node,
  positions
) {

  if (
    positions &&
    positions[node]
  ) {

    return positions[node];

  }


  return [
    0,
    0,
    0,
  ];

}


/*
 * =========================================================
 * GRAPH NODE
 * =========================================================
 */

function GraphNode({
  id,
  position,
  currentStep,
}) {

  const groupRef =
    useRef(null);


  const currentNode =
    currentStep?.currentNode;


  const comparing =
    currentStep?.comparing ||
    [];


  const visited =
    currentStep?.visited ||
    [];


  const isCurrent =
    currentNode === id;


  const isComparing =
    comparing.includes(
      id
    );


  const isVisited =
    visited.includes(
      id
    );


  /*
   * =======================================================
   * COLOR
   * =======================================================
   */

  let color =
    "#18181b";


  let scale =
    1;


  if (
    isVisited
  ) {

    color =
      "#2563eb";

  }


  if (
    isComparing
  ) {

    color =
      "#f59e0b";

    scale =
      1.1;

  }


  if (
    isCurrent
  ) {

    color =
      "#7c3aed";

    scale =
      1.2;

  }


  /*
   * =======================================================
   * ANIMATION
   * =======================================================
   */

  useEffect(() => {

    if (
      !groupRef.current
    ) {

      return;

    }


    gsap.to(
      groupRef.current.scale,
      {

        x:
          scale,

        y:
          scale,

        z:
          scale,

        duration:
          0.3,

        ease:
          "back.out(1.5)",

      }
    );

  }, [
    scale,
  ]);


  return (

    <group
      ref={
        groupRef
      }

      position={
        position
      }
    >

      {/* NODE */}

      <mesh>

        <sphereGeometry
          args={[
            0.55,
            32,
            32,
          ]}
        />

        <meshStandardMaterial

          color={
            color
          }

          roughness={
            0.25
          }

          metalness={
            0.4
          }

        />

      </mesh>


      {/* NODE LABEL */}

      <Text

        position={[
          0,
          0,
          0.58,
        ]}

        fontSize={
          0.28
        }

        color="white"

        anchorX="center"

        anchorY="middle"

      >

        {id}

      </Text>


      {/* CURRENT LABEL */}

      {isCurrent && (

        <Text

          position={[
            0,
            0.85,
            0,
          ]}

          fontSize={
            0.12
          }

          color="#c4b5fd"

          anchorX="center"

          anchorY="middle"

        >

          CURRENT

        </Text>

      )}

    </group>

  );

}


/*
 * =========================================================
 * GRAPH EDGES
 * =========================================================
 */

function GraphEdges({
  graph,
  positions,
  currentStep,
}) {

  const edges =
    useMemo(
      () => {

        const result =
          [];

        const seen =
          new Set();


        Object.entries(
          graph || {}
        ).forEach(
          ([
            node,
            neighbors,
          ]) => {

            neighbors.forEach(
              (neighbor) => {

                /*
                 * Graph is undirected.
                 *
                 * Prevent drawing:
                 *
                 * A -> B
                 * B -> A
                 *
                 * twice.
                 */

                const key =
                  [
                    node,
                    neighbor,
                  ]
                    .sort()
                    .join("-");


                if (
                  seen.has(
                    key
                  )
                ) {

                  return;

                }


                seen.add(
                  key
                );


                result.push({

                  from:
                    node,

                  to:
                    neighbor,

                });

              }
            );

          }
        );


        return result;

      },
      [
        graph,
      ]
    );


  return (

    <group>

      {edges.map(
        (
          edge,
          index
        ) => {

          const from =
            getPosition(
              edge.from,
              positions
            );


          const to =
            getPosition(
              edge.to,
              positions
            );


          const [
            x1,
            y1,
            z1,
          ] =
            from;


          const [
            x2,
            y2,
            z2,
          ] =
            to;


          const dx =
            x2 - x1;


          const dy =
            y2 - y1;


          const dz =
            z2 - z1;


          const length =
            Math.sqrt(
              dx * dx +
              dy * dy +
              dz * dz
            );


          const angle =
            Math.atan2(
              dy,
              dx
            );


          const edgeActive =
            currentStep?.comparing?.includes(
              edge.from
            ) &&
            currentStep?.comparing?.includes(
              edge.to
            );


          const edgeColor =
            edgeActive
              ? "#f59e0b"
              : "#3f3f46";


          return (

            <mesh

              key={
                `edge-${index}`
              }

              position={[
                (x1 + x2) / 2,
                (y1 + y2) / 2,
                (z1 + z2) / 2,
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
                  edgeActive
                    ? 0.09
                    : 0.045,
                  0.045,
                ]}
              />

              <meshStandardMaterial
                color={
                  edgeColor
                }
              />

            </mesh>

          );

        }
      )}

    </group>

  );

}


/*
 * =========================================================
 * CAMERA
 * =========================================================
 *
 * IMPORTANT:
 *
 * Camera is initialized ONLY once.
 *
 * Stepping through BFS/DFS does NOT reset
 * the user's zoom or rotation.
 * =========================================================
 */

function CameraController({
  positions,
}) {

  const {
    camera,
  } = useThree();


  const initialized =
    useRef(false);


  useEffect(() => {

    if (
      initialized.current
    ) {

      return;

    }


    camera.position.set(
      0,
      0,
      11
    );


    camera.lookAt(
      0,
      0,
      0
    );


    camera.updateProjectionMatrix();


    initialized.current =
      true;

  }, [
    positions,
    camera,
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

  const graph =
    currentStep?.graph ||
    {};


  const positions =
    currentStep?.positions ||
    {};


  const nodes =
    Object.keys(
      graph
    );


  const action =
    currentStep?.action ||
    "initialize";


  /*
   * =======================================================
   * TITLE
   * =======================================================
   */

  let title =
    "GRAPH";


  let subtitle =
    "GRAPH TRAVERSAL";


  if (
    action ===
    "initialize"
  ) {

    title =
      "INITIALIZE";

    subtitle =
      "PREPARE TRAVERSAL";

  }


  if (
    action ===
    "dequeue"
  ) {

    title =
      "DEQUEUE";

    subtitle =
      "REMOVE FROM QUEUE";

  }


  if (
    action ===
    "pop"
  ) {

    title =
      "POP";

    subtitle =
      "REMOVE FROM STACK";

  }


  if (
    action ===
    "visit"
  ) {

    title =
      "VISIT";

    subtitle =
      "NODE VISITED";

  }


  if (
    action ===
    "compare"
  ) {

    title =
      "EXPLORE";

    subtitle =
      "CHECK NEIGHBOR";

  }


  if (
    action ===
    "enqueue"
  ) {

    title =
      "ENQUEUE";

    subtitle =
      "ADD TO QUEUE";

  }


  if (
    action ===
    "push"
  ) {

    title =
      "PUSH";

    subtitle =
      "ADD TO STACK";

  }


  if (
    action ===
    "mark-visited"
  ) {

    title =
      "MARK VISITED";

    subtitle =
      "NODE DISCOVERED";

  }


  if (
    action ===
    "skip"
  ) {

    title =
      "SKIP";

    subtitle =
      "ALREADY VISITED";

  }


  if (
    action ===
    "complete"
  ) {

    title =
      "COMPLETE";

    subtitle =
      "TRAVERSAL FINISHED";

  }


  return (

    <>

      {/* LIGHTING */}

      <ambientLight
        intensity={
          1.5
        }
      />


      <directionalLight

        position={[
          5,
          7,
          6,
        ]}

        intensity={
          4
        }

      />


      <pointLight

        position={[
          -5,
          2,
          4,
        ]}

        intensity={
          2
        }

      />


      {/* CAMERA */}

      <CameraController
        positions={
          positions
        }
      />


      {/* TITLE */}

      <Text

        position={[
          0,
          4.5,
          0,
        ]}

        fontSize={
          0.32
        }

        color="#e4e4e7"

        anchorX="center"

        anchorY="middle"

      >

        {title}

      </Text>


      <Text

        position={[
          0,
          4.0,
          0,
        ]}

        fontSize={
          0.14
        }

        color="#71717a"

        anchorX="center"

        anchorY="middle"

      >

        {subtitle}

      </Text>


      {/* EDGES */}

      <GraphEdges

        graph={
          graph
        }

        positions={
          positions
        }

        currentStep={
          currentStep
        }

      />


      {/* NODES */}

      {nodes.map(
        (
          node
        ) => (

          <GraphNode

            key={
              `graph-node-${node}`
            }

            id={
              node
            }

            position={
              getPosition(
                node,
                positions
              )
            }

            currentStep={
              currentStep
            }

          />

        )
      )}


      {/* =================================================
          QUEUE
      ================================================== */}

      {currentStep?.queue &&
        currentStep.queue.length >
          0 && (

        <Text

          position={[
            -4.8,
            -4.0,
            0,
          ]}

          fontSize={
            0.16
          }

          color="#60a5fa"

          anchorX="left"

          anchorY="middle"

        >

          QUEUE: [
          {
            currentStep.queue.join(
              "  "
            )
          }
          ]

        </Text>

      )}


      {/* =================================================
          STACK
      ================================================== */}

      {currentStep?.stack &&
        currentStep.stack.length >
          0 && (

        <Text

          position={[
            1.5,
            -4.0,
            0,
          ]}

          fontSize={
            0.16
          }

          color="#c084fc"

          anchorX="left"

          anchorY="middle"

        >

          STACK: [
          {
            currentStep.stack.join(
              "  "
            )
          }
          ]

        </Text>

      )}


      {/* =================================================
          TRAVERSAL ORDER
      ================================================== */}

      <Text

        position={[
          0,
          -4.7,
          0,
        ]}

        fontSize={
          0.18
        }

        color="#a1a1aa"

        anchorX="center"

        anchorY="middle"

      >

        TRAVERSAL:{" "}

        {
          currentStep?.traversalOrder?.length
            ? currentStep.traversalOrder.join(
                " → "
              )
            : "—"
        }

      </Text>


      {/* =================================================
          LEGEND
      ================================================== */}

      <Text

        position={[
          -4.8,
          3.5,
          0,
        ]}

        fontSize={
          0.12
        }

        color="#7c3aed"

        anchorX="left"

        anchorY="middle"

      >

        PURPLE = CURRENT

      </Text>


      <Text

        position={[
          -4.8,
          3.15,
          0,
        ]}

        fontSize={
          0.12
        }

        color="#2563eb"

        anchorX="left"

        anchorY="middle"

      >

        BLUE = VISITED

      </Text>


      <Text

        position={[
          -4.8,
          2.8,
          0,
        ]}

        fontSize={
          0.12
        }

        color="#f59e0b"

        anchorX="left"

        anchorY="middle"

      >

        ORANGE = EXPLORING

      </Text>


      {/* CONTROLS */}

      <OrbitControls

        enablePan={
          false
        }

        enableDamping

        dampingFactor={
          0.08
        }

        minDistance={
          5
        }

        maxDistance={
          25
        }

      />

    </>

  );

}


/*
 * =========================================================
 * MAIN GRAPH SCENE
 * =========================================================
 */

export default function GraphScene({
  currentStep,
}) {

  return (

    <div className="h-full w-full">

      <Canvas

        camera={{
          position: [
            0,
            0,
            11,
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