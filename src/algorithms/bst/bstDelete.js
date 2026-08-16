/*
 * =========================================================
 * BINARY SEARCH TREE DELETE
 * =========================================================
 *
 * CASE 1:
 * Leaf node
 *
 * CASE 2:
 * One child
 *
 * CASE 3:
 * Two children
 *
 * For two children:
 * Replace with inorder successor.
 *
 * Average: O(log n)
 * Worst:   O(n)
 * =========================================================
 */

export const bstDeleteCode = [
  "if (root === null)",
  "    return root;",
  "",
  "if (value < root.value)",
  "    root.left = delete(root.left, value);",
  "",
  "else if (value > root.value)",
  "    root.right = delete(root.right, value);",
  "",
  "else {",
  "    if (root.left === null)",
  "        return root.right;",
  "",
  "    if (root.right === null)",
  "        return root.left;",
  "",
  "    successor = minValue(root.right);",
  "    root.value = successor;",
  "    root.right = delete(root.right, successor);",
  "}",
  "",
  "return root;",
];


export const defaultBSTDeleteArray = [
  50,
  30,
  70,
  20,
  40,
  60,
  80,
];


export const defaultBSTDeleteValue = 70;


/*
 * =========================================================
 * TRACE
 * =========================================================
 */

export function createBSTDeleteTrace(
  inputArray,
  target
) {

  const steps = [];

  let stepId = 0;

  let nextId = 0;


  /*
   * Create node
   */

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


  function insertInitial(
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
        insertInitial(
          node.left,
          value
        );

    }

    else if (
      value >
      node.value
    ) {

      node.right =
        insertInitial(
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
      insertInitial(
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

        id:
          node.id,

        value:
          node.value,

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
    deleted = [],
    replacement = null,
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

      deleted,

      replacement,

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
   * EMPTY TREE
   * =======================================================
   */

  if (
    root === null
  ) {

    addStep({

      action:
        "not-found",

      codeLine:
        1,

      explanation:
        "The tree is empty.",

      detail:
        "There is nothing to delete.",

      variables: {

        target,

      },

    });


    return steps;

  }


  /*
   * =======================================================
   * SEARCH FOR NODE
   * =======================================================
   */

  let current =
    root;


  let parent =
    null;


  const path = [];


  while (
    current !== null &&
    current.value !== target
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
        target <
        current.value
          ? `${target} is smaller, move left.`
          : `${target} is larger, move right.`,

      variables: {

        target,

        current:
          current.value,

      },

    });


    parent =
      current;


    if (
      target <
      current.value
    ) {

      current =
        current.left;

    }

    else {

      current =
        current.right;

    }

  }


  /*
   * Not found
   */

  if (
    current === null
  ) {

    addStep({

      action:
        "not-found",

      codeLine:
        1,

      path: [
        ...path,
      ],

      explanation:
        `${target} was not found.`,

      detail:
        "The search reached an empty subtree.",

      variables: {

        target,

      },

    });


    addStep({

      action:
        "complete",

      codeLine:
        22,

      explanation:
        "BST deletion is complete.",

      detail:
        "No node was removed.",

      variables: {

        phase:
          "complete",

      },

    });


    return steps;

  }


  path.push(
    current.id
  );


  /*
   * Found
   */

  addStep({

    action:
      "found",

    codeLine:
      10,

    currentNode:
      current.id,

    comparing: [
      current.id,
    ],

    path: [
      ...path,
    ],

    explanation:
      `Found ${target}.`,

    detail:
      "Now determine which deletion case applies.",

    variables: {

      target,

    },

  });


  /*
   * =======================================================
   * CASE 1: LEAF
   * =======================================================
   */

  if (
    current.left === null &&
    current.right === null
  ) {

    addStep({

      action:
        "leaf",

      codeLine:
        11,

      currentNode:
        current.id,

      deleted: [
        current.id,
      ],

      explanation:
        `${target} is a leaf node.`,

      detail:
        "A leaf has no children, so it can simply be removed.",

      variables: {

        case:
          "leaf",

        target,

      },

    });


    if (
      parent === null
    ) {

      root =
        null;

    }

    else if (
      parent.left ===
      current
    ) {

      parent.left =
        null;

    }

    else {

      parent.right =
        null;

    }


    addStep({

      action:
        "delete",

      codeLine:
        11,

      deleted: [
        current.id,
      ],

      explanation:
        `${target} has been removed.`,

      detail:
        "The parent now points to an empty child position.",

      variables: {

        case:
          "leaf",

      },

    });

  }


  /*
   * =======================================================
   * CASE 2: ONLY RIGHT CHILD
   * =======================================================
   */

  else if (
    current.left === null
  ) {

    const child =
      current.right;


    addStep({

      action:
        "one-child",

      codeLine:
        12,

      currentNode:
        current.id,

      comparing: [
        current.id,
        child.id,
      ],

      replacement:
        child.id,

      explanation:
        `${target} has one right child.`,

      detail:
        "Replace the deleted node with its right child.",

      variables: {

        case:
          "one-child",

        child:
          child.value,

      },

    });


    if (
      parent === null
    ) {

      root =
        child;

    }

    else if (
      parent.left ===
      current
    ) {

      parent.left =
        child;

    }

    else {

      parent.right =
        child;

    }


    addStep({

      action:
        "delete",

      codeLine:
        12,

      replacement:
        child.id,

      explanation:
        `${target} was replaced by ${child.value}.`,

      detail:
        "The child takes the deleted node's position.",

      variables: {

        case:
          "one-child",

      },

    });

  }


  /*
   * =======================================================
   * CASE 2: ONLY LEFT CHILD
   * =======================================================
   */

  else if (
    current.right === null
  ) {

    const child =
      current.left;


    addStep({

      action:
        "one-child",

      codeLine:
        15,

      currentNode:
        current.id,

      comparing: [
        current.id,
        child.id,
      ],

      replacement:
        child.id,

      explanation:
        `${target} has one left child.`,

      detail:
        "Replace the deleted node with its left child.",

      variables: {

        case:
          "one-child",

        child:
          child.value,

      },

    });


    if (
      parent === null
    ) {

      root =
        child;

    }

    else if (
      parent.left ===
      current
    ) {

      parent.left =
        child;

    }

    else {

      parent.right =
        child;

    }


    addStep({

      action:
        "delete",

      codeLine:
        15,

      replacement:
        child.id,

      explanation:
        `${target} was replaced by ${child.value}.`,

      detail:
        "The child takes the deleted node's position.",

      variables: {

        case:
          "one-child",

      },

    });

  }


  /*
   * =======================================================
   * CASE 3: TWO CHILDREN
   * =======================================================
   */

  else {

    addStep({

      action:
        "two-children",

      codeLine:
        17,

      currentNode:
        current.id,

      comparing: [
        current.id,
      ],

      explanation:
        `${target} has two children.`,

      detail:
        "We need the inorder successor to preserve the BST property.",

      variables: {

        case:
          "two-children",

      },

    });


    /*
     * Find minimum in right subtree
     */

    let successorParent =
      current;


    let successor =
      current.right;


    const successorPath = [];


    while (
      successor.left !== null
    ) {

      successorPath.push(
        successor.id
      );


      addStep({

        action:
          "find-successor",

        codeLine:
          17,

        currentNode:
          successor.id,

        comparing: [
          successor.id,
        ],

        path: [
          ...path,
          ...successorPath,
        ],

        explanation:
          `Look for the smallest value in the right subtree.`,

        detail:
          `${successor.value} has a left child, so move left.`,

        variables: {

          successor:
            successor.value,

        },

      });


      successorParent =
        successor;


      successor =
        successor.left;

    }


    addStep({

      action:
        "successor",

      codeLine:
        17,

      currentNode:
        successor.id,

      comparing: [
        successor.id,
      ],

      replacement:
        successor.id,

      explanation:
        `Inorder successor is ${successor.value}.`,

      detail:
        "The inorder successor is the smallest value in the deleted node's right subtree.",

      variables: {

        successor:
          successor.value,

      },

    });


    /*
     * Replace value
     */

    const oldValue =
      current.value;


    current.value =
      successor.value;


    addStep({

      action:
        "replace",

      codeLine:
        18,

      currentNode:
        current.id,

      replacement:
        successor.id,

      explanation:
        `Replace ${oldValue} with ${successor.value}.`,

      detail:
        "Copy the inorder successor's value into the node being deleted.",

      variables: {

        oldValue,

        successor:
          successor.value,

      },

    });


    /*
     * Remove successor
     */

    if (
      successorParent.left ===
      successor
    ) {

      successorParent.left =
        successor.right;

    }

    else {

      successorParent.right =
        successor.right;

    }


    addStep({

      action:
        "delete-successor",

      codeLine:
        19,

      deleted: [
        successor.id,
      ],

      explanation:
        `Remove the original successor node ${successor.value}.`,

      detail:
        "The successor can now be removed because its value has already been copied.",

      variables: {

        successor:
          successor.value,

      },

    });

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
      22,

    explanation:
      "BST deletion is complete.",

    detail:
      `The BST property has been preserved after deleting ${target}.`,

    variables: {

      phase:
        "complete",

    },

  });


  return steps;

}