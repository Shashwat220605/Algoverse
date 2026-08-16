import { STEP_ACTIONS } from "./algorithmTypes.js";


export const linkedListTraversalCode = [
  "void traverse(Node* head) {",
  "    Node* current = head;",
  "",
  "    while (current != NULL) {",
  "        visit(current->data);",
  "        current = current->next;",
  "    }",
  "}",
];


function createStep({
  id,
  action,
  codeLine,
  array,
  currentIndex = null,
  visited = [],
  phase,
  explanation,
  detail,
}) {
  return {
    id,
    action,
    codeLine,

    /*
     * The linked list is represented
     * as an array of node values.
     */
    array: [...array],

    target: null,

    variables: {
      currentIndex,
      visited,
      phase,
    },

    explanation,
    detail,
  };
}


export function createLinkedListTraversalTrace(
  inputArray
) {

  const array = [...inputArray];

  const steps = [];

  let stepId = 0;

  const visited = [];


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
      visited: [],
      phase: "start",
      explanation:
        "A linked list has been created.",
      detail:
        "Each node stores data and a pointer to the next node. Traversal starts from the head.",
    })
  );


  /*
   * =======================================================
   * SET CURRENT = HEAD
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.MOVE_POINTER,
      codeLine: 1,
      array,
      currentIndex: 0,
      visited: [],
      phase: "head",
      explanation:
        "Set the current pointer to HEAD.",
      detail:
        "The current pointer starts at the first node because HEAD points to the beginning of the linked list.",
    })
  );


  /*
   * =======================================================
   * TRAVERSE
   * =======================================================
   */

  for (
    let i = 0;
    i < array.length;
    i++
  ) {

    /*
     * Check whether current is NULL.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPARE,
        codeLine: 3,
        array,
        currentIndex: i,
        visited: [...visited],
        phase: "check",
        explanation:
          `Check whether node ${i} is NULL.`,
        detail:
          "Because a valid node exists, traversal can continue.",
      })
    );


    /*
     * Visit current node.
     */

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.HIGHLIGHT,
        codeLine: 4,
        array,
        currentIndex: i,
        visited: [...visited],
        phase: "visit",
        explanation:
          `Visit node ${i} containing ${array[i]}.`,
        detail:
          "The current node's data is processed before moving to the next node.",
      })
    );


    /*
     * Mark as visited.
     */

    visited.push(i);


    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPLETE,
        codeLine: 4,
        array,
        currentIndex: i,
        visited: [...visited],
        phase: "visited",
        explanation:
          `Node ${array[i]} has been visited.`,
        detail:
          "The node is now part of the already-traversed portion of the list.",
      })
    );


    /*
     * Move to next node.
     */

    if (
      i <
      array.length - 1
    ) {

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.MOVE_POINTER,
          codeLine: 5,
          array,
          currentIndex: i + 1,
          visited: [...visited],
          phase: "next",
          explanation:
            `Move current from ${array[i]} to ${array[i + 1]}.`,
          detail:
            "current is updated using current->next, following the pointer stored in the current node.",
        })
      );

    }

  }


  /*
   * =======================================================
   * NULL REACHED
   * =======================================================
   */

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.COMPLETE,
      codeLine: 7,
      array,
      currentIndex: null,
      visited: [...visited],
      phase: "complete",
      explanation:
        "Traversal is complete.",
      detail:
        "current is now NULL, which means there are no more nodes to visit.",
    })
  );


  return steps;
}


export const defaultLinkedListArray = [
  10,
  20,
  30,
  40,
  50,
];