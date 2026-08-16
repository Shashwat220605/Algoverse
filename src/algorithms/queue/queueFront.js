import { STEP_ACTIONS } from "../linkedlist/algorithmTypes.js";

/*
 * =========================================================
 * QUEUE FRONT
 * =========================================================
 *
 * Front reads the first element without removing it.
 *
 * Time Complexity: O(1)
 * =========================================================
 */

export const queueFrontCode = [
  "if (front == nullptr)",
  "    return;",
  "",
  "cout << front->data;",
];


function createStep({
  id,
  action,
  codeLine,
  array,
  frontIndex = null,
  frontValue = null,
  phase,
  explanation,
  detail,
}) {
  return {
    id,
    action,
    codeLine,

    array: [...array],

    target: frontValue,

    variables: {
      frontIndex,
      frontValue,
      phase,
    },

    explanation,
    detail,
  };
}


/*
 * =========================================================
 * CREATE FRONT TRACE
 * =========================================================
 */

export function createQueueFrontTrace(
  inputArray
) {
  const array = [
    ...inputArray,
  ];

  const steps = [];

  let stepId = 0;


  /*
   * =======================================================
   * EMPTY QUEUE
   * =======================================================
   */

  if (
    array.length === 0
  ) {
    steps.push(
      createStep({
        id: stepId++,

        action:
          STEP_ACTIONS.COMPLETE,

        codeLine: 0,

        array,

        phase: "empty",

        explanation:
          "The queue is empty.",

        detail:
          "There is no FRONT element to inspect.",
      })
    );

    return steps;
  }


  const frontIndex = 0;

  const frontValue =
    array[frontIndex];


  /*
   * =======================================================
   * CHECK EMPTY
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.HIGHLIGHT,

      codeLine: 0,

      array,

      frontIndex,

      frontValue,

      phase: "check",

      explanation:
        "Check whether the queue is empty.",

      detail:
        "The queue contains elements, so FRONT can be inspected.",
    })
  );


  /*
   * =======================================================
   * READ FRONT
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.HIGHLIGHT,

      codeLine: 3,

      array,

      frontIndex,

      frontValue,

      phase: "read-front",

      explanation:
        `Read the FRONT value: ${frontValue}.`,

      detail:
        "FRONT only reads the first element. Nothing is removed.",
    })
  );


  /*
   * =======================================================
   * COMPLETE
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.COMPLETE,

      codeLine: 3,

      array,

      frontIndex,

      frontValue,

      phase: "complete",

      explanation:
        `FRONT returns ${frontValue}.`,

      detail:
        "The queue remains unchanged because FRONT does not remove the element.",
    })
  );


  return steps;
}


export const defaultQueueFrontArray = [
  10,
  20,
  30,
];