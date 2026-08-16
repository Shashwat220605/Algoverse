/*
 * =========================================================
 * BINARY TREE LEVEL ORDER TRAVERSAL
 * =========================================================
 *
 * LEVEL ORDER:
 *
 * Visit nodes level by level from left to right.
 *
 * Example:
 *
 *          10
 *         /  \
 *        5    15
 *       / \   /
 *      2   7 12
 *
 * Result:
 *
 * 10 → 5 → 15 → 2 → 7 → 12
 *
 * Uses a QUEUE.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * =========================================================
 */

export const binaryTreeLevelOrderCode = [
  "queue.push(root);",
  "",
  "while (!queue.empty()) {",
  "    Node* current = queue.front();",
  "    queue.pop();",
  "",
  "    visit(current);",
  "",
  "    if (current->left)",
  "        queue.push(current->left);",
  "",
  "    if (current->right)",
  "        queue.push(current->right);",
  "}",
];


export const defaultBinaryTreeLevelOrderArray = [
  10,
  5,
  15,
  2,
  7,
  12,
];


function buildTree(values) {

  if (
    !values ||
    values.length === 0
  ) {
    return null;
  }


  const nodes =
    values.map(
      (value, index) => ({
        value,
        index,
        left: null,
        right: null,
      })
    );


  nodes.forEach(
    (node, index) => {

      const leftIndex =
        2 * index + 1;

      const rightIndex =
        2 * index + 2;


      if (
        leftIndex <
        nodes.length
      ) {
        node.left =
          nodes[leftIndex];
      }


      if (
        rightIndex <
        nodes.length
      ) {
        node.right =
          nodes[rightIndex];
      }

    }
  );


  return nodes[0];
}


export function createBinaryTreeLevelOrderTrace(
  inputArray
) {

  const values = [
    ...inputArray,
  ];

  const steps = [];

  const visited = [];

  const queue = [];

  let stepId = 0;


  if (
    values.length === 0
  ) {

    steps.push({

      id: stepId++,

      action: "complete",

      codeLine: 0,

      array: [],

      visited: [],

      currentIndex: null,

      variables: {
        current: null,
        queue: [],
        phase: "empty",
      },

      explanation:
        "The tree is empty.",

      detail:
        "There is no root node to process.",

    });


    return steps;
  }


  const root =
    buildTree(values);


  /*
   * =======================================================
   * ADD ROOT TO QUEUE
   * =======================================================
   */

  queue.push(root);


  steps.push({

    id: stepId++,

    action: "enqueue",

    codeLine: 0,

    array: values,

    visited: [],

    currentIndex:
      root.index,

    variables: {

      current: null,

      queue: queue.map(
        (node) =>
          node.value
      ),

      phase: "enqueue",

    },

    explanation:
      `Add root ${root.value} to the queue.`,

    detail:
      "Level order traversal uses a queue to process nodes from left to right.",

  });


  /*
   * =======================================================
   * BFS / LEVEL ORDER
   * =======================================================
   */

  while (
    queue.length > 0
  ) {

    /*
     * -----------------------------------------------------
     * FRONT OF QUEUE
     * -----------------------------------------------------
     */

    const current =
      queue.shift();


    steps.push({

      id: stepId++,

      action: "dequeue",

      codeLine: 3,

      array: values,

      visited: [
        ...visited,
      ],

      currentIndex:
        current.index,

      variables: {

        current:
          current.value,

        queue: queue.map(
          (node) =>
            node.value
        ),

        phase: "dequeue",

      },

      explanation:
        `Take ${current.value} from the front of the queue.`,

      detail:
        "The first node in the queue is processed first.",

    });


    /*
     * -----------------------------------------------------
     * VISIT
     * -----------------------------------------------------
     */

    steps.push({

      id: stepId++,

      action: "highlight",

      codeLine: 6,

      array: values,

      visited: [
        ...visited,
      ],

      currentIndex:
        current.index,

      variables: {

        current:
          current.value,

        queue: queue.map(
          (node) =>
            node.value
        ),

        phase: "visit",

        traversal: "levelorder",

      },

      explanation:
        `Visit node ${current.value}.`,

      detail:
        "Level order visits nodes from left to right within each level.",

    });


    visited.push(
      current.value
    );


    /*
     * -----------------------------------------------------
     * ADD LEFT CHILD
     * -----------------------------------------------------
     */

    if (
      current.left
    ) {

      queue.push(
        current.left
      );


      steps.push({

        id: stepId++,

        action: "enqueue",

        codeLine: 9,

        array: values,

        visited: [
          ...visited,
        ],

        currentIndex:
          current.left.index,

        variables: {

          current:
            current.value,

          next:
            current.left.value,

          queue: queue.map(
            (node) =>
              node.value
          ),

          phase: "left",

        },

        explanation:
          `Add left child ${current.left.value} to the queue.`,

        detail:
          "The left child will be processed after the nodes already waiting in the queue.",

      });

    }


    /*
     * -----------------------------------------------------
     * ADD RIGHT CHILD
     * -----------------------------------------------------
     */

    if (
      current.right
    ) {

      queue.push(
        current.right
      );


      steps.push({

        id: stepId++,

        action: "enqueue",

        codeLine: 12,

        array: values,

        visited: [
          ...visited,
        ],

        currentIndex:
          current.right.index,

        variables: {

          current:
            current.value,

          next:
            current.right.value,

          queue: queue.map(
            (node) =>
              node.value
          ),

          phase: "right",

        },

        explanation:
          `Add right child ${current.right.value} to the queue.`,

        detail:
          "The right child is placed behind the nodes already waiting.",

      });

    }

  }


  /*
   * =======================================================
   * COMPLETE
   * =======================================================
   */

  steps.push({

    id: stepId++,

    action: "complete",

    codeLine: 13,

    array: values,

    visited: [
      ...visited,
    ],

    currentIndex: null,

    variables: {

      current: null,

      queue: [],

      result: [
        ...visited,
      ],

      phase: "complete",

    },

    explanation:
      "Level order traversal is complete.",

    detail:
      `Traversal order: ${visited.join(
        " → "
      )}`,

  });


  return steps;
}