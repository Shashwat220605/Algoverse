const STORAGE_KEY = "algoverse-learning-progress-v1";

export const TRACKED_ALGORITHMS = [
  ["linearSearch", "Linear Search", "Searching"],
  ["binarySearch", "Binary Search", "Searching"],
  ["bubbleSort", "Bubble Sort", "Sorting"],
  ["insertionSort", "Insertion Sort", "Sorting"],
  ["selectionSort", "Selection Sort", "Sorting"],
  ["mergeSort", "Merge Sort", "Sorting"],
  ["quickSort", "Quick Sort", "Sorting"],
  ["heapSort", "Heap Sort", "Sorting"],
  ["linkedListTraversal", "Linked List Traversal", "Linked List"],
  ["linkedListInsertion", "Linked List Insertion", "Linked List"],
  ["linkedListDeletion", "Linked List Deletion", "Linked List"],
  ["stackPush", "Stack Push", "Stack"],
  ["stackPop", "Stack Pop", "Stack"],
  ["stackPeek", "Stack Peek", "Stack"],
  ["queueEnqueue", "Queue Enqueue", "Queue"],
  ["queueDequeue", "Queue Dequeue", "Queue"],
  ["queueFront", "Queue Front", "Queue"],
  ["binaryTreePreorder", "Binary Tree Preorder", "Binary Tree"],
  ["binaryTreeInorder", "Binary Tree Inorder", "Binary Tree"],
  ["binaryTreePostorder", "Binary Tree Postorder", "Binary Tree"],
  ["binaryTreeLevelOrder", "Binary Tree Level Order", "Binary Tree"],
  ["buildMaxHeap", "Build Max Heap", "Heap"],
  ["heapInsert", "Heap Insert", "Heap"],
  ["heapExtractMax", "Heap Extract Max", "Heap"],
  ["bstInsert", "BST Insert", "Binary Search Tree"],
  ["bstSearch", "BST Search", "Binary Search Tree"],
  ["bstDelete", "BST Delete", "Binary Search Tree"],
  ["bfs", "Breadth First Search", "Graph"],
  ["dfs", "Depth First Search", "Graph"],
  ["dijkstra", "Dijkstra", "Graph"],
];

export function loadProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      streak: Number.isFinite(parsed.streak) ? parsed.streak : 0,
      xp: Number.isFinite(parsed.xp) ? parsed.xp : 0,
      lastVisit: parsed.lastVisit || null,
    };
  } catch {
    return { completed: [], streak: 0, xp: 0, lastVisit: null };
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
}

export function markAlgorithmComplete(id) {
  const progress = loadProgress();
  if (progress.completed.includes(id)) return progress;

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const streak = progress.lastVisit === yesterday ? progress.streak + 1 : 1;

  return saveProgress({
    ...progress,
    completed: [...progress.completed, id],
    xp: progress.xp + 25,
    streak: progress.lastVisit === today ? progress.streak : streak,
    lastVisit: today,
  });
}

export function resetProgress() {
  const empty = { completed: [], streak: 0, xp: 0, lastVisit: null };
  saveProgress(empty);
  return empty;
}
