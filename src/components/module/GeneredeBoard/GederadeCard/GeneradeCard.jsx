import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskInformation } from "./GeneradeBoard.style";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import moment from "moment";
import { useState, useRef } from "react";

const GeneradeCard = ({ item, index, deleteCard, updateCard }) => {
  const [content, setContent] = useState(item.Task);
  const [newDiff, setNewDiff] = useState(null);

  const taskRef = useRef(null);
  let date1;
  const now = moment();
  let diff;
  let formattedDiff;
  if (item.updated_at) {
    date1 = moment(item.updated_at);
    diff = moment.duration(now.diff(date1));
    formattedDiff = diff.humanize();
  } else {
    date1 = moment(item.created_at);
    diff = moment.duration(now.diff(date1));
    formattedDiff = diff.humanize();
  }

  const handleBlur = (id) => {
    if (taskRef.current.textContent !== content) {
      setContent(taskRef.current.textContent);
      updateCard(id, taskRef.current.textContent);
      const newDiff = moment.duration(now.diff(new Date()));
      formattedDiff = newDiff.humanize();
      setNewDiff(formattedDiff + "ago");
    }
  };

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
              <div
                contentEditable={true}
                onBlur={() => handleBlur(item.id)}
                suppressContentEditableWarning={true}
                ref={taskRef}
              >
                {item.Task}
              </div>
              <p style={{ fontSize: 10 }}>
                {newDiff ? newDiff : formattedDiff + " ago"}
              </p>
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
