import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTool, setTarget } from "../../store/actions/Editor";
import Flip from "../../assets/icons/repeat.png";

const Envelope = () => {
  const [isClosed, setIsClosed] = useState(false);
  let coverFrontCanvas,
    coverFrontCTX,
    coverBackCanvas,
    coverBackCTX,
    bodyFrontCanvas,
    bodyFrontCTX,
    bodyBackCanvas,
    bodyBackCTX,
    paperMaterial;
  const width = window.innerHeight * 0.56;
  const height = window.innerHeight * 0.8;

  const coverHeight = height * 0.45;
  const bodyHeight = height * 0.55;

  const dispatch = useDispatch();
  const {
    envelope: envelopeColor,
    liner,
    target,
    stamp: selectedStamp,
  } = useSelector((state) => state.editor);

  const handleClick = () => {
    dispatch(setTarget("envelope"));
    dispatch(
      setSelectedTool({
        id: "envelope",
        label: "Envelope",
      })
    );
  };

  const drawStamp = (ctx, img, x, y) => {
    ctx.drawImage(img, x, y);
  };

  const drawCoverFront = () => {
    coverFrontCTX.clearRect(0, 0, width, coverHeight);

    coverFrontCTX.shadowColor = "#00000020";
    coverFrontCTX.shadowBlur = 15;
    coverFrontCTX.shadowOffsetX = 0;
    coverFrontCTX.shadowOffsetY = 0;

    coverFrontCTX.beginPath();
    coverFrontCTX.moveTo(width / 2, 0);
    coverFrontCTX.lineTo(width - 20, coverHeight - 50);
    coverFrontCTX.lineTo(width, coverHeight);
    coverFrontCTX.lineTo(0, coverHeight);
    coverFrontCTX.lineTo(20, coverHeight - 50);
    coverFrontCTX.closePath();
    coverFrontCTX.fillStyle = envelopeColor;
    coverFrontCTX.fill();

    coverFrontCTX.beginPath();
    coverFrontCTX.moveTo(width / 2, 50);
    coverFrontCTX.lineTo(width - 20, coverHeight);
    coverFrontCTX.lineTo(20, coverHeight);
    coverFrontCTX.fillStyle = paperMaterial;
    coverFrontCTX.fill();
    coverFrontCTX.closePath();
    coverFrontCTX.restore();

    coverFrontCTX.beginPath();
    coverFrontCTX.lineWidth = 1;
    coverFrontCTX.strokeStyle = envelopeColor;
    coverFrontCTX.shadowColor = "#000000";
    coverFrontCTX.shadowBlur = 3;
    coverFrontCTX.shadowOffsetX = 0;
    coverFrontCTX.shadowOffsetY = -2;
    coverFrontCTX.moveTo(0, coverHeight + 1);
    coverFrontCTX.lineTo(width, coverHeight + 1);
    coverFrontCTX.stroke();
    coverFrontCTX.closePath();
  };

  const drawCoverBack = () => {
    coverBackCTX.clearRect(0, 0, width, coverHeight);
    coverBackCTX.beginPath();
    coverBackCTX.moveTo(width / 2, 0);
    coverBackCTX.lineTo(width - 20, coverHeight - 50);
    coverBackCTX.lineTo(width, coverHeight);
    coverBackCTX.lineTo(0, coverHeight);
    coverBackCTX.lineTo(20, coverHeight - 50);
    coverBackCTX.closePath();
    coverBackCTX.fillStyle = envelopeColor;
    coverBackCTX.fill();
  };

  const drawBodyFront = () => {
    bodyFrontCTX.clearRect(0, 0, width, bodyHeight);
    bodyFrontCTX.shadowColor = "#00000020";
    bodyFrontCTX.shadowBlur = 15;
    bodyFrontCTX.shadowOffsetX = 0;
    bodyFrontCTX.shadowOffsetY = 0;

    bodyFrontCTX.beginPath();
    bodyFrontCTX.moveTo(0, 0);
    bodyFrontCTX.lineTo(width, 0);
    bodyFrontCTX.lineTo(width, bodyHeight);
    bodyFrontCTX.lineTo(0, bodyHeight);
    bodyFrontCTX.closePath();
    bodyFrontCTX.fillStyle = envelopeColor;
    bodyFrontCTX.fill();

    bodyFrontCTX.beginPath();
    bodyFrontCTX.save();
    bodyFrontCTX.translate(0, -coverHeight);
    bodyFrontCTX.fillStyle = paperMaterial;
    bodyFrontCTX.fillRect(20, 0, width - 40, height);
    bodyFrontCTX.restore();
    bodyFrontCTX.closePath();

    bodyFrontCTX.beginPath();
    bodyFrontCTX.moveTo(0, 0);
    bodyFrontCTX.lineTo(40, 15);
    bodyFrontCTX.lineTo(200, bodyHeight * 0.4);
    bodyFrontCTX.lineTo(200, bodyHeight * 0.6);
    bodyFrontCTX.lineTo(40, bodyHeight - 15);
    bodyFrontCTX.lineTo(0, bodyHeight);
    bodyFrontCTX.closePath();
    bodyFrontCTX.fillStyle = envelopeColor;
    bodyFrontCTX.fill();

    bodyFrontCTX.beginPath();
    bodyFrontCTX.moveTo(width, 0);
    bodyFrontCTX.lineTo(width - 40, 15);
    bodyFrontCTX.lineTo(width - 200, bodyHeight * 0.4);
    bodyFrontCTX.lineTo(width - 200, bodyHeight * 0.6);
    bodyFrontCTX.lineTo(width - 40, bodyHeight - 15);
    bodyFrontCTX.lineTo(width - 0, bodyHeight);
    bodyFrontCTX.closePath();
    bodyFrontCTX.fillStyle = envelopeColor;
    bodyFrontCTX.fill();

    bodyFrontCTX.beginPath();
    bodyFrontCTX.fillStyle = envelopeColor;
    bodyFrontCTX.moveTo(0, bodyHeight);
    bodyFrontCTX.lineTo(20, bodyHeight - 50);
    bodyFrontCTX.lineTo(160, bodyHeight * 0.5);
    bodyFrontCTX.lineTo(width - 160, bodyHeight * 0.5);
    bodyFrontCTX.lineTo(width - 20, bodyHeight - 50);
    bodyFrontCTX.lineTo(width, bodyHeight);
    bodyFrontCTX.closePath();
    bodyFrontCTX.fill();

    bodyFrontCTX.beginPath();
    bodyFrontCTX.lineWidth = 1;
    bodyFrontCTX.strokeStyle = envelopeColor;
    bodyFrontCTX.shadowColor = "#000000";
    bodyFrontCTX.shadowBlur = 5;
    bodyFrontCTX.shadowOffsetX = 0;
    bodyFrontCTX.shadowOffsetY = 2;
    bodyFrontCTX.moveTo(0, -1);
    bodyFrontCTX.lineTo(width, -1);
    bodyFrontCTX.stroke();
    bodyFrontCTX.closePath();
  };

  const drawBodyBack = () => {
    bodyBackCTX.clearRect(0, 0, width, bodyHeight);
    bodyBackCTX.beginPath();
    bodyBackCTX.moveTo(0, 0);
    bodyBackCTX.lineTo(width, 0);
    bodyBackCTX.lineTo(width, bodyHeight);
    bodyBackCTX.lineTo(0, bodyHeight);
    bodyBackCTX.closePath();
    bodyBackCTX.fillStyle = envelopeColor;
    bodyBackCTX.fill();

    bodyBackCTX.beginPath();
    bodyBackCTX.shadowColor = "#ffffff15";
    bodyBackCTX.shadowBlur = 20;
    bodyBackCTX.shadowOffsetX = 0;
    bodyBackCTX.shadowOffsetY = 0;
    bodyBackCTX.moveTo(10, 10);
    bodyBackCTX.lineTo(width - 10, 10);
    bodyBackCTX.lineTo(width - 10, bodyHeight - 10);
    bodyBackCTX.lineTo(10, bodyHeight - 10);
    bodyBackCTX.closePath();
    bodyBackCTX.fillStyle = envelopeColor;
    bodyBackCTX.fill();
  };

  const drawCover = () => {
    drawCoverFront();
    drawCoverBack();
  };

  const drawBody = () => {
    drawBodyFront();
    drawBodyBack();
  };

  useEffect(() => {
    coverFrontCanvas = document.getElementById("cover-front-envelope-canvas");
    coverFrontCTX = coverFrontCanvas.getContext("2d");
    coverBackCanvas = document.getElementById("cover-back-envelope-canvas");
    coverBackCTX = coverBackCanvas.getContext("2d");
    bodyFrontCanvas = document.getElementById("body-front-envelope-canvas");
    bodyFrontCTX = bodyFrontCanvas.getContext("2d");
    bodyBackCanvas = document.getElementById("body-back-envelope-canvas");
    bodyBackCTX = bodyBackCanvas.getContext("2d");

    const paperImage = new Image();
    paperImage.src = require(`../../assets/liner/${liner}`);
    paperImage.onload = function () {
      paperMaterial = bodyFrontCTX.createPattern(this, "repeat");
      drawCover();
      drawBody();
    };

    const stampImage = new Image();
    stampImage.src = require(`../../assets/stamp/${selectedStamp}`);
    stampImage.onload = function () {
      drawStamp(bodyBackCTX, stampImage, width - stampImage.width - 20, 20);
    };
  }, []);

  useEffect(() => {
    coverFrontCanvas = document.getElementById("cover-front-envelope-canvas");
    coverFrontCTX = coverFrontCanvas.getContext("2d");
    coverBackCanvas = document.getElementById("cover-back-envelope-canvas");
    coverBackCTX = coverBackCanvas.getContext("2d");
    bodyFrontCanvas = document.getElementById("body-front-envelope-canvas");
    bodyFrontCTX = bodyFrontCanvas.getContext("2d");
    bodyBackCanvas = document.getElementById("body-back-envelope-canvas");
    bodyBackCTX = bodyBackCanvas.getContext("2d");
    const paperImage = new Image();
    paperImage.src = require(`../../assets/liner/${liner}`);
    paperImage.onload = function () {
      paperMaterial = bodyFrontCTX.createPattern(this, "repeat");
      drawCover();
      drawBody();
    };

    const stampImage = new Image();
    stampImage.src = require(`../../assets/stamp/${selectedStamp}`);
    stampImage.onload = function () {
      drawStamp(bodyBackCTX, stampImage, width - stampImage.width - 20, 20);
    };
  }, [envelopeColor, liner, selectedStamp]);

  const handleFlip = (e) => {
    e.stopPropagation();
    setIsClosed(!isClosed);
  };

  return (
    <div
      className={`absolute top-20 left-1/2 transition duration-700 cursor-pointer ${
        target === `envelope`
          ? `z-10 -translate-x-3/4 translate-y-0`
          : `z-0 -translate-x-1/4 scale-[0.96] -translate-y-8`
      } ${
        isClosed ? `-translate-y-1/4 scale-125` : `-translate-y-0 scale-100`
      }`}
      style={{ perspective: "1000px" }}
      onClick={handleClick}
    >
      <button
        className={`w-10 h-10 transition-all duration-700 flex justify-center items-center rounded-full bg-white absolute shadow-xl ${
          isClosed ? `top-[72.5%] scale-[0.8]` : `top-1/2 scale-100`
        } -translate-y-1/2 -left-8 -translate-x-full`}
        onClick={handleFlip}
      >
        <img src={Flip} className="w-5 h-5" />
      </button>
      <div
        className={`relative duration-700 transition-all ${
          isClosed ? `rotate-y-180` : `rotate-y-0`
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="relative z-10 backface-hidden"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          <div
            className={`relative transition-all duration-700 origin-bottom-left z-10 ${
              isClosed ? `-rotate-x-179` : `rotate-x-0`
            }`}
            style={{ height: coverHeight, transformStyle: "preserve-3d" }}
          >
            <canvas
              width={width}
              height={coverHeight}
              className="h-full absolute backface-hidden"
              id="cover-front-envelope-canvas"
            />
            <canvas
              width={width}
              height={coverHeight}
              id="cover-back-envelope-canvas"
              className="h-full absolute backface-hidden rotate-y-180"
            />
          </div>
          <canvas
            width={width}
            height={bodyHeight}
            id="body-front-envelope-canvas"
          />
        </div>
        <div className="w-full h-full absolute top-0 flex items-end backface-hidden rotate-y-180">
          <canvas
            width={width}
            height={bodyHeight}
            id="body-back-envelope-canvas"
          />
        </div>
      </div>
    </div>
  );
};

export default Envelope;
