import { STEP_ACTIONS } from "../linkedlist/algorithmTypes.js";

/*
 * =========================================================
 * QUEUE ENQUEUE
 * =========================================================
 *
 * Enqueue adds an element to the REAR of the queue.
 *
 * Example:
 *
 * FRONT                         REAR
 *   ↓                             ↓
 *  10 → 20 → 30
 *
 * Enqueue(40)
 *
 * FRONT                              REAR
 *   ↓                                  ↓
 *  10 → 20 → 30 → 40
 *
 * Time Complexity: O(1)
 * =========================================================
 */

export const queueEnqueueCode = [
  "Node* newNode = new Node(value);",
  "",
  "rear->next = newNode;",
  "rear = newNode;",
];


function createStep({
  id,
  action,
  codeLine,
  array,
  value,
  phase,
  explanation,
  detail,
}) {

  return {
    id,
    action,
    codeLine,

    array: [...array],

    target: value,

    variables: {
      value,
      phase,
    },

    explanation,
    detail,
  };
}


/*
 * =========================================================
 * CREATE ENQUEUE TRACE
 * =========================================================
 */

export function createQueueEnqueueTrace(
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
   * EMPTY QUEUE
   * =======================================================
   */

  if (
    original.length === 0
  ) {

    const updatedArray = [
      value,
    ];


    steps.push(
      createStep({
        id: stepId++,

        action:
          STEP_ACTIONS.INITIALIZE,

        codeLine: 0,

        array: updatedArray,

        value,

        phase: "create-node",

        explanation:
          `Create a new node containing ${value}.`,

        detail:
          "Because the queue is empty, the new node becomes both FRONT and REAR.",
      })
    );


    steps.push(
      createStep({
        id: stepId++,

        action:
          STEP_ACTIONS.COMPLETE,

        codeLine: 3,

        array: updatedArray,

        value,

        phase: "complete",

        explanation:
          `${value} has been added to the queue.`,

        detail:
          `The queue now contains [${updatedArray.join(
            ", "
          )}].`,
      })
    );


    return steps;
  }


  /*
   * =======================================================
   * CREATE NEW NODE
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.INITIALIZE,

      codeLine: 0,

      array: original,

      value,

      phase: "create-node",

      explanation:
        `Create a new node containing ${value}.`,

      detail:
        "The new node will be added at the REAR of the queue.",
    })
  );


  /*
   * =======================================================
   * CONNECT REAR
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.MOVE_POINTER,

      codeLine: 2,

      array: original,

      value,

      phase: "connect-node",

      explanation:
        "Connect the current REAR node to the new node.",

      detail:
        "The new node is linked after the current last node.",
    })
  );


  /*
   * =======================================================
   * UPDATE REAR
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
        STEP_ACTIONS.MOVE_POINTER,

      codeLine: 3,

      array: updatedArray,

      value,

      phase: "update-rear",

      explanation:
        `${value} becomes the new REAR.`,

      detail:
        "The REAR pointer now points to the newly inserted node.",
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

      array: updatedArray,

      value,

      phase: "complete",

      explanation:
        `Enqueue(${value}) is complete.`,

      detail:
        `The queue now contains [${updatedArray.join(
          ", "
        )}].`,
    })
  );


  return steps;
}


export const defaultQueueArray = [
  10,
  20,
  30,
];


export const defaultQueueEnqueueValue = 40;