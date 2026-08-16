import { STEP_ACTIONS } from "./algorithmTypes.js";

export const quickSortCode = [
  "void quickSort(int low, int high) {",
  "    if (low >= high) return;",
  "",
  "    int pivotIndex = partition(low, high);",
  "",
  "    quickSort(low, pivotIndex - 1);",
  "    quickSort(pivotIndex + 1, high);",
  "}",
  "",
  "int partition(int low, int high) {",
  "    int pivot = arr[high];",
  "    int i = low - 1;",
  "",
  "    for (int j = low; j < high; j++) {",
  "        if (arr[j] < pivot) {",
  "            i++;",
  "            swap(arr[i], arr[j]);",
  "        }",
  "    }",
  "",
  "    swap(arr[i + 1], arr[high]);",
  "    return i + 1;",
  "}",
];


function createStep({
  id,
  action,
  codeLine,
  array,
  low,
  high,
  pivotIndex = null,
  leftPointer = null,
  rightPointer = null,
  comparing = [],
  swapping = [],
  sortedRanges = [],
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
      low,
      high,
      pivotIndex,
      leftPointer,
      rightPointer,
      comparing,
      swapping,
      sortedRanges,
      phase,
    },

    explanation,
    detail,
  };
}


export function createQuickSortTrace(inputArray) {
  const array = [...inputArray];

  const steps = [];

  let stepId = 0;

  const sortedRanges = [];


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
      low: 0,
      high: array.length - 1,
      phase: "start",
      explanation:
        "Quick Sort begins by selecting a pivot and partitioning the array around it.",
      detail:
        "Every value smaller than the pivot will move to its left, while larger values move to its right.",
    })
  );


  /*
   * =======================================================
   * QUICK SORT
   * =======================================================
   */

  function quickSort(low, high) {

    /*
     * Base case
     */

    if (low >= high) {

      if (low === high) {

        sortedRanges.push([
          low,
          high,
        ]);

        steps.push(
          createStep({
            id: stepId++,
            action: STEP_ACTIONS.COMPLETE,
            codeLine: 1,
            array,
            low,
            high,
            pivotIndex: low,
            leftPointer: low,
            rightPointer: high,
            sortedRanges: [
              ...sortedRanges,
            ],
            phase: "base",
            explanation:
              `Index ${low} contains a single element.`,
            detail:
              "A single element is already sorted, so this section requires no further work.",
          })
        );

      }

      return;
    }


    /*
     * Partition
     */

    const pivotIndex =
      partition(
        low,
        high
      );


    /*
     * Pivot is now permanently
     * positioned.
     */

    sortedRanges.push([
      pivotIndex,
      pivotIndex,
    ]);


    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPLETE,
        codeLine: 4,
        array,
        low,
        high,
        pivotIndex,
        leftPointer: low,
        rightPointer: high,
        sortedRanges: [
          ...sortedRanges,
        ],
        phase: "pivotPlaced",
        explanation:
          `Pivot ${array[pivotIndex]} is now in its final position.`,
        detail:
          "Every element to the left of the pivot is smaller, and every element to the right is greater or equal.",
      })
    );


    /*
     * Sort left partition
     */

    if (low < pivotIndex - 1) {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.HIGHLIGHT,
          codeLine: 6,
          array,
          low,
          high,
          pivotIndex,
          leftPointer: low,
          rightPointer:
            pivotIndex - 1,
          sortedRanges: [
            ...sortedRanges,
          ],
          phase: "leftPartition",
          explanation:
            `Now sort the left partition from ${low} to ${pivotIndex - 1}.`,
          detail:
            "Quick Sort recursively applies the same process to the elements smaller than the pivot.",
        })
      );


      quickSort(
        low,
        pivotIndex - 1
      );

    }


    /*
     * Sort right partition
     */

    if (pivotIndex + 1 < high) {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.HIGHLIGHT,
          codeLine: 7,
          array,
          low,
          high,
          pivotIndex,
          leftPointer:
            pivotIndex + 1,
          rightPointer: high,
          sortedRanges: [
            ...sortedRanges,
          ],
          phase: "rightPartition",
          explanation:
            `Now sort the right partition from ${pivotIndex + 1} to ${high}.`,
          detail:
            "The same partitioning process is recursively applied to the elements greater than the pivot.",
        })
      );


      quickSort(
        pivotIndex + 1,
        high
      );

    }
  }


  /*
   * =======================================================
   * PARTITION
   * =======================================================
   */

  function partition(
    low,
    high
  ) {

    /*
     * Choose last element
     * as pivot.
     */

    const pivot =
      array[high];


    let i =
      low - 1;


    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.MOVE_POINTER,
        codeLine: 11,
        array,
        low,
        high,
        pivotIndex: high,
        leftPointer: i,
        rightPointer: low,
        sortedRanges: [
          ...sortedRanges,
        ],
        phase: "pivot",
        explanation:
          `Choose ${pivot} as the pivot.`,
        detail:
          "This implementation uses the last element of the current partition as the pivot.",
      })
    );


    /*
     * Scan partition.
     */

    for (
      let j = low;
      j < high;
      j++
    ) {

      /*
       * Compare current element
       * with pivot.
       */

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPARE,
          codeLine: 15,
          array,
          low,
          high,
          pivotIndex: high,
          leftPointer: i,
          rightPointer: j,
          comparing: [
            j,
            high,
          ],
          swapping: [],
          sortedRanges: [
            ...sortedRanges,
          ],
          phase: "compare",
          explanation:
            `Compare ${array[j]} with pivot ${pivot}.`,
          detail:
            `${array[j]} is checked to determine whether it belongs on the left side of the pivot.`,
        })
      );


      /*
       * Current value belongs
       * on the left.
       */

      if (
        array[j] < pivot
      ) {

        i++;


        /*
         * Show pointer movement.
         */

        steps.push(
          createStep({
            id: stepId++,
            action: STEP_ACTIONS.MOVE_POINTER,
            codeLine: 16,
            array,
            low,
            high,
            pivotIndex: high,
            leftPointer: i,
            rightPointer: j,
            comparing: [
              i,
              j,
            ],
            swapping: [],
            sortedRanges: [
              ...sortedRanges,
            ],
            phase: "moveLeft",
            explanation:
              `${array[j]} is smaller than the pivot, so the left boundary moves forward.`,
            detail:
              `The next position available for a smaller value is index ${i}.`,
          })
        );


        /*
         * Swap current element
         * into left partition.
         */

        if (i !== j) {

          steps.push(
            createStep({
              id: stepId++,
              action: STEP_ACTIONS.SWAP,
              codeLine: 17,
              array,
              low,
              high,
              pivotIndex: high,
              leftPointer: i,
              rightPointer: j,
              comparing: [],
              swapping: [
                i,
                j,
              ],
              sortedRanges: [
                ...sortedRanges,
              ],
              phase: "swap",
              explanation:
                `Swap ${array[i]} and ${array[j]}.`,
              detail:
                "The smaller value is moved into the left partition.",
            })
          );


          [
            array[i],
            array[j],
          ] = [
            array[j],
            array[i],
          ];


          steps.push(
            createStep({
              id: stepId++,
              action: STEP_ACTIONS.COMPLETE,
              codeLine: 17,
              array,
              low,
              high,
              pivotIndex: high,
              leftPointer: i,
              rightPointer: j,
              comparing: [],
              swapping: [],
              sortedRanges: [
                ...sortedRanges,
              ],
              phase: "afterSwap",
              explanation:
                "The smaller value is now on the left side of the pivot.",
              detail:
                "The partition's smaller-than-pivot section has grown by one element.",
            })
          );

        }

      }

    }


    /*
     * =====================================================
     * PLACE PIVOT
     * =====================================================
     */

    const finalPivotIndex =
      i + 1;


    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.SWAP,
        codeLine: 20,
        array,
        low,
        high,
        pivotIndex: high,
        leftPointer:
          finalPivotIndex,
        rightPointer: high,
        comparing: [],
        swapping: [
          finalPivotIndex,
          high,
        ],
        sortedRanges: [
          ...sortedRanges,
        ],
        phase: "pivotSwap",
        explanation:
          `Place pivot ${pivot} at index ${finalPivotIndex}.`,
        detail:
          "All smaller values are on the left. The pivot can now move into the boundary between the two partitions.",
      })
    );


    [
      array[finalPivotIndex],
      array[high],
    ] = [
      array[high],
      array[finalPivotIndex],
    ];


    /*
     * Pivot completed.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPLETE,
        codeLine: 21,
        array,
        low,
        high,
        pivotIndex:
          finalPivotIndex,
        leftPointer:
          finalPivotIndex,
        rightPointer:
          finalPivotIndex,
        comparing: [],
        swapping: [],
        sortedRanges: [
          ...sortedRanges,
        ],
        phase: "partitionComplete",
        explanation:
          `Pivot ${pivot} is positioned at index ${finalPivotIndex}.`,
        detail:
          "The pivot is now permanently sorted. Quick Sort only needs to process the two partitions around it.",
      })
    );


    return finalPivotIndex;
  }


  /*
   * =======================================================
   * START
   * =======================================================
   */

  if (array.length > 0) {

    quickSort(
      0,
      array.length - 1
    );

  }


  /*
   * =======================================================
   * FINAL
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.COMPLETE,
      codeLine: 7,
      array,
      low: 0,
      high: array.length - 1,
      pivotIndex: null,
      leftPointer: null,
      rightPointer: null,
      comparing: [],
      swapping: [],
      sortedRanges: [
        [
          0,
          array.length - 1,
        ],
      ],
      phase: "complete",
      explanation:
        "Quick Sort is complete.",
      detail:
        "Every pivot has reached its final position and every remaining partition has been sorted recursively.",
    })
  );


  return steps;
}


export const defaultQuickSortArray = [
  7,
  3,
  9,
  2,
  5,
  8,
  1,
];