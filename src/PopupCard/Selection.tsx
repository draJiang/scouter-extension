import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface SelectionProps {
  title: string;
}

export function Selection(props: SelectionProps) {

  useEffect(() => {
    console.log('Selection:');
    console.log(props);

  }, []);

  return (
    <>
      <div id="ScouterSelection"><span>{props.title}</span></div>
    </>
  );
};