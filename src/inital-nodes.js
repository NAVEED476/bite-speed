import { MarkerType } from "reactflow";

export const nodes = [
  {
    id: "1",
    type: "node",
    data: { heading: "Send Message", content: "Name of the Node" },
    position: { x: 50, y: 200 },
  },
];

export const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];


export function isAllNodeisConnected(nodes, edges) {
    console.log(nodes, edges, "is");
    const allNodesIds = nodes.map((node) => node.id);
    const allSourceEdges = edges.map((edge) => edge.source);
    let count = 0;
    for (let i = 0; i < allNodesIds.length; i++) {
      if (!allSourceEdges.includes(allNodesIds[i])) count++;
    }
    console.log(allNodesIds, allSourceEdges);
    if (count >= 2) {
      return false;
    }
    return true;
  }
  