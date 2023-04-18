import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

const backendHotels = [
  {
    id: 1,
    name: "Pod akacjami",
    city: "Warszawa",
    rating: 8.3,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum, risus vitae venenatis pulvinar, neque velit laoreet quam, a blandit enim dolor ac ligula.",
    image: "",
  },
  {
    id: 2,
    name: "Dębowy",
    city: "Lublin",
    rating: 8.8,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum, risus vitae venenatis pulvinar, neque velit laoreet quam, a blandit enim dolor ac ligula.",
    image: "",
  },
];

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchHandler = (term) => {
    const newHotels = [...backendHotels].filter((x) =>
      x.name.toLowerCase().includes(term.toLowerCase())
    );
    dispatch({ type: "set-hotels", hotels: newHotels });
  };

  const header = (
    <Header>
      <InspiringQuote />
      <Searchbar onSearch={(term) => searchHandler(term)} />
      <ThemeButton />
    </Header>
  );

  const menu = <Menu />;

  const content = (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/hotel/:id" element={<h1>To jest jakiś hotel!</h1>} />
    </Routes>
  );

  const footer = <Footer />;

  return (
    <Router>
      <AuthContext.Provider
        value={{
          isAuthenticated: state.isAuthenticated,
          login: () => dispatch({ type: "login" }),
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
          <ReducerContext.Provider value={{
            state: state,
            dispatch: dispatch
          }}>
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
