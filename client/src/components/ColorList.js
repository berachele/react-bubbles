import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

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


  const editColor = color => {
    console.log("EDITCOLR", color)
    setEditing(true);
    setColorToEdit(color);
  };


  // const getID = colors.map(item=> {
  //   console.log("MAP FUNCITON", item); 
  //   if(editColor === item) {
  //     return item
  //   }
  // })
  // const color = getID
  console.log("COLOR TO EDIT", colorToEdit)


  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is id saved right now?
    axiosWithAuth()
      .put(`/api/colors/`, colors)
      .then(res => {
        console.log("Res with PUT", res)
      })
      .catch(err => {
        console.log({err})
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log("DELETE COLOR", color)
    axiosWithAuth()
      .delete()
      .then()
      .catch()
  };

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
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
