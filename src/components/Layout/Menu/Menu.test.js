import { render, screen } from "@testing-library/react";
import Menu from "./Menu";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../../../context/authContext";

describe("Menu component", () => {
  test("renders Zaloguj if user is null", () => {
    render(
      <Router>
        <Menu />
      </Router>
    );
    const linkElement = screen.getByText(/Zaloguj/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders Wyloguj if user exist", () => {
    render(
      <AuthContext.Provider
        value={{
          user: true,
          login: () => {},
          logout: () => {},
        }}
      >
        <Router>
          <Menu />
        </Router>
      </AuthContext.Provider>
    );
    const linkElement = screen.getByText(/Wyloguj/i);
    expect(linkElement).toBeInTheDocument();
  });
});
