import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface SelectionProps {
  title: string;
}

export function Selection(props: SelectionProps) {
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
      <div id="ScouterSelection"><span>{props.title}</span></div>
      {/* <div>{window.getSelection()?.anchorNode?.nodeValue}</div> */}
    </>
  );
};