/*
 * =========================================================
 * BINARY TREE PREORDER TRAVERSAL
 * =========================================================
 *
 * PREORDER:
 *
 * ROOT → LEFT → RIGHT
 *
 * Example:
 *
 *          10
 *         /  \
 *        5    15
 *       / \
 *      2   7
 *
 * Result:
 *
 * 10 → 5 → 2 → 7 → 15
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 * =========================================================
 */


export const binaryTreePreorderCode = [
  "preorder(node)",
  "if (node == nullptr)",
  "    return;",
  "",
  "visit(node);",
  "preorder(node->left);",
  "preorder(node->right);",
];


/*
 * =========================================================
 * DEFAULT TREE
 * =========================================================
 *
 * Array representation:
 *
 *           10
 *         /    \
 *        5      15
 *       / \    /
 *      2   7  12
 *
 * =========================================================
 */

export const defaultBinaryTreeArray = [
  10,
  5,
  15,
  2,
  7,
  12,
];


/*
 * =========================================================
 * TREE NODE
 * =========================================================
 */

function createNode(
  value,
  index
) {

  return {
    value,
    index,
    left: null,
    right: null,
  };

}


/*
 * =========================================================
 * BUILD TREE
 * =========================================================
 *
 * Uses array representation:
 *
 * left  = 2 * index + 1
 * right = 2 * index + 2
 *
 * =========================================================
 */

export function buildBinaryTree(
  values
) {

  if (
    !values ||
    values.length === 0
  ) {

    return null;

  }


  const nodes =
    values.map(
      (value, index) =>
        createNode(
          value,
          index
        )
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


/*
 * =========================================================
 * PREORDER TRACE
 * =========================================================
 */

export function createBinaryTreePreorderTrace(
  inputArray
) {

  const values = [
    ...inputArray,
  ];


  const steps = [];

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
        "There is no root node to visit.",

    });


    return steps;

  }


  const root =
    buildBinaryTree(
      values
    );


  const visited = [];


  /*
   * -------------------------------------------------------
   * RECURSIVE PREORDER
   * -------------------------------------------------------
   */

  function preorder(
    node
  ) {

    if (!node) {

      return;

    }


    /*
     * VISIT ROOT
     */

    steps.push({

      id: stepId++,

      action: "highlight",

      codeLine: 4,

      array: values,

      visited: [
        ...visited,
      ],

      currentIndex:
        node.index,

      variables: {

        current:
          node.value,

        phase:
          "visit",

        traversal:"preorder"

      },

      explanation:
        `Visit node ${node.value}.`,

      detail:
        "Preorder visits the current node before its left and right children.",

    });


    visited.push(
      node.value
    );


    /*
     * LEFT SUBTREE
     */

    if (node.left) {

      steps.push({

        id: stepId++,

        action: "move",

        codeLine: 5,

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

          phase:
            "left",

        },

        explanation:
          `Move from ${node.value} to its left child ${node.left.value}.`,

        detail:
          "Preorder explores the entire left subtree before moving to the right subtree.",

      });


      preorder(
        node.left
      );

    }


    /*
     * RIGHT SUBTREE
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

          phase:
            "right",

        },

        explanation:
          `Move from ${node.value} to its right child ${node.right.value}.`,

        detail:
          "After the left subtree is completed, preorder explores the right subtree.",

      });


      preorder(
        node.right
      );

    }

  }


  preorder(
    root
  );


  /*
   * -------------------------------------------------------
   * COMPLETE
   * -------------------------------------------------------
   */

  steps.push({

    id: stepId++,

    action: "complete",

    codeLine: 4,

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

      phase:
        "complete",

    },

    explanation:
      "Preorder traversal is complete.",

    detail:
      `Traversal order: ${visited.join(
        " → "
      )}`,

  });


  return steps;

}