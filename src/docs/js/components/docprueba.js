import React, { PureComponent } from "react";
import {Grid} from "react-virtualized";
import Item from "./imagenPrueba";
import AutoSizer from "react-virtualized-auto-sizer";
import { itemsArray } from "../helpers/ListaImgItm";
import ImgIt from "./ImgItem copy";
const COLUMN_COUNT = 5;

class Container extends PureComponent {
  constructor(props) {
    super(props);
    this._grid = null;

    let items = itemsArray;

    items[0] = {
        id: 1,
        text: <ImgIt/>
      };
    items[1] = {
        id: 2,
        text:""
      };
    // items = items.map(function(x, i) {
    //   return {
    //     id: i,
    //     text: <ImgIt/>
    //   };
    // });

    this.state = {
      items: items
    };
  }

  _moveCard = (dragIndex, hoverIndex) => {
    const { items } = this.state;
    const selectedItem = items[dragIndex];
    items.splice(dragIndex, 1);
    items.splice(hoverIndex, 0, selectedItem);

    this.setState({
      items: items
    });

    this._grid.forceUpdate();
  };

  _cardRenderer = ({ children, index,index2, card, ...styles }) => {
    return (
      <Item
        index={index}
        id={card.id}
        order={card.order}
        text={card.text}
        moveCard={this._moveCard}
        style={{
          transform: "translate3d(" + styles.x + "px, " + styles.y + "px, 0)"
        }}
      />
    );
  };

  _renderEntity = ({ columnIndex, rowIndex, style, isScrolling }) => {
    const index = rowIndex * COLUMN_COUNT + columnIndex;
    const card = this.state.items[index];

    if (!card) {
      return null;
    }

    return (
      <Item
        key={card.id}
        index={index}
        id={card.id}
        order={card.order}
        text={card.text}
        moveCard={this._moveCard}
      />
    );
  };

  render() {
    return (
<AutoSizer>
      {({ height, width }) => (
        <Grid
          ref={node => {
            this._grid = node;
          }}
          className="Grid"
          items={this.state.items}
          cellRenderer={this._renderEntity}
          columnCount={COLUMN_COUNT}
          columnWidth={300}
          height={height}
          rowCount={2}
          rowHeight={300}
          width={width}
        />
              )}
    </AutoSizer>
    );
  }
}


export default Container;
