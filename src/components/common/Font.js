import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Caret from "../../assets/icons/caret.png";

const Font = ({ name, styles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(styles[0].name);
  const handleSelect = (event, name) => {
    event.stopPropagation();
    setSelectedStyle(name);
    setIsOpen(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div className="w-full h-20 relative flex flex-col items-center justify-center cursor-pointer border border-white hover:border-black group">
        <span className="font-medium text-lg" style={{ fontFamily: name }}>
          {name}
        </span>
        {styles.length > 1 && (
          <div
            className="w-full flex flex-col items-center mt-2 px-4"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex justify-center items-center relative">
              <span className="text-xs text-gray-500">{selectedStyle}</span>
              <img
                src={Caret}
                className="w-3 absolute -right-2 translate-x-full transition opacity-0 group-hover:opacity-100"
              />
            </div>
            {isOpen && (
              <ul className="absolute z-10 left-3 -bottom-0.5 right-3 translate-y-full bg-white shadow">
                {styles.map((style) => (
                  <li
                    key={style.name}
                    className={`w-full h-8 flex justify-center items-center ${
                      selectedStyle === style.name ? `bg-gray-200` : ``
                    }`}
                    onClick={(e) => handleSelect(e, style.name)}
                  >
                    {style.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default Font;
