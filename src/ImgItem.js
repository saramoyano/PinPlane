import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Draggable from "react-draggable";
import { useDrag } from "react-dnd";
import ItemTypes from "./Constants";

import styled from "styled-components";

const Card = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1000;
  display: flex;
  margin: 0 auto;
  margin-top: 40px;
  border: 2px solid grey;
  width: 200px;
  height: 200px;
  position: relative;
  align-content: center;
  background-color: white;
`;

const CardImage = styled.div`
  border: 6px dotted rgba(109, 9, 94, 0.64);
  align-items: center;
  align-content: center;
  margin: 0 auto;
  width: 200px;
  height: 250px;
  display: flex;
`;

const FileSelectors = styled.div`
  margin-top: 25px;
`;

const ImgContainer = styled.div`
  border: 1.5px dashed gray;
  height: 200px;
  width: 200px;
  margin: 0 auto;
  background-color: rgba(170, 157, 168, 0.64);
  align-content: center;
`;

const ImgItem = (props) => {
  const [buttonState, setButtonState] = useState(false);
  const [currentIMG, setCurrentImg] = useState("");
  const [dropIMG, setDropIMG] = useState("");
  const [srcImg, setSrcImg] = useState("");

  const [{ isDragging }, drag] = useDrag({
    item: {
      id: props.position.id,
      type: ItemTypes.ImgItem,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {
    console.log("dasd");
  }, [isDragging]);

  const onDrop = useCallback((acceptedFiles) => {
    let string = acceptedFiles[0].name.split("\\");

    setDropIMG("./img/" + string[string.length - 1]);
    setCurrentImg("");
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const saveIMG = (current) => {
    if (dropIMG === "" || currentIMG !== "") {
      if (current !== "") {
        let string = current.split("\\");
        setSrcImg("./img/" + string[string.length - 1]);
      } else {
        setSrcImg(currentIMG);
      }

      setButtonState(false);
    } else if (currentIMG === "" || dropIMG !== "") {
      setButtonState(false);
      setSrcImg(dropIMG);
    }
  };

  const editIMG = () => {
    setDropIMG("");
    setCurrentImg("");
    setButtonState(true);
  };

  return (
    <Card
      id={props.position.id}
      ref={drag}
      className="card"
      style={{
        height: "200px",
        width: "200px",
        marginLeft: "0px",
        marginTop: "0px",
        marginRight: "0px",
        position: "absolute",
      }}
    >
      <CardImage
        className="card-image"
        style={{ height: "100px", width: "100px" }}
      >
        {!buttonState ? (
          <img
            style={{ height: "100px", width: "100px" }}
            src={srcImg === "" ? "./img/default_image.png" : srcImg}
            alt=""
          ></img>
        ) : (
          <FileSelectors className="fileSelectors">
            <input
              type="file"
              name="img"
              onChange={(e) => {
                setCurrentImg(e.target.value);
              }}
            ></input>
            <ImgContainer
              className="imgcontainer"
              {...getRootProps()}
              style={{ height: "80px", width: "80px" }}
            >
              {isDragActive ? (
                <p>Drop your image here</p>
              ) : (
                <div>
                  {dropIMG !== "" ? (
                    <img
                      src={dropIMG}
                      alt=""
                      style={{ margin: "0 auto", "vertical-align": "middle" }}
                    ></img>
                  ) : (
                    <p>You can drop an image</p>
                  )}
                </div>
              )}
              <div className="DropZone" {...getInputProps()}></div>
            </ImgContainer>
          </FileSelectors>
        )}
      </CardImage>
      <div
        className="waves-effect waves-light deep-purple lighten-1 flotar"
        style={{
          "align-content": "center",
          "text-align": "center",
          color: "white",
          backgroundColor: "black",
        }}
      >
        {!buttonState ? (
          <p
            className="material-icons"
            onClick={() => {
              editIMG();
            }}
          >
            Edit
          </p>
        ) : (
          <p
            className="material-icons"
            onClick={() => {
              saveIMG(currentIMG);
            }}
          >
            Save
          </p>
        )}
      </div>
    </Card>
  );
};

export default ImgItem;
