import { BsSkipEndCircle } from "react-icons/bs";
import { FaReplyAll } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import "./Blur.css";

const BlurFinish = ({
  finish,
  replay,
  changeTeam,
  team1Name,
  team2Name,
  score1,
  score2,
}) => {
  return (
    <div className="blur-background">
      <div className="blur-content">
        <div className="w-full flex justify-center mt-36">
          <div className="bg-red-900 w-60 h-20 text-center flex flex-col justify-center rounded-lg rounded-r-none">
            <span className="font-medium mr-10 text-lg text-gray-200">
              {team1Name}
            </span>
            <span className="font-medium mr-10 text-lg text-gray-200">
              Score : {score1}
            </span>
          </div>
          <div className="bg-sky-950 w-60 text-center flex flex-col justify-center rounded-lg rounded-l-none">
            <span className="font-medium text-lg text-gray-200">
              {team2Name}
            </span>
            <span className="font-medium text-lg text-gray-200">
              Score : {score2}
            </span>
          </div>
        </div>

        <div className="button-container">
          <div className="flex justify-center">
            <div
              onClick={changeTeam}
              className="mt-5 flex items-center justify-center rounded-md py-4 bg-green-400 px-9 border-y-2 cursor-pointer hover:border-2 hover:transition-all ease-in-out hover:duration-500 transition-all duration-75 w-full"
            >
              <span className="font-medium text-lg mr-2 mb-2">
                Continue and Change the Team
              </span>
              <BsSkipEndCircle className="mb-2" size={30} />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div
            onClick={replay}
            className="mt-5 flex items-center justify-center rounded-md py-4 bg-indigo-400 px-9 border-y-2 cursor-pointer hover:border-2 hover:transition-all ease-in-out hover:duration-500 transition-all duration-75 w-[50%]"
          >
            <span className="font-medium text-xl mr-2 mb-2">Replay</span>
            <FaReplyAll size={30} />
          </div>
        </div>
        <div className="button-container">
          <div className="flex justify-center">
            <div
              onClick={finish}
              className="mt-5 flex items-center justify-center rounded-md py-4 bg-red-500 px-9 border-y-2 cursor-pointer hover:border-2 hover:transition-all ease-in-out hover:duration-500 transition-all duration-75 w-[50%]"
            >
              <span className="font-medium text-xl mr-2 mb-2">Finish</span>
              <FaRegCircleXmark size={30} className="-mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlurFinish;
