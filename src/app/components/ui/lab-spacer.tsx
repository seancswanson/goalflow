import { Fragment, useEffect } from "react";

export const LabLoader = ({ count }: { count: number }) => {
  useEffect(() => {
    async function getLoader() {
      const { ping } = await import("ldrs");
      ping.register();
    }
    getLoader();
  }, []);
  // Default values shown
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {Array.from({ length: count }).map((_, index) => (
        <Fragment key={index}>
          <l-ping size="10" speed="10" color="black"></l-ping>
        </Fragment>
      ))}
    </div>
  );
};
