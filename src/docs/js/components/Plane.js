import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Grid as PinPlane } from "react-virtualized";
import "../../../css/style.css";
import AutoSizer from "react-virtualized-auto-sizer";
import { itemsArray } from "../helpers/ListaImgItm";
import useMousePosition from "./useMousePosition";
import useForceUpdate from "use-force-update";
import DragWindow from "./ScrollbyMouse";
import ImgIt from "./ImgItem";
import { dragImgItm } from "../pages/App";
import {positionContext} from '../pages/App';

var scroll = false;
var posArray = new Array(10);
function AddNewArray() {
  var x = itemsArray.length;
  x++;
  itemsArray.push(new Array(x));
  posArray.push(new Array(x));
  var celda;
  for (let i = 0; i < itemsArray.length; i++) {
    itemsArray[i].length = x;
    //
    if(posArray[i] == undefined || posArray[i] == null) {
      posArray[i] = new Array(x);
    }else if(posArray[i].length === 0 ){
      posArray[i] = new Array(x);
    }
    posArray[i].length = x;
    console.log(posArray);
    //
    for (let j = 0; j < itemsArray[i].length; j++) {
      if (itemsArray[i][j] !== i + "," + j) {      
          itemsArray[i][j] = i + "," + j;
      }
      //
      let tmpstr = i + "" + j;
      celda = document.getElementById(tmpstr);
      if(celda != null){
        posArray[i][j]={y: celda.offsetTop, x: celda.offsetLeft};
      } 
      //    
    }
  }
}

function cellRenderer({ columnIndex, key, rowIndex, isScrolling, style }) {
  scroll = isScrolling;

  let array = "array";
  return (
    <div
      id={rowIndex + "" + columnIndex}
      key={key}
      name={array}
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

function doNothing() {}

export default function ImgList() {
  const [positionX, setpositionX] = useState(0);
  const [positionY, setpositionY] = useState(200);
  const [vecY1, setvecY1] = useState(0);
  const [vecX1, setvecX1] = useState(3);
  const {value,setValue }= useContext(positionContext)

  const img = document.getElementById("card1");

  var imgSize = 600;
  var panel = document.getElementById("root");
  const forceUpdate = useForceUpdate();
  const { x, y } = useMousePosition();
  const ancho = panel.clientWidth;
  const alto = panel.clientHeight;
  const { value, setValue } = useContext(dragImgItm);
  var isPossible = scroll === true && x >= ancho - imgSize && y >= alto - imgSize;
  DragWindow(value, setValue);

  useEffect(() => {
    AddNewArray();
    itemsArray[vecY1][vecX1] = <ImgIt id="card1" position={positionX} />;
    return () => {
      forceUpdate();
    };
  }, [isPossible, vecY1, vecX1]);

  // useEffect(() => {
  //   console.log("1er ueff" + vecY1 + vecX1);
  //   AddNewArray();
  //   itemsArray[vecY1][vecX1] = <ImgIt id={"card1"} position={positionX} />;
  // }, []);

  const handleClick = () => {
    console.log();
    if (img != null) {
        var auxX = vecX1 + 1;
        var auxY = vecY1 + 1;
        setvecX1(auxX);
        setvecY1(auxY);
      
    }
  };

  useEffect(() => {
   
    if (positionX != null && positionX != undefined && positionX != "") {
      if (positionX >= ancho || positionY >= alto) {
        AddNewArray();
      }
    }
  }, [img]); 

  const estilo = {
    width: "100px",
    height: "100px",
    position: "absolute",
    left: "200",
    top: "200px",
  };

  return (
    <React.Fragment>
      <AutoSizer>
        {({ height, width }) => (
          <div style={{ height: height, width: width }}>
            <PinPlane
              className="Grid"
              id="Grid_PinPlane"
              cellRenderer={cellRenderer}
              columnCount={itemsArray[0].length}
              columnWidth={300}
              height={height}
              rowCount={itemsArray.length}
              rowHeight={300}
              width={width}
            >
              {isPossible ? AddNewArray() : doNothing()}
            </PinPlane>
          </div>
        )}
      </AutoSizer>
      <button onClick={handleClick} style={estilo}>
        Cambiar pos
      </button>
    </React.Fragment>
  );
}

//sessionStorage.setItem("card1", JSON.stringify(positionX));
//sessionStorage.setItem("card2", JSON.stringify(position2));onclick={(ev)=> {setClicked(true)}}

// itemsArray[vecY1][vecX1] = <ImgIt id={id} position={positionX} />;
// itemsArray[1][3] = <ImgIt id={2} position={position2} />;
// useEffect(() => {
//   setpositionX(JSON.parse(sessionStorage.getItem("card1")));
//   //setposition2(JSON.parse(sessionStorage.getItem("card2")));, sessionStorage.getItem("card2")
// }, [sessionStorage.getItem("card1")]);

//  if (isPossible) {
//    AddNewArray();
//  }
//vertical
// if (isPossible) {
//   arrayVertical();
// }

//In case of error delete this code
//   useLayoutEffect(() => {

//     if(positionX != null && positionX != undefined && positionX !=""){
//     //|| position2 == null || position2 == undefined || position2=="" ){
//  //   setpositionX({ x: 0, y: 61 });
//  //   setposition2({ x: 0, y: 61 });
//  //   }else{
//  //     setpositionX(pos1);
//  //     setposition2(pos2);
//  //   }

//    // if (img != null){
//       if( positionX.x >= ancho ||
//       positionX.y >= alto){
//         console.log("entra");
//          AddNewArray();

//        //||  img.offsetTop >= alto ) {
//    // img.onclick((ev)=> {setClicked(true)});}
//    //  if(x >= ancho || y >= alto )
//     //|| position2.y >= alto
//    //  {
//        // if(vecX1 != null && vecY1 || null){
//        //   let suma = vecX1 + 1;
//        //   console.log(suma);
//        //   setvecX1(10);
//        //
//        // }

//        //
//       }
//     }
//  }, [
//    x, y, img
// ]);  //
