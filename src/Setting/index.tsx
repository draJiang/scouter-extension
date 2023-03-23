import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export function PopupCard() {
    const [count, setCount] = useState(0);
    const [currentURL, setCurrentURL] = useState<string>();
  
    useEffect(() => {
      
    }, []);
  
    const changeBackground = () => {

      console.log('changeBackground');
      
    };
  
    return (
      <>
        <div>Setting</div>
      </>
    );
  };