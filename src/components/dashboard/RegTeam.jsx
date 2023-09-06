import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../home/Nav";

const RegTeam = () => {
  const navigate = useNavigate();

  const team1ext = localStorage.getItem("team1Name");
  const team2ext = localStorage.getItem("team2Name");

  console.log("Team 1", team1ext);
  console.log("Team 2", team2ext);

  const [formData, setFormData] = useState({
    team1: team1ext || "",
    team2: team2ext || "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { team1, team2 } = formData;

    if (!(team1 && team2)) {
      window.alert("The both team name field required");
    } else {
      localStorage.setItem("team1Name", team1);
      localStorage.setItem("team2Name", team2);

      navigate("/taboo");
    }
  };

  return (
    <>
      <Nav />
      <div className="p-20 w-full flex justify-center mt-20">
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12"
        >
          <input
            onChange={onChange}
            className="form-input"
            type="text"
            name="team1"
            id="team1"
            placeholder="Team 1"
            value={formData.team1}
          />
          <input
            onChange={onChange}
            className="form-input"
            type="text"
            name="team2"
            id="team2"
            placeholder="Team 2"
            value={formData.team2}
          />
          <button className="btn-indigo color1 w-full py-2">Start Taboo</button>
        </form>
      </div>
    </>
  );
};

export default RegTeam;
