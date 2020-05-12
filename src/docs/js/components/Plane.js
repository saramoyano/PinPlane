import React, { useState ,useEffect} from "react";
import { Grid as PinPlane } from "react-virtualized";
import "../../../css/style.css";
import AutoSizer from "react-virtualized-auto-sizer";
import { itemsArray } from "../helpers/ListaImgItm";
import useMousePosition from "./useMousePosition";
import useForceUpdate from "use-force-update";
import DragWindow from "./ScrollbyMouse";
import ImgIt from "./ImgItem";
let mouseX = 0;
let mouseY = 0;
const [DXY, setDXY] = useState([0, 0]);
const [XYanterior, setXYanterior] = useState([0, 0]);
const [draggingCanvas, setDraggingCanvas] = useState(false);
// import {dragImgItm} from '../components/ImgItem';
var scroll = false;
function AddNewArray() {
  itemsArray.push(new Array(itemsArray[0].length));
}
function arrayVertical() {
  for (let i = 0; i < itemsArray.length; i++) {
    itemsArray[i].push(new Array([""]));
  }
}

function cellRenderer({ columnIndex, key, rowIndex, isScrolling, style }) {
  scroll = isScrolling;
  return (
    <div
      key={key}
      style={{
        ...style,
        left: style.left + 30,
        top: style.top + 30,
        width: style.width - 30,
        height: style.height - 30,
      }}
    >
      {itemsArray[rowIndex][columnIndex]}
    </div>
  );
}
export default function ImgList() {
  
  itemsArray[0][3] = <ImgIt />;
  itemsArray[1][3] = <ImgIt />;
  var panel = document.getElementById("root");
  const forceUpdate = useForceUpdate();
  const {x} = useMousePosition();
  const ancho = panel.clientWidth;
  const ancho = panel.clientWidth;
  const calculateClickPosition = (e) => {
    // scale = 1;
    // canvas.style.transform = `scale(${scale})`;
    mouseX = e.pageX;
    mouseY = e.pageY;
    setXYanterior([e.pageX, e.pageY]);
    console.log("click on canvas");
    setDraggingCanvas(true);
    console.log(DXY);
      };
      const dragCanvas = (e) => {
        setDXY([e.pageX - XYanterior[0], e.pageY - XYanterior[1]]);
         
        if (draggingCanvas) {
        console.log("moving canvas");
        window.scrollTo({
        top: -DXY[1] * 0.8,
        left: -DXY[0] * 0.8,
        behavior:"smooth",
              });
            }
          };
  // // const { value, setValue } = useContext(dragImgItm);
  // var isPossible = scroll === true && x >= ancho - 200;
  // DragWindow();

  // if (isPossible) {
  //   AddNewArray();
  // }
  // //vertical
  // if (isPossible) {
  //   arrayVertical();
  // }
  // useEffect(() => {
  //   return () => {
  //     forceUpdate();
  //   };
  // }, [isPossible]);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <PinPlane
          className="Grid"
          id="Grid_PinPlane"
          cellRenderer={cellRenderer}
          columnCount={itemsArray[0].length}
          columnWidth={330}
          height={height}
          rowCount={itemsArray.length}
          rowHeight={330}
          width={width}
        />
      )}
    </AutoSizer>
  );
}
