import Render from "../actions/Render";
import React, { useState } from "react";
import Targets from "../../Targets";
import Grid from "../../Grid";

const Rerender = (state = {}, action) => {
  switch (action.type) {
    case "render":
      const renderCell = (pane, row, rowData, column, columnData) => {
        const [colIndex, colLeft, width] = columnData;
        const [rowIndex, rowTop, height] = rowData;

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

        // const title = rowIndex + "-" + colIndex;

        // const classes = cx(
        //   styles.cell,
        //   column === 0 && styles.cellLeft,
        //   column === 1 && styles.bodyLeft,
        //   row === 0 && column > 1 && styles.cellTop,
        //   row === 0 && column === 1 && styles.cellTopFirst,
        //   row === this.state.rowCount - 1 && column > 1 && styles.cellBottom,
        //   row === this.state.rowCount - 1 && column === 0 && styles.cellBottomFixed,
        //   row === this.state.rowCount - 1 && column === 1 && styles.cellBottomFirst,
        //   column === this.state.columnCount - 1 && styles.cellRight,
        //   isFixed && styles.fixed
        // );

        // const Array = [];

        // for (let i = 1; i < this.state.rowCount; i++) {
        //   Array.push(<div>xd</div>);
        // }

        // const divs = Array.map((res) => {
        //   return res;
        // });

        return (
          <Targets
            id={rowIndex + "-" + colIndex}
            key={rowIndex + "-" + colIndex}
            style={attrs}
          ></Targets>
        );
      };
      return renderCell;
      break;

    default:
      return state;
  }
};

export default Rerender;
