/*
 * =========================================================
 * BINARY TREE INORDER TRAVERSAL
 * =========================================================
 *
 * INORDER:
 *
 * LEFT → ROOT → RIGHT
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
 * 2 → 5 → 7 → 10 → 12 → 15
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 * =========================================================
 */

export const binaryTreeInorderCode = [
  "inorder(node)",
  "if (node == nullptr)",
  "    return;",
  "",
  "inorder(node->left);",
  "visit(node);",
  "inorder(node->right);",
];


export const defaultBinaryTreeInorderArray = [
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


export function createBinaryTreeInorderTrace(
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


  function inorder(node) {

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
          "Inorder visits the entire left subtree before visiting the current node.",

      });


      inorder(
        node.left
      );

    }


    /*
     * VISIT ROOT
     */

    steps.push({

      id: stepId++,

      action: "highlight",

      codeLine: 5,

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

        traversal: "inorder",

      },

      explanation:
        `Visit node ${node.value}.`,

      detail:
        "The left subtree has been processed, so the current node is visited.",

    });


    visited.push(
      node.value
    );


    /*
     * GO RIGHT
     */

    if (node.right) {

      steps.push({

        id: stepId++,

        action: "move",

        codeLine: 6,

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
          "After visiting the current node, inorder explores the right subtree.",

      });


      inorder(
        node.right
      );

    }

  }


  inorder(root);


  steps.push({

    id: stepId++,

    action: "complete",

    codeLine: 5,

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
      "Inorder traversal is complete.",

    detail:
      `Traversal order: ${visited.join(
        " → "
      )}`,

  });


  return steps;
}