import { STEP_ACTIONS } from "./algorithmTypes.js";

export const linkedListDeletionCode = [
  "if (position == 0) {",
  "    head = head->next;",
  "}",
  "else {",
  "    Node* current = head;",
  "",
  "    for (int i = 0; i < position - 1; i++)",
  "        current = current->next;",
  "",
  "    Node* nodeToDelete = current->next;",
  "    current->next = nodeToDelete->next;",
  "    delete nodeToDelete;",
  "}",
];

function createStep({
  id,
  action,
  codeLine,
  array,
  currentIndex = null,
  deleteIndex = null,
  previousIndex = null,
  phase,
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
      currentIndex,
      deleteIndex,
      previousIndex,
      phase,
    },

    explanation,
    detail,
  };
}

export function createLinkedListDeletionTrace(
  inputArray,
  position
) {
  const original = [...inputArray];

  const array = [...inputArray];

  const steps = [];

  let stepId = 0;


  /*
   * =====================================================
   * VALIDATION
   * =====================================================
   */

  if (
    !Number.isInteger(position) ||
    position < 0 ||
    position >= array.length
  ) {
    steps.push(
      createStep({
        id: stepId++,

        action: STEP_ACTIONS.COMPLETE,

        codeLine: 0,

        array,

        phase: "error",

        explanation:
          "Invalid deletion position.",

        detail:
          `Position must be between 0 and ${
            array.length - 1
          }.`,
      })
    );

    return steps;
  }


  /*
   * =====================================================
   * INITIAL STEP
   * =====================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action: STEP_ACTIONS.HIGHLIGHT,

      codeLine: 0,

      array,

      deleteIndex: position,

      phase: "start",

      explanation:
        `We want to delete the node at position ${position}.`,

      detail:
        `The node contains ${array[position]}.`,
    })
  );


  /*
   * =====================================================
   * DELETE HEAD
   * =====================================================
   */

  if (position === 0) {

    steps.push(
      createStep({
        id: stepId++,

        action: STEP_ACTIONS.MOVE_POINTER,

        codeLine: 1,

        array,

        currentIndex: 0,

        deleteIndex: 0,

        phase: "delete-head",

        explanation:
          "The node to delete is the HEAD node.",

        detail:
          "Move HEAD to the second node using head = head->next.",
      })
    );


    const updatedArray =
      array.slice(1);


    steps.push(
      createStep({
        id: stepId++,

        action: STEP_ACTIONS.COMPLETE,

        codeLine: 1,

        array: updatedArray,

        currentIndex: null,

        deleteIndex: null,

        phase: "complete",

        explanation:
          `Deleted ${array[0]} from the beginning.`,

        detail:
          `The list changed from [${original.join(
            ", "
          )}] to [${updatedArray.join(", ")}].`,
      })
    );


    return steps;
  }


  /*
   * =====================================================
   * START TRAVERSAL
   * =====================================================
   */

  let currentIndex = 0;


  steps.push(
    createStep({
      id: stepId++,

      action: STEP_ACTIONS.MOVE_POINTER,

      codeLine: 4,

      array,

      currentIndex,

      deleteIndex: position,

      phase: "start-traversal",

      explanation:
        "Start at HEAD and move toward the node before the target.",

      detail:
        `We need to reach position ${position - 1}.`,
    })
  );


  /*
   * =====================================================
   * TRAVERSE
   * =====================================================
   */

  while (
    currentIndex <
    position - 1
  ) {

    steps.push(
      createStep({
        id: stepId++,

        action: STEP_ACTIONS.COMPARE,

        codeLine: 6,

        array,

        currentIndex,

        deleteIndex: position,

        previousIndex: currentIndex,

        phase: "traverse",

        explanation:
          `current is at node ${currentIndex}.`,

        detail:
          `Move current to the next node until it reaches ${
            position - 1
          }.`,
      })
    );


    currentIndex += 1;


    steps.push(
      createStep({
        id: stepId++,

        action: STEP_ACTIONS.MOVE_POINTER,

        codeLine: 7,

        array,

        currentIndex,

        deleteIndex: position,

        previousIndex: currentIndex,

        phase: "move",

        explanation:
          `current moved to node ${currentIndex}.`,

        detail:
          "current follows the next pointer.",
      })
    );
  }


  /*
   * =====================================================
   * PREVIOUS NODE FOUND
   * =====================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action: STEP_ACTIONS.HIGHLIGHT,

      codeLine: 9,

      array,

      currentIndex,

      deleteIndex: position,

      previousIndex: currentIndex,

      phase: "previous-found",

      explanation:
        `Node ${currentIndex} is the previous node.`,

      detail:
        `Its next pointer currently points to the node at position ${position}.`,
    })
  );


  /*
   * =====================================================
   * REDIRECT POINTER
   * =====================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action: STEP_ACTIONS.MOVE_POINTER,

      codeLine: 10,

      array,

      currentIndex,

      deleteIndex: position,

      previousIndex: currentIndex,

      phase: "redirect",

      explanation:
        "Redirect current->next around the node being deleted.",

      detail:
        "current->next becomes nodeToDelete->next, so the target node is skipped.",
    })
  );


  /*
   * =====================================================
   * REMOVE NODE
   * =====================================================
   */

  const updatedArray = [
    ...array.slice(0, position),
    ...array.slice(position + 1),
  ];


  steps.push(
    createStep({
      id: stepId++,

      action: STEP_ACTIONS.COMPLETE,

      codeLine: 11,

      array: updatedArray,

      currentIndex,

      deleteIndex: null,

      previousIndex: currentIndex,

      phase: "deleted",

      explanation:
        `Node ${array[position]} has been removed.`,

      detail:
        "The linked list now skips the deleted node.",
    })
  );


  /*
   * =====================================================
   * COMPLETE
   * =====================================================
   */

  steps.push(
    createStep({
      id: stepId++,

      action: STEP_ACTIONS.COMPLETE,

      codeLine: 12,

      array: updatedArray,

      currentIndex: null,

      deleteIndex: null,

      previousIndex: null,

      phase: "complete",

      explanation:
        "Deletion complete.",

      detail:
        `The list changed from [${original.join(
          ", "
        )}] to [${updatedArray.join(", ")}].`,
    })
  );


  return steps;
}


/*
 * =====================================================
 * DEFAULT VALUES
 * =====================================================
 */

export const defaultLinkedListDeletionArray = [
  10,
  20,
  30,
  40,
];

export const defaultLinkedListDeletionPosition = 2;