import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import NotFound from "./pages/notFound/NotFound";
import SignIn from "./pages/login/Login";
// import Profil from "./pages/profil/Profil";


const Layout = ({ children }) => {

  return (
    <>
      <Navbar />
        {children}
      <Footer />
      </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.login);
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),

      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <SignIn /> },
        {
          path: "/profil",
          element: 
          <PrivateRoute>
            {/* <Profil /> */}
          </PrivateRoute>
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    
      <RouterProvider router={router} />
    
  );
}

export default App;
