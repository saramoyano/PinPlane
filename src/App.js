import React from "react";

import "./App.css";

import Example from "./Plane";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Plane from "./Plane";

function App() {
  return (
    <div className="app">
      <DndProvider backend={Backend}>
        <Plane></Plane>
      </DndProvider>
    </div>
  );
}

export default App;
