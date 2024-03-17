'use client'

import BeatLoader  from "react-spinners/BeatLoader";


const Loading = () => {
  return ( <div className="loaderContainer">
    <BeatLoader 
    color="#36d7b7"
    size={50}
  />
  </div> );
}
 
export default Loading ;