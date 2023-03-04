import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Textarea from "@mui/joy/Textarea";
import { useState } from "react";
import Button from "@mui/joy/Button";
import axios from "axios";
import { ADDCARDS } from "../../../constants/constants";
const Element = ({ id, columns, setColumns }) => {
  const [active, setActive] = useState(true);
  const [text, setText] = useState("");

  const column = columns[id];
  const addItem = (e) => {
    e.preventDefault();
    if (text.length >= 5) {
      setActive(true);
      const res = { Task: text, board_id: id };
      axios.post(ADDCARDS, res).then((response) => {
        const result = { id: response.data[0].insertId, Task: text, board_id: id };
        console.log(response)
        setColumns({
          ...columns,
          [id]: {
            ...column,
            items: [...column.items, result],
          },
        });
      });
    }
  };

  const element = (
    <div className="mt-2">
      <form>
        <Textarea
          minRows={2}
          className="input_box"
          placeholder="Enter the title of this card..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="">
          <Button type="button" onClick={(e) => addItem(e)}>
            Submit
          </Button>
          <ClearIcon onClick={() => setActive(true)} />
        </div>
      </form>
    </div>
  );

  return active ? (
    <button
      className="add_new_card"
      type="button"
      onClick={() => setActive(false)}
    >
      <span>
        <AddIcon />
        Add new card
      </span>
    </button>
  ) : (
    element
  );
};

export default Element;
