import React, { useCallback, useEffect, useReducer } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Hotels from "./components/Hotels/Hotels";
import LoadingIcon from "./components/UI/LoadingIcon/LoadingIcon";
import Searchbar from "./components/UI/Searchbar/Searchbar";
import Layout from "./components/Layout/Layout";
import ThemeButton from "./components/UI/ThemeButton/ThemeButton";
import ThemeContext from "./context/themeContext";
import AuthContext from "./context/authContext";
import BestHotel from "./components/Hotels/BestHotel/BestHotel";

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

const reducer = (state, action) => {
  switch (action.type) {
    case "change-theme":
      const theme = state.theme === "danger" ? "warning" : "danger";
      return { ...state, theme };
    case "set-hotels":
      return {
        ...state,
        hotels: action.hotels,
      };
    case "set-loading":
      return {
        ...state,
        loading: action.loading,
      };
    case "login":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      throw new Error("Nie ma takiej akcji: " + action.type);
  }
};

const initialState = {
  hotels: [],
  loading: true,
  isAuthenticated: false,
  theme: "danger",
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "set-hotels", hotels: backendHotels });
      dispatch({ type: "set-loading", loading: false });
    }, 1000);
  }, []);

  const searchHandler = (term) => {
    const newHotels = [...backendHotels].filter((x) =>
      x.name.toLowerCase().includes(term.toLowerCase())
    );
    dispatch({ type: "set-hotels", hotels: newHotels });
  };

  const getBestHotel = useCallback((options) => {
    if (state.hotels.length <= options.minHotels) {
      return null;
    } else {
      return state.hotels.sort((a, b) => (a.rating > b.rating ? -1 : 1))[0];
    }
  }, [state.hotels]);

  const header = (
    <Header>
      <Searchbar onSearch={(term) => searchHandler(term)} />
      <ThemeButton />
    </Header>
  );

  const menu = <Menu />;

  const content = state.loading ? (
    <LoadingIcon />
  ) : (
    <>
      <BestHotel getHotel={getBestHotel} />
      <Hotels hotels={state.hotels} />
    </>
  );

  const footer = <Footer />;

  return (
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
        <Layout header={header} menu={menu} content={content} footer={footer} />
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
