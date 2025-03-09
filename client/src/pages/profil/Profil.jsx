import "./profil.scss";
import { useSelector } from "react-redux";
import Account from "../../components/account/Account";

const Profil = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="profile">
      <header className="profile_title">
        <h1>
          Welcome back <br />
          {user.firstName} {user.lastName}!
        </h1>
      </header>
      <section>
        <Account />
      </section>
    </div>
  );
};

export default Profil;
