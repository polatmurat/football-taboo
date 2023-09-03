import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";

const Trial = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchURI = "http://localhost:5173/data.json";
    const fetchData = async () => {
      try {
        const response = await fetch(fetchURI);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchData();
  }, []);

  class Question {
    constructor(id, name, content, choices, answer) {
      this.id = id;
      this.name = name;
      this.content = content;
      this.choices = choices;
      this.answer = answer;
    }
  }

  if (data.length === 0) {
    return <Spinner />;
  }

  const q = new Question(
    data[0].id,
    data[0].qName,
    data[0].qContent,
    data[0].qChoices,
    data[0].qAnswer
  );

  const questions = [
    data.map(
      (question) =>
        new Question(
          question.id,
          question.qName,
          question.qContent,
          question.qChoices,
          question.qAnswer
        )
    ),
  ];

  




  return <></>;
};

export default Trial;
