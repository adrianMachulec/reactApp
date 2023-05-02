import React, { useReducer, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Searchbar from "./components/UI/Searchbar/Searchbar";
import Layout from "./components/Layout/Layout";
import ThemeButton from "./components/UI/ThemeButton/ThemeButton";
import ThemeContext from "./context/themeContext";
import AuthContext from "./context/authContext";
import ReducerContext from "./context/reducerContext";
import InspiringQuote from "./components/InspiringQuote/InspiringQuote";
import { initialState, reducer } from "./reducer";
import Home from "./pages/Home/Home";
import Hotel from "./pages/Hotel/Hotel";
import Search from "./pages/Search/Search";
import ProfileDetails from "./pages/Profile/ProfileDetails/ProfileDetails";
import MyHotels from "./pages/Profile/MyHotels/MyHotels";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Auth/Login/Login";
import ErrorBoundary from "./hoc/ErrorBoundary";
import AddHotel from "./pages/Profile/MyHotels/AddHotel/AddHotel";
import EditHotel from "./pages/Profile/MyHotels/EditHotel/EditHotel";
import Register from "./pages/Auth/Register/Register";

const Profile = lazy(() => import("./pages/Profile/Profile"));

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const header = (
    <Header>
      <InspiringQuote />
      <Searchbar />
      <ThemeButton />
    </Header>
  );

  const menu = <Menu />;

  const content = (
    <ErrorBoundary>
      <Suspense fallback={<p>...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotele/:id" element={<Hotel />} />
          <Route path="/wyszukaj/:term?" element={<Search />} />
          <Route
            path="profil/hotele/dodaj"
            element={
              state.user ? <AddHotel /> : <Navigate to="/zaloguj" />
            }
          />
          <Route
            path="profil/hotele/edytuj/:id"
            element={
              state.user ? <EditHotel /> : <Navigate to="/zaloguj" />
            }
          />

          <Route
            path="profil"
            element={
              state.user ? <Profile /> : <Navigate to="/zaloguj" />
            }
          >
            <Route path="" element={<ProfileDetails />} />
            <Route path="hotele" element={<MyHotels />} />
          </Route>
          <Route path="/zaloguj" element={<Login />} />
          <Route path="/rejestracja" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );

  const footer = <Footer />;

  return (
    <Router>
      <AuthContext.Provider
        value={{
          user: state.user,
          login: (user) => dispatch({ type: "login", user }),
          logout: () => dispatch({ type: "logout" }),
        }}
      >
        <ThemeContext.Provider
          value={{
            color: state.theme,
            changeTheme: () =>
              dispatch({
                type: "change-theme",
              }),
          }}
        >
          <ReducerContext.Provider
            value={{
              state: state,
              dispatch: dispatch,
            }}
          >
            <Layout
              header={header}
              menu={menu}
              content={content}
              footer={footer}
            />
          </ReducerContext.Provider>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
