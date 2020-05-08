import React from "react";
// redux
import { Provider } from "react-redux";

import store from "./redux/reducers/index";

import "./App.css";

import Example from "./Example";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

function App() {
  return (
    <div className="app">
      <DndProvider backend={Backend}>
        <Example></Example>
      </DndProvider>
    </div>
  );
}

export default App;
