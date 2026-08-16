import { STEP_ACTIONS } from "./algorithmTypes.js";

export const mergeSortCode = [
  "void mergeSort(int left, int right) {",
  "    if (left >= right) return;",
  "",
  "    int mid = (left + right) / 2;",
  "",
  "    mergeSort(left, mid);",
  "    mergeSort(mid + 1, right);",
  "",
  "    merge(left, mid, right);",
  "}",
  "",
  "void merge(int left, int mid, int right) {",
  "    int i = left;",
  "    int j = mid + 1;",
  "",
  "    while (i <= mid && j <= right) {",
  "        if (arr[i] <= arr[j]) {",
  "            temp.push(arr[i]);",
  "            i++;",
  "        } else {",
  "            temp.push(arr[j]);",
  "            j++;",
  "        }",
  "    }",
  "",
  "    while (i <= mid) {",
  "        temp.push(arr[i]);",
  "        i++;",
  "    }",
  "",
  "    while (j <= right) {",
  "        temp.push(arr[j]);",
  "        j++;",
  "    }",
  "",
  "    copyBack();",
  "}",
];


function createStep({
  id,
  action,
  codeLine,
  array,
  left,
  mid,
  right,
  leftIndex = null,
  rightIndex = null,
  writeIndex = null,
  comparing = [],
  merging = [],
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
      left,
      mid,
      right,
      leftIndex,
      rightIndex,
      writeIndex,
      comparing,
      merging,
      sortedRanges,
      phase,
    },

    explanation,
    detail,
  };
}


export function createMergeSortTrace(
  inputArray
) {
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
      left: 0,
      mid: null,
      right: array.length - 1,
      phase: "start",
      explanation:
        "Merge Sort begins by treating the entire array as one unsorted range.",
      detail:
        "Instead of sorting the array directly, Merge Sort repeatedly divides it into smaller ranges.",
    })
  );


  /*
   * =======================================================
   * MERGE SORT RECURSION
   * =======================================================
   */

  function mergeSort(
    left,
    right
  ) {

    /*
     * Base case
     */

    if (left >= right) {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPLETE,
          codeLine: 1,
          array,
          left,
          mid: null,
          right,
          sortedRanges: [...sortedRanges],
          phase: "base",
          explanation:
            `Range ${left} to ${right} contains one element.`,
          detail:
            "A single element is already sorted, so this recursion branch stops here.",
        })
      );

      return;
    }


    /*
     * Calculate midpoint.
     */

    const mid =
      Math.floor(
        (left + right) / 2
      );


    /*
     * Show split.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.MOVE_POINTER,
        codeLine: 3,
        array,
        left,
        mid,
        right,
        sortedRanges: [...sortedRanges],
        phase: "split",
        explanation:
          `Split the range from ${left} to ${right} at index ${mid}.`,
        detail:
          `The left half is ${left} to ${mid}, while the right half is ${mid + 1} to ${right}.`,
      })
    );


    /*
     * Show left half.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.HIGHLIGHT,
        codeLine: 5,
        array,
        left,
        mid,
        right,
        sortedRanges: [...sortedRanges],
        phase: "left",
        explanation:
          `Process the left half from ${left} to ${mid}.`,
        detail:
          "Merge Sort recursively divides the left half until each piece contains one element.",
      })
    );


    mergeSort(
      left,
      mid
    );


    /*
     * Show right half.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.HIGHLIGHT,
        codeLine: 6,
        array,
        left,
        mid,
        right,
        sortedRanges: [...sortedRanges],
        phase: "right",
        explanation:
          `Process the right half from ${mid + 1} to ${right}.`,
        detail:
          "Once the left side has been divided, Merge Sort recursively processes the right side.",
      })
    );


    mergeSort(
      mid + 1,
      right
    );


    /*
     * Merge the two sorted halves.
     */

    merge(
      left,
      mid,
      right
    );


    /*
     * Remember this range as sorted.
     */

    sortedRanges.push([
      left,
      right,
    ]);


    /*
     * Remove ranges contained inside
     * this newly merged range.
     */

    for (
      let index =
        sortedRanges.length - 2;
      index >= 0;
      index--
    ) {

      const [
        rangeLeft,
        rangeRight,
      ] =
        sortedRanges[index];


      if (
        rangeLeft >= left &&
        rangeRight <= right
      ) {

        sortedRanges.splice(
          index,
          1
        );

      }

    }


    /*
     * Show completed merge.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPLETE,
        codeLine: 9,
        array,
        left,
        mid,
        right,
        sortedRanges: [...sortedRanges],
        phase: "merged",
        explanation:
          `The range ${left} to ${right} is now sorted.`,
        detail:
          `The two sorted halves have been merged into one sorted range containing ${right - left + 1} elements.`,
      })
    );
  }


  /*
   * =======================================================
   * MERGE
   * =======================================================
   */

  function merge(
    left,
    mid,
    right
  ) {

    const leftPart =
      array.slice(
        left,
        mid + 1
      );

    const rightPart =
      array.slice(
        mid + 1,
        right + 1
      );


    let i = 0;
    let j = 0;
    let writeIndex = left;


    /*
     * Start merge.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.HIGHLIGHT,
        codeLine: 11,
        array,
        left,
        mid,
        right,
        leftIndex: left,
        rightIndex: mid + 1,
        writeIndex,
        merging: [
          ...Array.from(
            {
              length:
                right - left + 1,
            },
          ).map(
            (_, index) =>
              left + index
          ),
        ],
        sortedRanges: [...sortedRanges],
        phase: "merge",
        explanation:
          `Merge the two sorted ranges ${left}-${mid} and ${mid + 1}-${right}.`,
        detail:
          "We compare the smallest remaining element from each half and place the smaller one into the result.",
      })
    );


    /*
     * Compare both halves.
     */

    while (
      i < leftPart.length &&
      j < rightPart.length
    ) {

      const actualLeftIndex =
        left + i;

      const actualRightIndex =
        mid + 1 + j;


      /*
       * Comparison step.
       */

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPARE,
          codeLine: 16,
          array,
          left,
          mid,
          right,
          leftIndex:
            actualLeftIndex,
          rightIndex:
            actualRightIndex,
          writeIndex,
          comparing: [
            actualLeftIndex,
            actualRightIndex,
          ],
          merging: [
            writeIndex,
          ],
          sortedRanges: [...sortedRanges],
          phase: "compare",
          explanation:
            `Compare ${leftPart[i]} and ${rightPart[j]}.`,
          detail:
            `The left value is ${leftPart[i]} and the right value is ${rightPart[j]}. The smaller value will be written next.`,
        })
      );


      /*
       * Left value wins.
       */

      if (
        leftPart[i] <=
        rightPart[j]
      ) {

        array[writeIndex] =
          leftPart[i];


        steps.push(
          createStep({
            id: stepId++,
            action: STEP_ACTIONS.COMPLETE,
            codeLine: 18,
            array,
            left,
            mid,
            right,
            leftIndex:
              actualLeftIndex,
            rightIndex:
              actualRightIndex,
            writeIndex,
            comparing: [],
            merging: [
              writeIndex,
            ],
            sortedRanges: [...sortedRanges],
            phase: "write",
            explanation:
              `${leftPart[i]} is smaller, so it is placed into the merged section.`,
            detail:
              `The value ${leftPart[i]} moves to index ${writeIndex}.`,
          })
        );


        i++;

      } else {

        /*
         * Right value wins.
         */

        array[writeIndex] =
          rightPart[j];


        steps.push(
          createStep({
            id: stepId++,
            action: STEP_ACTIONS.COMPLETE,
            codeLine: 21,
            array,
            left,
            mid,
            right,
            leftIndex:
              actualLeftIndex,
            rightIndex:
              actualRightIndex,
            writeIndex,
            comparing: [],
            merging: [
              writeIndex,
            ],
            sortedRanges: [...sortedRanges],
            phase: "write",
            explanation:
              `${rightPart[j]} is smaller, so it is placed into the merged section.`,
            detail:
              `The value ${rightPart[j]} moves to index ${writeIndex}.`,
          })
        );


        j++;
      }


      writeIndex++;
    }


    /*
     * =====================================================
     * REMAINING LEFT ELEMENTS
     * =====================================================
     */

    while (
      i < leftPart.length
    ) {

      const actualLeftIndex =
        left + i;


      array[writeIndex] =
        leftPart[i];


      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPLETE,
          codeLine: 26,
          array,
          left,
          mid,
          right,
          leftIndex:
            actualLeftIndex,
          rightIndex: null,
          writeIndex,
          comparing: [],
          merging: [
            writeIndex,
          ],
          sortedRanges: [...sortedRanges],
          phase: "write",
          explanation:
            `Place the remaining left value ${leftPart[i]}.`,
          detail:
            "The right half has been exhausted, so all remaining values from the left half can be copied directly.",
        })
      );


      i++;
      writeIndex++;
    }


    /*
     * =====================================================
     * REMAINING RIGHT ELEMENTS
     * =====================================================
     */

    while (
      j < rightPart.length
    ) {

      const actualRightIndex =
        mid + 1 + j;


      array[writeIndex] =
        rightPart[j];


      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPLETE,
          codeLine: 30,
          array,
          left,
          mid,
          right,
          leftIndex: null,
          rightIndex:
            actualRightIndex,
          writeIndex,
          comparing: [],
          merging: [
            writeIndex,
          ],
          sortedRanges: [...sortedRanges],
          phase: "write",
          explanation:
            `Place the remaining right value ${rightPart[j]}.`,
          detail:
            "The left half has been exhausted, so the remaining values from the right half can be copied directly.",
        })
      );


      j++;
      writeIndex++;
    }
  }


  /*
   * =======================================================
   * START MERGE SORT
   * =======================================================
   */

  if (array.length > 0) {

    mergeSort(
      0,
      array.length - 1
    );

  }


  /*
   * =======================================================
   * FINAL STATE
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.COMPLETE,
      codeLine: 38,
      array,
      left: 0,
      mid: null,
      right: array.length - 1,
      sortedRanges: [
        [
          0,
          array.length - 1,
        ],
      ],
      phase: "complete",
      explanation:
        "Merge Sort is complete.",
      detail:
        "Every smaller sorted range has been merged until only one fully sorted array remains.",
    })
  );


  return steps;
}


export const defaultMergeSortArray = [
  7,
  3,
  9,
  2,
  5,
  8,
  1,
];