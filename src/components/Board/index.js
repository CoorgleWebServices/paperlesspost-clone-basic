import React from "react";
import { useDispatch, useSelector } from "react-redux";
import domtoimage from "dom-to-image";
import { setSelectedTool } from "../../store/actions/Editor";
import Card from "./Card";
import Envelope from "./Envelope";
import Sticker from "../AssetWidget/Sticker";
// import TextBoard from "../AssetWidget/TextBoard";

import DownloadIcon from "../../assets/icons/download.png";

const Board = () => {
  const dispatch = useDispatch();
  const { backdrop, draw, selectedItemId } = useSelector(
    (state) => state.editor
  );
  const handleClickBoard = () => {
    dispatch(setSelectedTool({ id: "backdrop", label: "Backdrop" }));
  };

  const getSelectedItemType = () => {
    const stickers = draw.card.stickers.filter(
      (sticker) => sticker.id === selectedItemId
    );
    if (stickers.length > 0) return "sticker";
    const texts = draw.card.texts.filter((text) => text.id === selectedItemId);
    if (texts.length > 0) return "text";
    return null;
  };

  const handleDownload = () => {
    const node = document.getElementById("editor-board");
    domtoimage
      .toPng(node)
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <>
      <button
        className="fixed right-5 top-5 z-50 w-10 h-10 flex justify-center items-center rounded-full bg-white shadow-xl opacity-100 transition-all hover:opacity-70"
        onClick={handleDownload}
      >
        <img src={DownloadIcon} className="w-6 h-6" alt="download" />
      </button>
      <div className="w-full h-screen relative" id="editor-board">
        <div
          className="absolute top-0 left-0 w-full h-screen !bg-cover !bg-center"
          style={{
            background: `url(${require(`../../assets/background/${backdrop}`)}`,
          }}
          onClick={handleClickBoard}
        />
        {selectedItemId && (
          <>
            {getSelectedItemType() === "sticker" && (
              <div className="absolute top-1/2 left-5 -translate-y-1/2">
                <Sticker />
              </div>
            )}
            {/* {selectedItem.type === "text" && (
            <div className="absolute top-1/2 left-5 -translate-y-1/2">
              <TextBoard />
            </div>
          )} */}
          </>
        )}
        <Card />
        <Envelope />
      </div>
    </>
  );
};

export default Board;
