import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Textarea from "../common/Textarea";
import Font from "../common/Font";
import { COLORS, FONTS, INIT_TEXT } from "../../constants";

const TextBoard = () => {
  const [text, setText] = useState(INIT_TEXT);

  return (
    <div>
      <Textarea value={text} onChange={(txt) => setText(txt)} />
      <div className="border-y">
        <p className="text-center py-5 text-gray-500">Text styles</p>
        <div className="flex flex-wrap">
          {FONTS.map((font) => (
            <div className="w-1/2" key={font.name}>
              <Font {...font} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between p-5">
        <span className="w-7 h-7 rounded-full cursor-pointer">
          <svg
            height="28px"
            viewBox="0 0 240 240"
            width="28px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M119.9 120s7-19.1-.4-48.8C110.1 33.4 66 12.9 66 12.9 84.2 3.7 105-1 126.9.3c21.9 1.3 41.9 8.4 59 19.6 0 0 4.2 48.3-23.8 75.4-22.1 21.2-42.2 24.7-42.2 24.7z"
              fill="#ffa102"
            ></path>
            <path
              d="M119.9 120s-13-15.6-42.5-24.1C39.9 85.2.1 113 .1 113c1.2-20.4 7.4-40.7 19.5-59 12-18.3 28.2-32.1 46.5-41.2 0 0 44 20.5 53.5 58.3 7.4 29.8.3 48.9.3 48.9z"
              fill="#ffd203"
            ></path>
            <path
              d="M119.9 120s13 15.6 42.5 24.1c37.5 10.7 77.3-17.1 77.3-17.1-1.2 20.4-7.4 40.7-19.5 59-12 18.3-28.2 32.1-46.5 41.2 0 0-44-20.5-53.5-58.3-7.3-29.8-.3-48.9-.3-48.9z"
              fill="#ba5dd2"
            ></path>
            <path
              d="M119.9 120s20-3.5 42.1-24.8c28.1-27.1 23.8-75.4 23.8-75.4C203 31 217.5 46.6 227.3 66.1c9.8 19.5 13.7 40.5 12.5 60.8 0 0-39.8 27.8-77.3 17.1-29.5-8.4-42.6-24-42.6-24z"
              fill="#ff4c42"
            ></path>
            <path
              d="M120.1 120s-20 3.5-42.1 24.8c-28.1 27.1-23.8 75.4-23.8 75.4C37 209 22.5 193.4 12.7 173.9 2.9 154.3-1 133.4.2 113c0 0 39.8-27.8 77.3-17.1 29.5 8.5 42.6 24.1 42.6 24.1z"
              fill="#42bf1f"
            ></path>
            <path
              d="M119.9 120s-7 19.1.4 48.8c9.4 37.8 53.5 58.3 53.5 58.3-18.2 9.2-39 13.9-60.9 12.6-21.9-1.3-41.9-8.4-59-19.6 0 0-4.2-48.3 23.8-75.4 22.2-21.2 42.2-24.7 42.2-24.7z"
              fill="#1199f5"
            ></path>
          </svg>
        </span>
        {COLORS.map((color) => (
          <span
            key={color}
            className="inline-flex w-7 h-7 rounded-full cursor-pointer"
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default TextBoard;
