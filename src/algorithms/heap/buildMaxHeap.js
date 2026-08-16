/*
 * =========================================================
 * BUILD MAX HEAP
 * =========================================================
 *
 * MAX HEAP RULE:
 *
 * Every parent must be >= its children.
 *
 * Example:
 *
 *             50
 *           /    \
 *         30      40
 *        /  \    /
 *       10  20  35
 *
 *
 * ARRAY:
 *
 * [50, 30, 40, 10, 20, 35]
 *
 *
 * TIME:
 * O(n)
 *
 * SPACE:
 * O(1) auxiliary
 * =========================================================
 */

export const buildMaxHeapCode = [
  "for (let i = floor(n / 2) - 1; i >= 0; i--)",
  "    heapify(array, n, i);",
  "",
  "heapify(array, n, i)",
  "largest = i;",
  "left = 2 * i + 1;",
  "right = 2 * i + 2;",
  "",
  "if (left < n && array[left] > array[largest])",
  "    largest = left;",
  "",
  "if (right < n && array[right] > array[largest])",
  "    largest = right;",
  "",
  "if (largest != i)",
  "    swap(array[i], array[largest]);",
  "",
  "heapify(array, n, largest);",
];


export const defaultBuildMaxHeapArray = [
  20,
  10,
  40,
  5,
  30,
  35,
  50,
];


/*
 * =========================================================
 * TRACE
 * =========================================================
 */

export function createBuildMaxHeapTrace(
  inputArray
) {

  const array = [
    ...inputArray,
  ];


  const steps = [];

  let stepId = 0;


  /*
   * Empty input
   */

  if (
    array.length === 0
  ) {

    steps.push({

      id: stepId++,

      action: "complete",

      codeLine: 1,

      array: [],

      currentIndex: null,

      comparing: [],

      swapped: [],

      visited: [],

      variables: {

        phase: "empty",

        heapSize: 0,

      },

      explanation:
        "The array is empty.",

      detail:
        "There are no elements to arrange into a heap.",

    });


    return steps;

  }


  /*
   * Helper to record a step.
   */

  const addStep = ({
    action,
    codeLine,
    currentIndex = null,
    comparing = [],
    swapped = [],
    explanation,
    detail,
    variables = {},
  }) => {

    steps.push({

      id: stepId++,

      action,

      codeLine,

      array: [
        ...array,
      ],

      currentIndex,

      comparing: [
        ...comparing,
      ],

      swapped: [
        ...swapped,
      ],

      visited: [],

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
   * HEAPIFY
   * =======================================================
   */

  function heapify(
    n,
    i
  ) {

    let largest =
      i;


    const left =
      2 * i + 1;


    const right =
      2 * i + 2;


    /*
     * Show children comparison.
     */

    const comparison = [];


    if (
      left < n
    ) {

      comparison.push(
        left
      );

    }


    if (
      right < n
    ) {

      comparison.push(
        right
      );

    }


    if (
      comparison.length > 0
    ) {

      addStep({

        action: "compare",

        codeLine: 8,

        currentIndex: i,

        comparing: [
          i,
          ...comparison,
        ],

        explanation:
          `Compare node ${array[i]} with its children.`,

        detail:
          "The largest value among the parent and its children must become the parent.",

        variables: {

          heapSize: n,

          current:
            array[i],

          left:
            left < n
              ? array[left]
              : null,

          right:
            right < n
              ? array[right]
              : null,

          largest:

            array[i],

        },

      });

    }


    /*
     * Check left.
     */

    if (
      left < n &&
      array[left] >
        array[largest]
    ) {

      largest =
        left;


      addStep({

        action: "compare",

        codeLine: 9,

        currentIndex: largest,

        comparing: [
          i,
          left,
        ],

        explanation:
          `${array[left]} is larger than ${array[i]}.`,

        detail:
          "The left child becomes the current largest candidate.",

        variables: {

          heapSize: n,

          current:
            array[i],

          largest:
            array[largest],

        },

      });

    }


    /*
     * Check right.
     */

    if (
      right < n &&
      array[right] >
        array[largest]
    ) {

      largest =
        right;


      addStep({

        action: "compare",

        codeLine: 12,

        currentIndex: largest,

        comparing: [
          i,
          right,
        ],

        explanation:
          `${array[right]} is larger than the current largest value.`,

        detail:
          "The right child becomes the new largest candidate.",

        variables: {

          heapSize: n,

          current:
            array[i],

          largest:
            array[largest],

        },

      });

    }


    /*
     * Swap if required.
     */

    if (
      largest !== i
    ) {

      const oldParent =
        array[i];

      const newParent =
        array[largest];


      addStep({

        action: "swap",

        codeLine: 15,

        currentIndex: i,

        comparing: [
          i,
          largest,
        ],

        swapped: [
          i,
          largest,
        ],

        explanation:
          `Swap ${oldParent} with ${newParent}.`,

        detail:
          "The larger child moves upward to restore the max-heap property.",

        variables: {

          heapSize: n,

          current:
            oldParent,

          largest:
            newParent,

        },

      });


      [
        array[i],
        array[largest],
      ] = [
        array[largest],
        array[i],
      ];


      addStep({

        action: "after-swap",

        codeLine: 15,

        currentIndex:
          largest,

        swapped: [
          i,
          largest,
        ],

        explanation:
          "The values have been swapped.",

        detail:
          "Heapify continues downward because the moved value may still violate the heap property.",

        variables: {

          heapSize: n,

          current:
            array[largest],

        },

      });


      heapify(
        n,
        largest
      );

    }

  }


  /*
   * =======================================================
   * BUILD HEAP
   * =======================================================
   */

  const start =
    Math.floor(
      array.length / 2
    ) - 1;


  for (
    let i = start;
    i >= 0;
    i--
  ) {

    addStep({

      action: "heapify",

      codeLine: 1,

      currentIndex: i,

      explanation:
        `Heapify the subtree rooted at ${array[i]}.`,

      detail:
        "Nodes in the lower half of the array are processed first because they are the starting points of subtrees.",

      variables: {

        heapSize:
          array.length,

        current:
          array[i],

      },

    });


    heapify(
      array.length,
      i
    );

  }


  /*
   * =======================================================
   * COMPLETE
   * =======================================================
   */

  addStep({

    action: "complete",

    codeLine: 2,

    explanation:
      "Max Heap construction is complete.",

    detail:
      `Max Heap: [${array.join(", ")}]`,

    variables: {

      phase: "complete",

      heapSize:
        array.length,

      result: [
        ...array,
      ],

    },

  });


  return steps;

}