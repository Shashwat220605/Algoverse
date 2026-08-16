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
NODE POSITION
=========================================================
*/

function getNodePosition(
  node,
  tree
) {
  const depth =
    node.depth || 0;

  const nodesAtDepth =
    tree.filter(
      (item) =>
        item.depth === depth
    );

  const indexAtDepth =
    nodesAtDepth.findIndex(
      (item) =>
        item.id === node.id
    );

  const spacing =
    Math.max(
      1.8,
      8 /
        Math.max(
          nodesAtDepth.length,
          1
        )
    );

  return [
    (
      indexAtDepth -
      (nodesAtDepth.length - 1) / 2
    ) * spacing,

    -depth * 1.8,

    0,
  ];
}


/*
=========================================================
BST NODE
=========================================================
*/

function BSTNode({
  node,
  tree,
  currentStep,
}) {
  const groupRef =
    useRef(null);

  const currentIndex =
    currentStep?.currentNode;

  const comparing =
    currentStep?.comparing || [];

  const inserted =
    currentStep?.inserted || [];

  const deleted =
    currentStep?.deleted || [];

  const path =
    currentStep?.path || [];

  const isCurrent =
    currentIndex === node.id;

  const isComparing =
    comparing.includes(
      node.id
    );

  const isInserted =
    inserted.includes(
      node.id
    );

  const isDeleted =
    deleted.includes(
      node.id
    );

  const isPath =
    path.includes(
      node.id
    );

  const [
    x,
    y,
    z,
  ] = getNodePosition(
    node,
    tree
  );

  let color =
    "#18181b";

  let scale = 1;

  if (isPath) {
    color = "#312e81";
  }

  if (isComparing) {
    color = "#f59e0b";
  }

  if (isInserted) {
    color = "#22c55e";
    scale = 1.18;
  }

  if (isDeleted) {
    color = "#ef4444";
    scale = 1.18;
  }

  if (isCurrent) {
    color = "#7c3aed";
    scale = 1.18;
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
        duration: 0.5,
        ease: "power3.out",
      }
    );

    gsap.to(
      groupRef.current.scale,
      {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.3,
        ease: "back.out(1.5)",
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
            0.5,
            32,
            32,
          ]}
        />

        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.45}
        />
      </mesh>

      <Text
        position={[
          0,
          0,
          0.52,
        ]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.value}
      </Text>

      <Text
        position={[
          0,
          -0.72,
          0,
        ]}
        fontSize={0.1}
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        {node.id}
      </Text>

      {isCurrent && (
        <Text
          position={[
            0,
            0.78,
            0,
          ]}
          fontSize={0.11}
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
=========================================================
BST EDGES
=========================================================
*/

function BSTEdges({
  tree,
}) {
  const edges =
    useMemo(() => {
      const result = [];

      tree.forEach(
        (node) => {
          if (
            node.parentId === null
          ) {
            return;
          }

          const parent =
            tree.find(
              (item) =>
                item.id ===
                node.parentId
            );

          if (!parent) {
            return;
          }

          result.push({
            parent,
            child: node,
          });
        }
      );

      return result;
    }, [tree]);

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
          ] =
            getNodePosition(
              edge.parent,
              tree
            );

          const [
            x2,
            y2,
            z2,
          ] =
            getNodePosition(
              edge.child,
              tree
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
              key={`bst-edge-${index}`}
              position={[
                (x1 + x2) / 2,
                (y1 + y2) / 2,
                -0.08,
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
  tree,
  center,
  bounds,
}) {
  const {
    camera,
    size,
  } = useThree();

  useEffect(() => {
    if (
      !tree ||
      tree.length === 0
    ) {
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
    tree,
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
  const tree =
    currentStep?.tree || [];

  const variables =
    currentStep?.variables || {};

  let title =
    "BINARY SEARCH TREE";

  let subtitle =
    "LEFT < ROOT < RIGHT";

  switch (
    currentStep?.action
  ) {
    case "compare":
      title = "COMPARE";
      subtitle =
        "FOLLOW THE BST RULE";
      break;

    case "move-left":
      title = "MOVE LEFT";
      subtitle =
        "TARGET IS SMALLER";
      break;

    case "move-right":
      title = "MOVE RIGHT";
      subtitle =
        "TARGET IS LARGER";
      break;

    case "insert":
      title = "INSERT";
      subtitle =
        "NEW NODE ADDED";
      break;

    case "found":
      title = "FOUND";
      subtitle =
        "TARGET LOCATED";
      break;

    case "not-found":
      title = "NOT FOUND";
      subtitle =
        "EMPTY SUBTREE REACHED";
      break;

    case "duplicate":
      title = "DUPLICATE";
      subtitle =
        "VALUE ALREADY EXISTS";
      break;

    case "leaf":
      title = "LEAF NODE";
      subtitle =
        "CASE 1: NO CHILDREN";
      break;

    case "one-child":
      title = "ONE CHILD";
      subtitle =
        "CASE 2: REPLACE NODE";
      break;

    case "two-children":
      title = "TWO CHILDREN";
      subtitle =
        "CASE 3: FIND SUCCESSOR";
      break;

    case "find-successor":
      title = "FIND SUCCESSOR";
      subtitle =
        "SMALLEST IN RIGHT SUBTREE";
      break;

    case "successor":
      title = "SUCCESSOR";
      subtitle =
        "USE INORDER SUCCESSOR";
      break;

    case "replace":
      title = "REPLACE";
      subtitle =
        "COPY SUCCESSOR VALUE";
      break;

    case "delete":
    case "delete-successor":
      title = "DELETE";
      subtitle =
        "RESTORE BST STRUCTURE";
      break;

    case "complete":
      title = "COMPLETE";
      subtitle =
        "BST PROPERTY PRESERVED";
      break;

    default:
      break;
  }

  const maxDepth =
    tree.reduce(
      (
        max,
        node
      ) =>
        Math.max(
          max,
          node.depth || 0
        ),
      0
    );

  const maxWidth =
    tree.reduce(
      (
        max,
        node
      ) => {
        const count =
          tree.filter(
            (item) =>
              item.depth ===
              node.depth
          ).length;

        return Math.max(
          max,
          count
        );
      },
      1
    );

  const spacing =
    Math.max(
      1.8,
      8 /
        Math.max(
          maxWidth,
          1
        )
    );

  const width =
    Math.max(
      1,
      (maxWidth - 1) *
        spacing
    ) + 1.2;

  const height =
    maxDepth * 1.8 + 1.2;

  const center = {
    x: 0,
    y: -(maxDepth * 1.8) / 2,
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
        tree={tree}
        center={center}
        bounds={{
          width,
          height,
        }}
      />

      <Text
        position={[
          0,
          3.2,
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
          2.7,
          0,
        ]}
        fontSize={0.14}
        color="#71717a"
        anchorX="center"
        anchorY="middle"
      >
        {subtitle}
      </Text>

      <BSTEdges
        tree={tree}
      />

      {tree.map(
        (node) => (
          <BSTNode
            key={`bst-node-${node.id}`}
            node={node}
            tree={tree}
            currentStep={
              currentStep
            }
          />
        )
      )}

      {variables.target !==
        undefined && (
        <Text
          position={[
            0,
            -3.2,
            0,
          ]}
          fontSize={0.14}
          color="#a1a1aa"
          anchorX="center"
          anchorY="middle"
        >
          TARGET: {variables.target}
        </Text>
      )}

      <Text
        position={[
          -4.5,
          -3.6,
          0,
        ]}
        fontSize={0.11}
        color="#7c3aed"
        anchorX="left"
        anchorY="middle"
      >
        PURPLE = CURRENT
      </Text>

      <Text
        position={[
          -4.5,
          -3.9,
          0,
        ]}
        fontSize={0.11}
        color="#f59e0b"
        anchorX="left"
        anchorY="middle"
      >
        ORANGE = COMPARING
      </Text>

      <Text
        position={[
          -4.5,
          -4.2,
          0,
        ]}
        fontSize={0.11}
        color="#22c55e"
        anchorX="left"
        anchorY="middle"
      >
        GREEN = INSERTED
      </Text>

      <Text
        position={[
          -4.5,
          -4.5,
          0,
        ]}
        fontSize={0.11}
        color="#ef4444"
        anchorX="left"
        anchorY="middle"
      >
        RED = DELETED
      </Text>

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={3}
        maxDistance={50}
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

export default function BSTScene({
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