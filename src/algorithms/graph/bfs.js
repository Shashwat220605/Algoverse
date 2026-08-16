/*
 * =========================================================
 * BREADTH FIRST SEARCH
 * =========================================================
 *
 * BFS explores a graph level by level.
 *
 * Uses:
 *   Queue
 *
 * Time:
 *   O(V + E)
 *
 * Space:
 *   O(V)
 * =========================================================
 */

export const bfsCode = [
  "queue = [start];",
  "visited.add(start);",
  "",
  "while (queue.length > 0) {",
  "    node = queue.shift();",
  "",
  "    for (neighbor of graph[node]) {",
  "        if (!visited.has(neighbor)) {",
  "            visited.add(neighbor);",
  "            queue.push(neighbor);",
  "        }",
  "    }",
  "}",
];


/*
 * =========================================================
 * DEFAULT GRAPH
 * =========================================================
 *
 *        A
 *       / \
 *      B   C
 *     / \   \
 *    D   E   F
 *         \
 *          G
 *
 * BFS from A:
 *
 * A → B → C → D → E → F → G
 * =========================================================
 */

export const defaultBFSGraph = {

  A: ["B", "C"],

  B: ["A", "D", "E"],

  C: ["A", "F"],

  D: ["B"],

  E: ["B", "G"],

  F: ["C"],

  G: ["E"],

};


export const defaultBFSStart = "A";


/*
 * =========================================================
 * GRAPH POSITIONS
 * =========================================================
 */

export const defaultGraphPositions = {

  A: [0, 3, 0],

  B: [-2.8, 1.3, 0],

  C: [2.8, 1.3, 0],

  D: [-4.2, -0.8, 0],

  E: [-1.4, -0.8, 0],

  F: [2.8, -0.8, 0],

  G: [-1.4, -2.8, 0],

};


/*
 * =========================================================
 * CREATE GRAPH TRACE
 * =========================================================
 */

export function createBFSTrace(
  graph = defaultBFSGraph,
  start = defaultBFSStart
) {

  const steps = [];

  let stepId = 0;


  /*
   * Make a safe copy.
   */

  const graphCopy = {};

  Object.keys(graph).forEach(
    (node) => {

      graphCopy[node] = [
        ...(graph[node] || []),
      ];

    }
  );


  /*
   * Make sure start exists.
   */

  if (
    !graphCopy[start]
  ) {

    steps.push({

      id: stepId++,

      action: "error",

      codeLine: 1,

      graph: graphCopy,

      positions:
        defaultGraphPositions,

      currentNode: null,

      visited: [],

      queue: [],

      stack: [],

      traversalOrder: [],

      explanation:
        `Start node ${start} does not exist.`,

      detail:
        "Choose a node that exists in the graph.",

      variables: {

        start,

        phase: "error",

      },

    });


    return steps;

  }


  /*
   * =======================================================
   * STATE
   * =======================================================
   */

  const queue = [];

  const visited = new Set();

  const traversalOrder = [];


  /*
   * =======================================================
   * HELPER
   * =======================================================
   */

  const addStep = ({
    action,
    codeLine,
    currentNode = null,
    comparing = [],
    explanation,
    detail,
    variables = {},
  }) => {

    steps.push({

      id: stepId++,

      action,

      codeLine,

      graph: graphCopy,

      positions:
        defaultGraphPositions,

      currentNode,

      comparing,

      visited: [
        ...visited,
      ],

      queue: [
        ...queue,
      ],

      stack: [],

      traversalOrder: [
        ...traversalOrder,
      ],

      inserted: [],

      deleted: [],

      swapped: [],

      path: [],

      variables: {

        ...variables,

        phase:
          variables.phase ||
          action,

      },

      explanation,

      detail,

    });

  };


  /*
   * =======================================================
   * INITIALIZE
   * =======================================================
   */

  queue.push(start);

  visited.add(start);


  addStep({

    action:
      "initialize",

    codeLine:
      1,

    currentNode:
      start,

    explanation:
      `Start BFS from ${start}.`,

    detail:
      "Add the starting node to the queue and mark it visited.",

    variables: {

      start,

    },

  });


  /*
   * =======================================================
   * BFS
   * =======================================================
   */

  while (
    queue.length > 0
  ) {

    /*
     * Remove front.
     */

    const node =
      queue.shift();


    addStep({

      action:
        "dequeue",

      codeLine:
        5,

      currentNode:
        node,

      explanation:
        `Remove ${node} from the front of the queue.`,

      detail:
        "BFS processes nodes in the same order they entered the queue.",

      variables: {

        node,

      },

    });


    /*
     * Add to traversal order.
     */

    traversalOrder.push(
      node
    );


    addStep({

      action:
        "visit",

      codeLine:
        5,

      currentNode:
        node,

      explanation:
        `Visit ${node}.`,

      detail:
        `Traversal order: ${traversalOrder.join(" → ")}`,

      variables: {

        node,

        traversalOrder:
          traversalOrder.join(" → "),

      },

    });


    /*
     * Explore neighbors.
     */

    const neighbors =
      graphCopy[node] || [];


    for (
      const neighbor of neighbors
    ) {

      /*
       * Check neighbor.
       */

      addStep({

        action:
          "compare",

        codeLine:
          8,

        currentNode:
          node,

        comparing: [
          node,
          neighbor,
        ],

        explanation:
          `Check neighbor ${neighbor} of ${node}.`,

        detail:
          visited.has(neighbor)
            ? `${neighbor} has already been visited.`
            : `${neighbor} has not been visited yet.`,

        variables: {

          node,

          neighbor,

        },

      });


      /*
       * Already visited.
       */

      if (
        visited.has(
          neighbor
        )
      ) {

        addStep({

          action:
            "skip",

          codeLine:
            8,

          currentNode:
            node,

          comparing: [
            node,
            neighbor,
          ],

          explanation:
            `Skip ${neighbor}.`,

          detail:
            "The node is already marked as visited, so BFS does not enqueue it again.",

          variables: {

            neighbor,

          },

        });


        continue;

      }


      /*
       * Mark visited.
       */

      visited.add(
        neighbor
      );


      addStep({

        action:
          "mark-visited",

        codeLine:
          9,

        currentNode:
          neighbor,

        comparing: [
          node,
          neighbor,
        ],

        explanation:
          `Mark ${neighbor} as visited.`,

        detail:
          "Marking the node now prevents it from being added to the queue multiple times.",

        variables: {

          neighbor,

        },

      });


      /*
       * Enqueue.
       */

      queue.push(
        neighbor
      );


      addStep({

        action:
          "enqueue",

        codeLine:
          10,

        currentNode:
          neighbor,

        explanation:
          `Add ${neighbor} to the queue.`,

        detail:
          `Queue: [${queue.join(", ")}]`,

        variables: {

          neighbor,

          queue:
            queue.join(", "),

        },

      });

    }

  }


  /*
   * =======================================================
   * COMPLETE
   * =======================================================
   */

  addStep({

    action:
      "complete",

    codeLine:
      13,

    currentNode:
      traversalOrder[
        traversalOrder.length - 1
      ] || null,

    explanation:
      "BFS traversal is complete.",

    detail:
      `Traversal order: ${traversalOrder.join(" → ")}`,

    variables: {

      phase:
        "complete",

      traversalOrder:
        traversalOrder.join(" → "),

    },

  });


  return steps;

}