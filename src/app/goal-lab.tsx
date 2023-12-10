"use client";

import { useState } from "react";
import { GoalInputForm } from "@/app/components/ui/goal-input-form";
import ReactFlow, { Background, Controls } from "reactflow";
import { LabLoader } from "./components/ui/lab-spacer";

export function GoalLab() {
  const [goal, setGoal] = useState("");
  return (
    <>
      <GoalInputForm setGoal={setGoal} />
      {goal ? (
        <>
          <LabLoader count={5} />
          <div className="container">
            <ReactFlow>
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </>
      ) : null}
    </>
  );
}
