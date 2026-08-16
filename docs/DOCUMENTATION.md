# AlgoVerse Documentation

## 1. Project Overview

**AlgoVerse** is an interactive Data Structures and Algorithms
visualization workspace.

The project is designed around a simple idea: instead of only reading an
algorithm's source code or looking at its final output, the user can
follow the algorithm while it executes.

The workspace combines:

-   Interactive visualizations
-   Step-by-step algorithm execution
-   C++ implementation display
-   Algorithm explanations
-   Live execution information
-   Interactive input controls
-   Complexity information
-   Timeline-based navigation

The interface shown in the project screenshots uses a dark visual theme
with purple highlights and separates the visualization, implementation,
and explanation areas into dedicated panels.

------------------------------------------------------------------------

## 2. Project Objectives

The main objectives of AlgoVerse are:

1.  Make DSA algorithms easier to understand through visualization.
2.  Connect algorithm theory with actual source-code execution.
3.  Show the internal state of an algorithm while it runs.
4.  Allow users to experiment with their own inputs.
5.  Provide step-by-step navigation through an algorithm.
6.  Present complexity information alongside the visualization.

------------------------------------------------------------------------

## 3. Main Workspace

The main AlgoVerse workspace is divided into several functional areas.

### 3.1 Algorithm Selector

The top navigation contains a dropdown used to select the algorithm or
data-structure operation.

Examples visible in the project screenshots include:

-   Linear Search
-   BST Search
-   DFS
-   Queue Dequeue
-   Quick Sort
-   Heap Sort

The selected operation controls the visualization, implementation,
explanation, complexity information, and input controls shown in the
workspace.

### 3.2 Visualization Panel

The left side of the workspace contains the main visualization.

Depending on the selected algorithm, the visualization can represent:

-   Arrays
-   Linked structures
-   Stacks
-   Queues
-   Binary trees
-   Binary search trees
-   Heaps
-   Graphs

Important elements are highlighted during execution.

For example:

-   Linear Search highlights the current array element.
-   BST Search highlights the current tree node.
-   DFS highlights the current graph node.
-   Queue Dequeue highlights the front element.
-   Heap Sort highlights elements involved in the current heap
    operation.

### 3.3 Implementation Panel

The center panel displays the implementation associated with the
selected algorithm.

The screenshots show the implementation in **C++**.

The panel uses line highlighting to indicate the relevant part of the
implementation for the current execution step.

This creates a direct connection between:

**Source Code → Current Step → Visualization**

### 3.4 Algorithm Information Panel

The right side of the workspace contains the algorithm information.

It includes:

-   Algorithm name
-   Complexity
-   Short description
-   Current step
-   Explanation of what is happening
-   Live variables

The interface therefore provides both the theoretical information and
the current execution state.

### 3.5 Input Playground

The Input Playground allows users to provide custom data.

Examples shown in the screenshots include:

**Linear Search**

``` text
7, 3, 9, 2, 5, 8, 1
```

with target:

``` text
5
```

**BST Search**

``` text
50, 30, 70, 20, 40, 60, 80
```

with search value:

``` text
60
```

**DFS**

``` text
A-B, A-C, B-D, B-E, C-F, E-G
```

with start node:

``` text
A
```

**Queue**

``` text
10, 20, 30, 45, 34, 23, 78
```

The input area also provides a **Run Algorithm** control and, depending
on the algorithm, presets.

------------------------------------------------------------------------

# 4. Step-by-Step Execution System

A major part of AlgoVerse is its execution timeline.

The bottom of the workspace contains a sequence of execution steps.

Users can move through the algorithm using controls such as:

-   Previous
-   Play
-   Next
-   Restart

The current step is highlighted on the timeline.

The interface also displays the current step number and total number of
steps.

For example, the screenshots show executions such as:

``` text
Step 13 / 16
```

for Linear Search and:

``` text
Step 83 / 95
```

for Heap Sort.

This allows the user to inspect an algorithm one operation at a time.

------------------------------------------------------------------------

# 5. Live Execution Information

AlgoVerse provides a Live Execution section below the implementation
panel.

The displayed variables depend on the selected algorithm.

The workspace can show information such as:

-   Current indices
-   Comparisons
-   Current values
-   Array size
-   Target
-   Swapping state
-   Other algorithm-specific execution values

This is useful for understanding the internal state that would normally
only be visible while debugging code.

------------------------------------------------------------------------

# 6. Searching Algorithms

## 6.1 Linear Search

The Linear Search visualization shows an array and a target value.

Example shown in the screenshot:

``` text
Array: 7, 3, 9, 2, 5, 8, 1
Target: 5
```

The visualization highlights the current element being checked.

The interface can display states such as:

``` text
CHECK
TARGET: 5
NOT A MATCH
```

The implementation panel shows a C++ Linear Search implementation.

The algorithm information panel identifies the complexity as:

``` text
O(n)
```

The visualization demonstrates the relationship between the loop in the
implementation and the individual element comparisons.

------------------------------------------------------------------------

## 6.2 BST Search

BST Search uses a Binary Search Tree to locate a requested value.

The screenshot shows the tree:

``` text
        50
       /  \
     30    70
    / \    / \
   20 40  60 80
```

The search value is:

``` text
60
```

The visualization begins by comparing the target with the root.

The displayed execution explanation includes:

``` text
Compare 60 with 50.
```

The tree then allows the algorithm to follow the BST rule and move
toward the appropriate subtree.

The interface displays the average complexity as:

``` text
O(log n) avg
```

------------------------------------------------------------------------

# 7. Sorting Algorithms

## 7.1 Quick Sort

The Quick Sort screen shows an array and an active partition.

The implementation panel displays the recursive Quick Sort structure,
including:

-   Base condition
-   Partition
-   Recursive call on the left partition
-   Recursive call on the right partition

The algorithm information panel displays:

``` text
O(n log n) avg
```

The visualization identifies the active partition while the algorithm
executes.

The Input Playground allows users to provide an array before running the
algorithm.

------------------------------------------------------------------------

## 7.2 Heap Sort

Heap Sort is visualized as a heap/tree structure.

The screenshot shows:

-   Heap nodes
-   Index information
-   Current largest element
-   Swap state
-   Final-position information

The implementation panel displays the Heap Sort and Heapify logic.

The execution step shown in the screenshot is a swap operation:

``` text
Move 3 to its final position at index 2.
```

The complexity shown in the interface is:

``` text
O(n log n)
```

Heap Sort demonstrates how a traditionally array-based algorithm can be
represented visually as a heap structure.

------------------------------------------------------------------------

# 8. Graph Algorithms

## 8.1 Depth First Search

DFS is represented using a graph containing vertices such as:

``` text
A
B
C
D
E
F
G
```

The screenshot shows edges including:

``` text
A-B
A-C
B-D
B-E
C-F
E-G
```

The starting node is:

``` text
A
```

The implementation panel displays a stack-based DFS implementation.

The visualization begins with:

``` text
INITIALIZE
```

and the execution explanation states:

``` text
Start DFS from A.
```

The implementation uses:

-   A stack
-   A visited set
-   Node extraction
-   Visited-node checks
-   Neighbor processing

The algorithm information panel displays:

``` text
O(V + E)
```

------------------------------------------------------------------------

# 9. Queue

## 9.1 Queue Dequeue

The Queue Dequeue visualization represents a queue using connected
elements.

The screenshot shows values including:

``` text
10 → 20 → 30 → 45 → 34 → ...
```

The first element is identified as the **front**.

The current front value is highlighted.

The implementation panel shows the dequeue operation:

1.  Check whether the front is null.
2.  Store the current front node.
3.  Move the front pointer to the next node.
4.  Delete the previous front node.

The algorithm information panel identifies the complexity as:

``` text
O(1)
```

The execution explanation begins with:

``` text
Check whether the queue is empty.
```

This visualization demonstrates the FIFO behavior of a queue.

------------------------------------------------------------------------

# 10. Data Structures

The project workspace covers fundamental data-structure concepts through
visual operations.

The demonstrated interface includes:

### Linked List

The project includes linked-list operations with node and pointer
visualization.

### Stack

The workspace provides stack operations such as Peek.

### Queue

The workspace provides queue operations such as Dequeue.

### Binary Tree

The workspace provides binary-tree visualization and traversal.

### Binary Search Tree

The workspace provides BST operations such as Search.

### Heap

The workspace visualizes heap-based operations and Heap Sort.

### Graph

The workspace visualizes graph traversal such as DFS and BFS.

------------------------------------------------------------------------

# 11. Stack Peek

Stack Peek accesses the element currently at the top of the stack
without removing it.

The operation is represented visually by highlighting the top element.

The implementation checks the top of the stack and reads its value.

The operation has constant-time complexity:

``` text
O(1)
```

The visualization makes the concept of the stack's top element
immediately visible.

------------------------------------------------------------------------

# 12. Visualization and Code Integration

One of the central features of AlgoVerse is the connection between the
visual representation and the implementation.

The workspace presents three related pieces of information at the same
time:

### 1. Visualization

Shows what is happening to the data structure.

### 2. Implementation

Shows the corresponding C++ logic.

### 3. Explanation

Explains the current execution step.

For example, during BST Search:

``` text
Visualization:
Compare target with current node

Implementation:
if (value < root.value)
    ...

Explanation:
Compare 60 with 50.
```

This approach allows the user to connect abstract source code with a
concrete visual operation.

------------------------------------------------------------------------

# 13. Complexity Information

AlgoVerse displays complexity information directly in the workspace.

Examples visible in the project include:

  Algorithm / Operation   Complexity shown
  ----------------------- ------------------
  Linear Search           O(n)
  BST Search              O(log n) avg
  DFS                     O(V + E)
  Queue Dequeue           O(1)
  Quick Sort              O(n log n) avg
  Heap Sort               O(n log n)

The complexity indicator is displayed near the top of the workspace and
again inside the Algorithm Info section.

------------------------------------------------------------------------

# 14. User Interaction Flow

A typical AlgoVerse workflow is:

``` text
Select Algorithm
       ↓
Enter / Select Input
       ↓
Run Algorithm
       ↓
Visualization Initializes
       ↓
Algorithm Executes Step-by-Step
       ↓
Current Code Line Is Highlighted
       ↓
Current Data Structure State Is Highlighted
       ↓
Explanation Updates
       ↓
User Can Navigate Previous / Next
       ↓
Algorithm Completes
```

The user can restart the visualization and move through the execution
timeline.

------------------------------------------------------------------------

# 15. Technologies

The project is a web-based interactive application.

Technologies visible or used in the project include:

-   React
-   JavaScript / JSX
-   Vite
-   Tailwind CSS
-   Three.js
-   C++ algorithm implementations displayed inside the workspace

The visualization layer uses a graphical scene for structures such as
trees, heaps, and graphs.

------------------------------------------------------------------------

# 16. Project Development Challenges

During development, several practical issues were encountered while
building the workspace.

### 16.1 Missing Algorithm Imports

An early Vite error occurred when an algorithm file could not be
resolved:

``` text
Failed to resolve import
../algorithms/bst/bstInsert.js
```

The issue was related to the expected algorithm file not being available
at the referenced path.

The solution was to ensure that the required algorithm modules existed
and that the import paths matched the actual project structure.

------------------------------------------------------------------------

### 16.2 Missing Store Reference

A runtime error occurred because the workspace attempted to use:

``` text
useAlgorithmStore
```

without the required definition/import being available.

This caused:

``` text
Uncaught ReferenceError:
useAlgorithmStore is not defined
```

The workspace was corrected by restoring the appropriate store usage.

------------------------------------------------------------------------

### 16.3 Maximum Update Depth

During development, React produced:

``` text
Maximum update depth exceeded.
```

This occurred when state updates inside an effect caused repeated
renders.

The issue was resolved by correcting the state/effect dependency
behavior so that an update did not continuously trigger another update.

------------------------------------------------------------------------

### 16.4 3D Visualization Scaling

The Binary Tree, BST, and Heap visualizations initially appeared too
large inside the visualization area.

The problem was not that the nodes themselves were too large. The 3D
scene was effectively zoomed too far in for the available viewport.

The visualization was adjusted so that the complete structure could
remain visible within the 3D animation window.

This was particularly important for:

-   Binary Trees
-   Binary Search Trees
-   Heaps

------------------------------------------------------------------------

### 16.5 Dropdown Styling

The algorithm-selection dropdown initially displayed a white option area
even though the application used a dark theme.

The styling was adjusted so the dropdown options matched the
application's visual theme.

------------------------------------------------------------------------

### 16.6 Build Verification

The project was tested with:

``` text
npm run build
```

The Vite production build completed successfully.

The build output reported that the client environment was transformed
and the production bundle was generated successfully.

A chunk-size warning was also reported because one generated JavaScript
chunk was larger than the configured warning threshold. This was a build
optimization warning rather than a build failure.

------------------------------------------------------------------------

# 17. Final Project State

The completed workspace provides an interactive environment where users
can:

-   Select algorithms and operations
-   Enter custom data
-   Run visualizations
-   Watch algorithms execute step-by-step
-   Navigate between execution states
-   View C++ implementations
-   See the currently relevant code line
-   Read explanations for each step
-   Inspect live execution information
-   View complexity information
-   Restart an execution

The project has been tested across the implemented data-structure and
algorithm visualizations, with particular attention to the tree, heap,
and graph visualizations.

------------------------------------------------------------------------

# 18. Future Scope

Advanced algorithms are intentionally outside the scope of this basic
DSA project.

Potential future work for a larger project could include:

-   Advanced graph algorithms
-   Dynamic programming visualizations
-   Shortest-path algorithms
-   Minimum spanning tree algorithms
-   Advanced tree algorithms
-   More complex algorithm comparisons
-   Performance benchmarking
-   Additional visualization modes

These features can be considered for future major projects rather than
adding unnecessary complexity to the current AlgoVerse scope.

------------------------------------------------------------------------

# 19. Conclusion

AlgoVerse turns fundamental Data Structures and Algorithms into an
interactive learning experience.

The project combines:

**Visualization + Source Code + Step Explanation + User Input +
Execution State**

into a single workspace.

The result is a DSA environment where users can observe how an algorithm
works internally instead of only seeing its final output.

The project demonstrates practical implementation of algorithm
visualization, interactive UI development, data-structure
representation, execution-state management, and integration of algorithm
implementations with a modern web interface.
