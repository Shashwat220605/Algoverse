import { useEffect, useState } from "react";

/* =========================================================
   SEARCHING SCENES
========================================================= */

import ArrayScene from "../scenes/searching/ArrayScene.jsx";
import LinearSearchScene from "../scenes/searching/LinearSearchScene.jsx";

/* =========================================================
   SORTING SCENES
========================================================= */

import BubbleSortScene from "../scenes/sorting/BubbleSortScene.jsx";
import InsertionSortScene from "../scenes/sorting/InsertionSortScene.jsx";
import SelectionSortScene from "../scenes/sorting/SelectionSortScene.jsx";
import MergeSortScene from "../scenes/sorting/MergeSortScene.jsx";
import QuickSortScene from "../scenes/sorting/QuickSortScene.jsx";
import HeapSortScene from "../scenes/sorting/HeapSortScene.jsx";

/* =========================================================
   LINKED LIST
========================================================= */

import LinkedListScene from "../scenes/linkedlist/LinkedListScene.jsx";
import LinkedListInsertionScene from "../scenes/linkedlist/LinkedListInsertionScene.jsx";
import LinkedListDeletionScene from "../scenes/linkedlist/LinkedListDeletionScene.jsx";

/* =========================================================
   STACK
========================================================= */

import StackScene from "../scenes/stack/StackScene.jsx";

/* =========================================================
   QUEUE
========================================================= */

import QueueScene from "../scenes/queue/QueueScene.jsx";

/* =========================================================
   TREE
========================================================= */

import BinaryTreeScene from "../scenes/tree/BinaryTreeScene.jsx";

/* =========================================================
   HEAP
========================================================= */

import HeapScene from "../scenes/heap/HeapScene.jsx";

/* =========================================================
   BST
========================================================= */

import BSTScene from "../scenes/bst/BSTScene.jsx";

/* =========================================================
   GRAPH
========================================================= */

import GraphScene from "../scenes/graph/GraphScene.jsx";

/* =========================================================
   UI COMPONENTS
========================================================= */

import CodePanel from "../components/CodePanel.jsx";
import ExplanationPanel from "../components/ExplanationPanel.jsx";
import StepControls from "../components/StepControls.jsx";
import StepTimeline from "../components/StepTimeline.jsx";

/* =========================================================
   STORE
========================================================= */

import { useAlgorithmStore } from "../store/algorithmStore.js";

/* =========================================================
   SEARCHING ALGORITHMS
========================================================= */

import {
  linearSearchCode,
  createLinearSearchTrace,
  defaultLinearSearchArray,
  defaultLinearSearchTarget,
} from "../algorithms/searching/linearSearch.js";

import {
  binarySearchCode,
  createBinarySearchTrace,
  defaultBinarySearchArray,
  defaultBinarySearchTarget,
} from "../algorithms/searching/binarySearch.js";

/* =========================================================
   SORTING ALGORITHMS
========================================================= */

import {
  bubbleSortCode,
  createBubbleSortTrace,
  defaultBubbleSortArray,
} from "../algorithms/sorting/bubbleSort.js";

import {
  insertionSortCode,
  createInsertionSortTrace,
  defaultInsertionSortArray,
} from "../algorithms/sorting/insertionSort.js";

import {
  selectionSortCode,
  createSelectionSortTrace,
  defaultSelectionSortArray,
} from "../algorithms/sorting/selectionSort.js";

import {
  mergeSortCode,
  createMergeSortTrace,
  defaultMergeSortArray,
} from "../algorithms/sorting/mergeSort.js";

import {
  quickSortCode,
  createQuickSortTrace,
  defaultQuickSortArray,
} from "../algorithms/sorting/quickSort.js";

import {
  heapSortCode,
  createHeapSortTrace,
  defaultHeapSortArray,
} from "../algorithms/sorting/heapSort.js";

/* =========================================================
   LINKED LIST ALGORITHMS
========================================================= */

import {
  linkedListTraversalCode,
  createLinkedListTraversalTrace,
  defaultLinkedListArray,
} from "../algorithms/linkedlist/linkedListTraversal.js";

import {
  linkedListInsertionCode,
  createLinkedListInsertionTrace,
  defaultLinkedListInsertionArray,
  defaultLinkedListInsertionValue,
  defaultLinkedListInsertionPosition,
} from "../algorithms/linkedlist/linkedListInsertion.js";

import {
  linkedListDeletionCode,
  createLinkedListDeletionTrace,
  defaultLinkedListDeletionArray,
  defaultLinkedListDeletionPosition,
} from "../algorithms/linkedlist/linkedListDeletion.js";

/* =========================================================
   STACK ALGORITHMS
========================================================= */

import {
  stackPushCode,
  createStackPushTrace,
  defaultStackArray,
  defaultStackPushValue,
} from "../algorithms/stack/stackPush.js";

import {
  stackPopCode,
  createStackPopTrace,
  defaultStackPopArray,
} from "../algorithms/stack/stackPop.js";

import {
  stackPeekCode,
  createStackPeekTrace,
  defaultStackPeekArray,
} from "../algorithms/stack/stackPeek.js";

/* =========================================================
   QUEUE ALGORITHMS
========================================================= */

import {
  queueEnqueueCode,
  createQueueEnqueueTrace,
  defaultQueueArray,
  defaultQueueEnqueueValue,
} from "../algorithms/queue/queueEnqueue.js";

import {
  queueDequeueCode,
  createQueueDequeueTrace,
  defaultQueueDequeueArray,
} from "../algorithms/queue/queueDequeue.js";

import {
  queueFrontCode,
  createQueueFrontTrace,
  defaultQueueFrontArray,
} from "../algorithms/queue/queueFront.js";

/* =========================================================
   BINARY TREE ALGORITHMS
========================================================= */

import {
  binaryTreePreorderCode,
  createBinaryTreePreorderTrace,
  defaultBinaryTreeArray,
} from "../algorithms/tree/binaryTreePreorder.js";

import {
  binaryTreeInorderCode,
  createBinaryTreeInorderTrace,
  defaultBinaryTreeInorderArray,
} from "../algorithms/tree/binaryTreeInorder.js";

import {
  binaryTreePostorderCode,
  createBinaryTreePostorderTrace,
  defaultBinaryTreePostorderArray,
} from "../algorithms/tree/binaryTreePostorder.js";

import {
  binaryTreeLevelOrderCode,
  createBinaryTreeLevelOrderTrace,
  defaultBinaryTreeLevelOrderArray,
} from "../algorithms/tree/binaryTreeLevelOrder.js";

/* =========================================================
   HEAP ALGORITHMS
========================================================= */

import {
  buildMaxHeapCode,
  createBuildMaxHeapTrace,
  defaultBuildMaxHeapArray,
} from "../algorithms/heap/buildMaxHeap.js";

import {
  heapInsertCode,
  createHeapInsertTrace,
  defaultHeapInsertArray,
  defaultHeapInsertValue,
} from "../algorithms/heap/heapInsert.js";

import {
  heapExtractMaxCode,
  createHeapExtractMaxTrace,
  defaultHeapExtractMaxArray,
} from "../algorithms/heap/heapExtractMax.js";

/* =========================================================
   BST ALGORITHMS
========================================================= */

import {
  bstInsertCode,
  createBSTInsertTrace,
  defaultBSTInsertArray,
  defaultBSTInsertValue,
} from "../algorithms/bst/bstInsert.js";

import {
  bstSearchCode,
  createBSTSearchTrace,
  defaultBSTSearchArray,
  defaultBSTSearchTarget,
} from "../algorithms/bst/bstSearch.js";

import {
  bstDeleteCode,
  createBSTDeleteTrace,
  defaultBSTDeleteArray,
  defaultBSTDeleteValue,
} from "../algorithms/bst/bstDelete.js";

/* =========================================================
   GRAPH ALGORITHMS
========================================================= */

import {
  bfsCode,
  createBFSTrace,
  defaultBFSGraph,
  defaultBFSStart,
} from "../algorithms/graph/bfs.js";

import {
  dfsCode,
  createDFSTrace,
  defaultDFSGraph,
  defaultDFSStart,
} from "../algorithms/graph/dfs.js";

/* =========================================================
   ALGORITHM GROUPS
========================================================= */

const ALGORITHM_GROUPS = [
  {
    label: "Searching",
    items: [
      ["linearSearch", "Linear Search"],
      ["binarySearch", "Binary Search"],
    ],
  },
  {
    label: "Sorting",
    items: [
      ["bubbleSort", "Bubble Sort"],
      ["insertionSort", "Insertion Sort"],
      ["selectionSort", "Selection Sort"],
      ["mergeSort", "Merge Sort"],
      ["quickSort", "Quick Sort"],
      ["heapSort", "Heap Sort"],
    ],
  },
  {
    label: "Linked List",
    items: [
      ["linkedListTraversal", "Traversal"],
      ["linkedListInsertion", "Insertion"],
      ["linkedListDeletion", "Deletion"],
    ],
  },
  {
    label: "Stack",
    items: [
      ["stackPush", "Push"],
      ["stackPop", "Pop"],
      ["stackPeek", "Peek"],
    ],
  },
  {
    label: "Queue",
    items: [
      ["queueEnqueue", "Enqueue"],
      ["queueDequeue", "Dequeue"],
      ["queueFront", "Front"],
    ],
  },
  {
    label: "Binary Tree",
    items: [
      ["binaryTreePreorder", "Preorder"],
      ["binaryTreeInorder", "Inorder"],
      ["binaryTreePostorder", "Postorder"],
      ["binaryTreeLevelOrder", "Level Order"],
    ],
  },
  {
    label: "Heap",
    items: [
      ["buildMaxHeap", "Build Max Heap"],
      ["heapInsert", "Insert"],
      ["heapExtractMax", "Extract Max"],
    ],
  },
  {
    label: "Binary Search Tree",
    items: [
      ["bstInsert", "Insert"],
      ["bstSearch", "Search"],
      ["bstDelete", "Delete"],
    ],
  },
  {
    label: "Graph",
    items: [
      ["bfs", "BFS"],
      ["dfs", "DFS"],
      ["dijkstra", "Dijkstra 🧭"],
      ["dijkstra", "Dijkstra 🧭"],
    ],
  },
];

/* =========================================================
   ALGORITHM INFORMATION
========================================================= */

const ALGORITHMS = {
  linearSearch: { name: "Linear Search", category: "Searching", difficulty: "Easy", complexity: "O(n)", code: linearSearchCode },
  binarySearch: { name: "Binary Search", category: "Searching", difficulty: "Easy", complexity: "O(log n)", code: binarySearchCode },
  bubbleSort: { name: "Bubble Sort", category: "Sorting", difficulty: "Easy", complexity: "O(n²)", code: bubbleSortCode },
  insertionSort: { name: "Insertion Sort", category: "Sorting", difficulty: "Easy", complexity: "O(n²)", code: insertionSortCode },
  selectionSort: { name: "Selection Sort", category: "Sorting", difficulty: "Easy", complexity: "O(n²)", code: selectionSortCode },
  mergeSort: { name: "Merge Sort", category: "Sorting", difficulty: "Medium", complexity: "O(n log n)", code: mergeSortCode },
  quickSort: { name: "Quick Sort", category: "Sorting", difficulty: "Medium", complexity: "O(n log n) avg", code: quickSortCode },
  heapSort: { name: "Heap Sort", category: "Sorting", difficulty: "Medium", complexity: "O(n log n)", code: heapSortCode },
  linkedListTraversal: { name: "Linked List Traversal", category: "Linked List", difficulty: "Easy", complexity: "O(n)", code: linkedListTraversalCode },
  linkedListInsertion: { name: "Linked List Insertion", category: "Linked List", difficulty: "Medium", complexity: "O(n)", code: linkedListInsertionCode },
  linkedListDeletion: { name: "Linked List Deletion", category: "Linked List", difficulty: "Medium", complexity: "O(n)", code: linkedListDeletionCode },
  stackPush: { name: "Stack Push", category: "Stack", difficulty: "Easy", complexity: "O(1)", code: stackPushCode },
  stackPop: { name: "Stack Pop", category: "Stack", difficulty: "Easy", complexity: "O(1)", code: stackPopCode },
  stackPeek: { name: "Stack Peek", category: "Stack", difficulty: "Easy", complexity: "O(1)", code: stackPeekCode },
  queueEnqueue: { name: "Queue Enqueue", category: "Queue", difficulty: "Easy", complexity: "O(1)", code: queueEnqueueCode },
  queueDequeue: { name: "Queue Dequeue", category: "Queue", difficulty: "Easy", complexity: "O(1)", code: queueDequeueCode },
  queueFront: { name: "Queue Front", category: "Queue", difficulty: "Easy", complexity: "O(1)", code: queueFrontCode },
  binaryTreePreorder: { name: "Binary Tree Preorder", category: "Binary Tree", difficulty: "Medium", complexity: "O(n)", code: binaryTreePreorderCode },
  binaryTreeInorder: { name: "Binary Tree Inorder", category: "Binary Tree", difficulty: "Medium", complexity: "O(n)", code: binaryTreeInorderCode },
  binaryTreePostorder: { name: "Binary Tree Postorder", category: "Binary Tree", difficulty: "Medium", complexity: "O(n)", code: binaryTreePostorderCode },
  binaryTreeLevelOrder: { name: "Binary Tree Level Order", category: "Binary Tree", difficulty: "Medium", complexity: "O(n)", code: binaryTreeLevelOrderCode },
  buildMaxHeap: { name: "Build Max Heap", category: "Heap", difficulty: "Medium", complexity: "O(n)", code: buildMaxHeapCode },
  heapInsert: { name: "Heap Insert", category: "Heap", difficulty: "Medium", complexity: "O(log n)", code: heapInsertCode },
  heapExtractMax: { name: "Heap Extract Max", category: "Heap", difficulty: "Medium", complexity: "O(log n)", code: heapExtractMaxCode },
  bstInsert: { name: "BST Insert", category: "Binary Search Tree", difficulty: "Medium", complexity: "O(log n) avg", code: bstInsertCode },
  bstSearch: { name: "BST Search", category: "Binary Search Tree", difficulty: "Medium", complexity: "O(log n) avg", code: bstSearchCode },
  bstDelete: { name: "BST Delete", category: "Binary Search Tree", difficulty: "Hard", complexity: "O(log n) avg", code: bstDeleteCode },
  bfs: { name: "Breadth First Search", category: "Graph", difficulty: "Medium", complexity: "O(V + E)", code: bfsCode },
  dfs: { name: "Depth First Search", category: "Graph", difficulty: "Medium", complexity: "O(V + E)", code: dfsCode },
};

function parseGraphInput(input) {
  const graph = {};
  input.split(",").map((edge) => edge.trim()).filter(Boolean).forEach((edge) => {
    const [from, to] = edge.split("-").map((value) => value.trim());
    if (!from || !to) return;
    if (!graph[from]) graph[from] = [];
    if (!graph[to]) graph[to] = [];
    if (!graph[from].includes(to)) graph[from].push(to);
    if (!graph[to].includes(from)) graph[to].push(from);
  });
  return graph;
}

function graphToInput(graph) {
  return Object.entries(graph).flatMap(([node, neighbors]) => neighbors.filter((neighbor) => node < neighbor).map((neighbor) => `${node}-${neighbor}`)).join(", ");
}

export default function AlgorithmWorkspace() {
  const { steps, currentStep, isPlaying, setSteps, nextStep, previousStep, reset, goToStep, togglePlaying } = useAlgorithmStore();
  const [algorithm, setAlgorithm] = useState("linearSearch");
  const [arrayInput, setArrayInput] = useState(defaultLinearSearchArray.join(", "));
  const [targetInput, setTargetInput] = useState(String(defaultLinearSearchTarget));
  const [error, setError] = useState("");
  const currentAlgorithm = ALGORITHMS[algorithm];
  const selectedAlgorithmName = ALGORITHM_GROUPS.flatMap((group) => group.items).find(([value]) => value === algorithm)?.[1] || "Select Algorithm";

  useEffect(() => {
    setError("");
    if (algorithm === "linearSearch") { setArrayInput(defaultLinearSearchArray.join(", ")); setTargetInput(String(defaultLinearSearchTarget)); setSteps(createLinearSearchTrace(defaultLinearSearchArray, defaultLinearSearchTarget)); return; }
    if (algorithm === "binarySearch") { setArrayInput(defaultBinarySearchArray.join(", ")); setTargetInput(String(defaultBinarySearchTarget)); setSteps(createBinarySearchTrace(defaultBinarySearchArray, defaultBinarySearchTarget)); return; }
    if (algorithm === "bubbleSort") { setArrayInput(defaultBubbleSortArray.join(", ")); setTargetInput(""); setSteps(createBubbleSortTrace(defaultBubbleSortArray)); return; }
    if (algorithm === "insertionSort") { setArrayInput(defaultInsertionSortArray.join(", ")); setTargetInput(""); setSteps(createInsertionSortTrace(defaultInsertionSortArray)); return; }
    if (algorithm === "selectionSort") { setArrayInput(defaultSelectionSortArray.join(", ")); setTargetInput(""); setSteps(createSelectionSortTrace(defaultSelectionSortArray)); return; }
    if (algorithm === "mergeSort") { setArrayInput(defaultMergeSortArray.join(", ")); setTargetInput(""); setSteps(createMergeSortTrace(defaultMergeSortArray)); return; }
    if (algorithm === "quickSort") { setArrayInput(defaultQuickSortArray.join(", ")); setTargetInput(""); setSteps(createQuickSortTrace(defaultQuickSortArray)); return; }
    if (algorithm === "heapSort") { setArrayInput(defaultHeapSortArray.join(", ")); setTargetInput(""); setSteps(createHeapSortTrace(defaultHeapSortArray)); return; }
    if (algorithm === "linkedListTraversal") { setArrayInput(defaultLinkedListArray.join(", ")); setTargetInput(""); setSteps(createLinkedListTraversalTrace(defaultLinkedListArray)); return; }
    if (algorithm === "linkedListInsertion") { setArrayInput(defaultLinkedListInsertionArray.join(", ")); setTargetInput(`${defaultLinkedListInsertionValue}, ${defaultLinkedListInsertionPosition}`); setSteps(createLinkedListInsertionTrace(defaultLinkedListInsertionArray, defaultLinkedListInsertionValue, defaultLinkedListInsertionPosition)); return; }
    if (algorithm === "linkedListDeletion") { setArrayInput(defaultLinkedListDeletionArray.join(", ")); setTargetInput(String(defaultLinkedListDeletionPosition)); setSteps(createLinkedListDeletionTrace(defaultLinkedListDeletionArray, defaultLinkedListDeletionPosition)); return; }
    if (algorithm === "stackPush") { setArrayInput(defaultStackArray.join(", ")); setTargetInput(String(defaultStackPushValue)); setSteps(createStackPushTrace(defaultStackArray, defaultStackPushValue)); return; }
    if (algorithm === "stackPop") { setArrayInput(defaultStackPopArray.join(", ")); setTargetInput(""); setSteps(createStackPopTrace(defaultStackPopArray)); return; }
    if (algorithm === "stackPeek") { setArrayInput(defaultStackPeekArray.join(", ")); setTargetInput(""); setSteps(createStackPeekTrace(defaultStackPeekArray)); return; }
    if (algorithm === "queueEnqueue") { setArrayInput(defaultQueueArray.join(", ")); setTargetInput(String(defaultQueueEnqueueValue)); setSteps(createQueueEnqueueTrace(defaultQueueArray, defaultQueueEnqueueValue)); return; }
    if (algorithm === "queueDequeue") { setArrayInput(defaultQueueDequeueArray.join(", ")); setTargetInput(""); setSteps(createQueueDequeueTrace(defaultQueueDequeueArray)); return; }
    if (algorithm === "queueFront") { setArrayInput(defaultQueueFrontArray.join(", ")); setTargetInput(""); setSteps(createQueueFrontTrace(defaultQueueFrontArray)); return; }
    if (algorithm === "binaryTreePreorder") { setArrayInput(defaultBinaryTreeArray.join(", ")); setTargetInput(""); setSteps(createBinaryTreePreorderTrace(defaultBinaryTreeArray)); return; }
    if (algorithm === "binaryTreeInorder") { setArrayInput(defaultBinaryTreeInorderArray.join(", ")); setTargetInput(""); setSteps(createBinaryTreeInorderTrace(defaultBinaryTreeInorderArray)); return; }
    if (algorithm === "binaryTreePostorder") { setArrayInput(defaultBinaryTreePostorderArray.join(", ")); setTargetInput(""); setSteps(createBinaryTreePostorderTrace(defaultBinaryTreePostorderArray)); return; }
    if (algorithm === "binaryTreeLevelOrder") { setArrayInput(defaultBinaryTreeLevelOrderArray.join(", ")); setTargetInput(""); setSteps(createBinaryTreeLevelOrderTrace(defaultBinaryTreeLevelOrderArray)); return; }
    if (algorithm === "buildMaxHeap") { setArrayInput(defaultBuildMaxHeapArray.join(", ")); setTargetInput(""); setSteps(createBuildMaxHeapTrace(defaultBuildMaxHeapArray)); return; }
    if (algorithm === "heapInsert") { setArrayInput(defaultHeapInsertArray.join(", ")); setTargetInput(String(defaultHeapInsertValue)); setSteps(createHeapInsertTrace(defaultHeapInsertArray, defaultHeapInsertValue)); return; }
    if (algorithm === "heapExtractMax") { setArrayInput(defaultHeapExtractMaxArray.join(", ")); setTargetInput(""); setSteps(createHeapExtractMaxTrace(defaultHeapExtractMaxArray)); return; }
    if (algorithm === "bstInsert") { setArrayInput(defaultBSTInsertArray.join(", ")); setTargetInput(String(defaultBSTInsertValue)); setSteps(createBSTInsertTrace(defaultBSTInsertArray, defaultBSTInsertValue)); return; }
    if (algorithm === "bstSearch") { setArrayInput(defaultBSTSearchArray.join(", ")); setTargetInput(String(defaultBSTSearchTarget)); setSteps(createBSTSearchTrace(defaultBSTSearchArray, defaultBSTSearchTarget)); return; }
    if (algorithm === "bstDelete") { setArrayInput(defaultBSTDeleteArray.join(", ")); setTargetInput(String(defaultBSTDeleteValue)); setSteps(createBSTDeleteTrace(defaultBSTDeleteArray, defaultBSTDeleteValue)); return; }
    if (algorithm === "bfs") { setArrayInput(graphToInput(defaultBFSGraph)); setTargetInput(defaultBFSStart); setSteps(createBFSTrace(defaultBFSGraph, defaultBFSStart)); return; }
    if (algorithm === "dfs") { setArrayInput(graphToInput(defaultDFSGraph)); setTargetInput(defaultDFSStart); setSteps(createDFSTrace(defaultDFSGraph, defaultDFSStart)); }
  }, [algorithm, setSteps]);

  useEffect(() => {
    if (!isPlaying) return;
    if (currentStep >= steps.length - 1) { togglePlaying(); return; }
    const timer = setTimeout(() => nextStep(), 1400);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, nextStep, togglePlaying]);

  const runAlgorithm = () => {
    setError("");
    if (algorithm === "bfs" || algorithm === "dfs") {
      const graph = parseGraphInput(arrayInput);
      if (Object.keys(graph).length === 0) { setError("Enter graph edges such as A-B, A-C, B-D."); return; }
      const start = targetInput.trim().toUpperCase();
      if (!start) { setError("Enter a starting node."); return; }
      if (!graph[start]) { setError(`Start node "${start}" does not exist.`); return; }
      setSteps(algorithm === "bfs" ? createBFSTrace(graph, start) : createDFSTrace(graph, start));
      return;
    }

    const parsedArray = arrayInput.split(",").map((value) => Number(value.trim())).filter((value) => value !== "");
    if (parsedArray.length === 0 || parsedArray.some((value) => Number.isNaN(value))) { setError("Enter valid numbers separated by commas."); return; }
    if (parsedArray.length > 30) { setError("Use 30 or fewer elements."); return; }

    if (algorithm === "linearSearch") { const target = Number(targetInput.trim()); if (Number.isNaN(target)) { setError("Target must be a valid number."); return; } setSteps(createLinearSearchTrace(parsedArray, target)); return; }
    if (algorithm === "binarySearch") { for (let i = 1; i < parsedArray.length; i++) { if (parsedArray[i] < parsedArray[i - 1]) { setError("Binary Search requires a sorted array."); return; } } const target = Number(targetInput.trim()); if (Number.isNaN(target)) { setError("Target must be a valid number."); return; } setSteps(createBinarySearchTrace(parsedArray, target)); return; }
    if (algorithm === "bubbleSort") { setSteps(createBubbleSortTrace(parsedArray)); return; }
    if (algorithm === "insertionSort") { setSteps(createInsertionSortTrace(parsedArray)); return; }
    if (algorithm === "selectionSort") { setSteps(createSelectionSortTrace(parsedArray)); return; }
    if (algorithm === "mergeSort") { setSteps(createMergeSortTrace(parsedArray)); return; }
    if (algorithm === "quickSort") { setSteps(createQuickSortTrace(parsedArray)); return; }
    if (algorithm === "heapSort") { setSteps(createHeapSortTrace(parsedArray)); return; }
    if (algorithm === "linkedListTraversal") { setSteps(createLinkedListTraversalTrace(parsedArray)); return; }
    if (algorithm === "linkedListInsertion") { const parts = targetInput.split(",").map((value) => Number(value.trim())); const value = parts[0]; const position = parts[1]; if (Number.isNaN(value) || Number.isNaN(position)) { setError("Enter insertion as: value, position."); return; } if (!Number.isInteger(position) || position < 0 || position > parsedArray.length) { setError(`Position must be between 0 and ${parsedArray.length}.`); return; } setSteps(createLinkedListInsertionTrace(parsedArray, value, position)); return; }
    if (algorithm === "linkedListDeletion") { const position = Number(targetInput.trim()); if (!Number.isInteger(position) || position < 0 || position >= parsedArray.length) { setError(`Position must be between 0 and ${parsedArray.length - 1}.`); return; } setSteps(createLinkedListDeletionTrace(parsedArray, position)); return; }
    if (algorithm === "stackPush") { const value = Number(targetInput.trim()); if (Number.isNaN(value)) { setError("Push value must be a number."); return; } setSteps(createStackPushTrace(parsedArray, value)); return; }
    if (algorithm === "stackPop") { setSteps(createStackPopTrace(parsedArray)); return; }
    if (algorithm === "stackPeek") { setSteps(createStackPeekTrace(parsedArray)); return; }
    if (algorithm === "queueEnqueue") { const value = Number(targetInput.trim()); if (Number.isNaN(value)) { setError("Enqueue value must be a number."); return; } setSteps(createQueueEnqueueTrace(parsedArray, value)); return; }
    if (algorithm === "queueDequeue") { setSteps(createQueueDequeueTrace(parsedArray)); return; }
    if (algorithm === "queueFront") { setSteps(createQueueFrontTrace(parsedArray)); return; }
    if (algorithm === "binaryTreePreorder") { setSteps(createBinaryTreePreorderTrace(parsedArray)); return; }
    if (algorithm === "binaryTreeInorder") { setSteps(createBinaryTreeInorderTrace(parsedArray)); return; }
    if (algorithm === "binaryTreePostorder") { setSteps(createBinaryTreePostorderTrace(parsedArray)); return; }
    if (algorithm === "binaryTreeLevelOrder") { setSteps(createBinaryTreeLevelOrderTrace(parsedArray)); return; }
    if (algorithm === "buildMaxHeap") { setSteps(createBuildMaxHeapTrace(parsedArray)); return; }
    if (algorithm === "heapInsert") { const value = Number(targetInput.trim()); if (Number.isNaN(value)) { setError("Heap insert value must be a number."); return; } setSteps(createHeapInsertTrace(parsedArray, value)); return; }
    if (algorithm === "heapExtractMax") { setSteps(createHeapExtractMaxTrace(parsedArray)); return; }
    if (algorithm === "bstInsert") { const value = Number(targetInput.trim()); if (Number.isNaN(value)) { setError("BST insert value must be a number."); return; } setSteps(createBSTInsertTrace(parsedArray, value)); return; }
    if (algorithm === "bstSearch") { const target = Number(targetInput.trim()); if (Number.isNaN(target)) { setError("BST search value must be a number."); return; } setSteps(createBSTSearchTrace(parsedArray, target)); return; }
    if (algorithm === "bstDelete") { const value = Number(targetInput.trim()); if (Number.isNaN(value)) { setError("BST delete value must be a number."); return; } setSteps(createBSTDeleteTrace(parsedArray, value)); }
  };

  const usePreset = (array, target = "") => { setArrayInput(array.join(", ")); setTargetInput(target === "" ? "" : String(target)); setError(""); };
  const step = steps[currentStep];

  if (!currentAlgorithm || !step) return <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white"><div className="text-center"><h2 className="text-xl font-semibold">AlgoVerse</h2><p className="mt-2 text-sm text-gray-500">Loading algorithm...</p></div></div>;

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#050505] text-white">
      <header className="relative z-50 flex min-h-16 shrink-0 flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#080808] px-6 py-3">
        <div className="flex items-center gap-6">
          <div className="text-xl font-bold tracking-tight">Algo<span className="text-violet-500">Verse</span></div>
          <div className="hidden h-5 w-px bg-white/10 md:block" />
          <select value={algorithm} onChange={(event) => { const value = event.target.value; if (value === "dijkstra") { window.dispatchEvent(new CustomEvent("algoverso:open-dijkstra")); return; } setAlgorithm(value); }} className="rounded-lg border border-white/10 bg-[#09090b] px-3 py-2 text-sm text-white outline-none focus:border-violet-500/50">
            {ALGORITHM_GROUPS.map((group) => <optgroup key={group.label} label={group.label} className="bg-[#09090b]">{group.items.map(([value, label]) => <option key={value} value={value} className="bg-[#09090b]">{label}</option>)}</optgroup>)}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">{currentAlgorithm.category}</span>
          <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">{currentAlgorithm.difficulty}</span>
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">{currentAlgorithm.complexity}</span>
        </div>
      </header>
      {error && <div className="relative z-40 shrink-0 border-b border-red-500/20 bg-red-500/5 px-6 py-2 text-center text-xs text-red-400">{error}</div>}
      <section className="grid min-h-0 flex-1 grid-cols-1 overflow-auto lg:grid-cols-[1.5fr_0.9fr_0.85fr] xl:overflow-hidden">
        <div className="relative min-h-[600px] border-b border-white/10 lg:min-h-0 lg:border-b-0 lg:border-r">
          <div className="pointer-events-none absolute left-5 top-5 z-20"><p className="text-xs uppercase tracking-widest text-gray-500">Visualization</p><p className="mt-1 text-sm text-gray-300">{currentAlgorithm.name}</p></div>
          <div className="absolute bottom-5 left-5 right-5 z-20 rounded-2xl border border-white/10 bg-black/70 p-4 shadow-2xl backdrop-blur-xl">
            <div className="mb-3"><p className="text-xs uppercase tracking-widest text-violet-400">Input Playground</p><p className="mt-1 text-xs text-gray-500">{algorithm === "bfs" || algorithm === "dfs" ? "Graph edges: A-B, A-C, B-D" : algorithm === "linkedListInsertion" ? "Nodes plus value and position" : algorithm === "linkedListDeletion" ? "Nodes plus deletion position" : "Enter values separated by commas"}</p></div>
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="flex-1"><label className="mb-1.5 block text-[11px] text-gray-500">{algorithm === "bfs" || algorithm === "dfs" ? "Graph Edges" : "Input"}</label><input value={arrayInput} onChange={(event) => setArrayInput(event.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 font-mono text-xs text-white outline-none placeholder:text-gray-700 focus:border-violet-500/50" placeholder={algorithm === "bfs" || algorithm === "dfs" ? "A-B, A-C, B-D" : "7, 3, 9, 2, 5"} /></div>
              <div className="w-full md:w-44"><label className="mb-1.5 block text-[11px] text-gray-500">{algorithm === "bfs" || algorithm === "dfs" ? "Start Node" : algorithm === "linkedListInsertion" ? "Value, Position" : algorithm === "linkedListDeletion" ? "Position" : algorithm === "stackPush" ? "Push Value" : algorithm === "queueEnqueue" ? "Enqueue Value" : algorithm === "heapInsert" ? "Insert Value" : algorithm === "bstInsert" ? "Insert Value" : algorithm === "bstSearch" ? "Search Value" : algorithm === "bstDelete" ? "Delete Value" : "Target"}</label><input value={targetInput} onChange={(event) => setTargetInput(event.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 font-mono text-xs text-white outline-none placeholder:text-gray-700 focus:border-violet-500/50" placeholder={algorithm === "linkedListInsertion" ? "25, 2" : algorithm === "linkedListDeletion" ? "2" : "25"} /></div>
              <div className="flex items-end"><button onClick={runAlgorithm} className="w-full rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-medium transition hover:bg-violet-500 md:w-auto">Run Algorithm</button></div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2"><span className="mr-1 self-center text-[10px] uppercase tracking-widest text-gray-600">Presets</span>{algorithm === "linearSearch" && <><button onClick={() => usePreset(defaultLinearSearchArray, defaultLinearSearchTarget)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default</button><button onClick={() => usePreset([5, 8, 2, 9, 4], 9)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Found</button></>}{algorithm === "binarySearch" && <button onClick={() => usePreset(defaultBinarySearchArray, defaultBinarySearchTarget)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default</button>}{["bubbleSort","insertionSort","selectionSort","mergeSort","quickSort","heapSort"].includes(algorithm) && <button onClick={() => usePreset([7,3,9,2,5,8,1])} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default</button>}{["linkedListTraversal","linkedListInsertion","linkedListDeletion"].includes(algorithm) && <button onClick={() => usePreset(defaultLinkedListArray)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default List</button>}{algorithm === "stackPush" && <button onClick={() => usePreset(defaultStackArray, defaultStackPushValue)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default</button>}{["stackPop","stackPeek"].includes(algorithm) && <button onClick={() => usePreset(defaultStackArray)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default</button>}{algorithm === "queueEnqueue" && <button onClick={() => usePreset(defaultQueueArray, defaultQueueEnqueueValue)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default</button>}{["queueDequeue","queueFront"].includes(algorithm) && <button onClick={() => usePreset(defaultQueueArray)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default</button>}{["binaryTreePreorder","binaryTreeInorder","binaryTreePostorder","binaryTreeLevelOrder"].includes(algorithm) && <button onClick={() => usePreset(defaultBinaryTreeArray)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default Tree</button>}{algorithm === "buildMaxHeap" && <button onClick={() => usePreset(defaultBuildMaxHeapArray)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default Heap</button>}{algorithm === "heapInsert" && <button onClick={() => usePreset(defaultHeapInsertArray, defaultHeapInsertValue)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default</button>}{algorithm === "heapExtractMax" && <button onClick={() => usePreset(defaultHeapExtractMaxArray)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default</button>}{algorithm === "bstInsert" && <button onClick={() => usePreset(defaultBSTInsertArray, defaultBSTInsertValue)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default</button>}{algorithm === "bstSearch" && <button onClick={() => usePreset(defaultBSTSearchArray, defaultBSTSearchTarget)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default</button>}{algorithm === "bstDelete" && <button onClick={() => usePreset(defaultBSTDeleteArray, defaultBSTDeleteValue)} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default</button>}{(algorithm === "bfs" || algorithm === "dfs") && <button onClick={() => { const graph = algorithm === "bfs" ? defaultBFSGraph : defaultDFSGraph; setArrayInput(graphToInput(graph)); setTargetInput(algorithm === "bfs" ? defaultBFSStart : defaultDFSStart); setError(""); }} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white">Default Graph</button>}</div>
          </div>

          {algorithm === "linearSearch" && <LinearSearchScene currentStep={step} />}
          {algorithm === "binarySearch" && <ArrayScene currentStep={step} />}
          {algorithm === "bubbleSort" && <BubbleSortScene currentStep={step} />}
          {algorithm === "insertionSort" && <InsertionSortScene currentStep={step} />}
          {algorithm === "selectionSort" && <SelectionSortScene currentStep={step} />}
          {algorithm === "mergeSort" && <MergeSortScene currentStep={step} />}
          {algorithm === "quickSort" && <QuickSortScene currentStep={step} />}
          {algorithm === "heapSort" && <HeapSortScene currentStep={step} />}
          {algorithm === "linkedListTraversal" && <LinkedListScene currentStep={step} />}
          {algorithm === "linkedListInsertion" && <LinkedListInsertionScene currentStep={step} />}
          {algorithm === "linkedListDeletion" && <LinkedListDeletionScene currentStep={step} />}
          {["stackPush","stackPop","stackPeek"].includes(algorithm) && <StackScene currentStep={step} />}
          {["queueEnqueue","queueDequeue","queueFront"].includes(algorithm) && <QueueScene currentStep={step} />}
          {["binaryTreePreorder","binaryTreeInorder","binaryTreePostorder","binaryTreeLevelOrder"].includes(algorithm) && <BinaryTreeScene currentStep={step} />}
          {["buildMaxHeap","heapInsert","heapExtractMax"].includes(algorithm) && <HeapScene currentStep={step} />}
          {["bstInsert","bstSearch","bstDelete"].includes(algorithm) && <BSTScene currentStep={step} />}
          {["bfs","dfs"].includes(algorithm) && <GraphScene currentStep={step} />}
        </div>

        <div className="min-h-[400px] border-b border-white/10 lg:min-h-0 lg:border-b-0 lg:border-r"><CodePanel code={currentAlgorithm.code} activeLine={step.codeLine} step={step} /></div>
        <div className="min-h-[450px] overflow-y-auto lg:min-h-0"><div className="space-y-3 p-3"><div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"><div className="mb-3 flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-widest text-violet-400">Algorithm Info</p><h2 className="mt-1 text-lg font-semibold text-white">{selectedAlgorithmName}</h2></div><div className="flex items-center gap-2"><div className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-xs text-amber-300">{currentAlgorithm.difficulty}</div><div className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-2 py-1 text-xs text-violet-300">{currentAlgorithm.complexity}</div></div></div><p className="text-xs leading-5 text-gray-500">Follow the visualization step by step to understand how the algorithm operates.</p></div><ExplanationPanel step={step} totalSteps={steps.length} algorithm={algorithm} /></div></div>
      </section>
      <div className="relative z-30 shrink-0 border-t border-white/10 bg-[#09090b]"><StepTimeline currentStep={currentStep} totalSteps={steps.length} onStepClick={goToStep} /><StepControls currentStep={currentStep} totalSteps={steps.length} isPlaying={isPlaying} onPrevious={previousStep} onNext={nextStep} onReset={reset} onTogglePlay={togglePlaying} /></div>
    </main>
  );
}
