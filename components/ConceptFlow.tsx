import ReactFlow, { Background, Controls, Edge, Node, Position } from "reactflow";
import "reactflow/dist/style.css";

const nodeStyle = {
  padding: "10px 14px",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: 500,
  fontFamily: "'Inter', system-ui, sans-serif",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)"
};

const nodes: Node[] = [
  {
    id: "kinematics",
    position: { x: 40, y: 30 },
    data: { label: "Kinematics · 92%" },
    style: { ...nodeStyle, background: "rgba(52, 211, 153, 0.12)", border: "1px solid rgba(52, 211, 153, 0.35)", color: "#a7f3d0" }
  },
  {
    id: "energy",
    position: { x: 220, y: 110 },
    data: { label: "Energy · 88%" },
    style: { ...nodeStyle, background: "rgba(52, 211, 153, 0.12)", border: "1px solid rgba(52, 211, 153, 0.35)", color: "#a7f3d0" }
  },
  {
    id: "rotation",
    position: { x: 380, y: 20 },
    data: { label: "Rotational Dyn. · 61%" },
    style: { ...nodeStyle, background: "rgba(251, 113, 133, 0.12)", border: "1px solid rgba(251, 113, 133, 0.35)", color: "#fecdd3" }
  },
  {
    id: "gravitation",
    position: { x: 520, y: 130 },
    data: { label: "Gravitation · 74%" },
    style: { ...nodeStyle, background: "rgba(129, 140, 248, 0.12)", border: "1px solid rgba(129, 140, 248, 0.35)", color: "#c7d2fe" }
  },
  {
    id: "em",
    position: { x: 140, y: 220 },
    data: { label: "EM Induction · 55%" },
    style: { ...nodeStyle, background: "rgba(251, 113, 133, 0.12)", border: "1px solid rgba(251, 113, 133, 0.35)", color: "#fecdd3" }
  },
  {
    id: "optics",
    position: { x: 420, y: 230 },
    data: { label: "Optics · 81%" },
    style: { ...nodeStyle, background: "rgba(52, 211, 153, 0.12)", border: "1px solid rgba(52, 211, 153, 0.35)", color: "#a7f3d0" }
  }
].map((node) => ({
  ...node,
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  draggable: false
}));

const edges: Edge[] = [
  { id: "e1-2", source: "kinematics", target: "energy", animated: true, style: { stroke: "#34d399", strokeWidth: 2 } },
  { id: "e2-3", source: "energy", target: "rotation", type: "smoothstep", style: { stroke: "#818cf8", strokeWidth: 2 } },
  { id: "e3-4", source: "rotation", target: "gravitation", type: "smoothstep", style: { stroke: "#818cf8", strokeWidth: 2 } },
  { id: "e2-5", source: "energy", target: "em", type: "smoothstep", style: { stroke: "#fb7185", strokeWidth: 2 } },
  { id: "e2-6", source: "energy", target: "optics", type: "smoothstep", style: { stroke: "#34d399", strokeWidth: 2 } }
];

export default function ConceptFlow() {
  return (
    <div className="concept-map">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        nodesDraggable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(148, 163, 184, 0.06)" gap={24} size={1} />
        <Controls showInteractive={false} position="bottom-right" />
      </ReactFlow>
    </div>
  );
}
