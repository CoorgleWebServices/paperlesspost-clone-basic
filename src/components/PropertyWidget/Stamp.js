import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStamp } from "../../store/actions/Editor";

const Stamp = () => {
  const dispatch = useDispatch();
  const selectedStamp = useSelector((state) => state.editor.stamp);
  const stamps = [
    { id: 1, filename: "1.png" },
    { id: 2, filename: "2.png" },
    { id: 3, filename: "3.png" },
  ];

  const handleClick = (filename) => {
    dispatch(setStamp(filename));
  };

  return (
    <div>
      <div className="w-full h-32 flex flex-shrink-0 items-center justify-center text-2xl font-medium text-gray-600">
        Stamps
      </div>
      <div className="flex flex-wrap">
        {stamps.map((stamp) => (
          <button
            className={`w-1/3 h-24 border p-2 ${
              selectedStamp === stamp.filename ? `border-black` : `border-gray-50`
            } transition opacity-100 hover:opacity-50`}
            onClick={() => handleClick(stamp.filename)}
            key={stamp.id}
          >
            <img
              src={require(`../../assets/stamp/${stamp.filename}`)}
              className="w-full h-full object-contain"
              alt="stamp"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Stamp;
