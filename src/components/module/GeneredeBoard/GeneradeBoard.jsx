import Element from "../Element/index";
import GeneradeCard from "./GederadeCard/GeneradeCard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Droppable } from "react-beautiful-dnd";
import { TaskList } from "../Kanban/Kabban.style";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Input from "@mui/joy/Input";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const GederadeBoard = ({
  columns,
  setColumns,
  addNewBoard,
  deleteCard,
  deleteBorad,
  setNewNameBoard,
  updateCard,
  sortBy,
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
                <div style={{ display: "flex" }}>
                  <p>Sort by</p>
                  <button onClick={() => sortBy("asc", columnId)}>
                    <ArrowUpwardIcon />
                  </button>
                  <button onClick={() => sortBy("desc", columnId)}>
                    <ArrowDownwardIcon />
                  </button>
                  <button onClick={() => sortBy("date", columnId)}>Date</button>
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
      {Object.keys(columns).length > 4 ? (
        ""
      ) : (
        <Box>
          <Button onClick={addNewBoard} variant="contained">
            Add new board
          </Button>
        </Box>
      )}
    </>
  );
};
