import React from "react";
import "./styles.css";
import data from './data/data';
import Questionnaire from './views/Questionnaire/Questionnaire';

export default function App() {
  return (
    <div className="root">
      <Questionnaire data={data} />
    </div>
  );
}
