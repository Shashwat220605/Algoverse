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
=========================================================
POSITION HELPERS
=========================================================
*/

function getTreeNodePosition(index) {
  const level = Math.floor(
    Math.log2(index + 1)
  );

  const firstIndex = Math.pow(
    2,
    level
  );

  const positionInLevel =
    index - firstIndex;

  const nodesAtLevel =
    Math.pow(2, level);

  const spacing = Math.max(
    1.8,
    7 / nodesAtLevel
  );

  const x =
    (
      positionInLevel -
      (nodesAtLevel - 1) / 2
    ) * spacing;

  const y = -level * 1.7;

  return [x, y, 0];
}


/*
=========================================================
TREE NODE
=========================================================
*/

function TreeNode({
  value,
  index,
  currentStep,
}) {
  const groupRef = useRef(null);

  const {
    visited = [],
    currentIndex,
    variables = {},
  } = currentStep || {};

  const {
    phase,
  } = variables;

  const isCurrent =
    currentIndex === index;

  const isVisited =
    visited.includes(value);

  const [
    x,
    y,
    z,
  ] = getTreeNodePosition(index);

  let color = "#18181c";
  let scale = 1;

  if (isVisited) {
    color = "#16a34a";
  }

  if (isCurrent) {
    color = "#7c3aed";
    scale = 1.18;
  }

  if (
    phase === "enqueue" ||
    phase === "dequeue"
  ) {
    if (isCurrent) {
      color = "#f59e0b";
    }
  }

  useEffect(() => {
    if (!groupRef.current) {
      return;
    }

    gsap.to(
      groupRef.current.position,
      {
        x,
        y,
        z,
        duration: 0.55,
        ease: "power3.out",
      }
    );

    gsap.to(
      groupRef.current.scale,
      {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.35,
        ease: "back.out(1.4)",
      }
    );
  }, [
    x,
    y,
    z,
    scale,
  ]);

  return (
    <group
      ref={groupRef}
      position={[
        x,
        y,
        z,
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
          roughness={0.25}
          metalness={0.5}
        />
      </mesh>

      <Text
        position={[
          0,
          0,
          0.5,
        ]}
        fontSize={0.27}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {value}
      </Text>

      {isCurrent && (
        <Text
          position={[
            0,
            0.78,
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

      {isVisited && !isCurrent && (
        <Text
          position={[
            0,
            0.72,
            0,
          ]}
          fontSize={0.11}
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
=========================================================
TREE EDGES
=========================================================
*/

function TreeEdges({
  array,
}) {
  const edges = useMemo(() => {
    const result = [];

    array.forEach(
      (_, index) => {
        const left =
          2 * index + 1;

        const right =
          2 * index + 2;

        if (
          left < array.length
        ) {
          result.push({
            parent: index,
            child: left,
          });
        }

        if (
          right < array.length
        ) {
          result.push({
            parent: index,
            child: right,
          });
        }
      }
    );

    return result;
  }, [array]);

  return (
    <group>
      {edges.map(
        (
          edge,
          index
        ) => {
          const [
            x1,
            y1,
            z1,
          ] = getTreeNodePosition(
            edge.parent
          );

          const [
            x2,
            y2,
            z2,
          ] = getTreeNodePosition(
            edge.child
          );

          const dx =
            x2 - x1;

          const dy =
            y2 - y1;

          const length =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          const angle =
            Math.atan2(
              dy,
              dx
            );

          return (
            <mesh
              key={`edge-${index}`}
              position={[
                (x1 + x2) / 2,
                (y1 + y2) / 2,
                z1,
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

              <meshStandardMaterial
                color="#3f3f46"
              />
            </mesh>
          );
        }
      )}
    </group>
  );
}


/*
=========================================================
AUTO FIT CAMERA
=========================================================
*/

function CameraController({
  arrayLength,
  center,
  bounds,
}) {
  const {
    camera,
    size,
  } = useThree();

  useEffect(() => {
    if (!arrayLength) {
      return;
    }

    const width =
      Math.max(
        bounds.width,
        2
      );

    const height =
      Math.max(
        bounds.height,
        2
      );

    const aspect =
      size.width /
      Math.max(
        size.height,
        1
      );

    const verticalFov =
      (camera.fov * Math.PI) /
      180;

    const horizontalFov =
      2 *
      Math.atan(
        Math.tan(
          verticalFov / 2
        ) * aspect
      );

    const verticalDistance =
      (height / 2) /
      Math.tan(
        verticalFov / 2
      );

    const horizontalDistance =
      (width / 2) /
      Math.tan(
        horizontalFov / 2
      );

    const distance =
      Math.max(
        verticalDistance,
        horizontalDistance
      ) * 1.25;

    camera.position.set(
      center.x,
      center.y,
      distance
    );

    camera.lookAt(
      center.x,
      center.y,
      0
    );

    camera.updateProjectionMatrix();
  }, [
    arrayLength,
    center.x,
    center.y,
    bounds.width,
    bounds.height,
    camera,
    size.width,
    size.height,
  ]);

  return null;
}


/*
=========================================================
SCENE CONTENT
=========================================================
*/

function SceneContent({
  currentStep,
}) {
  const array =
    currentStep?.array || [];

  const {
    variables = {},
  } = currentStep || {};

  const {
    phase,
    result,
    traversal,
    queue = [],
  } = variables;

  let title =
    "BINARY TREE";

  let subtitle =
    "TREE TRAVERSAL";

  if (
    traversal === "preorder"
  ) {
    subtitle =
      "PREORDER: ROOT → LEFT → RIGHT";
  }

  if (
    traversal === "inorder"
  ) {
    subtitle =
      "INORDER: LEFT → ROOT → RIGHT";
  }

  if (
    traversal === "postorder"
  ) {
    subtitle =
      "POSTORDER: LEFT → RIGHT → ROOT";
  }

  if (
    traversal === "levelorder"
  ) {
    subtitle =
      "LEVEL ORDER: LEFT → RIGHT";
  }

  if (phase === "visit") {
    title = "VISIT NODE";
  }

  if (phase === "left") {
    title = "GO LEFT";
  }

  if (phase === "right") {
    title = "GO RIGHT";
  }

  if (phase === "enqueue") {
    title = "ENQUEUE NODE";
  }

  if (phase === "dequeue") {
    title = "DEQUEUE NODE";
  }

  if (phase === "complete") {
    title =
      "TRAVERSAL COMPLETE";

    subtitle = result
      ? result.join(" → ")
      : subtitle;
  }

  const levels = Math.max(
    1,
    Math.ceil(
      Math.log2(
        array.length + 1
      )
    )
  );

  const deepestLevel =
    levels - 1;

  const nodesAtDeepest =
    Math.pow(
      2,
      deepestLevel
    );

  const spacing = Math.max(
    1.8,
    7 / nodesAtDeepest
  );

  const width =
    Math.max(
      0,
      (nodesAtDeepest - 1) *
        spacing
    ) + 1;

  const height =
    deepestLevel * 1.7 + 1;

  const center = {
    x: 0,
    y: -(deepestLevel * 1.7) / 2,
  };

  return (
    <>
      <ambientLight
        intensity={1.5}
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
          2,
          4,
        ]}
        intensity={2}
      />

      <CameraController
        arrayLength={
          array.length
        }
        center={center}
        bounds={{
          width,
          height,
        }}
      />

      <Text
        position={[
          0,
          3.1,
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
          2.6,
          0,
        ]}
        fontSize={0.14}
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        {subtitle}
      </Text>

      <TreeEdges
        array={array}
      />

      {array.map(
        (
          value,
          index
        ) => (
          <TreeNode
            key={`node-${index}-${value}`}
            value={value}
            index={index}
            currentStep={
              currentStep
            }
          />
        )
      )}

      {traversal ===
        "levelorder" &&
        queue.length > 0 && (
          <Text
            position={[
              0,
              -3.15,
              0,
            ]}
            fontSize={0.14}
            color="#f59e0b"
            anchorX="center"
            anchorY="middle"
          >
            QUEUE: [
            {queue.join(", ")}
            ]
          </Text>
        )}

      <Text
        position={[
          -4.5,
          -3.2,
          0,
        ]}
        fontSize={0.12}
        color="#71717a"
        anchorX="left"
        anchorY="middle"
      >
        PURPLE = CURRENT
      </Text>

      <Text
        position={[
          -4.5,
          -3.5,
          0,
        ]}
        fontSize={0.12}
        color="#4ade80"
        anchorX="left"
        anchorY="middle"
      >
        GREEN = VISITED
      </Text>

      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={50}
        enableDamping
        dampingFactor={0.08}
        target={[
          center.x,
          center.y,
          0,
        ]}
      />
    </>
  );
}


/*
=========================================================
MAIN COMPONENT
=========================================================
*/

export default function BinaryTreeScene({
  currentStep,
}) {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [
            0,
            0,
            15,
          ],
          fov: 50,
          near: 0.1,
          far: 1000,
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