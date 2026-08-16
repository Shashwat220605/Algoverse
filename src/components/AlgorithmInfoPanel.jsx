import React from "react";


/*
 * =========================================================
 * ALGORITHM INFORMATION
 * =========================================================
 */

const ALGORITHM_INFO = {

  /*
   * SEARCHING
   */

  linearSearch: {
    title: "Linear Search",

    description:
      "Checks each element one by one until the target is found or the array ends.",

    best: "O(1)",
    average: "O(n)",
    worst: "O(n)",

    space: "O(1)",

    technique: "Sequential Search",

    stable: "N/A",
  },


  binarySearch: {
    title: "Binary Search",

    description:
      "Repeatedly divides a sorted array into two halves and eliminates the half that cannot contain the target.",

    best: "O(1)",
    average: "O(log n)",
    worst: "O(log n)",

    space: "O(1)",

    technique: "Divide & Conquer",

    stable: "N/A",
  },


  /*
   * SORTING
   */

  bubbleSort: {
    title: "Bubble Sort",

    description:
      "Repeatedly compares adjacent elements and swaps them when they are in the wrong order.",

    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",

    space: "O(1)",

    technique: "Comparison Sort",

    stable: "Yes",
  },


  insertionSort: {
    title: "Insertion Sort",

    description:
      "Builds the sorted portion one element at a time by inserting each element into its correct position.",

    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",

    space: "O(1)",

    technique: "Incremental",

    stable: "Yes",
  },


  selectionSort: {
    title: "Selection Sort",

    description:
      "Repeatedly finds the smallest remaining element and places it at the next sorted position.",

    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",

    space: "O(1)",

    technique: "Selection",

    stable: "No",
  },


  mergeSort: {
    title: "Merge Sort",

    description:
      "Divides the array into smaller parts, recursively sorts them, and merges the sorted parts.",

    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",

    space: "O(n)",

    technique: "Divide & Conquer",

    stable: "Yes",
  },


  quickSort: {
    title: "Quick Sort",

    description:
      "Chooses a pivot and partitions the array around it before recursively sorting the partitions.",

    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",

    space: "O(log n)",

    technique: "Divide & Conquer",

    stable: "No",
  },


  heapSort: {
    title: "Heap Sort",

    description:
      "Builds a heap and repeatedly extracts the largest element to produce a sorted array.",

    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",

    space: "O(1)",

    technique: "Heap",

    stable: "No",
  },


  /*
   * LINKED LIST
   */

  linkedListTraversal: {
    title: "Linked List Traversal",

    description:
      "Starts at the head and follows each next pointer until the end of the list.",

    best: "O(1)",
    average: "O(n)",
    worst: "O(n)",

    space: "O(1)",

    technique: "Sequential Traversal",

    stable: "N/A",
  },


  linkedListInsertion: {
    title: "Linked List Insertion",

    description:
      "Creates a new node and connects it into the list at the requested position.",

    best: "O(1)",
    average: "O(n)",
    worst: "O(n)",

    space: "O(1)",

    technique: "Pointer Manipulation",

    stable: "N/A",
  },


  linkedListDeletion: {
    title: "Linked List Deletion",

    description:
      "Finds the requested node, changes the surrounding pointer connections, and removes the node.",

    best: "O(1)",
    average: "O(n)",
    worst: "O(n)",

    space: "O(1)",

    technique: "Pointer Manipulation",

    stable: "N/A",
  },


  /*
   * STACK
   */

  stackPush: {
    title: "Stack Push",

    description:
      "Adds a new element to the top of the stack.",

    best: "O(1)",
    average: "O(1)",
    worst: "O(1)",

    space: "O(1)",

    technique: "LIFO",

    stable: "N/A",
  },


  stackPop: {
    title: "Stack Pop",

    description:
      "Removes the element currently at the top of the stack.",

    best: "O(1)",
    average: "O(1)",
    worst: "O(1)",

    space: "O(1)",

    technique: "LIFO",

    stable: "N/A",
  },


  stackPeek: {
    title: "Stack Peek",

    description:
      "Reads the top element of the stack without removing it.",

    best: "O(1)",
    average: "O(1)",
    worst: "O(1)",

    space: "O(1)",

    technique: "LIFO",

    stable: "N/A",
  },


  /*
   * QUEUE
   */

  queueEnqueue: {
    title: "Queue Enqueue",

    description:
      "Adds a new element to the rear of the queue.",

    best: "O(1)",
    average: "O(1)",
    worst: "O(1)",

    space: "O(1)",

    technique: "FIFO",

    stable: "N/A",
  },


  queueDequeue: {
    title: "Queue Dequeue",

    description:
      "Removes the element from the front of the queue.",

    best: "O(1)",
    average: "O(1)",
    worst: "O(1)",

    space: "O(1)",

    technique: "FIFO",

    stable: "N/A",
  },


  queueFront: {
    title: "Queue Front",

    description:
      "Reads the front element of the queue without removing it.",

    best: "O(1)",
    average: "O(1)",
    worst: "O(1)",

    space: "O(1)",

    technique: "FIFO",

    stable: "N/A",
  },

};


/*
 * =========================================================
 * SMALL INFO ITEM
 * =========================================================
 */

function InfoItem({
  label,
  value,
}) {

  return (

    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">

      <div className="text-[10px] uppercase tracking-widest text-gray-600">
        {label}
      </div>


      <div className="mt-1 font-mono text-sm text-gray-200">
        {value}
      </div>

    </div>

  );
}


/*
 * =========================================================
 * COMPLEXITY ROW
 * =========================================================
 */

function ComplexityRow({
  label,
  value,
}) {

  return (

    <div className="flex items-center justify-between border-b border-white/5 py-2.5 last:border-0">

      <span className="text-xs text-gray-500">
        {label}
      </span>


      <span className="font-mono text-xs text-violet-300">
        {value}
      </span>

    </div>

  );
}


/*
 * =========================================================
 * MAIN COMPONENT
 * =========================================================
 */

export default function AlgorithmInfoPanel({
  algorithm,
}) {

  const info =
    ALGORITHM_INFO[
      algorithm
    ];


  /*
   * Safety fallback.
   */

  if (!info) {

    return (

      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">

        <p className="text-sm text-gray-400">
          Algorithm information unavailable.
        </p>

      </div>

    );
  }


  return (

    <div className="rounded-2xl border border-white/10 bg-[#09090b] p-4">

      {/* =================================================
          HEADER
      ================================================== */}

      <div className="mb-4">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-[10px] uppercase tracking-[0.18em] text-violet-400">
              Algorithm Info
            </p>


            <h2 className="mt-1 text-lg font-semibold text-white">
              {info.title}
            </h2>

          </div>


          <div className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[10px] text-violet-300">
            {info.technique}
          </div>

        </div>


        <p className="mt-3 text-xs leading-5 text-gray-500">
          {info.description}
        </p>

      </div>


      {/* =================================================
          TIME COMPLEXITY
      ================================================== */}

      <div className="mb-4 rounded-xl border border-white/10 bg-white/[0.02] p-3">

        <div className="mb-1 text-[10px] uppercase tracking-widest text-gray-600">
          Time Complexity
        </div>


        <ComplexityRow
          label="Best"
          value={info.best}
        />


        <ComplexityRow
          label="Average"
          value={info.average}
        />


        <ComplexityRow
          label="Worst"
          value={info.worst}
        />

      </div>


      {/* =================================================
          QUICK FACTS
      ================================================== */}

      <div className="grid grid-cols-2 gap-2">

        <InfoItem
          label="Space"
          value={info.space}
        />


        <InfoItem
          label="Stable"
          value={info.stable}
        />

      </div>

    </div>

  );
}