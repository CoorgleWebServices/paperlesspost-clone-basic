import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSticker, updateDesign } from "../../store/actions/Editor";
import Flip from "../../assets/icons/flip.png";
import Trash from "../../assets/icons/bin.png";

const Sticker = () => {
  const dispatch = useDispatch();
  const { draw, selectedItem } = useSelector((state) => state.editor);

  const handleFlipHorizontal = () => {
    const sticker = getSelectedSticker(selectedItem.id);
    const y = !sticker.flip.y;
    dispatch(
      updateDesign({
        action: "update",
        target: "card",
        type: "stickers",
        data: {
          ...sticker,
          flip: {
            flip: {
              ...sticker.flip,
              y,
            },
          },
        },
      })
    );
  };
  const handleFlipVertical = () => {
    const sticker = getSelectedSticker(selectedItem.id);
    const x = !sticker.flip.x;
    dispatch(
      updateDesign({
        action: "update",
        target: "card",
        type: "stickers",
        data: {
          ...sticker,
          flip: {
            ...sticker.flip,
            x,
          },
        },
      })
    );
  };
  const handleDeleteSticker = () => {
    dispatch(deleteSticker(selectedItem.id));
  };

  const getSelectedSticker = (id) => {
    const stickers = draw.card.stickers.filter((sticker) => sticker.id === id);
    if (stickers.length > 0) return stickers[0];
    return null;
  };

  return (
    <div className="bg-white rounded-full w-14 py-2">
      <button
        className="w-14 h-14 flex items-center justify-center"
        title="Flip horizontal"
        onClick={handleFlipHorizontal}
      >
        <img src={Flip} alt=":( Not Found" className="w-5" />
      </button>
      <button
        className="w-14 h-14 flex items-center justify-center"
        title="Flip vertical"
        onClick={handleFlipVertical}
      >
        <img src={Flip} alt=":( Not Found" className="w-5 rotate-90" />
      </button>
      <button
        className="w-14 h-14 flex items-center justify-center"
        title="Delete sticker"
        onClick={handleDeleteSticker}
      >
        <img src={Trash} alt=":( Not Found" className="w-5" />
      </button>
    </div>
  );
};

export default Sticker;
