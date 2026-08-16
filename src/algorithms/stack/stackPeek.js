import { STEP_ACTIONS } from "../linkedlist/algorithmTypes.js";

/*
 * =========================================================
 * STACK PEEK
 * =========================================================
 *
 * Peek reads the TOP element without removing it.
 *
 * Time Complexity: O(1)
 * =========================================================
 */

export const stackPeekCode = [
  "if (top == nullptr)",
  "    return;",
  "",
  "cout << top->data;",
];


function createStep({
  id,
  action,
  codeLine,
  array,
  topIndex = null,
  topValue = null,
  phase,
  explanation,
  detail,
}) {

  return {
    id,
    action,
    codeLine,

    array: [...array],

    target: topValue,

    variables: {
      topIndex,
      topValue,
      phase,
    },

    explanation,
    detail,
  };
}


/*
 * =========================================================
 * CREATE PEEK TRACE
 * =========================================================
 */

export function createStackPeekTrace(
  inputArray
) {

  const array = [
    ...inputArray,
  ];

  const steps = [];

  let stepId = 0;


  /*
   * =======================================================
   * EMPTY STACK
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
          "The stack is empty.",

        detail:
          "There is no TOP element to inspect.",
      })
    );


    return steps;
  }


  const topIndex =
    array.length - 1;


  const topValue =
    array[topIndex];


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

      topIndex,

      topValue,

      phase: "check",

      explanation:
        "Check whether the stack is empty.",

      detail:
        "The stack contains elements, so TOP can be inspected.",
    })
  );


  /*
   * =======================================================
   * READ TOP
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.HIGHLIGHT,

      codeLine: 3,

      array,

      topIndex,

      topValue,

      phase: "read-top",

      explanation:
        `Read the TOP value: ${topValue}.`,

      detail:
        "PEEK only reads the TOP element. Nothing is removed.",
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

      topIndex,

      topValue,

      phase: "complete",

      explanation:
        `PEEK returns ${topValue}.`,

      detail:
        "The stack remains unchanged because PEEK does not remove the TOP node.",
    })
  );


  return steps;
}


export const defaultStackPeekArray = [
  10,
  20,
  30,
];