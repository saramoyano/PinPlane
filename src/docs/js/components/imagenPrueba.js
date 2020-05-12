import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSourceMonitor
} from "react-dnd";
import { XYCoord } from "dnd-core";
import PropTypes from "prop-types";

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    if (!component) {
      return null;
    }
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    //if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //  return;
    //}

    // Dragging upwards
    //if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //  return;
    //}

    const upwards = dragIndex > hoverIndex && hoverClientY > hoverMiddleY;
    const downwards = dragIndex < hoverIndex && hoverClientY < hoverMiddleY;
    const leftwards = dragIndex > hoverIndex && hoverClientX > hoverMiddleX;
    const rightwards = dragIndex < hoverIndex && hoverClientX < hoverMiddleX;

    if (upwards && (leftwards || rightwards)) {
      return;
    }

    if (downwards && (leftwards || rightwards)) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Item extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
  };

  render() {
    const {
      style,
      text,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    const zIndex = isDragging ? 2 : 1;

    return connectDragSource(
      connectDropTarget(
        <div style={{ ...style, zIndex, opacity }} className="item">
          {text}
        </div>
      )
    );
  }
}

const dragSource = DragSource("item", cardSource, collectSource)(Item);
export default DropTarget("item", cardTarget, collectTarget)(dragSource);
