import { STEP_ACTIONS } from "./algorithmTypes.js";

export const insertionSortCode = [
  "for (int i = 1; i < n; i++) {",
  "    int key = arr[i];",
  "    int j = i - 1;",
  "",
  "    while (j >= 0 && arr[j] > key) {",
  "        arr[j + 1] = arr[j];",
  "        j--;",
  "    }",
  "",
  "    arr[j + 1] = key;",
  "}",
];

function createStep({
  id,
  action,
  codeLine,
  array,
  i,
  j,
  key,
  comparing = [],
  shifting = [],
  sortedFrom,
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
      i,
      j,
      key,
      comparing,
      shifting,
      sortedFrom,
    },

    explanation,
    detail,
  };
}

export function createInsertionSortTrace(inputArray) {
  const array = [...inputArray];

  const steps = [];
  let stepId = 0;

  const n = array.length;

  if (n === 0) {
    return steps;
  }

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.INITIALIZE,
      codeLine: 0,
      array,
      i: 1,
      j: 0,
      key: array[0],
      sortedFrom: 0,
      explanation:
        "Insertion Sort starts with the first element as a sorted section.",
      detail:
        "A single element is already sorted by itself. We now take each remaining element and insert it into the correct position.",
    })
  );

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.MOVE_POINTER,
        codeLine: 1,
        array,
        i,
        j,
        key,
        sortedFrom: i,
        explanation:
          `We select ${key} as the key element.`,
        detail:
          `The element at index ${i} is ${key}. We will find the correct position for it inside the already sorted section.`,
      })
    );

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.HIGHLIGHT,
        codeLine: 2,
        array,
        i,
        j,
        key,
        sortedFrom: i,
        explanation:
          `We start comparing the key with the element immediately to its left.`,
        detail:
          `The current position of j is ${j}. Everything before index ${i} is currently considered sorted.`,
      })
    );

    while (
      j >= 0 &&
      array[j] > key
    ) {
      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPARE,
          codeLine: 4,
          array,
          i,
          j,
          key,
          comparing: [j, i],
          shifting: [],
          sortedFrom: i,
          explanation:
            `${array[j]} is greater than ${key}.`,
          detail:
            `Because ${array[j]} > ${key}, the larger value must move one position to the right.`,
        })
      );

      const shiftedValue = array[j];

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.MOVE_POINTER,
          codeLine: 5,
          array,
          i,
          j,
          key,
          comparing: [j, j + 1],
          shifting: [j],
          sortedFrom: i,
          explanation:
            `Shift ${shiftedValue} one position to the right.`,
          detail:
            `We copy arr[${j}] into arr[${j + 1}]. This creates space for the key.`,
        })
      );

      array[j + 1] = array[j];

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.COMPLETE,
          codeLine: 5,
          array,
          i,
          j,
          key,
          comparing: [],
          shifting: [j + 1],
          sortedFrom: i,
          explanation:
            `The value ${shiftedValue} has moved right.`,
          detail:
            `The sorted section has shifted one position to make room for the key.`,
        })
      );

      j--;

      steps.push(
        createStep({
          id: stepId++,
          action: STEP_ACTIONS.MOVE_POINTER,
          codeLine: 6,
          array,
          i,
          j,
          key,
          comparing: [],
          shifting: [],
          sortedFrom: i,
          explanation:
            "Move the pointer one position to the left.",
          detail:
            `j is now ${j}. We continue checking whether another element needs to move.`,
        })
      );
    }

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPARE,
        codeLine: 4,
        array,
        i,
        j,
        key,
        comparing:
          j >= 0
            ? [j, j + 1]
            : [],
        shifting: [],
        sortedFrom: i,
        explanation:
          "The correct insertion position has been found.",
        detail:
          j >= 0
            ? `${array[j]} is not greater than ${key}, so the key can be inserted after index ${j}.`
            : "The key is smaller than every element before it, so it belongs at the beginning.",
      })
    );

    array[j + 1] = key;

    steps.push(
      createStep({
        id: stepId++,
        action: STEP_ACTIONS.COMPLETE,
        codeLine: 9,
        array,
        i,
        j,
        key,
        comparing: [],
        shifting: [],
        sortedFrom: i + 1,
        explanation:
          `${key} has been inserted into the sorted section.`,
        detail:
          `The first ${i + 1} elements are now sorted.`,
      })
    );
  }

  steps.push(
    createStep({
      id: stepId++,
      action: STEP_ACTIONS.COMPLETE,
      codeLine: 10,
      array,
      i: n,
      j: null,
      key: null,
      comparing: [],
      shifting: [],
      sortedFrom: n,
      explanation:
        "Insertion Sort is complete.",
      detail:
        "Every element is now in ascending order.",
    })
  );

  return steps;
}

export const defaultInsertionSortArray = [
  7,
  4,
  9,
  2,
  5,
];