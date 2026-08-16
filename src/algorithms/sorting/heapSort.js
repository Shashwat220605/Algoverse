import { STEP_ACTIONS } from "./algorithmTypes.js";

export const heapSortCode = [
  "void heapSort(int n) {",
  "    for (int i = n / 2 - 1; i >= 0; i--)",
  "        heapify(n, i);",
  "",
  "    for (int i = n - 1; i > 0; i--) {",
  "        swap(arr[0], arr[i]);",
  "        heapify(i, 0);",
  "    }",
  "}",
  "",
  "void heapify(int n, int i) {",
  "    int largest = i;",
  "    int left = 2 * i + 1;",
  "    int right = 2 * i + 2;",
  "",
  "    if (left < n && arr[left] > arr[largest])",
  "        largest = left;",
  "",
  "    if (right < n && arr[right] > arr[largest])",
  "        largest = right;",
  "",
  "    if (largest != i) {",
  "        swap(arr[i], arr[largest]);",
  "        heapify(n, largest);",
  "    }",
  "}",
];


function createStep({
  id,
  action,
  codeLine,
  array,
  heapSize,
  currentIndex = null,
  largest = null,
  leftChild = null,
  rightChild = null,
  comparing = [],
  swapping = [],
  sorted = [],
  phase,
  explanation,
  detail,
}) {
  return {
    id,
    action,
    codeLine,

    array: [...array],

    target: null,

    variables: {
      heapSize,
      currentIndex,
      largest,
      leftChild,
      rightChild,
      comparing,
      swapping,
      sorted,
      phase,
    },

    explanation,
    detail,
  };
}


export function createHeapSortTrace(inputArray) {
  const array = [...inputArray];

  const steps = [];

  let stepId = 0;

  const sorted = [];


  /*
   * =======================================================
   * INITIAL STATE
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.INITIALIZE,
      codeLine: 0,
      array,
      heapSize: array.length,
      phase: "start",
      explanation:
        "Heap Sort begins by converting the array into a Max Heap.",
      detail:
        "A Max Heap keeps the largest value at the root, which is index 0 in the array representation.",
    })
  );


  /*
   * =======================================================
   * HEAPIFY
   * =======================================================
   */

  function heapify(n, i) {

    let largest = i;

    const left =
      2 * i + 1;

    const right =
      2 * i + 2;


    /*
     * Show current node and children.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.HIGHLIGHT,
        codeLine: 10,
        array,
        heapSize: n,
        currentIndex: i,
        largest,
        leftChild:
          left < n
            ? left
            : null,
        rightChild:
          right < n
            ? right
            : null,
        comparing: [],
        swapping: [],
        sorted: [...sorted],
        phase: "heapify",
        explanation:
          `Heapify is checking the node at index ${i}.`,
        detail:
          `Its children are ${left < n ? `index ${left}` : "none"} and ${right < n ? `index ${right}` : "none"}.`,
      })
    );


    /*
     * Compare with left child.
     */

    if (left < n) {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPARE,
          codeLine: 14,
          array,
          heapSize: n,
          currentIndex: i,
          largest,
          leftChild: left,
          rightChild:
            right < n
              ? right
              : null,
          comparing: [
            i,
            left,
          ],
          swapping: [],
          sorted: [...sorted],
          phase: "compareLeft",
          explanation:
            `Compare ${array[left]} with ${array[largest]}.`,
          detail:
            "The left child is checked to see whether it is larger than the current largest value.",
        })
      );


      if (
        array[left] >
        array[largest]
      ) {

        largest = left;


        steps.push(
          createStep({
            id: stepId++,
            action: STEP_ACTIONS.MOVE_POINTER,
            codeLine: 15,
            array,
            heapSize: n,
            currentIndex: i,
            largest,
            leftChild: left,
            rightChild:
              right < n
                ? right
                : null,
            comparing: [],
            swapping: [],
            sorted: [...sorted],
            phase: "leftLargest",
            explanation:
              `${array[largest]} becomes the largest value in this comparison.`,
            detail:
              "The largest pointer moves to the left child.",
          })
        );

      }

    }


    /*
     * Compare with right child.
     */

    if (right < n) {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPARE,
          codeLine: 17,
          array,
          heapSize: n,
          currentIndex: i,
          largest,
          leftChild:
            left < n
              ? left
              : null,
          rightChild: right,
          comparing: [
            largest,
            right,
          ],
          swapping: [],
          sorted: [...sorted],
          phase: "compareRight",
          explanation:
            `Compare ${array[right]} with ${array[largest]}.`,
          detail:
            "The right child is checked against the largest value found so far.",
        })
      );


      if (
        array[right] >
        array[largest]
      ) {

        largest = right;


        steps.push(
          createStep({
            id: stepId++,
            action: STEP_ACTIONS.MOVE_POINTER,
            codeLine: 18,
            array,
            heapSize: n,
            currentIndex: i,
            largest,
            leftChild:
              left < n
                ? left
                : null,
            rightChild: right,
            comparing: [],
            swapping: [],
            sorted: [...sorted],
            phase: "rightLargest",
            explanation:
              `${array[largest]} becomes the largest value.`,
            detail:
              "The largest pointer moves to the right child.",
          })
        );

      }

    }


    /*
     * =====================================================
     * SWAP
     * =====================================================
     */

    if (largest !== i) {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.SWAP,
          codeLine: 22,
          array,
          heapSize: n,
          currentIndex: i,
          largest,
          leftChild:
            left < n
              ? left
              : null,
          rightChild:
            right < n
              ? right
              : null,
          comparing: [],
          swapping: [
            i,
            largest,
          ],
          sorted: [...sorted],
          phase: "swap",
          explanation:
            `Swap ${array[i]} with ${array[largest]}.`,
          detail:
            "The larger child moves upward so the current subtree satisfies the Max Heap property.",
        })
      );


      [
        array[i],
        array[largest],
      ] = [
        array[largest],
        array[i],
      ];


      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPLETE,
          codeLine: 22,
          array,
          heapSize: n,
          currentIndex: i,
          largest,
          leftChild:
            left < n
              ? left
              : null,
          rightChild:
            right < n
              ? right
              : null,
          comparing: [],
          swapping: [],
          sorted: [...sorted],
          phase: "afterSwap",
          explanation:
            "The heap structure has been updated.",
          detail:
            "Because the value moved downward, heapify continues from its new position.",
        })
      );


      heapify(
        n,
        largest
      );

    }

  }


  /*
   * =======================================================
   * BUILD MAX HEAP
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.HIGHLIGHT,
      codeLine: 1,
      array,
      heapSize: array.length,
      phase: "buildHeap",
      explanation:
        "Now build the Max Heap.",
      detail:
        "We start from the last non-leaf node and heapify every parent moving toward the root.",
    })
  );


  for (
    let i =
      Math.floor(
        array.length / 2
      ) - 1;
    i >= 0;
    i--
  ) {

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.MOVE_POINTER,
        codeLine: 1,
        array,
        heapSize: array.length,
        currentIndex: i,
        phase: "buildNode",
        explanation:
          `Heapify node ${i}.`,
        detail:
          "Leaf nodes already satisfy the heap property, so only parent nodes need to be processed.",
      })
    );


    heapify(
      array.length,
      i
    );

  }


  /*
   * =======================================================
   * MAX HEAP CREATED
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.COMPLETE,
      codeLine: 2,
      array,
      heapSize: array.length,
      currentIndex: 0,
      largest: 0,
      sorted: [...sorted],
      phase: "maxHeap",
      explanation:
        "The Max Heap is ready.",
      detail:
        `The largest value ${array[0]} is now at the root.`,
    })
  );


  /*
   * =======================================================
   * EXTRACTION PHASE
   * =======================================================
   */

  for (
    let end =
      array.length - 1;
    end > 0;
    end--
  ) {

    /*
     * Root is the maximum.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.HIGHLIGHT,
        codeLine: 4,
        array,
        heapSize: end + 1,
        currentIndex: 0,
        largest: 0,
        sorted: [...sorted],
        phase: "extract",
        explanation:
          `The root ${array[0]} is the largest remaining value.`,
        detail:
          "Heap Sort moves the maximum value to the end of the unsorted portion.",
      })
    );


    /*
     * Swap root with last
     * unsorted element.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.SWAP,
        codeLine: 5,
        array,
        heapSize: end + 1,
        currentIndex: 0,
        largest: end,
        swapping: [
          0,
          end,
        ],
        sorted: [...sorted],
        phase: "extractSwap",
        explanation:
          `Move ${array[0]} to its final position at index ${end}.`,
        detail:
          "The largest value is placed at the end of the current unsorted region.",
      })
    );


    [
      array[0],
      array[end],
    ] = [
      array[end],
      array[0],
    ];


    sorted.push(
      end
    );


    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPLETE,
        codeLine: 5,
        array,
        heapSize: end,
        currentIndex: 0,
        largest: null,
        swapping: [],
        sorted: [...sorted],
        phase: "sortedValue",
        explanation:
          `${array[end]} is now permanently sorted.`,
        detail:
          `Index ${end} belongs to the sorted portion and will no longer participate in heap operations.`,
      })
    );


    /*
     * Restore heap property.
     */

    if (end > 1) {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.HIGHLIGHT,
          codeLine: 6,
          array,
          heapSize: end,
          currentIndex: 0,
          sorted: [...sorted],
          phase: "restoreHeap",
          explanation:
            "Restore the Max Heap property.",
          detail:
            "After removing the root, the new root may violate the heap property, so heapify fixes it.",
        })
      );


      heapify(
        end,
        0
      );

    }

  }


  /*
   * =======================================================
   * FINAL ELEMENT
   * =======================================================
   */

  if (array.length > 0) {

    sorted.push(0);


    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPLETE,
        codeLine: 7,
        array,
        heapSize: 0,
        currentIndex: 0,
        sorted: [...sorted],
        phase: "complete",
        explanation:
          "Heap Sort is complete.",
        detail:
          "The heap has been repeatedly reduced until every element is in its final sorted position.",
      })
    );

  }


  return steps;
}


export const defaultHeapSortArray = [
  7,
  3,
  9,
  2,
  5,
  8,
  1,
];