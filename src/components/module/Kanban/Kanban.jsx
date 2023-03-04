import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Container, TaskColumnStyles } from "./Kabban.style";
import {
  allCardsLoading,
  allCardsRecieved,
  getAllData,
  getLoading,
  deleteCards,
  deleteBoards,
  addNewBoards,
} from "../../../store/Kanban/KanbanSlice";
import {
  GETCARDS,
  GETBOARDS,
  UPDATECARD,
  CREATEBOARDS,
  DELETECARD,
  DELETEBOARD,
  UPDATETITLEBOARD,
} from "../../../constants/constants";
import { GederadeBoard } from "../GeneredeBoard/GeneradeBoard";

const Kanban = () => {
  const allCards = useSelector(getAllData);
  const [columns, setColumns] = useState(null);
  const [open, setOpen] = useState(false);

  const apiStatus = useSelector(getLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    const invokeAllCarsAPI = async () => {
      dispatch(allCardsLoading());
      const endpoints = [GETCARDS, GETBOARDS];
      await axios
        .all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then((data) => {
          const result = {
            cards: data[0].data,
            boards: data[1].data,
          };
          dispatch(allCardsRecieved(result));
        });
    };

    invokeAllCarsAPI();
  }, [dispatch]);

  useEffect(() => {
    setColumns(allCards);
  }, [apiStatus, allCards]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      const updCards = {
        id: result.draggableId,
        board_id: destination.droppableId,
        position: destItems.map((item) => item.id),
      };
      axios.post(UPDATECARD, updCards);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });

      const updCards = {
        id: result.draggableId,
        position: copiedItems.map((item) => item.id),
      };
      axios.post(UPDATECARD, updCards);
    }
  };
  const deleteBorad = (id) => {
    dispatch(deleteBoards(id));

    axios.delete(DELETEBOARD + id);
  };
  const deleteCard = (id) => {
    dispatch(deleteCards(id));

    axios.delete(DELETECARD + id);
  };

  const addNewBoard = () => {
    const data = {
      Title: "New Board",
      uuid: uuidv4(),
    };
    axios.post(CREATEBOARDS, data).then((response) => {
      const result = {
        id: response.data[0].insertId,
        Title: data.Title,
        uuid: data.uuid,
      };
      dispatch(addNewBoards(result));
    });
  };

  const changeNameBoard = () => {
    setOpen(true);
  };

  const setNewNameBoard = (name, id) => {
    axios.post(UPDATETITLEBOARD, { name, id });
  };

  if (apiStatus !== "pending" && columns !== null) {
    return (
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <Container>
          <TaskColumnStyles>
            <GederadeBoard
              columns={columns}
              changeNameBoard={changeNameBoard}
              open={open}
              setOpen={setOpen}
              addNewBoard={addNewBoard}
              setColumns={setColumns}
              deleteCard={deleteCard}
              deleteBorad={deleteBorad}
              setNewNameBoard={setNewNameBoard}
            />
          </TaskColumnStyles>
        </Container>
      </DragDropContext>
    );
  }
};

export default Kanban;
