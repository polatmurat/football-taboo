import { useState } from "react";
import Nav from "../../components/home/Nav";
import { FaRegCirclePlay } from "react-icons/fa6";
import TabooCart from "../../components/dashboard/TabooCart";

const Taboo = () => {
  const team1Name = localStorage.getItem("team1Name");
  const team2Name = localStorage.getItem("team2Name");

  const [start, setStart] = useState(false);

  return (
    <>
      <Nav />

      {!start ? (
        <>
          <div className="w-full flex justify-center max-sm:flex-col max-sm:items-center mt-36">
            <div className="color1 w-60  h-20 text-center flex flex-col justify-center rounded-lg rounded-r-none">
              <span className="font-medium mr-10 text-lg text-gray-200">
                {team1Name}
              </span>
            </div>
            <div className="color2 w-60 h-20 text-center flex flex-col justify-center rounded-lg rounded-l-none">
              <span className="font-medium text-lg text-gray-200">
                {team2Name}
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div
              onClick={() => setStart(!start)}
              className="mt-5 flex items-center justify-center text-gray-300 rounded-md py-4 bg-slate-800 px-9 border-y-2 cursor-pointer hover:border-2 hover:transition-all ease-in-out hover:duration-500 transition-all duration-75 w-[50%]"
            >
              <span className="font-medium text-4xl mr-2 mb-2">Start</span>
              <FaRegCirclePlay size={40} />
            </div>
          </div>
        </>
      ) : (
        <TabooCart />
      )}
    </>
  );
};

export default Taboo;
