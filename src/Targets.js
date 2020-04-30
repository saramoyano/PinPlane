import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./Constants";
import $ from "jquery";

const Targets = (props) => {
  const [currentMoveItem, setCurrentMoveItem] = useState("");
  const [currentTarget, setcurrentTarget] = useState("");
  const [check, setcheck] = useState("");

  const [dropTargetProps, drop] = useDrop({
    accept: ItemTypes.ImgItem,
    target: 1,

    drop: (item, monitor, component) => {
      setCurrentMoveItem(item.id);
      console.log(currentMoveItem);
    },
  });
  const styles = {
    width: "100px",
    height: "100px",
    // border: "1px solid red",
    float: "left",
  };

  const droped = (ev, target) => {
    ev.preventDefault();
    setcurrentTarget(ev.target.id);
  };

  useEffect(() => {
    if (currentMoveItem != "" && currentTarget != "") {
      console.log(
        "currnt Item: " + currentMoveItem + " current target " + currentTarget
      );
      let div = document.getElementById(currentTarget);
      let child = document.getElementById(currentMoveItem);

      console.log(child);

      div.append(child);
      // $("#" + currentMoveItem).appendTo($("#" + currentTarget));
    }
  }, [currentMoveItem, currentTarget]);

  // const checkChild = (ev, target) => {
  //   console.log(ev);
  // };

  return (
    <div
      key={props.id}
      id={props.id}
      ref={drop}
      style={props.style}
      onDrop={(event) => {
        droped(event, this);
      }}
    >
      {props.id}
    </div>
  );
};

export default Targets;
