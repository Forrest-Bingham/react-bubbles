import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);
  const [rando, setRando]=useState("");

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addNewColor = e => {
    e.preventDefault();
    console.log(addColor);
    axiosWithAuth().post("/colors", addColor)
    .then(res => {
      console.log(res);

    })
    .catch(err => console.log(err));

    setAddColor(initialColor);
  }

  const randomColor = e => {
    e.preventDefault();
    const random = ('#'+(Math.random()*0xFFFFFF<<0).toString(16));
    setRando(random);
      console.log(rando);

  }

  const saveEdit = e => {
    e.preventDefault();
   // console.log("colorList", colorList);
    console.log("colors", colorToEdit);
    axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then( res => {
      console.log("new color", res.data);
     
    })
    .catch(err => console.log(err));
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log("color", color)
    axiosWithAuth().delete(`/colors/${color.id}`)
    .then(res => {
      console.log("Color Deleted:", res)

    })
    .catch(err => console.log(err));
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

{!editing && (
      <div className="addColor">

<div className="random">

<h4> Random: {rando} </h4>

<button onClick={randomColor}>Random Color</button>

</div>
        
      {/* stretch - build another form here to add a color */} 
      <form onSubmit={addNewColor}>

        <input 
            type="text"
            name="color"
            placeholder="Color"
            value={addColor.color}
            onChange={e => setAddColor({...addColor,
            color: e.target.value})}
            />
        <input  
            type="text"
            name="hex"
            placeholder="Hex code #"
            value={addColor.code.hex}
            onChange={e => setAddColor({...addColor,
              code: {hex: e.target.value}})}
            />

          <button type="submit">Add New Color</button>
      </form> 

      
     
      </div>

      
      ) }
      <div className="spacer" />
      
    </div>
  );
};

export default ColorList;
