import { useEffect } from "react";

export const LoadingIndicator = () => {
  useEffect(() => {
    async function getLoader() {
      const { ping } = await import("ldrs");
      ping.register();
    }
    getLoader();
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <l-ping size="30" speed="10" color="black"></l-ping>
      <p className="px-2 py-1 font-mono text-xs text-white bg-black rounded">
        Generating roadmap...
      </p>
    </div>
  );
};
