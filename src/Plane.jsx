import React, { useState } from "react";
import cx from "classnames";
import Grid from "./Grid";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { createUseStyles } from "react-jss";
import ImgItem from "./ImgItem";
import "./App.css";
import Targets from "./Targets";

const CELL_SIZE = 200;

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

export default class Plane extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columnCount: 500000,
      rowCount: 500000,
      fixedLeftColumnCount: 0,
      fixedRightColumnCount: 0,
      fixedHeaderCount: 0,
      fixedFooterCount: 0,
    };
  }

  render() {
    const { styles } = Plane;

    const rowHeight = CELL_SIZE;
    const columnWidth = CELL_SIZE;

    return (
      <div className="padre">
        <div
          className={cx("table-view", styles.container)}
          style={{
            backgroundColor: "black",
            position: "absolute",
            width: "1500px",
            height: "800px",
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
        </div>
      </div>
    );
  }

  calculateColumnWidth = (column) => {
    return CELL_SIZE;
  };

  calculateRowHeight = (row) => {
    return CELL_SIZE;
  };

  renderCell = (pane, row, rowData, column, columnData) => {
    const [colIndex, colLeft, width] = columnData;
    const [rowIndex, rowTop, height] = rowData;

    const { styles } = Plane;

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

    const isFixed = true;

    const left = column < 1 ? 0 : colLeft;
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

    const title = rowIndex + "-" + colIndex;

    const classes = cx(
      styles.cell,
      column === 0 && styles.cellLeft,
      column === 1 && styles.bodyLeft,
      row === 0 && column > 1 && styles.cellTop,
      row === 0 && column === 1 && styles.cellTopFirst,
      row === this.state.rowCount - 1 && column > 1 && styles.cellBottom,
      row === this.state.rowCount - 1 && column === 0 && styles.cellBottomFixed,
      row === this.state.rowCount - 1 && column === 1 && styles.cellBottomFirst,
      column === this.state.columnCount - 1 && styles.cellRight,
      isFixed && styles.fixed
    );

    return (
      <Targets
        id={rowIndex + "-" + colIndex}
        key={rowIndex + "-" + colIndex}
        style={attrs}
      >
        {title}
      </Targets>
    );
  };
}

Plane.styles = styles;
