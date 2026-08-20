export const dijkstraCode = {
  cpp: [
    "priority_queue<pair<int,char>, vector<pair<int,char>>, greater<pair<int,char>>> pq;",
    "dist[source] = 0;",
    "pq.push({0, source});",
    "while (!pq.empty()) {",
    "  auto [d, u] = pq.top(); pq.pop();",
    "  if (d != dist[u]) continue;",
    "  for (auto [v, w] : graph[u]) {",
    "    if (d + w < dist[v]) {",
    "      dist[v] = d + w;",
    "      parent[v] = u;",
    "      pq.push({dist[v], v});",
    "    }",
    "  }",
    "}",
  ],
  java: [
    "PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingInt(n -> n.distance));",
    "dist[source] = 0;",
    "pq.offer(new Node(source, 0));",
    "while (!pq.isEmpty()) {",
    "  Node current = pq.poll();",
    "  if (current.distance != dist[current.vertex]) continue;",
    "  for (Edge edge : graph.get(current.vertex)) {",
    "    int next = current.distance + edge.weight;",
    "    if (next < dist[edge.to]) {",
    "      dist[edge.to] = next;",
    "      parent[edge.to] = current.vertex;",
    "      pq.offer(new Node(edge.to, next));",
    "    }",
    "  }",
    "}",
  ],
  python: [
    "heap = [(0, source)]",
    "dist = {node: float('inf') for node in graph}",
    "dist[source] = 0",
    "while heap:",
    "    distance, u = heappop(heap)",
    "    if distance != dist[u]: continue",
    "    for v, weight in graph[u]:",
    "        next_distance = distance + weight",
    "        if next_distance < dist[v]:",
    "            dist[v] = next_distance",
    "            parent[v] = u",
    "            heappush(heap, (next_distance, v))",
    "",
  ],
};

export const defaultDijkstraGraph = {
  A: [["B", 4], ["C", 2]],
  B: [["A", 4], ["C", 1], ["D", 5]],
  C: [["A", 2], ["B", 1], ["D", 8], ["E", 10]],
  D: [["B", 5], ["C", 8], ["E", 2], ["F", 6]],
  E: [["C", 10], ["D", 2], ["F", 3]],
  F: [["D", 6], ["E", 3]],
};

export function createDijkstraTrace(graph, source = "A", target = "F") {
  const nodes = Object.keys(graph);
  const dist = Object.fromEntries(nodes.map((node) => [node, Infinity]));
  const parent = Object.fromEntries(nodes.map((node) => [node, null]));
  const visited = [];
  const steps = [];
  const heap = [{ node: source, distance: 0 }];
  dist[source] = 0;

  const snapshot = (action, explanation, codeLine, activeNode = null, activeEdge = null) => ({
    id: steps.length,
    action,
    explanation,
    codeLine,
    graph,
    distances: { ...dist },
    parent: { ...parent },
    visited: [...visited],
    activeNode,
    activeEdge,
    target,
  });

  steps.push(snapshot("initialize", `Start at ${source}. Its distance is 0; every other node begins at infinity.`, 2, source));

  while (heap.length) {
    heap.sort((a, b) => a.distance - b.distance);
    const current = heap.shift();
    const u = current.node;
    if (current.distance !== dist[u] || visited.includes(u)) continue;

    steps.push(snapshot("extract", `Choose ${u}, the unvisited node with the smallest tentative distance (${dist[u]}).`, 5, u));
    visited.push(u);
    steps.push(snapshot("visit", `Mark ${u} visited. Its shortest distance is now settled.`, 6, u));

    if (u === target) {
      steps.push(snapshot("complete", `Reached ${target}. The shortest distance from ${source} to ${target} is ${dist[target]}.`, 4, u));
      break;
    }

    for (const [v, weight] of graph[u] || []) {
      if (visited.includes(v)) continue;
      const candidate = dist[u] + weight;
      steps.push(snapshot("relax", `Check edge ${u} → ${v}: ${dist[u]} + ${weight} = ${candidate}.`, 8, u, [u, v]));
      if (candidate < dist[v]) {
        dist[v] = candidate;
        parent[v] = u;
        heap.push({ node: v, distance: candidate });
        steps.push(snapshot("update", `Update ${v} to distance ${candidate} and remember ${u} as its parent.`, 9, v, [u, v]));
      }
    }
  }

  const path = [];
  if (dist[target] !== Infinity) {
    let cursor = target;
    while (cursor) {
      path.unshift(cursor);
      cursor = parent[cursor];
    }
  }

  steps.push(snapshot("complete", path.length ? `Shortest path: ${path.join(" → ")} with total cost ${dist[target]}.` : `No path from ${source} to ${target}.`, 12, target));
  steps[steps.length - 1].path = path;
  steps[steps.length - 1].distance = dist[target];
  return steps;
}
