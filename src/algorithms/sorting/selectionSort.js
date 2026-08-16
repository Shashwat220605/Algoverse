import { STEP_ACTIONS } from "./algorithmTypes.js";

export const selectionSortCode = [
  "for (int i = 0; i < n - 1; i++) {",
  "    int minIndex = i;",
  "",
  "    for (int j = i + 1; j < n; j++) {",
  "        if (arr[j] < arr[minIndex]) {",
  "            minIndex = j;",
  "        }",
  "    }",
  "",
  "    swap(arr[i], arr[minIndex]);",
  "}",
];


function createStep({
  id,
  action,
  codeLine,
  array,
  i,
  j,
  minIndex,
  sortedFrom,
  comparing = [],
  swapping = [],
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
      i,
      j,
      minIndex,
      sortedFrom,
      comparing,
      swapping,
    },

    explanation,
    detail,
  };
}


export function createSelectionSortTrace(
  inputArray
) {
  const array = [...inputArray];

  const steps = [];

  let stepId = 0;

  const n = array.length;


  /*
   * Initial state
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.INITIALIZE,
      codeLine: 0,
      array,
      i: 0,
      j: 0,
      minIndex: 0,
      sortedFrom: 0,
      explanation:
        "Selection Sort begins with an empty sorted section.",
      detail:
        "We will repeatedly find the smallest value in the unsorted portion and place it at the beginning of that portion.",
    })
  );


  /*
   * Outer loop
   */

  for (
    let i = 0;
    i < n - 1;
    i++
  ) {

    let minIndex = i;


    /*
     * Start a new selection pass.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.MOVE_POINTER,
        codeLine: 1,
        array,
        i,
        j: i + 1,
        minIndex,
        sortedFrom: i,
        explanation:
          `Start at index ${i} and assume ${array[i]} is the minimum.`,
        detail:
          `The first unsorted element becomes our initial minimum candidate. We now scan the remaining unsorted elements.`,
      })
    );


    /*
     * Inner loop.
     */

    for (
      let j = i + 1;
      j < n;
      j++
    ) {

      /*
       * Compare current element
       * with current minimum.
       */

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPARE,
          codeLine: 4,
          array,
          i,
          j,
          minIndex,
          sortedFrom: i,
          comparing: [
            j,
            minIndex,
          ],
          swapping: [],
          explanation:
            `Compare ${array[j]} with the current minimum ${array[minIndex]}.`,
          detail:
            `If ${array[j]} is smaller than ${array[minIndex]}, we have found a better minimum candidate.`,
        })
      );


      /*
       * New minimum found.
       */

      if (
        array[j] <
        array[minIndex]
      ) {

        minIndex = j;


        steps.push(
          createStep({
            id: stepId++,
            action: STEP_ACTIONS.MOVE_POINTER,
            codeLine: 5,
            array,
            i,
            j,
            minIndex,
            sortedFrom: i,
            comparing: [j],
            swapping: [],
            explanation:
              `${array[j]} is the new minimum.`,
            detail:
              `The value ${array[j]} is smaller than every minimum candidate we have seen so far in this pass.`,
          })
        );

      } else {

        steps.push(
          createStep({
            id: stepId++,
            action: STEP_ACTIONS.HIGHLIGHT,
            codeLine: 4,
            array,
            i,
            j,
            minIndex,
            sortedFrom: i,
            comparing: [j],
            swapping: [],
            explanation:
              `${array[j]} is not smaller than the current minimum.`,
            detail:
              `The current minimum remains ${array[minIndex]}, so we continue scanning.`,
          })
        );

      }
    }


    /*
     * Show the final minimum.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPLETE,
        codeLine: 9,
        array,
        i,
        j: null,
        minIndex,
        sortedFrom: i,
        comparing: [],
        swapping: [],
        explanation:
          `The minimum value is ${array[minIndex]}.`,
        detail:
          `We have scanned the entire unsorted section. The smallest value belongs at index ${i}.`,
      })
    );


    /*
     * Swap minimum into position.
     */

    if (minIndex !== i) {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.SWAP,
          codeLine: 9,
          array,
          i,
          j: null,
          minIndex,
          sortedFrom: i,
          comparing: [i, minIndex],
          swapping: [i, minIndex],
          explanation:
            `Swap ${array[i]} with the minimum value ${array[minIndex]}.`,
          detail:
            `Moving the minimum to index ${i} permanently places the smallest remaining value into the sorted section.`,
        })
      );


      [
        array[i],
        array[minIndex],
      ] = [
        array[minIndex],
        array[i],
      ];


      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPLETE,
          codeLine: 9,
          array,
          i,
          j: null,
          minIndex: i,
          sortedFrom: i + 1,
          comparing: [],
          swapping: [],
          explanation:
            `Position ${i} is now sorted.`,
          detail:
            `The smallest value from the unsorted portion has been placed at index ${i}.`,
        })
      );

    } else {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPLETE,
          codeLine: 9,
          array,
          i,
          j: null,
          minIndex: i,
          sortedFrom: i + 1,
          comparing: [],
          swapping: [],
          explanation:
            `${array[i]} is already the minimum, so no swap is needed.`,
          detail:
            `The current position already contains the smallest value in the remaining unsorted portion.`,
        })
      );

    }
  }


  /*
   * Final state.
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.COMPLETE,
      codeLine: 10,
      array,
      i: n,
      j: null,
      minIndex: null,
      sortedFrom: n,
      comparing: [],
      swapping: [],
      explanation:
        "Selection Sort is complete.",
      detail:
        "Every position now contains the smallest value that belongs there, so the entire array is sorted.",
    })
  );


  return steps;
}


export const defaultSelectionSortArray = [
  7,
  3,
  9,
  2,
  5,
];