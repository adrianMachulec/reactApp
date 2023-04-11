import React, { Component } from "react";
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

class App extends Component {
  hotels = [
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

  state = {
    hotels: [],
    loading: true,
    theme: "danger",
    isAuthenticated: false
  };

  searchHandler(term) {
    const hotels = [...this.hotels].filter((x) =>
      x.name.toLowerCase().includes(term.toLowerCase())
    );
    this.setState({ hotels });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ hotels: this.hotels, loading: false });
    }, 1000);
  }

  changeTheme = () => {
    const newTheme = this.state.theme === "primary" ? "danger" : "primary";
    this.setState({ theme: newTheme });
  };

  render() {
    const header = (
      <Header onSearch={(term) => this.searchHandler(term)}>
        <Searchbar onSearch={(term) => this.searchHandler(term)} />
        <ThemeButton />
      </Header>
    );

    const menu = <Menu />;

    const content = this.state.loading ? (
      <LoadingIcon />
    ) : (
      <Hotels hotels={this.state.hotels} />
    );

    const footer = <Footer />;

    return (
      <AuthContext.Provider 
        value={{
          isAuthenticated: this.state.isAuthenticated,
          login: () => this.setState({isAuthenticated: true}),
          logout: () => this.setState({isAuthenticated: false})
        }}>
        <ThemeContext.Provider
          value={{
            color: this.state.theme,
            changeTheme: this.changeTheme,
          }}
        >
          <Layout
            header={header}
            menu={menu}
            content={content}
            footer={footer}
          />
        </ThemeContext.Provider>
      </AuthContext.Provider>
    );
  }
}

export default App;
