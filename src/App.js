import { Component } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Hotels from "./components/Hotels/Hotels";
import LoadingIcon from "./components/UI/LoadingIcon/LoadingIcon";
import Searchbar from "./components/UI/Searchbar/Searchbar";
import Layout from "./components/Layout/Layout";
import ThemeButton from "./components/UI/ThemeButton/ThemeButton";

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
    const newTheme = this.state.theme === 'primary' ? 'danger' : 'primary'
    this.setState({theme: newTheme})
  }

  render() {
    return (
      <Layout
        header={
          <Header onSearch={(term) => this.searchHandler(term)}>
            <Searchbar
              onSearch={(term) => this.searchHandler(term)}
              theme={this.state.theme}
            />
            <ThemeButton onChange={this.changeTheme} />
          </Header>
        }
        menu={<Menu theme={this.state.theme} />}
        content={
          this.state.loading ? (
            <LoadingIcon theme={this.state.theme} />
          ) : (
            <Hotels hotels={this.state.hotels} theme={this.state.theme} />
          )
        }
        footer={<Footer theme={this.state.theme} />}
      />
    );
  }
}

export default App;
