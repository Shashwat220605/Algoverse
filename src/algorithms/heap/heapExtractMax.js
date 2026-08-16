/*
 * =========================================================
 * MAX HEAP EXTRACT
 * =========================================================
 *
 * Remove the root, which contains the maximum value.
 *
 * Then:
 *
 * 1. Move the last element to the root.
 * 2. Reduce heap size.
 * 3. Heapify downward.
 *
 *
 * TIME:
 * O(log n)
 *
 * SPACE:
 * O(1)
 * =========================================================
 */

export const heapExtractMaxCode = [
  "max = heap[0];",
  "heap[0] = heap[heap.length - 1];",
  "heap.pop();",
  "",
  "index = 0;",
  "while (true)",
  "    left = 2 * index + 1;",
  "    right = 2 * index + 2;",
  "    largest = index;",
  "",
  "    if (left < heap.length && heap[left] > heap[largest])",
  "        largest = left;",
  "",
  "    if (right < heap.length && heap[right] > heap[largest])",
  "        largest = right;",
  "",
  "    if (largest == index)",
  "        break;",
  "",
  "    swap(heap[index], heap[largest]);",
  "    index = largest;",
];


export const defaultHeapExtractMaxArray = [
  50,
  30,
  40,
  10,
  20,
  35,
];


/*
 * =========================================================
 * TRACE
 * =========================================================
 */

export function createHeapExtractMaxTrace(
  inputArray
) {

  const heap = [
    ...inputArray,
  ];


  const steps = [];

  let stepId = 0;


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
        ...heap,
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
   * EMPTY HEAP
   * =======================================================
   */

  if (
    heap.length === 0
  ) {

    addStep({

      action: "complete",

      codeLine: 1,

      explanation:
        "The heap is empty.",

      detail:
        "There is no maximum element to extract.",

      variables: {

        phase:
          "empty",

      },

    });


    return steps;

  }


  /*
   * =======================================================
   * SINGLE ELEMENT
   * =======================================================
   */

  if (
    heap.length === 1
  ) {

    const max =
      heap[0];


    addStep({

      action: "extract",

      codeLine: 1,

      currentIndex: 0,

      explanation:
        `Extract ${max}, the maximum element.`,

      detail:
        "The root of a max heap always contains the largest value.",

      variables: {

        max,

      },

    });


    heap.pop();


    addStep({

      action: "complete",

      codeLine: 3,

      explanation:
        "Heap extraction is complete.",

      detail:
        "The heap is now empty.",

      variables: {

        phase:
          "complete",

        max,

        result: [],

      },

    });


    return steps;

  }


  /*
   * =======================================================
   * SAVE MAX
   * =======================================================
   */

  const max =
    heap[0];


  addStep({

    action: "extract",

    codeLine: 1,

    currentIndex: 0,

    explanation:
      `Extract ${max}, the maximum element.`,

    detail:
      "In a max heap, the root always contains the maximum value.",

    variables: {

      max,

      heapSize:
        heap.length,

    },

  });


  /*
   * =======================================================
   * MOVE LAST TO ROOT
   * =======================================================
   */

  const lastIndex =
    heap.length - 1;


  addStep({

    action: "move-root",

    codeLine: 2,

    currentIndex: 0,

    comparing: [
      0,
      lastIndex,
    ],

    explanation:
      `Move the last element ${heap[lastIndex]} to the root.`,

    detail:
      "The last element fills the empty root position.",

    variables: {

      max,

      replacement:
        heap[lastIndex],

      heapSize:
        heap.length,

    },

  });


  heap[0] =
    heap[lastIndex];


  heap.pop();


  addStep({

    action: "remove",

    codeLine: 3,

    currentIndex: 0,

    explanation:
      "Remove the old last position.",

    detail:
      "The heap now contains one fewer element, but the new root may violate the max-heap property.",

    variables: {

      max,

      current:
        heap[0],

      heapSize:
        heap.length,

    },

  });


  /*
   * =======================================================
   * HEAPIFY DOWN
   * =======================================================
   */

  let index = 0;


  while (
    true
  ) {

    const left =
      2 * index + 1;


    const right =
      2 * index + 2;


    let largest =
      index;


    const comparisons = [];


    if (
      left <
      heap.length
    ) {

      comparisons.push(
        left
      );

    }


    if (
      right <
      heap.length
    ) {

      comparisons.push(
        right
      );

    }


    if (
      comparisons.length > 0
    ) {

      addStep({

        action: "compare",

        codeLine: 10,

        currentIndex:
          index,

        comparing: [
          index,
          ...comparisons,
        ],

        explanation:
          `Compare ${heap[index]} with its children.`,

        detail:
          "The largest child must move upward if it is greater than the current node.",

        variables: {

          max,

          current:
            heap[index],

          left:
            left < heap.length
              ? heap[left]
              : null,

          right:
            right < heap.length
              ? heap[right]
              : null,

        },

      });

    }


    if (
      left <
        heap.length &&
      heap[left] >
        heap[largest]
    ) {

      largest =
        left;

    }


    if (
      right <
        heap.length &&
      heap[right] >
        heap[largest]
    ) {

      largest =
        right;

    }


    /*
     * Correct position.
     */

    if (
      largest === index
    ) {

      addStep({

        action: "stop",

        codeLine: 16,

        currentIndex:
          index,

        explanation:
          `The new root ${heap[index]} is in the correct position.`,

        detail:
          "The max-heap property has been restored.",

        variables: {

          max,

          current:
            heap[index],

        },

      });


      break;

    }


    /*
     * Swap.
     */

    addStep({

      action: "swap",

      codeLine: 18,

      currentIndex:
        index,

      comparing: [
        index,
        largest,
      ],

      swapped: [
        index,
        largest,
      ],

      explanation:
        `Swap ${heap[index]} with ${heap[largest]}.`,

      detail:
        "The larger child moves upward to restore the max-heap property.",

      variables: {

        max,

        current:
          heap[index],

        largest:
          heap[largest],

      },

    });


    [
      heap[index],
      heap[largest],
    ] = [
      heap[largest],
      heap[index],
    ];


    index =
      largest;

  }


  /*
   * =======================================================
   * COMPLETE
   * =======================================================
   */

  addStep({

    action: "complete",

    codeLine: 18,

    currentIndex: null,

    explanation:
      "Extract Max is complete.",

    detail:
      `Extracted value: ${max}. Remaining heap: [${heap.join(
        ", "
      )}]`,

    variables: {

      phase:
        "complete",

      max,

      result: [
        ...heap,
      ],

    },

  });


  return steps;

}