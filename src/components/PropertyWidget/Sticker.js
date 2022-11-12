import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedItemId, updateDesign } from "../../store/actions/Editor";
import { MAX_STICKER_COUNT, STICKER_WIDTH } from "../../constants";

const Sticker = () => {
  const dispatch = useDispatch();
  const drawnStickers = useSelector((state) => state.editor.draw.card.stickers);
  const stickers = [
    { id: 1, filename: "1.png" },
    { id: 2, filename: "2.png" },
    { id: 3, filename: "3.png" },
    { id: 4, filename: "4.png" },
    { id: 5, filename: "5.png" },
    { id: 6, filename: "6.png" },
    { id: 7, filename: "7.png" },
    { id: 8, filename: "8.png" },
    { id: 9, filename: "9.png" },
    { id: 10, filename: "10.png" },
    { id: 11, filename: "11.png" },
    { id: 12, filename: "12.png" },
  ];

  const handleClick = (filename) => {
    const key = new Date().getTime();
    const canvas = document.getElementById("card-canvas");

    if (drawnStickers.length === MAX_STICKER_COUNT) {
      alert("limit max count");
      return;
    }

    const img = new Image();
    img.onload = () => {
      const radio = img.height / img.width;
      const height = STICKER_WIDTH * radio;

      dispatch(
        updateDesign({
          action: "create",
          target: "card",
          type: "stickers",
          data: {
            id: key,
            x: (canvas.width - STICKER_WIDTH) / 2,
            y: 100,
            width: STICKER_WIDTH,
            height,
            angle: 0,
            flip: {
              x: false,
              y: false,
            },
            image: filename,
          },
        })
      );
      dispatch(setSelectedItemId(key));
    };
    img.src = require(`../../assets/sticker/${filename}`);
  };

  return (
    <div>
      <div></div>
      <div className="w-full h-20 flex flex-shrink-0 items-center justify-center text-2xl font-medium text-gray-600">
        Stickers
      </div>
      <div className="flex flex-wrap">
        {stickers.map((item) => (
          <button
            className={`w-1/3 h-28 transition opacity-100 hover:opacity-50 p-2`}
            onClick={() => handleClick(item.filename)}
            key={item.id}
          >
            <img
              src={require(`../../assets/sticker/${item.filename}`)}
              className="w-full h-full object-contain"
              alt="sticker"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sticker;
