/*
 * =========================================================
 * BINARY SEARCH TREE INSERT
 * =========================================================
 *
 * BST RULE:
 *
 *          LEFT < ROOT < RIGHT
 *
 * Average: O(log n)
 * Worst:   O(n)
 * =========================================================
 */

export const bstInsertCode = [
  "if (root === null)",
  "    return newNode(value);",
  "",
  "if (value < root.value)",
  "    root.left = insert(root.left, value);",
  "",
  "else if (value > root.value)",
  "    root.right = insert(root.right, value);",
  "",
  "return root;",
];


export const defaultBSTInsertArray = [
  50,
  30,
  70,
  20,
  40,
  60,
];


export const defaultBSTInsertValue = 65;


/*
 * =========================================================
 * TRACE
 * =========================================================
 */

export function createBSTInsertTrace(
  inputArray,
  value
) {

  const steps = [];

  let stepId = 0;

  let nextId = 0;


  /*
   * Node structure
   */

  const createNode = (
    nodeValue
  ) => {

    return {

      id: nextId++,

      value: nodeValue,

      left: null,

      right: null,

    };

  };


  /*
   * Build initial BST
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
    const valueItem of inputArray
  ) {

    root =
      insertInitial(
        root,
        valueItem
      );

  }


  /*
   * Serialize tree
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


  /*
   * Record step
   */

  const addStep = ({
    action,
    codeLine,
    currentNode = null,
    comparing = [],
    inserted = [],
    path = [],
    explanation,
    detail,
    variables = {},
  }) => {

    steps.push({

      id: stepId++,

      action,

      codeLine,

      array: [
        ...inputArray,
      ],

      tree:
        serializeTree(),

      currentNode,

      comparing,

      inserted,

      path,

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

    root =
      createNode(
        value
      );


    addStep({

      action:
        "insert",

      codeLine:
        2,

      currentNode:
        root.id,

      inserted: [
        root.id,
      ],

      explanation:
        `${value} becomes the root of the BST.`,

      detail:
        "The first value inserted into an empty BST becomes the root.",

      variables: {

        value,

      },

    });


    addStep({

      action:
        "complete",

      codeLine:
        10,

      explanation:
        "BST insertion is complete.",

      detail:
        `Inserted ${value}.`,

      variables: {

        phase:
          "complete",

      },

    });


    return steps;

  }


  /*
   * =======================================================
   * INSERTION
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
        `Compare ${value} with ${current.value}.`,

      detail:
        value <
        current.value
          ? `${value} is smaller, so move left.`
          : value >
            current.value
          ? `${value} is larger, so move right.`
          : `${value} already exists.`,

      variables: {

        value,

        current:
          current.value,

      },

    });


    /*
     * Duplicate
     */

    if (
      value ===
      current.value
    ) {

      addStep({

        action:
          "duplicate",

        codeLine:
          10,

        currentNode:
          current.id,

        comparing: [
          current.id,
        ],

        explanation:
          `${value} already exists in the BST.`,

        detail:
          "Duplicate values are not inserted.",

        variables: {

          value,

        },

      });


      break;

    }


    /*
     * LEFT
     */

    if (
      value <
      current.value
    ) {

      if (
        current.left ===
        null
      ) {

        const newNode =
          createNode(
            value
          );


        current.left =
          newNode;


        addStep({

          action:
            "insert",

          codeLine:
            5,

          currentNode:
            newNode.id,

          inserted: [
            newNode.id,
          ],

          path: [
            ...path,
          ],

          explanation:
            `Insert ${value} as the left child of ${current.value}.`,

          detail:
            "A value smaller than the current node belongs in the left subtree.",

          variables: {

            value,

            parent:
              current.value,

          },

        });


        break;

      }


      addStep({

        action:
          "move-left",

        codeLine:
          5,

        currentNode:
          current.id,

        path: [
          ...path,
        ],

        explanation:
          `Move left from ${current.value}.`,

        detail:
          `${value} is smaller than ${current.value}.`,

        variables: {

          value,

        },

      });


      current =
        current.left;

    }


    /*
     * RIGHT
     */

    else {

      if (
        current.right ===
        null
      ) {

        const newNode =
          createNode(
            value
          );


        current.right =
          newNode;


        addStep({

          action:
            "insert",

          codeLine:
            7,

          currentNode:
            newNode.id,

          inserted: [
            newNode.id,
          ],

          path: [
            ...path,
          ],

          explanation:
            `Insert ${value} as the right child of ${current.value}.`,

          detail:
            "A value larger than the current node belongs in the right subtree.",

          variables: {

            value,

            parent:
              current.value,

          },

        });


        break;

      }


      addStep({

        action:
          "move-right",

        codeLine:
          7,

        currentNode:
          current.id,

        path: [
          ...path,
        ],

        explanation:
          `Move right from ${current.value}.`,

        detail:
          `${value} is larger than ${current.value}.`,

        variables: {

          value,

        },

      });


      current =
        current.right;

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
      10,

    explanation:
      "BST insertion is complete.",

    detail:
      `The BST now contains ${value}.`,

    variables: {

      phase:
        "complete",

    },

  });


  return steps;

}