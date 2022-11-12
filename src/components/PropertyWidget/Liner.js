import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLiner } from "../../store/actions/Editor";

const Liner = () => {
  const dispatch = useDispatch();
  const selectedLiner = useSelector((state) => state.editor.liner);
  const liners = [
    { id: 1, filename: "1.png" },
    { id: 2, filename: "2.png" },
    { id: 3, filename: "3.png" },
    { id: 4, filename: "4.png" },
    { id: 5, filename: "5.png" },
    { id: 6, filename: "6.png" },
  ];

  const handleClick = (filename) => {
    dispatch(setLiner(filename));
  };

  return (
    <div>
      <div className="w-full h-32 flex flex-shrink-0 items-center justify-center text-2xl font-medium text-gray-600">
        Liners
      </div>
      <div className="flex flex-wrap">
        {liners.map((liner) => (
          <button
            className={`w-1/3 h-24 border ${
              selectedLiner === liner.filename
                ? `border-black`
                : `border-gray-50`
            } transition opacity-100 hover:opacity-50`}
            onClick={() => handleClick(liner.filename)}
            key={liner.id}
          >
            <img
              src={require(`../../assets/liner/${liner.filename}`)}
              className="w-full h-full object-cover"
              alt="liner"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Liner;
