import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import RightBar from "../components/RightBar";
import Node from "../components/MessageNode";
import { isAllNodeisConnected } from "../inital-nodes";
import { nodes as initialNodes, edges as initialEdges } from "../inital-nodes";
import "reactflow/dist/style.css";
import "../styles/dnd.css";
import "../styles/updatenode.css";

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = { node: Node };

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const textRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const onInit = (instance) => setReactFlowInstance(instance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const label = event.dataTransfer.getData("content");

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: getId(),
      type,
      position,
      data: { heading: "Send Message", content: label },
    };

    setNodes((nds) => nds.concat(newNode));
    setSelectedNode(newNode.id);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)),
    [setEdges]
  );

  const [nodeName, setNodeName] = useState("Node 1");

  useEffect(() => {
    const selected = nodes.find((node) => node.selected);
    setSelectedNode(selected || null);
    setIsSelected(!!selected);
  }, [nodes]);

  useEffect(() => {
    setNodeName(selectedNode?.data?.content || "");
  }, [selectedNode]);

  useEffect(() => {
    if (selectedNode) textRef?.current?.focus();
  }, [selectedNode]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = { ...node.data, content: nodeName || " " };
        }
        return node;
      })
    );
  }, [nodeName, setNodes]);

  const saveHandler = () => {
    if (isAllNodeisConnected(nodes, edges)) {
      alert("Congrats! The flow is correct.");
    } else {
      alert("Please connect all source nodes (Cannot Save Flow).");
    }
  };

  return (
    <>
      <button onClick={saveHandler}>Save</button>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              onDrop={onDrop}
              onDragOver={onDragOver}
              attributionPosition="top-right"
            >
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>
          <RightBar
            isSelected={isSelected}
            textRef={textRef}
            nodeName={nodeName}
            setNodeName={setNodeName}
          />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default Flow;
