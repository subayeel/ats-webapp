import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./Global";

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
            <Route></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
