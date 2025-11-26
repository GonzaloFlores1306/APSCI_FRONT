import { Loader2 } from "lucide-react";

export const Loading = ({ text }: { text: string }) => {
  return (
    <div className=" h-screen flex flex-col items-center">
      <div className="mt-20 flex flex-col items-center gap-4">
        <Loader2 size={84} className="animate-spin" />
        <span className="flex items-center text-3xl">
          {text}
          <span className="ml-1 flex space-x-1">
            <span className="dot animate-bounce [animation-delay:-0.3s]">
              .
            </span>
            <span className="dot animate-bounce [animation-delay:-0.15s]">
              .
            </span>
            <span className="dot animate-bounce">.</span>
          </span>
        </span>
      </div>
    </div>
  );
};
