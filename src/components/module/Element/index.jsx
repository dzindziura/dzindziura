import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Textarea from '@mui/joy/Textarea';
import { useState } from "react";
import Button from '@mui/material/Button';
import axios from "axios";
import { ADDCARDS } from "../../../constants/constants";
import { useDispatch } from "react-redux";
import {
  addNewCard
} from "../../../store/Kanban/KanbanSlice.jsx";
import { v4 as uuidv4 } from "uuid";

const Element = ({ id }) => {
  const [active, setActive] = useState(true);
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const addItem = (e) => {
    e.preventDefault();
    setActive(true);
    const res = { Task: text, board_id: id, id: uuidv4(), position: 100 };
    dispatch(addNewCard(res))

    axios.post(ADDCARDS, res);
    setText('')
  };

  const element = (
    <div style={{marginTop: '10px'}}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addItem(event);
        }}
      >
        <Textarea
          placeholder="Try to submit with no text!"
          required
          sx={{ mb: 1 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" variant="contained">Submit</Button>
        <Button><ClearIcon onClick={() => setActive(true)}/></Button>

      </form>
    </div>
  );

  return active ? (
    <Button
      type="button"
      variant="outlined"
      onClick={() => setActive(false)}
      sx={{mt: 2}}
    >
        <AddIcon />
        Add new card
    </Button>
  ) : (
    element
  );
};

export default Element;
