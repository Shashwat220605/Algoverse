import { STEP_ACTIONS } from "../linkedlist/algorithmTypes.js";

/*
 * =========================================================
 * QUEUE DEQUEUE
 * =========================================================
 *
 * Dequeue removes the element from the FRONT.
 *
 * Example:
 *
 * FRONT                    REAR
 *   ↓                        ↓
 *  10 → 20 → 30 → 40
 *
 * Dequeue()
 *
 * FRONT             REAR
 *   ↓                 ↓
 *  20 → 30 → 40
 *
 * Time Complexity: O(1)
 * =========================================================
 */

export const queueDequeueCode = [
  "if (front == nullptr)",
  "    return;",
  "",
  "Node* temp = front;",
  "front = front->next;",
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
 * CREATE DEQUEUE TRACE
 * =========================================================
 */

export function createQueueDequeueTrace(
  inputArray
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
    steps.push(
      createStep({
        id: stepId++,

        action:
          STEP_ACTIONS.COMPLETE,

        codeLine: 0,

        array: [],

        phase: "empty",

        explanation:
          "The queue is empty.",

        detail:
          "There is no FRONT element to remove.",
      })
    );

    return steps;
  }


  const removedValue =
    original[0];


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
        "Check whether the queue is empty.",

      detail:
        "The queue contains elements, so DEQUEUE can continue.",
    })
  );


  /*
   * =======================================================
   * SAVE FRONT
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

      phase: "save-front",

      explanation:
        `Save the current FRONT node containing ${removedValue}.`,

      detail:
        "A temporary pointer keeps track of the node that will be removed.",
    })
  );


  /*
   * =======================================================
   * MOVE FRONT
   * =======================================================
   */

  const updatedArray =
    original.slice(1);


  steps.push(
    createStep({
      id: stepId++,

      action:
        STEP_ACTIONS.MOVE_POINTER,

      codeLine: 4,

      array: original,

      removedValue,

      phase: "move-front",

      explanation:
        "Move FRONT to the next node.",

      detail:
        "The second element becomes the new FRONT.",
    })
  );


  /*
   * =======================================================
   * DELETE OLD FRONT
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
        `Remove ${removedValue} from the queue.`,

      detail:
        "The old FRONT node is deleted.",
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
        `Dequeue complete. ${removedValue} was removed.`,

      detail:
        updatedArray.length > 0
          ? `The new FRONT is ${updatedArray[0]}.`
          : "The queue is now empty.",
    })
  );


  return steps;
}


export const defaultQueueDequeueArray = [
  10,
  20,
  30,
];