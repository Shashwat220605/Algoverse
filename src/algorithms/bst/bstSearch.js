/*
 * =========================================================
 * BINARY SEARCH TREE SEARCH
 * =========================================================
 *
 * LEFT < ROOT < RIGHT
 *
 * Average: O(log n)
 * Worst:   O(n)
 * =========================================================
 */

export const bstSearchCode = [
  "if (root === null)",
  "    return false;",
  "",
  "if (value === root.value)",
  "    return true;",
  "",
  "if (value < root.value)",
  "    return search(root.left, value);",
  "",
  "return search(root.right, value);",
];


export const defaultBSTSearchArray = [
  50,
  30,
  70,
  20,
  40,
  60,
  80,
];


export const defaultBSTSearchTarget = 60;


/*
 * =========================================================
 * TRACE
 * =========================================================
 */

export function createBSTSearchTrace(
  inputArray,
  target
) {

  const steps = [];

  let stepId = 0;

  let nextId = 0;


  const createNode = (
    value
  ) => {

    return {

      id: nextId++,

      value,

      left: null,

      right: null,

    };

  };


  /*
   * Build BST
   */

  let root = null;


  function insert(
    node,
    value
  ) {

    if (
      node === null
    ) {

      return createNode(
        value
      );

    }


    if (
      value <
      node.value
    ) {

      node.left =
        insert(
          node.left,
          value
        );

    }

    else if (
      value >
      node.value
    ) {

      node.right =
        insert(
          node.right,
          value
        );

    }


    return node;

  }


  for (
    const value of inputArray
  ) {

    root =
      insert(
        root,
        value
      );

  }


  /*
   * Serialize
   */

  function serializeTree() {

    const result = [];


    function visit(
      node,
      parentId = null,
      side = null,
      depth = 0
    ) {

      if (
        node === null
      ) {

        return;

      }


      result.push({

        id: node.id,

        value: node.value,

        parentId,

        side,

        depth,

      });


      visit(
        node.left,
        node.id,
        "left",
        depth + 1
      );


      visit(
        node.right,
        node.id,
        "right",
        depth + 1
      );

    }


    visit(root);


    return result;

  }


  const addStep = ({
    action,
    codeLine,
    currentNode = null,
    comparing = [],
    path = [],
    found = false,
    explanation,
    detail,
    variables = {},
  }) => {

    steps.push({

      id:
        stepId++,

      action,

      codeLine,

      array: [
        ...inputArray,
      ],

      tree:
        serializeTree(),

      currentNode,

      comparing,

      path,

      found,

      inserted: [],

      visited: [],

      swapped: [],

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
   * SEARCH
   * =======================================================
   */

  let current =
    root;


  const path = [];


  while (
    current !== null
  ) {

    path.push(
      current.id
    );


    addStep({

      action:
        "compare",

      codeLine:
        4,

      currentNode:
        current.id,

      comparing: [
        current.id,
      ],

      path: [
        ...path,
      ],

      explanation:
        `Compare ${target} with ${current.value}.`,

      detail:
        target === current.value
          ? "The target matches the current node."
          : target <
            current.value
          ? `${target} is smaller, so search the left subtree.`
          : `${target} is larger, so search the right subtree.`,

      variables: {

        target,

        current:
          current.value,

      },

    });


    /*
     * FOUND
     */

    if (
      target ===
      current.value
    ) {

      addStep({

        action:
          "found",

        codeLine:
          5,

        currentNode:
          current.id,

        comparing: [
          current.id,
        ],

        path: [
          ...path,
        ],

        found:
          true,

        explanation:
          `Found ${target}!`,

        detail:
          `The target is located at the current node.`,

        variables: {

          target,

          found:
            true,

        },

      });


      addStep({

        action:
          "complete",

        codeLine:
          10,

        currentNode:
          current.id,

        found:
          true,

        path: [
          ...path,
        ],

        explanation:
          "BST search is complete.",

        detail:
          `Search path: ${path
            .map(
              (id) =>
                serializeTree().find(
                  (node) =>
                    node.id === id
                )?.value
            )
            .join(" → ")}`,

        variables: {

          phase:
            "complete",

          found:
            true,

        },

      });


      return steps;

    }


    /*
     * LEFT
     */

    if (
      target <
      current.value
    ) {

      addStep({

        action:
          "move-left",

        codeLine:
          8,

        currentNode:
          current.id,

        path: [
          ...path,
        ],

        explanation:
          `${target} < ${current.value}, move left.`,

        detail:
          "BST search eliminates the entire right subtree.",

        variables: {

          target,

        },

      });


      current =
        current.left;

    }


    /*
     * RIGHT
     */

    else {

      addStep({

        action:
          "move-right",

        codeLine:
          10,

        currentNode:
          current.id,

        path: [
          ...path,
        ],

        explanation:
          `${target} > ${current.value}, move right.`,

        detail:
          "BST search eliminates the entire left subtree.",

        variables: {

          target,

        },

      });


      current =
        current.right;

    }

  }


  /*
   * =======================================================
   * NOT FOUND
   * =======================================================
   */

  addStep({

    action:
      "not-found",

    codeLine:
      1,

    path: [
      ...path,
    ],

    found:
      false,

    explanation:
      `${target} was not found.`,

    detail:
      "The search reached an empty subtree.",

    variables: {

      target,

      found:
        false,

    },

  });


  addStep({

    action:
      "complete",

    codeLine:
      10,

    found:
      false,

    path: [
      ...path,
    ],

    explanation:
      "BST search is complete.",

    detail:
      `The value ${target} does not exist in the BST.`,

    variables: {

      phase:
        "complete",

      found:
        false,

    },

  });


  return steps;

}