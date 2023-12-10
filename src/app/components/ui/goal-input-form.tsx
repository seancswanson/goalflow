"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { useToast } from "@/app/components/ui/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card";

const FormSchema = z.object({
  goal: z.string().min(2, {
    message: "Goal must be at least 2 characters.",
  }),
});

export function GoalInputForm({
  setGoal,
}: {
  setGoal: (goal: string) => void;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      goal: "Testing testing",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setGoal(data.goal);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Card className="w-11/12 max-w-screen-md mx-auto">
      <CardHeader>
        <CardTitle>New Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 md:items-end md:flex-row"
          >
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem className="md:grow">
                  <FormLabel>Enter a goal</FormLabel>
                  <FormDescription>
                    What do you want to accomplish?
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="I want to learn how to..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Generate Flow</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
