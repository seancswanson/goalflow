import Navbar from "./components/navigation/navbar";
import { ChatForm } from "./components/form";

export default function Home() {
  return (
    <main className="w-11/12 mx-auto flex flex-col">
      <h2>Input your goal below</h2>
      <ChatForm></ChatForm>
    </main>
  );
}
