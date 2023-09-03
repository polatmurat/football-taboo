import { useState } from "react";

const Card = () => {
  const team1Name = localStorage.getItem("team1Name");
  const team2Name = localStorage.getItem("team2Name");

  const [score, setScore] = useState(0);

  const [teamName, setTeamName] = useState(`${team1Name}`);

  const [currentWord, setCurrentWord] = useState("Arda Turan"); // Örnek aranan kelime

  const decreaseScore = () => {
    setScore(score - 1);
  };

  const increaseScore = () => {
    setScore(score + 1);
  };

  const [tabooWords, setTabooWords] = useState([
    "Galatasaray",
    "İmparator",
    "Fiorentina",
    "Kebapçı Selo",
    "Helikopter",
  ]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex">
        <div className="p-4 rounded-lg shadow-md bg-white mb-8 w-72 text-center mt-14 mr-14">
          <h1 className="text-2xl font-bold">{teamName}</h1>
          <p className="mt-2 text-gray-600">Pas: 3 Score: 7</p>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-white mb-8 w-72 text-center mt-14">
          <h1 className="text-2xl font-bold">Remaining</h1>
          <span className="mt-2 text-gray-600"> 55 sec.</span>
        </div>
      </div>
      <div className="p-4 rounded-lg shadow-md bg-white mb-8 w-[40%] text-center">
        <h2 className="text-xl font-bold">{currentWord}</h2>
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
      </div>
      <div className="flex space-x-4">
        <button className="px-4 py-2 w-24 bg-green-500 text-white rounded">
          Doğru
        </button>
        <button className="px-4 py-2 w-24 bg-yellow-500 text-white rounded">
          Pas
        </button>
        <button className="px-4 py-2 w-24 bg-red-500 text-white rounded">
          Tabu!
        </button>
      </div>
      <div className="flex space-x-16 mt-8 text-center">
        <div className="team-score">
          <p>{team1Name}</p>
          <p className="text-xl font-bold">Total Score: 0</p>
        </div>
        <div className="team-score">
          <p>{team2Name}</p>
          <p className="text-xl font-bold">Total Score: 0</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
