import React from "react";
import { useSelector } from "react-redux";
import Backdrop from "./Backdrop";
import Envelope from "./Envelope";
import Liner from "./Liner";
import Stamp from "./Stamp";
import Sticker from "./Sticker";
import TextBoard from "./TextBoard";

const PropertyWidget = () => {
  const selectedTool = useSelector((state) => state.editor.tool);

  return (
    <div className="w-80 h-screen flex flex-col bg-white border-r border-r-gray-100 overflow-y-auto">
      {selectedTool.id === "backdrop" && <Backdrop />}
      {selectedTool.id === "sticker" && <Sticker />}
      {selectedTool.id === "text" && <TextBoard />}
      {selectedTool.id === "envelope" && <Envelope />}
      {selectedTool.id === "liner" && <Liner />}
      {selectedTool.id === "stamp" && <Stamp />}
    </div>
  );
};

export default PropertyWidget;
