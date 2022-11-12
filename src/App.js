import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Toolbar from "./components/Toolbar";
import PropertyWidget from "./components/PropertyWidget";
import Board from "./components/Board";

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex font-ubuntu">
        <div className="flex flex-shrink-0">
          <Toolbar />
          <PropertyWidget />
        </div>
        <Board />
      </div>
    </Provider>
  );
};

export default App;
