import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const team1Name = localStorage.getItem("team1Name");
  const team2Name = localStorage.getItem("team2Name");
  console.log(team1Name, team2Name);
  return team1Name && team2Name ? children : <Navigate to="/" />;
};

export default Private;
