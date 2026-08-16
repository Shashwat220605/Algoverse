/*
 * =========================================================
 * DEPTH FIRST SEARCH
 * =========================================================
 *
 * DFS explores as far as possible before backtracking.
 *
 * Uses:
 *   Stack
 *
 * Time:
 *   O(V + E)
 *
 * Space:
 *   O(V)
 * =========================================================
 */

export const dfsCode = [
  "stack = [start];",
  "visited = new Set();",
  "",
  "while (stack.length > 0) {",
  "    node = stack.pop();",
  "",
  "    if (visited.has(node))",
  "        continue;",
  "",
  "    visited.add(node);",
  "",
  "    for (neighbor of graph[node]) {",
  "        if (!visited.has(neighbor))",
  "            stack.push(neighbor);",
  "    }",
  "}",
];


/*
 * =========================================================
 * DEFAULT GRAPH
 * =========================================================
 */

export const defaultDFSGraph = {

  A: ["B", "C"],

  B: ["A", "D", "E"],

  C: ["A", "F"],

  D: ["B"],

  E: ["B", "G"],

  F: ["C"],

  G: ["E"],

};


export const defaultDFSStart = "A";


/*
 * =========================================================
 * GRAPH POSITIONS
 * =========================================================
 */

export const defaultDFSGraphPositions = {

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
 * CREATE DFS TRACE
 * =========================================================
 */

export function createDFSTrace(
  graph = defaultDFSGraph,
  start = defaultDFSStart
) {

  const steps = [];

  let stepId = 0;


  /*
   * Safe graph copy.
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
   * Check start.
   */

  if (
    !graphCopy[start]
  ) {

    steps.push({

      id:
        stepId++,

      action:
        "error",

      codeLine:
        1,

      graph:
        graphCopy,

      positions:
        defaultDFSGraphPositions,

      currentNode:
        null,

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

        phase:
          "error",

      },

    });


    return steps;

  }


  /*
   * =======================================================
   * STATE
   * =======================================================
   */

  const stack = [];

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

      id:
        stepId++,

      action,

      codeLine,

      graph:
        graphCopy,

      positions:
        defaultDFSGraphPositions,

      currentNode,

      comparing,

      visited: [
        ...visited,
      ],

      queue: [],

      stack: [
        ...stack,
      ],

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

  stack.push(
    start
  );


  addStep({

    action:
      "initialize",

    codeLine:
      1,

    currentNode:
      start,

    explanation:
      `Start DFS from ${start}.`,

    detail:
      "Push the starting node onto the stack.",

    variables: {

      start,

    },

  });


  /*
   * =======================================================
   * DFS
   * =======================================================
   */

  while (
    stack.length > 0
  ) {

    /*
     * Pop from stack.
     */

    const node =
      stack.pop();


    addStep({

      action:
        "pop",

      codeLine:
        5,

      currentNode:
        node,

      explanation:
        `Pop ${node} from the stack.`,

      detail:
        "DFS processes the most recently added node first.",

      variables: {

        node,

      },

    });


    /*
     * Already visited?
     */

    if (
      visited.has(
        node
      )
    ) {

      addStep({

        action:
          "skip",

        codeLine:
          8,

        currentNode:
          node,

        explanation:
          `Skip ${node}.`,

        detail:
          "This node has already been visited.",

        variables: {

          node,

        },

      });


      continue;

    }


    /*
     * Visit node.
     */

    visited.add(
      node
    );


    traversalOrder.push(
      node
    );


    addStep({

      action:
        "visit",

      codeLine:
        10,

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
     * Get neighbors.
     */

    const neighbors =
      graphCopy[node] || [];


    /*
     * Push neighbors in reverse order.
     *
     * This allows the first neighbor in the
     * adjacency list to be processed first.
     */

    for (
      let i =
        neighbors.length - 1;

      i >= 0;

      i--
    ) {

      const neighbor =
        neighbors[i];


      addStep({

        action:
          "compare",

        codeLine:
          13,

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
            ? `${neighbor} is already visited.`
            : `${neighbor} has not been visited yet.`,

        variables: {

          node,

          neighbor,

        },

      });


      /*
       * Only push unvisited nodes.
       */

      if (
        !visited.has(
          neighbor
        )
      ) {

        stack.push(
          neighbor
        );


        addStep({

          action:
            "push",

          codeLine:
            14,

          currentNode:
            neighbor,

          explanation:
            `Push ${neighbor} onto the stack.`,

          detail:
            `Stack: [${stack.join(", ")}]`,

          variables: {

            neighbor,

            stack:
              stack.join(", "),

          },

        });

      }

      else {

        addStep({

          action:
            "skip",

          codeLine:
            14,

          currentNode:
            node,

          comparing: [
            node,
            neighbor,
          ],

          explanation:
            `Do not push ${neighbor}.`,

          detail:
            "The neighbor has already been visited.",

          variables: {

            neighbor,

          },

        });

      }

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
      15,

    currentNode:
      traversalOrder[
        traversalOrder.length - 1
      ] || null,

    explanation:
      "DFS traversal is complete.",

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