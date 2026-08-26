# Nexorune

> **Don't just read the algorithm. Watch it execute.**

An interactive Data Structures & Algorithms learning platform built with React, Vite, Tailwind CSS, Three.js, React Three Fiber, Drei, and GSAP. Nexorune turns algorithms into step-by-step visual experiences with execution controls, explanations, complexity information, source-code views, practice questions, and revision notes.

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

Select an algorithm, provide input, and run it. Nexorune generates execution states and connects the visualization with the algorithm implementation.

### DSA Notes

A dedicated revision area covering Arrays, Linked Lists, Stacks, Queues, Trees, Heaps, Graphs, Searching, Sorting, and Complexity.

### Practice Mode

A question-based revision system with multiple-choice questions, topic filtering, difficulty levels, hints, instant feedback, score tracking, and progress through the question set.

## 🌐 Graph Learning

Nexorune includes graph visualizations covering traversal, shortest paths, and minimum spanning trees.

- **BFS / DFS:** graph traversal
- **Dijkstra:** shortest paths with non-negative edge weights
- **Bellman-Ford:** shortest paths with support for negative edge weights
- **Floyd-Warshall:** all-pairs shortest paths
- **Prim's:** minimum spanning tree using a growing vertex set
- **Kruskal's:** minimum spanning tree using sorted edges

## 💻 Code + Visualization

The workspace connects implementation with behavior. Depending on the algorithm, the interface can show the current data-structure state, active execution step, relevant source-code section, explanation, complexity information, and user-provided input.

## 🎮 Custom Input

Users can experiment with their own data instead of relying only on predefined examples. Supported inputs include arrays and search targets, linked-list values and positions, stack and queue values, tree and BST values, and graph edges and starting nodes.

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
Nexorune/
├── src/
│   ├── algorithms/       # Algorithm logic and execution traces
│   ├── components/       # Reusable UI, notes, practice, and panels
│   ├── pages/            # Main algorithm workspace
│   ├── scenes/           # Data-structure visualizations
│   └── store/            # Execution state management
├── public/                # Static assets
├── docs/                  # Project documentation and media
├── README.md
├── LICENSE
└── .gitignore
```

## 🚀 Run Locally

```bash
git clone https://github.com/Shashwat220605/Nexorune.git
cd Nexorune
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

## 🌍 Deployment

Nexorune is designed to deploy directly from GitHub to Vercel. Pushes to the connected production branch can trigger a new deployment automatically.

## 🎯 Project Goal

Nexorune makes DSA easier to understand by connecting **code → execution → visualization → explanation** in one place.

## 👨‍💻 Author

**Shashwat Ghadge**  
B.Tech Computer Science & Engineering

## 📄 License & Copyright

Copyright © 2026 Shashwat Ghadge. All rights reserved.

Nexorune is **not open source**. No permission is granted to copy, modify, distribute, publish, sublicense, sell, or reuse this project's source code, design, graphics, documentation, or other project assets without prior written permission from the copyright holder.

See [`LICENSE`](./LICENSE) for the full terms.
