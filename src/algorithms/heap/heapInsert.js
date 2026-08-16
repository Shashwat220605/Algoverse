/*
 * =========================================================
 * MAX HEAP INSERT
 * =========================================================
 *
 * Insert a new value at the end.
 *
 * Then repeatedly compare it with its parent.
 *
 * If it is larger than its parent,
 * swap them.
 *
 *
 * TIME:
 * O(log n)
 *
 * SPACE:
 * O(1)
 * =========================================================
 */

export const heapInsertCode = [
  "heap.push(value);",
  "index = heap.length - 1;",
  "",
  "while (index > 0)",
  "    parent = floor((index - 1) / 2);",
  "",
  "    if (heap[parent] >= heap[index])",
  "        break;",
  "",
  "    swap(heap[parent], heap[index]);",
  "    index = parent;",
];


export const defaultHeapInsertArray = [
  50,
  30,
  40,
  10,
  20,
  35,
];


export const defaultHeapInsertValue = 60;


/*
 * =========================================================
 * TRACE
 * =========================================================
 */

export function createHeapInsertTrace(
  inputArray,
  value
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
   * PUSH
   * =======================================================
   */

  heap.push(
    value
  );


  let index =
    heap.length - 1;


  addStep({

    action: "insert",

    codeLine: 1,

    currentIndex: index,

    explanation:
      `Insert ${value} at the end of the heap.`,

    detail:
      "A new heap element is initially placed at the next available position.",

    variables: {

      inserted:
        value,

      index,

    },

  });


  /*
   * =======================================================
   * BUBBLE UP
   * =======================================================
   */

  while (
    index > 0
  ) {

    const parent =
      Math.floor(
        (index - 1) / 2
      );


    addStep({

      action: "compare",

      codeLine: 5,

      currentIndex:
        index,

      comparing: [
        parent,
        index,
      ],

      explanation:
        `Compare ${heap[index]} with its parent ${heap[parent]}.`,

      detail:
        "A max heap requires every parent to be greater than or equal to its children.",

      variables: {

        current:
          heap[index],

        parent:
          heap[parent],

        index,

        parentIndex:
          parent,

      },

    });


    /*
     * Correct position.
     */

    if (
      heap[parent] >=
      heap[index]
    ) {

      addStep({

        action: "stop",

        codeLine: 8,

        currentIndex:
          index,

        explanation:
          `${heap[index]} is not larger than its parent.`,

        detail:
          "The heap property is satisfied, so no more swaps are necessary.",

        variables: {

          current:
            heap[index],

          parent:
            heap[parent],

          index,

        },

      });


      break;

    }


    /*
     * Swap.
     */

    addStep({

      action: "swap",

      codeLine: 10,

      currentIndex:
        index,

      comparing: [
        parent,
        index,
      ],

      swapped: [
        parent,
        index,
      ],

      explanation:
        `Swap ${heap[index]} with its parent ${heap[parent]}.`,

      detail:
        "The inserted value is larger, so it moves upward toward the root.",

      variables: {

        current:
          heap[index],

        parent:
          heap[parent],

        index,

      },

    });


    [
      heap[parent],
      heap[index],
    ] = [
      heap[index],
      heap[parent],
    ];


    index =
      parent;


    addStep({

      action: "move-up",

      codeLine: 11,

      currentIndex:
        index,

      explanation:
        "Move the inserted value to its new parent position.",

      detail:
        "The process continues until the value reaches a valid position.",

      variables: {

        current:
          heap[index],

        index,

      },

    });

  }


  /*
   * =======================================================
   * COMPLETE
   * =======================================================
   */

  addStep({

    action: "complete",

    codeLine: 11,

    currentIndex: null,

    explanation:
      "Heap insertion is complete.",

    detail:
      `Max Heap: [${heap.join(", ")}]`,

    variables: {

      phase:
        "complete",

      result: [
        ...heap,
      ],

    },

  });


  return steps;

}