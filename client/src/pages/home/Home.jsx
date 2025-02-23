import Banner from "../../components/banner/Banner";
import Features from "../../components/features/Features"
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <Features />
    </div>
  );
};

export default Home;
