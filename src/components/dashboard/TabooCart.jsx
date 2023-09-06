import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import Nav from "../home/Nav";
import "./Blur.css";
import { useNavigate } from "react-router-dom";
import BlurFinish from "./BlurFinish";
import toast, { Toaster } from "react-hot-toast";
import { GiSandsOfTime } from "react-icons/gi";

const TabooCart = () => {
  const [data, setData] = useState([]);
  const [time, setTime] = useState(60);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [passCounter, setPassCounter] = useState(0);
  const team1Name = localStorage.getItem("team1Name");
  const team2Name = localStorage.getItem("team2Name");
  const [teamName, setTeamName] = useState(team1Name);
  const [blur, setBlur] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchURI = "https://footballtaboo.netlify.app/assets/data.json";

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
    return this.questions[0][this.qIndex];
  };

  const quiz = new Quiz(questions);

  if (data.length === 0) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const showQuestion = (inputtedQuestion) => {
    let questionText = inputtedQuestion.content;
    let tabooWords = inputtedQuestion.qTaboo;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col md:flex-row max-sm:mt-15">
          <div className="p-4 rounded-lg shadow-md bg-white mb-4 md:mb-8 w-full md:w-72 text-center mt-4 md:mt-24 md:mr-14">
            <h1 className="text-2xl font-bold">{teamName}</h1>
            <p className="mt-2 text-gray-600 font-medium">
              Pas hakkınız : {3 - passCounter} Score :{" "}
              {teamName === team1Name ? score1 : score2}
            </p>
          </div>
          <div className="p-4 rounded-lg shadow-md bg-white mb-4 md:mb-8 w-full md:w-72 text-center mt-4 md:mt-24">
            <h1 className="text-2xl font-bold flex justify-center my-2">
              Time <GiSandsOfTime className="mt-1 ml-1" />
            </h1>
            <span className="mt-2 text-gray-900 text-lg"> {time}</span>
          </div>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-white mb-4 w-full md:w-[40%] text-center">
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

          <div className="mt-3 flex justify-end">
            <div className="text-white px-2 py-1 rounded-md bg-stone-700">
              {quiz.qIndex + 1} / {questions[0].length}
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={correctBtn}
            className="px-4 py-2 w-full md:w-24 bg-green-500 text-white rounded"
          >
            Correct
          </button>
          <button
            onClick={passBtn}
            className="px-4 py-2 w-full md:w-24 bg-yellow-500 text-white rounded"
          >
            Pas
          </button>
          <button
            onClick={failBtn}
            className="px-4 py-2 w-full md:w-24 bg-red-500 text-white rounded"
          >
            Taboo!
          </button>
        </div>
        <div className="flex space-x-12 mt-8 mb-3 text-center">
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
    if (
      score1 < questions[0].length ||
      score2 < questions[0].length ||
      questionIndex != questions[0].length
    ) {
      teamName === team1Name ? setScore1(score1 + 1) : setScore2(score2 + 1);
      if (questionIndex + 1 >= questions[0].length) {
        setQuestionIndex(questions[0].length);
      }
      setQuestionIndex(questionIndex + 1);
    }
  };

  const passBtn = () => {
    if (passCounter >= 3) {
      toast("Pas hakkınız doldu!");
    } else {
      setQuestionIndex(questionIndex + 1);
      setPassCounter(passCounter + 1);
    }
  };

  const failBtn = () => {
    if (
      score1 < questions[0].length ||
      score2 < questions[0].length ||
      questionIndex + 1 != questions[0].length
    ) {
      teamName === team1Name ? setScore1(score1 - 1) : setScore2(score2 - 1);
      setQuestionIndex(questionIndex + 1);
    }
  };

  const changeTeamButton = () => {
    setBlur(false);
    setTime(10);
    setQuestionIndex(0);
    if (teamName === team1Name) {
      setTeamName(team2Name);
      setPassCounter(0);
    } else {
      setTeamName(team1Name);
    }
  };

  const replayTabooButton = () => {
    setBlur(false);
    setQuestionIndex(0);
    setTime(60);
    setTeamName(team1Name);
    setPassCounter(0);
    setScore1(0);
    setScore2(0);
  };

  const finishTabooButton = () => {
    setBlur(false);
    setTime(60);
    setQuestionIndex(0);
    setTeamName(team1Name);
    navigate("/");
  };

  return (
    <>
      <Nav />
      {/* {!(questionIndex + 1 > questions[0].length) || blur ? (
        showQuestion(quiz.askQuestion())
      ) : (
        <BlurFinish
          team1Name={team1Name}
          team2Name={team2Name}
          score1={score1}
          score2={score2}
          changeTeam={changeTeamButton}
          finish={finishTabooButton}
          replay={replayTabooButton}
        />
      )} */}

      {!(questionIndex + 1 > questions[0].length) || blur ? (
        showQuestion(quiz.askQuestion())
      ) : (
        <BlurFinish
          team1Name={team1Name}
          team2Name={team2Name}
          score1={score1}
          score2={score2}
          changeTeam={changeTeamButton}
          finish={finishTabooButton}
          replay={replayTabooButton}
        />
      )}

      <Toaster />
    </>
  );
};

export default TabooCart;
