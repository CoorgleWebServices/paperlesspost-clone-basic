import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedItemId,
  setSelectedTool,
  updateDesign,
} from "../store/actions/Editor";
import { FONTS, INIT_TEXT } from "../constants";
import Image from "../assets/icons/image.png";
import Sticker from "../assets/icons/sticker.png";
import Text from "../assets/icons/text.png";
import Stamp from "../assets/icons/stamp.png";
import Envelope from "../assets/icons/envelope.png";
import Liner from "../assets/icons/open-envelope.png";

const Toolbar = () => {
  const dispatch = useDispatch();
  const { target, tool } = useSelector((state) => state.editor);
  const tools = [
    {
      id: "backdrop",
      label: "Backdrop",
      icon: Image,
    },
    {
      id: "text",
      label: "Add Text",
      icon: Text,
      type: "card",
      action: () => {
        const font = {
          family: "Ubuntu",
          size: 60,
          style: "normal",
          weight: "normal",
        };
        const key = new Date().getTime();
        const canvas = document.getElementById("card-canvas");
        const ctx = canvas.getContext("2d");
        ctx.font = `${font.weight} ${font.style} ${font.size}px ${font.family}`;
        const width = ctx.measureText(INIT_TEXT).width;
        dispatch(
          updateDesign({
            action: "create",
            target: "card",
            type: "texts",
            data: {
              id: key,
              text: INIT_TEXT,
              x: (canvas.width - width) / 2,
              y: 100,
              width,
              height: 100,
              angle: 0,
              font,
              color: FONTS[0],
            },
          })
        );
        dispatch(setSelectedItemId(key));
      },
    },
    {
      id: "sticker",
      label: "Stickers",
      icon: Sticker,
      type: "card",
    },
    {
      id: "envelope",
      label: "Envelope",
      icon: Envelope,
      type: "envelope",
    },
    {
      id: "liner",
      label: "Liner",
      icon: Liner,
      type: "envelope",
    },
    {
      id: "stamp",
      label: "Stamp",
      icon: Stamp,
      type: "envelope",
    },
  ];

  const handleClick = (tool) => {
    dispatch(setSelectedTool(tool));
    if (tool.action) tool.action();
  };

  return (
    <div className="w-24 h-screen flex flex-col items-center justify-center bg-white border-r border-r-gray-100">
      {tools.map((item) => (
        <Fragment key={item.id}>
          {(!item.type || item.type === target) && (
            <button
              className={`w-full flex flex-col items-center py-4 opacity-100 hover:opacity-50 ${
                item.id === tool.id
                  ? `text-white bg-blue-400`
                  : `text-black bg-white`
              }`}
              onClick={() => handleClick(item)}
            >
              <img
                src={item.icon}
                alt={item.id}
                className={`w-8 mb-2 ${item.id === tool.id ? `invert` : ``}`}
              />
              <span>{item.label}</span>
            </button>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Toolbar;
