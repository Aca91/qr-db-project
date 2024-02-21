import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/qrcode">GENERATE QR</Link>
      <p>HOME PAGE</p>
    </div>
  );
};

export default Home;
