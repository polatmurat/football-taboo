import { FaRegCirclePlay } from "react-icons/fa6";

const PreStartDash = ({start, setStart}) => {
  return (
    <div className="start-icon w-full flex flex-col justify-center items-center p-20">
      <div className="border-b-2 text-center">
        <p className="text-md">
          Welcome to the Football Taboo App! Get ready to test your knowledge
          and creativity in this exciting word-guessing game. Whether you're a
          die-hard football fan or just looking for some fun, our app challenges
          you to describe football-related words without using certain 'taboo'
          terms. Gather your friends, set the rules, and let the excitement
          begin. Who will score the most points by conveying their football
          expertise without saying the forbidden words? It's time to huddle up
          and kick off the ultimate taboo experience!
        </p>
        <p className="my-5 font-medium">
          Are you up for the challenge? Press the 'Start' button to dive into
          the world of football taboo and prove your skills at conveying the
          unspoken!
        </p>
      </div>
      <div onClick={() => setStart(!start)} className="mt-4 flex items-center justify-center rounded-md py-2 px-9 border-y-2 cursor-pointer hover:border-2 hover:transition-all ease-in-out hover:duration-500 transition-all duration-75">
        <span className="font-medium text-4xl mr-2 mb-2">Start</span>
        <FaRegCirclePlay size={40} />
      </div>
    </div>
  );
};

export default PreStartDash;
