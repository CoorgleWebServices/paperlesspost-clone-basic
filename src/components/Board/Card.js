import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAngleBetweenPoints,
  getBoundaryPoints,
  getCenterPosition,
  getDistanceBetweenPoints,
  getRotatedPosition,
  isRectIn,
  pitagorasFormula,
} from "../../utils";
import {
  setHoveredItemId,
  setSelectedItemId,
  setSelectedTool,
  setTarget,
  updateDesign,
} from "../../store/actions/Editor";
import { ICON_WIDTH } from "../../constants";

const Card = () => {
  let canvas;
  let ctx;
  const width = window.innerHeight * 0.56;
  const height = window.innerHeight * 0.8;
  const dispatch = useDispatch();
  const { draw, hoveredItemId, selectedItemId, target } = useSelector(
    (state) => state.editor
  );
  const [action, setAction] = useState({ id: null, action: "none" });
  const handleClick = () => {
    dispatch(setTarget("card"));
    dispatch(
      setSelectedTool({
        id: "backdrop",
        label: "Backdrop",
      })
    );
  };

  // draw sticker or logo
  const drawSticker = (sticker) => {
    drawImage(
      sticker.id,
      require(`../../assets/sticker/${sticker.image}`),
      sticker.x,
      sticker.y,
      sticker.width,
      sticker.height,
      sticker.angle,
      sticker.flip,
      () => {
        if (sticker.id === selectedItemId) {
          drawBoundary(
            sticker.x,
            sticker.y,
            sticker.width,
            sticker.height,
            sticker.angle
          );
          const resizePos = getRotatedPosition(
            {
              x: sticker.x + sticker.width / 2,
              y: sticker.y + sticker.height / 2,
            },
            { x: sticker.x + sticker.width, y: sticker.y + sticker.height },
            sticker.angle
          );
          drawResizeIcon(resizePos.x, resizePos.y, sticker.angle);
          const rotatePos = getRotatedPosition(
            {
              x: sticker.x + sticker.width / 2,
              y: sticker.y + sticker.height / 2,
            },
            { x: sticker.x + sticker.width / 2, y: sticker.y - 24 },
            sticker.angle
          );
          drawRotateIcon(rotatePos.x, rotatePos.y, sticker.angle);
        }
      }
    );
  };

  // draw resize function
  const drawResizeIcon = (x, y, angle) => {
    drawImage(
      "resize",
      require("../../assets/icons/resize.png"),
      x - ICON_WIDTH / 2,
      y - ICON_WIDTH / 2,
      ICON_WIDTH,
      ICON_WIDTH,
      angle,
      { x: false, y: false },
      () => {
        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.fillStyle = "#FFF";
        ctx.lineWidth = 1.5;
        ctx.arc(x, y, ICON_WIDTH, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }
    );
  };

  // draw rotate function
  const drawRotateIcon = (x, y, angle) => {
    drawImage(
      "rotate",
      require("../../assets/icons/rotate.png"),
      x - ICON_WIDTH / 2,
      y - ICON_WIDTH / 2,
      ICON_WIDTH,
      ICON_WIDTH,
      angle,
      { x: false, y: false },
      () => {
        // draw connect line
        const lineEndPos = getRotatedPosition(
          { x, y },
          { x, y: y + 24 },
          angle
        );
        ctx.lineWidth = 1;
        ctx.setLineDash([2]);
        ctx.moveTo(x, y);
        ctx.lineTo(lineEndPos.x, lineEndPos.y);
        ctx.stroke();

        // draw just image
        ctx.beginPath();
        ctx.setLineDash([0]);
        ctx.fillStyle = "#FFF";
        ctx.lineWidth = 1.5;
        ctx.arc(x, y, ICON_WIDTH, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }
    );
  };

  const drawBoundary = (x, y, width, height, angle) => {
    ctx.setLineDash([2]);
    ctx.lineWidth = 1;
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(angle);
    ctx.strokeRect((width / 2) * -1, (height / 2) * -1, width, height);
    ctx.restore();
  };

  const drawImage = (id, src, x, y, width, height, angle, flip, callback) => {
    const draw = (img) => {
      callback();
      ctx.save();
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate(angle);
      ctx.scale(flip.y ? -1 : 1, flip.x ? -1 : 1);
      ctx.drawImage(img, (width / 2) * -1, (height / 2) * -1, width, height);
      ctx.restore();
    };
    const domImg = document.getElementById(id);
    if (domImg) {
      draw(domImg);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const domImg = document.createElement("img");
      domImg.src = src;
      domImg.id = id;
      domImg.style.display = "none";
      document.body.append(domImg);

      draw(img);
    };
    img.src = src;
  };

  const drawText = (text) => {
    ctx.save();
    ctx.translate(text.x + text.width / 2, text.y + text.height / 2);
    ctx.rotate(text.angle);
    ctx.textBaseline = "top";
    ctx.font = `${text.font.weight} ${text.font.style} ${text.font.size}px ${text.font.family}`;
    ctx.fillStyle = text.color;
    ctx.fillText(text.text, (text.width / 2) * -1, (text.height / 2) * -1);
    ctx.restore();
    if (text.id === selectedItemId) {
      drawBoundary(text.x, text.y, text.width, text.height, text.angle);
      const resizePos = getRotatedPosition(
        {
          x: text.x + text.width / 2,
          y: text.y + text.height / 2,
        },
        { x: text.x + text.width, y: text.y + text.height },
        text.angle
      );
      drawResizeIcon(resizePos.x, resizePos.y, text.angle);
      const rotatePos = getRotatedPosition(
        {
          x: text.x + text.width / 2,
          y: text.y + text.height / 2,
        },
        { x: text.x + text.width / 2, y: text.y - 24 },
        text.angle
      );
      drawRotateIcon(rotatePos.x, rotatePos.y, text.angle);
    }
  };

  // clear board to re-render the board
  const clearBoard = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const isResizeIn = (x, y) => {
    if (!selectedItemId) return null;
    const selectedItem = getSelectedItem(selectedItemId);
    let selectedId = null;
    draw.card[selectedItem.type].map((item) => {
      const centerPosition = getCenterPosition(
        item.x,
        item.y,
        item.width,
        item.height
      );
      const iconPos = getRotatedPosition(
        centerPosition,
        {
          x: item.x + item.width,
          y: item.y + item.height,
        },
        item.angle
      );
      if (
        item.id === selectedItemId &&
        pitagorasFormula(iconPos.x - x, iconPos.y - y, ICON_WIDTH)
      ) {
        selectedId = item.id;
      }
    });
    return selectedId;
  };

  const isRotateIn = (x, y) => {
    if (!selectedItemId) return null;
    const selectedItem = getSelectedItem(selectedItemId);
    let selectedId = null;
    draw.card[selectedItem.type].map((item) => {
      const centerPosition = getCenterPosition(
        item.x,
        item.y,
        item.width,
        item.height
      );
      const iconPos = getRotatedPosition(
        centerPosition,
        {
          x: item.x + item.width / 2,
          y: item.y - 24,
        },
        item.angle
      );
      if (
        item.id === selectedItemId &&
        pitagorasFormula(iconPos.x - x, iconPos.y - y, ICON_WIDTH)
      ) {
        selectedId = item.id;
      }
    });
    return selectedId;
  };

  const isItemIn = (x, y) => {
    let selectedId = null;
    const hoveredSticker = draw.card.stickers.filter((sticker) => {
      return isRectIn(
        [x, y],
        getBoundaryPoints(
          sticker.x,
          sticker.y,
          sticker.width,
          sticker.height,
          sticker.angle
        )
      );
    });

    if (hoveredSticker.length > 0) {
      return hoveredSticker[hoveredSticker.length - 1].id;
    }

    const hoveredText = draw.card.texts.filter((text) => {
      return isRectIn(
        [x, y],
        getBoundaryPoints(text.x, text.y, text.width, text.height, text.angle)
      );
    });

    if (hoveredText.length > 0) {
      return hoveredText[hoveredText.length - 1].id;
    }

    return selectedId;
  };

  const handleMouseDown = (event) => {
    const canvasBounding = document
      .getElementById("card-canvas")
      .getBoundingClientRect();
    const pos = {
      x: event.pageX - canvasBounding.x,
      y: event.pageY - canvasBounding.y,
    };
    const selectedResize = isResizeIn(pos.x, pos.y);
    if (selectedResize) {
      setAction({ id: selectedResize, action: "resize" });
      return;
    }
    const selectedRotate = isRotateIn(pos.x, pos.y);
    if (selectedRotate) {
      setAction({ id: selectedRotate, action: "rotate" });
      return;
    }
    const selectedItem = isItemIn(pos.x, pos.y);
    if (selectedItem) {
      setAction({ id: selectedItem, action: "move" });
      dispatch(setSelectedItemId(selectedItem));
      return;
    }

    dispatch(setSelectedItemId(null));
  };

  const handleMouseMove = (event) => {
    const canvasBounding = document
      .getElementById("card-canvas")
      .getBoundingClientRect();
    const pos = {
      x: event.pageX - canvasBounding.x,
      y: event.pageY - canvasBounding.y,
    };

    switch (action.action) {
      case "none":
        dispatch(setHoveredItemId(null));
        const selectedResize = isResizeIn(pos.x, pos.y);
        const selectedRotate = isRotateIn(pos.x, pos.y);
        const selectedItem = isItemIn(pos.x, pos.y);
        if (selectedResize) {
          setCursor("nwse-resize");
          return;
        }
        if (selectedRotate) {
          setCursor("alias");
          return;
        }

        if (selectedItem) {
          if (selectedItemId === selectedItem) {
            setCursor("grab");
            return;
          }
          dispatch(setHoveredItemId(selectedItem));
        }

        setCursor("pointer");
        break;

      case "resize":
        const resizeItem = getSelectedItem(action.id);
        const radio = resizeItem.data.height / resizeItem.data.width;
        const endPosition = {
          x: resizeItem.data.x + resizeItem.data.width,
          y: resizeItem.data.y + resizeItem.data.height,
        };
        const centerPosition = getCenterPosition(
          resizeItem.data.x,
          resizeItem.data.y,
          resizeItem.data.width,
          resizeItem.data.height
        );
        const rotatedPosition = getRotatedPosition(
          centerPosition,
          endPosition,
          resizeItem.data.angle
        );
        const distance = getDistanceBetweenPoints(pos, rotatedPosition);
        const resizeItemAngle =
          getAngleBetweenPoints(pos, rotatedPosition) * -1;
        const updatedWidth =
          resizeItem.data.width +
          Math.cos(resizeItemAngle - resizeItem.data.angle) * distance;
        const width = updatedWidth > 50 ? updatedWidth : 50;
        const height = width * radio;
        dispatch(
          updateDesign({
            action: "update",
            target: "card",
            type: resizeItem.type,
            data: {
              ...resizeItem.data,
              width,
              height,
            },
          })
        );
        break;

      case "rotate":
        const rotateItem = getSelectedItem(action.id);
        const itemCenterPos = {
          x: rotateItem.data.x + rotateItem.data.width / 2,
          y: rotateItem.data.y + rotateItem.data.height / 2,
        };
        const rotateItemAngle =
          (getAngleBetweenPoints(pos, itemCenterPos) - Math.PI / 2) * -1;

        dispatch(
          updateDesign({
            action: "update",
            target: "card",
            type: rotateItem.type,
            data: {
              ...rotateItem.data,
              angle: rotateItemAngle,
            },
          })
        );
        break;

      case "move":
        const moveItem = getSelectedItem(action.id);
        const x = moveItem.data.x + event.movementX;
        const y = moveItem.data.y + event.movementY;

        dispatch(
          updateDesign({
            action: "update",
            target: "card",
            type: moveItem.type,
            data: {
              ...moveItem.data,
              x,
              y,
            },
          })
        );
        break;
    }
  };

  const handleMouseUp = () => {
    setAction({ id: null, action: "none" });
  };

  const getSelectedItem = (id) => {
    const stickers = draw.card.stickers.filter((sticker) => sticker.id === id);
    if (stickers.length > 0) return { type: "stickers", data: stickers[0] };
    const texts = draw.card.texts.filter((text) => text.id === id);
    if (texts.length > 0) return { type: "texts", data: texts[0] };
    return null;
  };

  useEffect(() => {
    canvas = document.getElementById("card-canvas");
    ctx = canvas.getContext("2d");
    clearBoard();
    drawStickers(draw.card.stickers);
    drawTexts(draw.card.texts);

    const hovered = getSelectedItem(hoveredItemId);
    hovered &&
      drawBoundary(
        hovered.data.x,
        hovered.data.y,
        hovered.data.width,
        hovered.data.height,
        hovered.data.angle
      );
  }, [draw, hoveredItemId, selectedItemId]);

  const drawStickers = (stickers) => {
    stickers.map((sticker) => drawSticker(sticker));
  };

  const drawTexts = (texts) => {
    texts.map((text) => drawText(text));
  };

  const setCursor = (cursor) =>
    (document.getElementById("card-canvas").style.cursor = cursor);

  return (
    <div
      className={`bg-gray-100 absolute top-20 left-1/2 shadow-xl transition duration-1000 cursor-pointer ${
        target === `card` ? `z-10 -translate-x-3/4` : `z-0 -translate-x-1/4`
      }`}
      onClick={handleClick}
    >
      <canvas
        width={width}
        height={height}
        id="card-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default Card;
