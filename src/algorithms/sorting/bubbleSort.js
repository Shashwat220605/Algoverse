import { STEP_ACTIONS } from "./algorithmTypes.js";

export const bubbleSortCode = [
  "for (int i = 0; i < n - 1; i++) {",
  "    for (int j = 0; j < n - i - 1; j++) {",
  "",
  "        if (arr[j] > arr[j + 1]) {",
  "            swap(arr[j], arr[j + 1]);",
  "        }",
  "    }",
  "}",
];


function createStep({
  id,
  action,
  codeLine,
  array,
  i,
  j,
  comparing,
  swapping,
  sortedFrom,
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
      comparing,
      swapping,
      sortedFrom,
    },

    explanation,
    detail,
  };
}


export function createBubbleSortTrace(
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
      comparing: [],
      swapping: [],
      sortedFrom: n,
      explanation:
        "Bubble Sort starts by making repeated passes through the array.",
      detail:
        "During each pass, we compare neighboring elements. Larger values gradually move toward the right side.",
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

    /*
     * Start of a new pass.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.HIGHLIGHT,
        codeLine: 0,
        array,
        i,
        j: 0,
        comparing: [],
        swapping: [],
        sortedFrom: n - i,
        explanation:
          `Pass ${i + 1} begins.`,
        detail:
          `The last ${i} element${i === 1 ? "" : "s"} on the right are already sorted, so this pass only needs to examine the remaining portion.`,
      })
    );


    /*
     * Inner loop
     */

    for (
      let j = 0;
      j < n - i - 1;
      j++
    ) {

      /*
       * Show comparison.
       */

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPARE,
          codeLine: 3,
          array,
          i,
          j,
          comparing: [j, j + 1],
          swapping: [],
          sortedFrom: n - i,
          explanation:
            `We compare ${array[j]} and ${array[j + 1]}.`,
          detail:
            `Bubble Sort compares neighboring elements to determine whether they are in the correct order.`,
        })
      );


      /*
       * Swap required.
       */

      if (
        array[j] >
        array[j + 1]
      ) {

        const first =
          array[j];

        const second =
          array[j + 1];


        /*
         * Show swap decision.
         */

        steps.push(
          createStep({
            id: stepId++,
            action: STEP_ACTIONS.SWAP,
            codeLine: 4,
            array,
            i,
            j,
            comparing: [j, j + 1],
            swapping: [j, j + 1],
            sortedFrom: n - i,
            explanation:
              `${first} is greater than ${second}, so we need to swap them.`,
            detail:
              `Because we are sorting in ascending order, the smaller value ${second} must move to the left of ${first}.`,
          })
        );


        /*
         * Perform actual swap.
         */

        [
          array[j],
          array[j + 1],
        ] = [
          array[j + 1],
          array[j],
        ];


        /*
         * Show result of swap.
         */

        steps.push(
          createStep({
            id: stepId++,
            action: STEP_ACTIONS.COMPLETE,
            codeLine: 4,
            array,
            i,
            j,
            comparing: [j, j + 1],
            swapping: [],
            sortedFrom: n - i,
            explanation:
              `The swap is complete.`,
            detail:
              `The array now has ${array[j]} before ${array[j + 1]}. We continue comparing the next pair.`,
          })
        );

      } else {

        /*
         * No swap required.
         */

        steps.push(
          createStep({
            id: stepId++,
            action: STEP_ACTIONS.HIGHLIGHT,
            codeLine: 3,
            array,
            i,
            j,
            comparing: [j, j + 1],
            swapping: [],
            sortedFrom: n - i,
            explanation:
              `${array[j]} is already smaller than or equal to ${array[j + 1]}, so no swap is needed.`,
            detail:
              "The two neighboring elements are already in ascending order. We move to the next pair.",
          })
        );
      }
    }


    /*
     * The largest remaining element
     * has reached its final position.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPLETE,
        codeLine: 7,
        array,
        i,
        j: null,
        comparing: [],
        swapping: [],
        sortedFrom: n - i - 1,
        explanation:
          `Pass ${i + 1} is complete.`,
        detail:
          `The largest unsorted value has bubbled to index ${n - i - 1}. That position is now permanently sorted.`,
      })
    );
  }


  /*
   * Final state.
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.COMPLETE,
      codeLine: 7,
      array,
      i: n - 1,
      j: null,
      comparing: [],
      swapping: [],
      sortedFrom: 0,
      explanation:
        "Bubble Sort is complete.",
      detail:
        "Every element is now in ascending order.",
    })
  );


  return steps;
}


export const defaultBubbleSortArray = [
  7,
  3,
  9,
  2,
  5,
];