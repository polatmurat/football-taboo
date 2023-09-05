const Result = ({start, setStart}) => {
  const team1Name = localStorage.getItem("team1Name");
  const team2Name = localStorage.getItem("team2Name");

  return (
    <>
    
      <div className="w-full flex justify-center mt-36">
        <div className="bg-rose-400 w-60  h-20 text-center flex flex-col justify-center rounded-lg rounded-r-none">
          <span className="font-medium mr-10 text-lg text-gray-900">
            {team1Name}
          </span>
        </div>
        <div className="bg-green-300 w-60 text-center flex flex-col justify-center rounded-lg rounded-l-none">
          <span className="font-medium text-lg text-gray-900">{team2Name}</span>
        </div>
      </div>
      <div className="flex justify-center">
        <div
          onClick={() => setStart(!start)}
          className="mt-5 flex items-center justify-center rounded-md py-4 bg-indigo-400 px-9 border-y-2 cursor-pointer hover:border-2 hover:transition-all ease-in-out hover:duration-500 transition-all duration-75 w-[50%]"
        >
          <span className="font-medium text-4xl mr-2 mb-2">Start</span>
          <FaRegCirclePlay size={40} />
        </div>
      </div>
    </>
  );
};

export default Result;
