//Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./Global";

//Components
import AuthPage from "./pages/Auth/AuthPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

function App() {
  const theme = {
    colors: {
      atsBlue: "#2F2E41",
      fillColor: "#eee",
      atsGreen: "#92D050",
      atsLightBlue: "#5D6D7E",
      borderColor: "#6c6c6c",
    },
  };
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthPage />}>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<SignUp />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
