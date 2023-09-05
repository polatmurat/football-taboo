const BlurTeam = ({ onClick, type }) => {
  return (
    <div className="blur-background">
      <button className="net-buton" onClick={onClick}>
        Change Team
      </button>
    </div>
  );
};
export default BlurTeam;
