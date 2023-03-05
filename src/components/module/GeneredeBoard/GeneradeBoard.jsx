import Element from "../Element/index";
import GeneradeCard from "./GederadeCard/GeneradeCard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Droppable } from "react-beautiful-dnd";
import { TaskList } from "../Kanban/Kabban.style";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRef } from "react";
import { HeadBoard, Title } from "./GeneradeBoard.style";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
export const GederadeBoard = ({
  columns,
  setColumns,
  addNewBoard,
  deleteCard,
  deleteBorad,
  updateCard,
  sortBy,
}) => {
  const taskRef = useRef(null);

  const setNewTitle = (id) => {
    console.log(taskRef.current.textContent);
  };
  return (
    <>
      {Object.entries(columns).map(([columnId, column], index) => {
        return (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                <HeadBoard>
                  <Title
                    contentEditable={true}
                    onBlur={() => setNewTitle(column.id)}
                    suppressContentEditableWarning={true}
                    ref={taskRef}
                  >
                    {column.name}
                  </Title>
                  <button onClick={() => deleteBorad(columnId)}>
                    <DeleteOutlineIcon />
                  </button>
                </HeadBoard>
                <div style={{ display: "flex", marginTop: 10 }}>
                  <p>Sort by: </p>
                  <button onClick={() => sortBy("asc", columnId)}>
                    <ArrowUpwardIcon />
                  </button>
                  <button onClick={() => sortBy("desc", columnId)}>
                    <ArrowDownwardIcon />
                  </button>
                  <button onClick={() => sortBy("date", columnId)}>
                    <AccessTimeIcon />
                  </button>
                </div>

                {column.items.map((item, index) => (
                  <GeneradeCard
                    key={index}
                    item={item}
                    index={index}
                    deleteCard={deleteCard}
                    updateCard={updateCard}
                  />
                ))}
                {provided.placeholder}
                <Element
                  id={columnId}
                  columns={columns}
                  setColumns={setColumns}
                />
              </TaskList>
            )}
          </Droppable>
        );
      })}
      <Box>
        <Button onClick={addNewBoard} variant="contained">
          Add new board
        </Button>
      </Box>
    </>
  );
};
