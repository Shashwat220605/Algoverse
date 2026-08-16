import { STEP_ACTIONS } from "../linkedlist/algorithmTypes.js";

/*
 * =========================================================
 * STACK PUSH
 * =========================================================
 *
 * Push adds a new element to the TOP of the stack.
 *
 * Example:
 *
 * Before:
 *
 * 30  <- TOP
 * 20
 * 10
 *
 * Push(40)
 *
 * After:
 *
 * 40  <- TOP
 * 30
 * 20
 * 10
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 *
 * =========================================================
 */

export const stackPushCode = [
  "Node* newNode = new Node(value);",
  "",
  "newNode->next = top;",
  "top = newNode;",
];


function createStep({
  id,
  action,
  codeLine,
  array,
  pushedValue,
  phase,
  explanation,
  detail,
}) {

  return {
    id,

    action,

    codeLine,

    array: [...array],

    target: pushedValue,

    variables: {
      pushedValue,
      phase,
    },

    explanation,

    detail,
  };
}


/*
 * =========================================================
 * CREATE STACK PUSH TRACE
 * =========================================================
 */

export function createStackPushTrace(
  inputArray,
  value
) {

  const original = [
    ...inputArray,
  ];

  const steps = [];

  let stepId = 0;


  /*
   * =======================================================
   * STEP 1
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.INITIALIZE,

      codeLine: 0,

      array: original,

      pushedValue: value,

      phase: "create-node",

      explanation:
        `Create a new node containing ${value}.`,

      detail:
        "The new node will become the new TOP of the stack.",
    })
  );


  /*
   * =======================================================
   * STEP 2
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.MOVE_POINTER,

      codeLine: 2,

      array: original,

      pushedValue: value,

      phase: "connect-node",

      explanation:
        "Make the new node point to the current TOP.",

      detail:
        "This preserves the existing stack underneath the new node.",
    })
  );


  /*
   * =======================================================
   * STEP 3
   * =======================================================
   */

  const updatedArray = [
    ...original,
    value,
  ];


  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.COMPLETE,

      codeLine: 3,

      array: updatedArray,

      pushedValue: value,

      phase: "update-top",

      explanation:
        `${value} becomes the new TOP.`,

      detail:
        "The TOP pointer is updated so that it points to the newly created node.",
    })
  );


  /*
   * =======================================================
   * STEP 4
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.COMPLETE,

      codeLine: 3,

      array: updatedArray,

      pushedValue: value,

      phase: "complete",

      explanation:
        `Push(${value}) is complete.`,

      detail:
        `The stack now contains [${updatedArray.join(
          ", "
        )}] with ${value} at the TOP.`,
    })
  );


  return steps;
}


/*
 * =========================================================
 * DEFAULT VALUES
 * =========================================================
 */

export const defaultStackArray = [
  10,
  20,
  30,
];

export const defaultStackPushValue = 40;