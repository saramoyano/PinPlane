import React, { useState } from "react";
import cx from "classnames";
import Grid from "./Grid";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { createUseStyles } from "react-jss";
import ImgItem from "./ImgItem";
import "./App.css";
import IScroll from "iscroll/build/iscroll-probe";
import elementResizeDetector from "element-resize-detector";

// import { connect } from "react-redux";
// import { useDispatch } from "react-redux";
// import { Renderizar } from "./redux/actions/Render";

// import store from "./redux/reducers/index";

import Targets from "./Targets";
import Draggable from "react-draggable";

const CELL_SIZE = 200;

function toColor(number) {
  const num = number >>> 0;

  const b = num & 0xff;
  const g = (num & 0xff00) >>> 8;
  const r = (num & 0xff0000) >>> 16;

  return [r, g, b];
}

const styles = createUseStyles({
  container: {
    position: "absolute",
    width: "2000px",
    height: "2000px",
    border: "1px solid transparent",
    boxSizing: "border-box",
  },

  cell: {
    borderBottom: "1px solid #1D9DF9",
    borderLeft: "1px solid #1D9DF9",
    borderRight: "1px solid #1D9DF9",
    borderTop: "1px solid #1D9DF9",
    padding: 23,
    position: "absolute",
    overflow: "hidden",

    textAlign: "center",
    fontFamily: "sans-serif",
    paddingTop: 10,
    fontSize: 10,
    boxSizing: "border-box",
    color: "white",
  },

  fixed: {
    color: "#F8A104",
  },

  bodyLeft: {
    borderLeft: "1px solid transparent",
  },

  cellTopFirst: {
    borderBottom: "1px solid #F8A104",
  },

  cellCenter: {
    border: "1px solid grey",
  },

  cellTop: {
    borderBottom: "1px solid #F8A104",
    borderLeft: "1px solid #F8A104",
  },

  cellLeft: {
    borderRight: "1px solid #F8A104",
    borderBottom: "1px solid #F8A104",
    borderLeft: "1px solid #F8A104",
  },

  cellRight: {
    borderLeft: "1px solid #F8A104",
    borderBottom: "1px solid #F8A104",
    borderRight: "1px solid #F8A104",
  },

  cellBottomFixed: {
    borderTop: "1px solid #F8A104",
  },

  cellBottomFirst: {
    borderTop: "1px solid #F8A104",
    borderBottom: "1px solid transparent",
  },

  cellBottom: {
    borderTop: "1px solid #F8A104",
    borderLeft: "1px solid #F8A104",
    borderBottom: "1px solid transparent",
  },
});

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.rerender);

    this.state = {
      columnCount: 10,
      rowCount: 10,
      fixedLeftColumnCount: 0,
      fixedRightColumnCount: 0,
      fixedHeaderCount: 0,
      fixedFooterCount: 0,
      refresh: 0,
      x: 1500,
      y: 900,
    };
  }

  render(props) {
    const { styles } = Example;

    const rowHeight = CELL_SIZE;
    const columnWidth = CELL_SIZE;
    var refresh = "";

    const handleDrag = (ev, target) => {
      let grid = new Grid();
      // grid._scrolling = true;
      // grid._scroller = true;
      // grid.setScroll(10, 590000);
      // grid.refresh();
      // grid.update();
      // grid.componentWillUpdate = true;
      // grid.forceUpdate();

      if (ev.x >= 1500 - 120) {
        const scrollOptions = {
          disableMouse: false,
          bounce: false, // disable bounce because we're already customizing positioning
          scrollX: true,
          freeScroll: true,
          preventDefault: true,
        };
        console.log(this.state.x.toString());
        let draggable = document.getElementById("scroll-inner");

        var myScroll = new IScroll(draggable, scrollOptions);
        this.setState((state) => ({
          x: state.x + 200,
        }));
        myScroll.scrollTo(-this.state.x, -this.state.y);
        this.setState((state) => ({
          columnCount: state.columnCount + 1,
        }));
      } else if (ev.y >= 900 - 120) {
        const scrollOptions = {
          disableMouse: false,
          bounce: false, // disable bounce because we're already customizing positioning
          scrollX: true,
          probeType: 3,
          freeScroll: true,
          preventDefault: true,
        };
        let draggable = document.getElementById("scroll-inner");

        var myScroll = new IScroll(draggable, scrollOptions);

        this.setState((state) => ({
          y: state.y + 200,
        }));
        myScroll.scrollTo(-this.state.x, -this.state.y);
        this.setState((state) => ({
          rowCount: state.rowCount + 2,
        }));
      }
    };

    return (
      <div className="padre">
        <div
          className={cx("table-view", styles.container)}
          style={{
            backgroundColor: "black",
            position: "relative",
            width: "1500px",
            height: "900px",
            border: "1px solid transparent",
            boxSizing: "border-box",
          }}
        >
          <Grid
            columnCount={this.state.columnCount}
            rowCount={this.state.rowCount}
            estimatedColumnWidth={columnWidth}
            estimatedRowHeight={rowHeight}
            renderCell={this.renderCell}
            columnWidth={this.calculateColumnWidth}
            rowHeight={this.calculateRowHeight}
            refresh={this.state.refresh}
          />

          <ImgItem
            position={{
              id: "uno",
            }}
          ></ImgItem>
          <ImgItem
            position={{
              id: "dos",
            }}
          ></ImgItem>
          <Draggable id="wrapper" bounds={".table-view"} onDrag={handleDrag}>
            <div
              id="wrapper"
              style={{
                backgroundColor: "pink",
                border: "1px solid red",
                width: "200px",
                height: "200px",
              }}
            ></div>
          </Draggable>
        </div>
      </div>
    );
  }

  renderCell = (pane, row, rowData, column, columnData, refresh) => {
    let [colIndex, colLeft, width] = columnData;
    let [rowIndex, rowTop, height] = rowData;

    // const cellNumber = rowIndex * this.state.columnCount + colIndex;

    // const { styles } = Example;

    const backgroundColor = "transparent";
    const position = "absolute";
    const borderBottom = "1px solid #1D9DF9";
    const borderLeft = "1px solid #1D9DF9";
    const borderRight = "1px solid #1D9DF9";
    const borderTop = "1px solid #1D9DF9";
    const color = "white";
    const textAlign = "center";

    const fontSize = 20;
    const contentAlign = "center";

    // const isFixed = true;

    let left = column < 1 ? 0 : colLeft;
    const top = 0;

    const attrs = {
      left,
      top,
      width,
      height,
      backgroundColor,
      position,
      borderBottom,
      borderLeft,
      borderRight,
      borderTop,
      color,
      textAlign,
      contentAlign,
      fontSize,
    };

    // let draggable = document.getElementById("scroll-inner");

    // var myScroll = new IScroll(draggable);

    // myScroll.scrollTo(2, 200);

    return (
      <Targets
        id={rowIndex + "-" + colIndex}
        key={rowIndex + "-" + colIndex}
        style={attrs}
      ></Targets>
    );
  };

  calculateColumnWidth = (column) => {
    return CELL_SIZE;
  };

  calculateRowHeight = (row) => {
    return CELL_SIZE;
  };
}

////////////////////////////////////////////////

Example.styles = styles;
