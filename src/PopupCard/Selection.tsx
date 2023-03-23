import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export function Selection(props:any) {
    const [count, setCount] = useState(0);
    const [currentURL, setCurrentURL] = useState<string>();
  
    useEffect(() => {
      console.log('Selection:');
      console.log(props);
      
    }, []);
  
    const changeBackground = () => {

      console.log('changeBackground');
      
    };
  
    return (
      <>
        {/* <h2>Selection:</h2> */}
        <div>{window.getSelection()?.toString()}</div>
        {/* <div>{window.getSelection()?.anchorNode?.nodeValue}</div> */}
      </>
    );
  };