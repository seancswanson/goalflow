import THREE from "three";
import { GoalLab } from "./GoalLab";
import VantaBackground from "./components/ui/vanta-bg";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-[90%] mx-auto">
      <VantaBackground />
      <GoalLab />
    </main>
  );
}
