import { STEP_ACTIONS } from "./algorithmTypes.js";

export const binarySearchCode = [
  "int left = 0;",
  "int right = arr.length - 1;",
  "",
  "while (left <= right) {",
  "    int mid = left + (right - left) / 2;",
  "",
  "    if (arr[mid] == target)",
  "        return mid;",
  "",
  "    if (arr[mid] < target)",
  "        left = mid + 1;",
  "    else",
  "        right = mid - 1;",
  "}",
];

/*
 * Creates a single standardized algorithm step.
 *
 * Every algorithm in AlgoVerse will eventually
 * produce steps in this same format.
 */
function createStep({
  id,
  action,
  codeLine,
  array,
  target,
  left,
  right,
  mid = null,
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
      left,
      right,
      mid,
    },

    explanation,
    detail,
  };
}


/*
 * Binary Search Execution Engine
 *
 * Instead of manually writing every step,
 * we actually execute Binary Search and record
 * what happens.
 */
export function createBinarySearchTrace(
  array,
  target
) {
  const steps = [];

  let stepId = 0;

  let left = 0;
  let right = array.length - 1;

  /*
   * STEP 1
   * Initialize left
   */
  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.INITIALIZE,
      codeLine: 0,
      array,
      target,
      left,
      right,
      explanation:
        "We start by setting left to the first index of the array.",
      detail:
        `The first index is 0, so left = 0. Our search range currently contains the entire array.`,
    })
  );


  /*
   * STEP 2
   * Initialize right
   */
  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.INITIALIZE,
      codeLine: 1,
      array,
      target,
      left,
      right,
      explanation:
        "Next, we set right to the last index of the array.",
      detail:
        `The last index is ${right}, so our initial search range is from index ${left} to index ${right}.`,
    })
  );


  /*
   * Continue while a valid search range exists.
   */
  while (left <= right) {

    /*
     * STEP
     * Show the current search condition.
     */
    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.HIGHLIGHT,
        codeLine: 3,
        array,
        target,
        left,
        right,
        explanation:
          "The search range is still valid, so we continue searching.",
        detail:
          `left = ${left} and right = ${right}. Because left is not greater than right, there are still elements to inspect.`,
      })
    );


    /*
     * Calculate middle index.
     */
    const mid =
      left + Math.floor((right - left) / 2);


    /*
     * STEP
     * Calculate mid.
     */
    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.MOVE_POINTER,
        codeLine: 4,
        array,
        target,
        left,
        right,
        mid,
        explanation:
          "We calculate the middle index of the current search range.",
        detail:
          `mid = ${left} + (${right} - ${left}) / 2 = ${mid}. We will now inspect arr[${mid}].`,
      })
    );


    const middleValue = array[mid];


    /*
     * STEP
     * Compare middle value with target.
     */
    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPARE,
        codeLine: 6,
        array,
        target,
        left,
        right,
        mid,
        explanation:
          "We compare the middle element with the target.",
        detail:
          `arr[${mid}] = ${middleValue}, while the target is ${target}.`,
      })
    );


    /*
     * Target found.
     */
    if (middleValue === target) {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.FOUND,
          codeLine: 7,
          array,
          target,
          left,
          right,
          mid,
          explanation:
            "The middle element matches the target!",
          detail:
            `We found ${target} at index ${mid}. Binary Search can stop because the answer has been found.`,
        })
      );


      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPLETE,
          codeLine: 7,
          array,
          target,
          left,
          right,
          mid,
          explanation:
            "Binary Search is complete.",
          detail:
            `The target ${target} was found at index ${mid}.`,
        })
      );

      return steps;
    }


    /*
     * Target is greater than middle value.
     *
     * Search the right half.
     */
    if (middleValue < target) {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPARE,
          codeLine: 9,
          array,
          target,
          left,
          right,
          mid,
          explanation:
            "The middle value is smaller than the target.",
          detail:
            `${middleValue} < ${target}, so the target must be somewhere to the right of the middle element.`,
        })
      );


      const oldLeft = left;

      left = mid + 1;


      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.ELIMINATE,
          codeLine: 10,
          array,
          target,
          left,
          right,
          mid,
          explanation:
            "We eliminate the left half of the search range.",
          detail:
            `Everything from index ${oldLeft} through index ${mid} can be ignored. We move left to ${left}.`,
        })
      );

    }

    /*
     * Target is smaller than middle value.
     *
     * Search the left half.
     */
    else {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPARE,
          codeLine: 12,
          array,
          target,
          left,
          right,
          mid,
          explanation:
            "The middle value is greater than the target.",
          detail:
            `${middleValue} > ${target}, so the target must be somewhere to the left of the middle element.`,
        })
      );


      const oldRight = right;

      right = mid - 1;


      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.ELIMINATE,
          codeLine: 13,
          array,
          target,
          left,
          right,
          mid,
          explanation:
            "We eliminate the right half of the search range.",
          detail:
            `Everything from index ${mid} through index ${oldRight} can be ignored. We move right to ${right}.`,
        })
      );
    }
  }


  /*
   * Search failed.
   */
  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.COMPLETE,
      codeLine: 3,
      array,
      target,
      left,
      right,
      mid: null,
      explanation:
        "The search range is empty.",
      detail:
        `left = ${left} and right = ${right}, so there are no elements left to inspect. The target ${target} is not present in the array.`,
    })
  );


  return steps;
}


/*
 * Default example.
 *
 * This is useful when the page first loads.
 */
export const defaultBinarySearchArray = [
  3,
  8,
  12,
  17,
  25,
  31,
  42,
];

export const defaultBinarySearchTarget = 25;

export const binarySearchSteps =
  createBinarySearchTrace(
    defaultBinarySearchArray,
    defaultBinarySearchTarget
  );