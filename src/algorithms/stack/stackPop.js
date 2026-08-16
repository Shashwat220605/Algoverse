import { STEP_ACTIONS } from "../linkedlist/algorithmTypes.js";

/*
 * =========================================================
 * STACK POP
 * =========================================================
 *
 * Pop removes the element from the TOP of the stack.
 *
 * Example:
 *
 * Before:
 *
 * 30 <- TOP
 * 20
 * 10
 *
 * After:
 *
 * 20 <- TOP
 * 10
 *
 * Time Complexity: O(1)
 * =========================================================
 */

export const stackPopCode = [
  "if (top == nullptr)",
  "    return;",
  "",
  "Node* temp = top;",
  "top = top->next;",
  "delete temp;",
];


function createStep({
  id,
  action,
  codeLine,
  array,
  removedValue = null,
  phase,
  explanation,
  detail,
}) {

  return {
    id,
    action,
    codeLine,

    array: [...array],

    target: removedValue,

    variables: {
      removedValue,
      phase,
    },

    explanation,
    detail,
  };
}


/*
 * =========================================================
 * CREATE POP TRACE
 * =========================================================
 */

export function createStackPopTrace(
  inputArray
) {

  const original = [
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
    original.length === 0
  ) {

    steps.push(
      createStep({
        id: stepId++,

        action:
          STEP_ACTIONS.COMPLETE,

        codeLine: 0,

        array: [],

        phase: "empty",

        explanation:
          "The stack is empty.",

        detail:
          "There is no TOP element to remove.",
      })
    );


    return steps;
  }


  const topIndex =
    original.length - 1;


  const removedValue =
    original[topIndex];


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

      array: original,

      removedValue,

      phase: "check",

      explanation:
        "Check whether the stack is empty.",

      detail:
        "The stack contains elements, so POP can continue.",
    })
  );


  /*
   * =======================================================
   * SAVE TOP
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.MOVE_POINTER,

      codeLine: 3,

      array: original,

      removedValue,

      phase: "save-top",

      explanation:
        `Save the current TOP node containing ${removedValue}.`,

      detail:
        "A temporary pointer keeps track of the node that will be removed.",
    })
  );


  /*
   * =======================================================
   * MOVE TOP
   * =======================================================
   */

  const updatedArray =
    original.slice(
      0,
      -1
    );


  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.MOVE_POINTER,

      codeLine: 4,

      array: original,

      removedValue,

      phase: "move-top",

      explanation:
        "Move TOP to the next node.",

      detail:
        "The element underneath the old TOP becomes the new TOP.",
    })
  );


  /*
   * =======================================================
   * DELETE OLD TOP
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.COMPLETE,

      codeLine: 5,

      array: updatedArray,

      removedValue,

      phase: "delete",

      explanation:
        `Remove ${removedValue} from the stack.`,

      detail:
        "The old TOP node is deleted.",
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

      codeLine: 5,

      array: updatedArray,

      removedValue,

      phase: "complete",

      explanation:
        `POP complete. ${removedValue} was removed.`,

      detail:
        `The new TOP is ${
          updatedArray.length > 0
            ? updatedArray[
                updatedArray.length - 1
              ]
            : "NULL"
        }.`,
    })
  );


  return steps;
}


export const defaultStackPopArray = [
  10,
  20,
  30,
];