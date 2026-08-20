# AlgoVerse

> **Don't just read the algorithm. Watch it execute.**

An interactive Data Structures & Algorithms learning platform built with React, Vite, Tailwind CSS, Three.js, React Three Fiber, Drei, and GSAP. AlgoVerse turns algorithms into step-by-step visual experiences with execution controls, explanations, complexity information, source-code views, practice questions, and revision notes.

## ✨ Highlights

- 🧠 **Step-by-step visualization** with Previous, Play, Next, and Restart controls
- 💻 **C++, Java, and Python** implementations where supported
- 🔎 Searching and sorting visualizations
- 🔗 Linked List operations
- 📚 Stack and Queue operations
- 🌳 Binary Tree, BST, and Heap visualizations
- 🌐 Graph algorithms including BFS, DFS, Dijkstra, Prim's, Kruskal's, Bellman-Ford, and Floyd-Warshall
- 📖 **DSA Notes** for quick revision
- 🧪 **Practice Mode** with questions, hints, scoring, and progress
- 📊 Complexity information and execution explanations
- 🎯 Current code-line highlighting
- 🎮 Custom input playgrounds and presets
- 📱 Responsive, student-focused interface
- ✨ Interactive visual scenes for supported data structures

## 🧭 What you can explore

| Area | Algorithms / Operations |
|---|---|
| Searching | Linear Search, Binary Search |
| Sorting | Bubble, Insertion, Selection, Merge, Quick, Heap Sort |
| Linked List | Traversal, Insertion, Deletion |
| Stack | Push, Pop, Peek |
| Queue | Enqueue, Dequeue, Front |
| Binary Tree | Preorder, Inorder, Postorder, Level Order |
| Heap | Build Max Heap, Insert, Extract Max |
| Binary Search Tree | Insert, Search, Delete |
| Graph | BFS, DFS, Dijkstra, Prim's, Kruskal's, Bellman-Ford, Floyd-Warshall |

## 🎓 Learning Tools

### Algorithm Workspace

Select an algorithm, provide input, and run it. AlgoVerse generates execution states and connects the visualization with the algorithm implementation.

```text
Select Algorithm
       ↓
Provide Input
       ↓
Run Algorithm
       ↓
Generate Execution Steps
       ↓
Visualize Current State
       ↓
Highlight Relevant Code
       ↓
Explain Current Step
       ↓
Move Through Timeline
```

### DSA Notes

A dedicated revision area covering core concepts such as Arrays, Linked Lists, Stacks, Queues, Trees, Heaps, Graphs, Searching, Sorting, and Complexity.

### Practice Mode

A question-based revision system with:

- Multiple-choice questions
- Topic filtering
- Difficulty levels
- Hints
- Instant feedback
- Score tracking
- Progress through the question set

## 🌐 Graph Learning

AlgoVerse includes a dedicated set of graph visualizations covering traversal, shortest paths, and minimum spanning trees.

- **BFS / DFS:** graph traversal
- **Dijkstra:** shortest paths with non-negative edge weights
- **Bellman-Ford:** shortest paths with support for negative edge weights
- **Floyd-Warshall:** all-pairs shortest paths
- **Prim's:** minimum spanning tree using a growing vertex set
- **Kruskal's:** minimum spanning tree using sorted edges

## 💻 Code + Visualization

The workspace is designed to connect implementation with behavior. Depending on the algorithm, the interface can show:

- Current data-structure state
- Active execution step
- Relevant source-code section
- Explanation of the current operation
- Complexity information
- User-provided input

This makes the project useful for both **learning concepts** and **visual revision before exams/interviews**.

## 🎮 Custom Input

Users can experiment with their own data instead of relying only on predefined examples.

Supported inputs include:

- Arrays and search targets
- Linked List values and positions
- Stack and Queue values
- Tree and BST values
- Graph edges and starting nodes

Presets are available for supported algorithms so users can quickly explore an example.

## 📊 Complexity Examples

| Algorithm | Typical Complexity |
|---|---:|
| Linear Search | O(n) |
| Binary Search | O(log n) |
| Merge Sort | O(n log n) |
| Quick Sort | O(n log n) average |
| Heap Sort | O(n log n) |
| BFS | O(V + E) |
| DFS | O(V + E) |
| Dijkstra | O((V + E) log V) with a heap |
| Bellman-Ford | O(VE) |
| Floyd-Warshall | O(V³) |
| Prim's | O(E log V) with a heap |
| Kruskal's | O(E log E) |

## 🛠️ Tech Stack

- **React**
- **JavaScript / JSX**
- **Vite**
- **Tailwind CSS**
- **Three.js**
- **React Three Fiber**
- **Drei**
- **GSAP**
- **GitHub**
- **Vercel**

## 📂 Project Structure

```text
AlgoVerse/
├── src/
│   ├── algorithms/       # Algorithm logic and execution traces
│   ├── components/       # Reusable UI, notes, practice, and panels
│   ├── pages/            # Main algorithm workspace
│   ├── scenes/           # Data-structure visualizations
│   └── store/             # Execution state management
├── public/                # Static assets
├── docs/                  # Project documentation and media
├── README.md
├── LICENSE
├── package.json
└── .gitignore
```

## 🚀 Run Locally

### 1. Clone

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd AlgoVerse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

### 4. Production build

```bash
npm run build
```

## 🌍 Deployment

AlgoVerse is designed to deploy directly from GitHub to Vercel. Pushes to the connected production branch can trigger a new deployment automatically.

## 📸 Project Media

Project screenshots and demonstration media are maintained under `docs/` when available.

## 🧩 Development Notes

The project evolved from a basic algorithm visualizer into a broader DSA learning workspace. During development, the project addressed issues involving visualization state, React rendering, responsive layouts, algorithm imports, production builds, and graph-lab integration.

For deeper implementation notes, see [`docs/DOCUMENTATION.md`](./docs/DOCUMENTATION.md).

## 🎯 Project Goal

AlgoVerse aims to make DSA easier to understand by connecting **code → execution → visualization → explanation** in one place.

Instead of only asking what an algorithm does, AlgoVerse lets students watch the individual operations unfold.

## 👨‍💻 Author

**Shashwat Ghadge**  
B.Tech Computer Science & Engineering

## 📄 License & Copyright

Copyright © 2026 Shashwat Ghadge. All rights reserved.

AlgoVerse is **not open source**. No permission is granted to copy, modify, distribute, publish, sublicense, sell, or reuse this project's source code, design, graphics, documentation, or other project assets without prior written permission from the copyright holder without prior written permission.

See [`LICENSE`](./LICENSE) for the full terms.
