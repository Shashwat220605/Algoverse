import { STEP_ACTIONS } from "./algorithmTypes.js";

export const linearSearchCode = [
  "int linearSearch(int arr[], int n, int target) {",
  "    for (int i = 0; i < n; i++) {",
  "        if (arr[i] == target) {",
  "            return i;",
  "        }",
  "    }",
  "",
  "    return -1;",
  "}",
];


function createStep({
  id,
  action,
  codeLine,
  array,
  target,
  currentIndex = null,
  checked = [],
  foundIndex = null,
  phase,
  explanation,
  detail,
}) {
  return {
    id,
    action,
    codeLine,

    array: [...array],

    target,

    variables: {
      currentIndex,
      checked,
      foundIndex,
      phase,
    },

    explanation,
    detail,
  };
}


export function createLinearSearchTrace(
  inputArray,
  target
) {

  const array = [...inputArray];

  const steps = [];

  let stepId = 0;

  const checked = [];


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
      target,
      phase: "start",
      explanation:
        `Search for ${target} using Linear Search.`,
      detail:
        "Linear Search checks every element from left to right until the target is found or the array ends.",
    })
  );


  /*
   * =======================================================
   * SEARCH
   * =======================================================
   */

  for (
    let i = 0;
    i < array.length;
    i++
  ) {

    /*
     * Move to current element.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.MOVE_POINTER,
        codeLine: 1,
        array,
        target,
        currentIndex: i,
        checked: [...checked],
        phase: "checking",
        explanation:
          `Move to index ${i}.`,
        detail:
          `The current value is ${array[i]}. Linear Search examines elements one at a time.`,
      })
    );


    /*
     * Compare with target.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPARE,
        codeLine: 2,
        array,
        target,
        currentIndex: i,
        checked: [...checked],
        phase: "compare",
        explanation:
          `Compare ${array[i]} with ${target}.`,
        detail:
          array[i] === target
            ? "The current value matches the target."
            : "The current value does not match the target, so the search continues.",
      })
    );


    /*
     * FOUND
     */

    if (
      array[i] === target
    ) {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPLETE,
          codeLine: 3,
          array,
          target,
          currentIndex: i,
          checked: [...checked],
          foundIndex: i,
          phase: "found",
          explanation:
            `Target ${target} found at index ${i}.`,
          detail:
            "The search stops immediately because the target has been found.",
        })
      );


      return steps;
    }


    /*
     * Mark current element
     * as checked.
     */

    checked.push(i);


    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.HIGHLIGHT,
        codeLine: 4,
        array,
        target,
        currentIndex: i,
        checked: [...checked],
        phase: "notFound",
        explanation:
          `${array[i]} is not the target.`,
        detail:
          "This element has been checked and can now be skipped.",
      })
    );

  }


  /*
   * =======================================================
   * NOT FOUND
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.COMPLETE,
      codeLine: 7,
      array,
      target,
      currentIndex: null,
      checked: [...checked],
      foundIndex: null,
      phase: "notFoundFinal",
      explanation:
        `Target ${target} was not found.`,
      detail:
        "Every element has been checked, so Linear Search returns -1.",
    })
  );


  return steps;
}


export const defaultLinearSearchArray = [
  7,
  3,
  9,
  2,
  5,
  8,
  1,
];


export const defaultLinearSearchTarget = 5;