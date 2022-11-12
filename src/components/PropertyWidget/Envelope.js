import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEnvelope } from "../../store/actions/Editor";

const colors = [
  "#A45023",
  "#F8B298",
  "#C4E4F3",
  "#F4C4C2",
  "#EB583B",
  "#E2937B",
  "#BBC7A8",
  "#DBE3E3",
  "#F7C4E3",
  "#F0973D",
  "#BEC254",
  "#A4D4C6",
];

const Envelope = () => {
  const { envelope } = useSelector((state) => state.editor);
  const dispatch = useDispatch();
  const handleClick = (color) => {
    dispatch(setEnvelope(color));
  };

  return (
    <div>
      <div className="w-full h-20 flex flex-shrink-0 items-center justify-center text-2xl font-medium text-gray-600">
        Envelope
      </div>
      <div className="flex flex-wrap">
        {colors.map((color, index) => (
          <div
            className={`w-1/3 h-24 border cursor-pointer ${
              envelope === color ? `border-black` : `border-gray-50`
            } transition opacity-100 hover:opacity-50`}
            style={{ background: color }}
            onClick={() => handleClick(color)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Envelope;
