// Simple React Flow preview to replace static concept map.
// When data is ready, swap nodes/edges from API or localStorage.
import ReactFlow, { Background, Controls, Edge, Node, Position } from "reactflow";
import "reactflow/dist/style.css";

const nodes: Node[] = [
  {
    id: "kinematics",
    position: { x: 40, y: 30 },
    data: { label: "Kinematics · 92%" },
    style: { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#f2f5ff" }
  },
  {
    id: "energy",
    position: { x: 220, y: 110 },
    data: { label: "Energy · 88%" },
    style: { background: "rgba(115,243,210,0.1)", border: "1px solid rgba(115,243,210,0.4)", color: "#f2f5ff" }
  },
  {
    id: "rotation",
    position: { x: 380, y: 20 },
    data: { label: "Rotational Dyn. · 61%" },
    style: { background: "rgba(242,139,130,0.12)", border: "1px solid rgba(242,139,130,0.35)", color: "#ffdcd5" }
  },
  {
    id: "gravitation",
    position: { x: 520, y: 130 },
    data: { label: "Gravitation · 74%" },
    style: { background: "rgba(122,184,255,0.12)", border: "1px solid rgba(122,184,255,0.4)", color: "#f2f5ff" }
  },
  {
    id: "em",
    position: { x: 140, y: 220 },
    data: { label: "EM Induction · 55%" },
    style: { background: "rgba(242,139,130,0.12)", border: "1px solid rgba(242,139,130,0.35)", color: "#ffdcd5" }
  },
  {
    id: "optics",
    position: { x: 420, y: 230 },
    data: { label: "Optics · 81%" },
    style: { background: "rgba(115,243,210,0.1)", border: "1px solid rgba(115,243,210,0.4)", color: "#f2f5ff" }
  }
].map((node) => ({
  ...node,
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  draggable: false
}));

const edges: Edge[] = [
  { id: "e1-2", source: "kinematics", target: "energy", animated: true, style: { stroke: "#73f3d2" } },
  { id: "e2-3", source: "energy", target: "rotation", type: "smoothstep", style: { stroke: "#7ab8ff" } },
  { id: "e3-4", source: "rotation", target: "gravitation", type: "smoothstep", style: { stroke: "#7ab8ff" } },
  { id: "e2-5", source: "energy", target: "em", type: "smoothstep", style: { stroke: "#f28b82" } },
  { id: "e2-6", source: "energy", target: "optics", type: "smoothstep", style: { stroke: "#73f3d2" } }
];

export default function ConceptFlow() {
  return (
    <div className="concept-map">
      <ReactFlow nodes={nodes} edges={edges} fitView fitViewOptions={{ padding: 0.2 }} nodesDraggable={false}>
        <Background color="rgba(255,255,255,0.08)" gap={20} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
