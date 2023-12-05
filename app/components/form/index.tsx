"use client";

import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { createGoal } from "@/app/actions";

async function increment(previousState: number, formData: any) {
  return previousState + 1;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

export function ChatForm() {
  const [state, formAction] = useFormState(increment, 0);

  return (
    <form action={formAction}>
      <label htmlFor="todo">Enter Task</label>
      <input type="text" id="todo" name="todo" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state}
      </p>
    </form>
  );
}
