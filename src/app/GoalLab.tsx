"use client";
import { useState } from "react";
import { GoalInputForm } from "@/app/components/ui/goal-input-form";
import ReactFlow, { Background, Controls } from "reactflow";
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

const GoalFlow = (goal: string) => {
  const nodes = [
    {
      id: "1", // required
      position: { x: 0, y: 0 }, // required
      data: { label: goal },
      type: "input",
    },
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
      <CardContent className="h-full">
        <ReactFlow nodes={nodes} className="min-h-[200px]">
          <Background />
          <Controls />
        </ReactFlow>
      </CardContent>
    </Card>
  );
};

export function GoalLab() {
  const [goal, setGoal] = useState("");
  const [context, setContext] = useState("");
  return (
    <>
      <GoalInputForm setGoal={setGoal} setContext={setContext} />
      {goal ? (
        <div className="container h-full">
          <FadeIn delay={100}>
            <LabLoader count={3} />
            {GoalFlow(goal)}
          </FadeIn>
        </div>
      ) : null}
    </>
  );
}
