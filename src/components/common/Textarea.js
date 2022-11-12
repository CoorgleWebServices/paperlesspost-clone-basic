import React from "react";

const Textarea = ({ value, onChange }) => {
  return (
    <div className="flex w-full relative">
      <textarea
        className="w-full min-h-[240px] outline-none resize-none p-3 focus:border focus:border-blue-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      <button
        className="h-8 absolute bottom-0.5 right-0.5 px-2 py-1 bg-white hover:text-blue-400"
        onClick={() => onChange("")}
      >
        Clear
      </button>
    </div>
  );
};

export default Textarea;
