import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

//Props passed in--> 
//colors = colorList 
//updateColors = setColorList

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log({colors});
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const {go} = useHistory()
  const [colorToAdd, setColorToAdd] = useState(initialColor)


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const body = {...colorToEdit}
  const id = colorToEdit.id


  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color✅
    // think about where will you get the id from...where is id saved right now?
    axiosWithAuth()
      .put(`/api/colors/${id}`, body)
      .then(res => {
        setEditing(res.data)
        go(0)
      })
      .catch(err => {
        console.log({err})
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color✅
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        const newList = colors.filter(item => `${item.id}` !== res.data)
        updateColors(newList)
        go(0)
      })
      .catch(err => {
        console.log("DELETE ERROR", err)
      })
  };

  const addNew = e=> {
    e.preventDefault()
    axiosWithAuth()
      .post("/api/colors", body)
      .then(res => {
        setEditing(res.data)
        go(0)
      })
      .catch(err => {
        console.log("ADD ERR", err)
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <div>
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
        {/* //WHERE ADDING STARTS */}
        {/* //WHERE ADDING STARTS */}
        {/* //WHERE ADDING STARTS */}
        <form onSubmit={addNew}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
        </div>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
