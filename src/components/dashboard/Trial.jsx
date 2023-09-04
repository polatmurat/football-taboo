import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import Nav from "../home/Nav";
import "./Blur.css";
import BlurBackground from "./BlurBackground";

const Trial = () => {
  const [data, setData] = useState([]);
  const [time, setTime] = useState(60);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [passCounter, setPassCounter] = useState(0);
  const team1Name = localStorage.getItem("team1Name");
  const team2Name = localStorage.getItem("team2Name");
  const [teamName, setTeamName] = useState(`${team1Name}`);
  const [blur, setBlur] = useState(false);

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

  useEffect(() => {
    let timer = time;
    const countdown = setInterval(() => {
      if (timer === 0) {
        clearInterval(countdown);
        setBlur(true);
      } else {
        setTime(timer);
        timer--;
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [time]);

  class Question {
    constructor(id, name, content, taboo) {
      this.id = id;
      this.name = name;
      this.content = content;
      this.qTaboo = taboo;
    }
  }

  if (data.length === 0) {
    return <Spinner />;
  }

  const q = new Question(
    data[0].id,
    data[0].qName,
    data[0].qContent,
    data[0].qTaboo
  );

  const questions = [
    data.map(
      (question) =>
        new Question(
          question.id,
          question.qName,
          question.qContent,
          question.qTaboo
        )
    ),
  ];

  class Quiz {
    constructor(questions) {
      this.questions = questions;
      this.qIndex = questionIndex;
      this.correctCounter = 0;
    }
  }

  Quiz.prototype.askQuestion = function () {
    console.log(this.qIndex);
    return this.questions[0][this.qIndex];
  };

  const quiz = new Quiz(questions);

  const showQuestionNumber = (index, questionsLength) => {
    return `${index} / ${questionsLength}`;
  };

  // quiz.questions.map(quest => console.log(quest[4].name));

  if (data.length === 0) {
    return <Spinner />;
  }

  const showQuestion = (inputtedQuestion) => {
    if (questionIndex + 1 > questions[0].length) {
      setQuestionIndex(questions[0].length - 1);
      return "It was last";
    }

    console.log("Inputted question: ", inputtedQuestion);
    let questionText = inputtedQuestion.name;
    let tabooWords = inputtedQuestion.qTaboo;

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="flex">
          <div className="p-4 rounded-lg shadow-md bg-white mb-8 w-72 text-center mt-14 mr-14">
            <h1 className="text-2xl font-bold">{teamName}</h1>
            <p className="mt-2 text-gray-600 font-medium">
              Pas hakkınız : {3 - passCounter} Score :{" "}
              {teamName === team1Name ? score1 : score2}
            </p>
          </div>
          <div className="p-4 rounded-lg shadow-md bg-white mb-8 w-72 text-center mt-14">
            <h1 className="text-2xl font-bold">Remaining</h1>
            <span className="mt-2 text-gray-600"> {time}</span>
          </div>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-white mb-8 w-[40%] text-center">
          <h2 className="text-xl font-bold">{questionText}</h2>
          <ul className="mt-2 space-y-2">
            {tabooWords.map((word, index) => (
              <li
                key={index}
                className="text-gray-700 border-b border-x-gray-100 pb-2 text-center"
              >
                {word}
              </li>
            ))}
          </ul>

          <div className="mt-3">
            {showQuestionNumber(quiz.qIndex + 1, questions[0].length)}
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={correctBtn}
            className="px-4 py-2 w-24 bg-green-500 text-white rounded"
          >
            Correct
          </button>
          <button
            onClick={passBtn}
            className="px-4 py-2 w-24 bg-yellow-500 text-white rounded"
          >
            Pas
          </button>
          <button
            onClick={failBtn}
            className="px-4 py-2 w-24 bg-red-500 text-white rounded"
          >
            Taboo!
          </button>
        </div>
        <div className="flex space-x-16 mt-8 text-center">
          <div className="team-score">
            <p>{team1Name}</p>
            <p className="text-xl font-bold">Total Score: {score1}</p>
          </div>
          <div className="team-score">
            <p>{team2Name}</p>
            <p className="text-xl font-bold">Total Score: {score2}</p>
          </div>
        </div>
      </div>
    );
  };

  const correctBtn = () => {
    if (score1 < questions[0].length && score2 < questions[0].length) {
      teamName === team1Name ? setScore1(score1 + 1) : setScore2(score2 + 1);
      setQuestionIndex(questionIndex + 1);
    }
  };

  const passBtn = () => {
    if (passCounter >= 3) {
      window.alert("Pas hakkınız doldu");
    } else {
      setQuestionIndex(questionIndex + 1);
      setPassCounter(passCounter + 1);
    }
  };

  const failBtn = () => {
    if (score1 < questions[0].length && score2 < questions[0].length) {
      teamName === team1Name ? setScore1(score1 - 1) : setScore2(score2 - 1);
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleButtonClick = () => {
    setBlur(false);
    setTime(60);
    if (teamName === team1Name) {
      setTeamName(`${team2Name}`);
      setPassCounter(0);
    } else {
      setTeamName(`${team1Name}`);
    }
  };
  return (
    <>
      <Nav />
      {blur ? <BlurBackground onClick={handleButtonClick} /> : ""}
      <div>{showQuestion(quiz.askQuestion())}</div>
    </>
  );
};

export default Trial;
