import Element from "../Element/index";
import GeneradeCard from "./GederadeCard/GeneradeCard";
import Button from "@mui/joy/Button";
import Box from "@mui/material/Box";
import { Droppable } from "react-beautiful-dnd";
import { TaskList } from "../Kanban/Kabban.style";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Input from "@mui/joy/Input";

export const GederadeBoard = ({
  columns,
  setColumns,
  addNewBoard,
  deleteCard,
  deleteBorad,
  setNewNameBoard,
}) => {
  const setNewTitle = (event, columnId) => {
    if (event.key === "Enter") {
      setNewNameBoard(event.target.value, columnId);
    }
  };
  return (
    <>
      {Object.entries(columns).map(([columnId, column], index) => {
        return (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided, snapshot) => (
              <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Input
                    defaultValue={column.name}
                    onKeyDown={(e) => setNewTitle(e, columnId)}
                  />
                  <button onClick={() => deleteBorad(columnId)}>
                    <DeleteOutlineIcon />
                  </button>
                </div>
                {column.items.map((item, index) => (
                  <GeneradeCard
                    key={index}
                    item={item}
                    index={index}
                    deleteCard={deleteCard}
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
      {Object.keys(columns).length > 4 ? (
        ""
      ) : (
        <Box>
          <Button onClick={addNewBoard}>Add new board</Button>
        </Box>
      )}
    </>
  );
};
