"use client";
import { useState } from "react";
import { GoalInputForm } from "@/app/components/ui/goal-input-form";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  NodeOrigin,
} from "reactflow";
import { LabLoader } from "./components/ui/lab-spacer";
import { LoadingIndicator } from "./components/ui/loading-indicator";
import FadeIn from "react-fade-in";
import * as React from "react";
import "reactflow/dist/style.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
type SkillResource = {
  name: string;
  details: string[];
};

type MainNodes = {
  name: string;
  childNodes: SkillResource[];
};

export type Roadmap = MainNodes[];
const createNodesFromRoadmap = (roadmap: any) => {
  if (!roadmap || !roadmap.mainNodes || !Array.isArray(roadmap.mainNodes)) {
    throw new Error(
      "Invalid roadmap: mainNodes does not exist or is not an array"
    );
  }

  let nodes: any[] = [];
  roadmap.mainNodes.forEach((mainNode: any, index: number) => {
    // Updated function to extract node property based on new and old schemas
    const getNodeProperty = (node: any) => {
      return (
        node.nodeName ||
        node.name ||
        node.domain ||
        node.title ||
        node.skill ||
        "Unknown"
      );
    };

    const nodeId = mainNode.nodeId || `${getNodeProperty(mainNode)}-${index}`;

    // Add main node
    nodes.push({
      id: nodeId,
      data: { label: getNodeProperty(mainNode) },
      position: { x: 0, y: nodes.length * 100 },
    });

    // Process child nodes (recursively)
    const processChildNodes = (childNodes: any, parentId: any) => {
      childNodes.forEach((childNode: any, childIndex: number) => {
        const childNodeId =
          childNode.nodeId ||
          `${getNodeProperty(childNode)}-${parentId}-${childIndex}`;
        nodes.push({
          id: childNodeId,
          data: { label: getNodeProperty(childNode) },
          position: { x: 100, y: nodes.length * 100 },
        });

        if (childNode.childNodes) {
          processChildNodes(childNode.childNodes, childNodeId);
        }
      });
    };

    if (mainNode.childNodes) {
      processChildNodes(mainNode.childNodes, nodeId);
    }
  });

  return nodes;
};
const GoalFlow = ({
  goal,
  context,
  roadmap,
}: {
  goal: string;
  context: string;
  roadmap: Roadmap;
}) => {
  const nodeOrigin: NodeOrigin = [0.5, 0.5];

  const nodes: Node[] = createNodesFromRoadmap(roadmap);
  console.log("nodes", nodes);
  const edges: Edge[] = [
    { id: "1-2", source: "1", target: "2" },
    { id: "1-3", source: "2", target: "3" },
  ];
  return (
    <Card className="w-11/12 max-w-screen-md mx-auto">
      <CardHeader>
        <CardTitle>Your flow is ready!</CardTitle>
        <CardDescription>
          Explore the flow below for a customized roadmap to accomplish your
          goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[50vh]">
        <ReactFlow
          nodeOrigin={nodeOrigin}
          nodes={nodes}
          edges={edges}
          className="min-h-[200px] h-full pb-12"
          fitView
        >
          <Background />
          <Controls showInteractive={false} />
        </ReactFlow>
      </CardContent>
    </Card>
  );
};

export function GoalLab() {
  const [goal, setGoal] = useState("");
  const [context, setContext] = useState("");
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <GoalInputForm
        setGoal={setGoal}
        setContext={setContext}
        setRoadmap={setRoadmap}
        setLoading={setLoading}
        setError={setError}
      />
      {goal ? (
        <div className="container h-full">
          {loading ? (
            <LoadingIndicator /> // Show the spinner when loading
          ) : (
            <FadeIn delay={100}>
              <LabLoader count={3} />
              {roadmap && !error ? (
                <GoalFlow goal={goal} context={context} roadmap={roadmap} />
              ) : null}
              {error ? (
                <Card className="w-11/12 max-w-screen-md mx-auto">
                  <CardHeader>
                    <CardTitle>Apologies- Something went wrong.</CardTitle>
                    <CardDescription>Please try again.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="px-2 py-1 font-mono text-xs italic text-white bg-black rounded">
                      Reason: {error}
                    </pre>
                  </CardContent>
                </Card>
              ) : null}
            </FadeIn>
          )}
        </div>
      ) : null}
    </>
  );
}
