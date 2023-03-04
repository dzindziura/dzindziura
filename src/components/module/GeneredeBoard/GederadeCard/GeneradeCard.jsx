import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskInformation } from "./GeneradeBoard.style";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const GeneradeCard = ({ item, index, deleteCard }) => {
  return (
    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskInformation>
            <div>
              <p>{item.Task}</p>
            </div>
            <button onClick={() => deleteCard(item.id)}>
              <DeleteOutlineIcon />
            </button>
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
};

export default GeneradeCard;
