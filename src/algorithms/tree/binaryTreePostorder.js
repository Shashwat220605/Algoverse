/*
 * =========================================================
 * BINARY TREE POSTORDER TRAVERSAL
 * =========================================================
 *
 * POSTORDER:
 *
 * LEFT → RIGHT → ROOT
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
 * 2 → 7 → 5 → 12 → 15 → 10
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 * =========================================================
 */

export const binaryTreePostorderCode = [
  "postorder(node)",
  "if (node == nullptr)",
  "    return;",
  "",
  "postorder(node->left);",
  "postorder(node->right);",
  "visit(node);",
];


export const defaultBinaryTreePostorderArray = [
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


export function createBinaryTreePostorderTrace(
  inputArray
) {

  const values = [
    ...inputArray,
  ];

  const steps = [];

  const visited = [];

  let stepId = 0;


  if (
    values.length === 0
  ) {

    steps.push({

      id: stepId++,

      action: "complete",

      codeLine: 1,

      array: [],

      visited: [],

      currentIndex: null,

      variables: {
        current: null,
        phase: "empty",
      },

      explanation:
        "The tree is empty.",

      detail:
        "There is no node to traverse.",

    });


    return steps;
  }


  const root =
    buildTree(values);


  function postorder(node) {

    if (!node) {
      return;
    }


    /*
     * GO LEFT
     */

    if (node.left) {

      steps.push({

        id: stepId++,

        action: "move",

        codeLine: 4,

        array: values,

        visited: [
          ...visited,
        ],

        currentIndex:
          node.left.index,

        variables: {

          current:
            node.value,

          next:
            node.left.value,

          phase: "left",

        },

        explanation:
          `Move from ${node.value} to its left child ${node.left.value}.`,

        detail:
          "Postorder processes the left subtree first.",

      });


      postorder(
        node.left
      );

    }


    /*
     * GO RIGHT
     */

    if (node.right) {

      steps.push({

        id: stepId++,

        action: "move",

        codeLine: 5,

        array: values,

        visited: [
          ...visited,
        ],

        currentIndex:
          node.right.index,

        variables: {

          current:
            node.value,

          next:
            node.right.value,

          phase: "right",

        },

        explanation:
          `Move from ${node.value} to its right child ${node.right.value}.`,

        detail:
          "After completing the left subtree, postorder processes the right subtree.",

      });


      postorder(
        node.right
      );

    }


    /*
     * VISIT ROOT
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
        node.index,

      variables: {

        current:
          node.value,

        phase: "visit",

        traversal: "postorder",

      },

      explanation:
        `Visit node ${node.value}.`,

      detail:
        "Both child subtrees have been processed, so the current node is visited.",

    });


    visited.push(
      node.value
    );

  }


  postorder(root);


  steps.push({

    id: stepId++,

    action: "complete",

    codeLine: 6,

    array: values,

    visited: [
      ...visited,
    ],

    currentIndex: null,

    variables: {

      current: null,

      result: [
        ...visited,
      ],

      phase: "complete",

    },

    explanation:
      "Postorder traversal is complete.",

    detail:
      `Traversal order: ${visited.join(
        " → "
      )}`,

  });


  return steps;
}