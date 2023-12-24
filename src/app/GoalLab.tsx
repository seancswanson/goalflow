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
  subSkills: string[];
  resources: string[];
};

type MainNodes = {
  name: string;
  childNodes: SkillResource[];
};

type Roadmap = MainNodes[];

function createNodesFromRoadmap(roadmap: Roadmap) {
  let y = -100;
  return roadmap.map((mainNode) => {
    y += 100;
    return {
      id: mainNode.name,
      data: { label: mainNode.name },
      position: { x: 0, y: y },
    };
  });
}
const GoalFlow = ({
  goal,
  context,
  roadmap,
}: {
  goal: string;
  context: string;
  roadmap: string;
}) => {
  const nodeOrigin: NodeOrigin = [0.5, 0.5];

  const createNodesFromRoadmap = (roadmap: string) => {
    console.log("creating nodes", roadmap);
  };
  createNodesFromRoadmap(roadmap);
  const nodes: Node[] = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: goal },
      type: "input",
    },
    {
      id: "2",
      position: { x: 0, y: 100 },
      data: { label: "First Domain" },
    },
    {
      id: "3",
      data: { label: "Second Domain" },
      position: { x: 0, y: 200 },
    },
  ];

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
  const [roadmap, setRoadmap] = useState("");
  return (
    <>
      <GoalInputForm
        setGoal={setGoal}
        setContext={setContext}
        setRoadmap={setRoadmap}
      />
      {goal ? (
        <div className="container h-full">
          <FadeIn delay={100}>
            <LabLoader count={3} />
            {roadmap ? GoalFlow({ goal, context, roadmap }) : null}
          </FadeIn>
        </div>
      ) : null}
    </>
  );
}
