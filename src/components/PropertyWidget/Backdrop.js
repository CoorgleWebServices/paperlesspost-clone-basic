import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBackdrop } from "../../store/actions/Editor";

const Backdrop = () => {
  const dispatch = useDispatch();
  const backdrop = useSelector((state) => state.editor.backdrop);
  const backgrounds = [
    { id: 1, filename: "1.jpg" },
    { id: 2, filename: "2.jpg" },
    { id: 3, filename: "3.jpg" },
    { id: 4, filename: "4.jpg" },
    { id: 5, filename: "5.jpg" },
    { id: 6, filename: "6.jpg" },
  ];

  const handleClick = (filename) => {
    dispatch(setBackdrop(filename));
  };

  return (
    <div>
      <div className="w-full h-32 flex flex-shrink-0 items-center justify-center text-2xl font-medium text-gray-600">
        Backdrops
      </div>
      <div className="flex flex-wrap">
        {backgrounds.map((background) => (
          <button
            className={`w-1/3 h-24 border ${
              backdrop === background.filename
                ? `border-black`
                : `border-gray-50`
            } transition opacity-100 hover:opacity-50`}
            onClick={() => handleClick(background.filename)}
            key={background.id}
          >
            <img
              src={require(`../../assets/background/${background.filename}`)}
              className="w-full h-full object-cover"
              alt="background"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Backdrop;
