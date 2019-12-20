import React, { useState, useEffect } from "react";
import axios from "axios";
import {axiosWithAuth} from "../utils/axiosWithAuth"

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(()=> {
   // console.log(props);
   // console.log("props.match.params.id", props.match.params.id)
  //  console.log("colorList", colorList)
    axiosWithAuth().get("/colors")
    .then(res=> {
  //    console.log(res);
      setColorList(res.data)})
    .catch(err => console.log(err));
  })

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
