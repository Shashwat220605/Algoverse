import { STEP_ACTIONS } from "./algorithmTypes.js";

export const linkedListInsertionCode = [
  "Node* newNode = new Node(value);",
  "",
  "if (position == 0) {",
  "    newNode->next = head;",
  "    head = newNode;",
  "}",
  "else {",
  "    Node* current = head;",
  "",
  "    for (int i = 0; i < position - 1; i++)",
  "        current = current->next;",
  "",
  "    newNode->next = current->next;",
  "    current->next = newNode;",
  "}",
];


function createStep({
  id,
  action,
  codeLine,
  array,
  currentIndex = null,
  newNodeIndex = null,
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
      newNodeIndex,
      previousIndex,
      phase,
    },

    explanation,
    detail,
  };
}


export function createLinkedListInsertionTrace(
  inputArray,
  value,
  position
) {

  const original = [...inputArray];

  const array = [...inputArray];

  const steps = [];

  let stepId = 0;

  /*
   * Keep the new node outside the normal
   * array until the actual insertion.
   */
  const newNodeIndex = position;


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
      currentIndex: null,
      newNodeIndex,
      previousIndex: null,
      phase: "start",
      explanation:
        `Create a new node containing ${value}.`,
      detail:
        "The new node is created before changing any existing links.",
    })
  );


  /*
   * =======================================================
   * INSERT AT BEGINNING
   * =======================================================
   */

  if (position === 0) {

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.HIGHLIGHT,
        codeLine: 2,
        array,
        currentIndex: null,
        newNodeIndex,
        previousIndex: null,
        phase: "check-position",
        explanation:
          "Position is 0, so the new node belongs at the beginning.",
        detail:
          "No traversal is required because the new node becomes the new HEAD.",
      })
    );


    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.MOVE_POINTER,
        codeLine: 3,
        array,
        currentIndex: 0,
        newNodeIndex,
        previousIndex: null,
        phase: "connect-new-node",
        explanation:
          "Make the new node point to the current HEAD.",
        detail:
          "newNode->next now points to the node that used to be the first node.",
      })
    );


    const updatedArray = [
      value,
      ...array,
    ];


    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPLETE,
        codeLine: 4,
        array: updatedArray,
        currentIndex: 0,
        newNodeIndex: 0,
        previousIndex: null,
        phase: "head-updated",
        explanation:
          `${value} is now the new HEAD.`,
        detail:
          "The HEAD pointer has been updated to the newly inserted node.",
      })
    );


    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPLETE,
        codeLine: 4,
        array: updatedArray,
        currentIndex: null,
        newNodeIndex: 0,
        previousIndex: null,
        phase: "complete",
        explanation:
          "Insertion complete.",
        detail:
          `The linked list now starts with ${value}.`,
      })
    );


    return steps;
  }


  /*
   * =======================================================
   * VALID POSITION
   * =======================================================
   */

  if (
    position < 0 ||
    position > array.length
  ) {

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPLETE,
        codeLine: 0,
        array,
        currentIndex: null,
        newNodeIndex: null,
        previousIndex: null,
        phase: "error",
        explanation:
          "Invalid insertion position.",
        detail:
          `Position must be between 0 and ${array.length}.`,
      })
    );


    return steps;
  }


  /*
   * =======================================================
   * MOVE CURRENT TO PREVIOUS NODE
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.MOVE_POINTER,
      codeLine: 7,
      array,
      currentIndex: 0,
      newNodeIndex,
      previousIndex: null,
      phase: "start-traversal",
      explanation:
        "Start from HEAD.",
      detail:
        "To insert at a position other than 0, we need to reach the node immediately before the insertion point.",
    })
  );


  /*
   * Traverse until position - 1.
   */

  let currentIndex = 0;


  while (
    currentIndex <
    position - 1
  ) {

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPARE,
        codeLine: 9,
        array,
        currentIndex,
        newNodeIndex,
        previousIndex: currentIndex,
        phase: "traverse",
        explanation:
          `Move through the list toward position ${position}.`,
        detail:
          `current is at node ${currentIndex}. We need to reach node ${position - 1}.`,
      })
    );


    currentIndex++;


    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.MOVE_POINTER,
        codeLine: 10,
        array,
        currentIndex,
        newNodeIndex,
        previousIndex: currentIndex,
        phase: "move",
        explanation:
          `current moves to node ${currentIndex}.`,
        detail:
          "The current pointer follows the next pointer of the current node.",
      })
    );

  }


  /*
   * =======================================================
   * FOUND PREVIOUS NODE
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.HIGHLIGHT,
      codeLine: 10,
      array,
      currentIndex,
      newNodeIndex,
      previousIndex: currentIndex,
      phase: "previous-found",
      explanation:
        `Node ${currentIndex} is immediately before the insertion position.`,
      detail:
        "This node is the one whose next pointer must be changed.",
    })
  );


  /*
   * =======================================================
   * CONNECT NEW NODE
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.MOVE_POINTER,
      codeLine: 12,
      array,
      currentIndex,
      newNodeIndex,
      previousIndex: currentIndex,
      phase: "connect-new-node",
      explanation:
        "Connect the new node to the remaining list.",
      detail:
        "newNode->next receives current->next, preserving the rest of the linked list.",
    })
  );


  /*
   * =======================================================
   * UPDATE CURRENT->NEXT
   * =======================================================
   */

  const updatedArray = [
    ...array.slice(0, position),
    value,
    ...array.slice(position),
  ];


  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.COMPLETE,
      codeLine: 13,
      array: updatedArray,
      currentIndex,
      newNodeIndex: position,
      previousIndex: currentIndex,
      phase: "link-updated",
      explanation:
        `Node ${currentIndex} now points to ${value}.`,
      detail:
        "The new node has been inserted between the previous node and the node that originally followed it.",
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
      action: STEP_ACTIONS.COMPLETE,
      codeLine: 13,
      array: updatedArray,
      currentIndex: null,
      newNodeIndex: position,
      previousIndex: null,
      phase: "complete",
      explanation:
        `Inserted ${value} at position ${position}.`,
      detail:
        `The linked list changed from [${original.join(
          ", "
        )}] to [${updatedArray.join(", ")}].`,
    })
  );


  return steps;
}


export const defaultLinkedListInsertionArray = [
  10,
  20,
  30,
  40,
];


export const defaultLinkedListInsertionValue = 25;


export const defaultLinkedListInsertionPosition = 2;