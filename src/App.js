//Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./Global";

//Auth Components
import AuthPage from "./pages/Auth/AuthPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

//Manager Components
import ManagerPage from "./pages/Manager/ManagerPage";
import Dashboard from "./pages/Manager/Dashboard/Dashboard";
import Jobs from "./pages/Manager/Jobs/Jobs";
import AddJob from "./pages/Manager/Jobs/AddJob";
import Interviews from "./pages/Manager/Interviews/Interviews";
import Reports from "./pages/Manager/Reports/Reports";
import Mailbox from "./pages/Manager/Mailbox/Mailbox";
import JobCreation from "./pages/Manager/Jobs/helpers/JobCreation";
import JobApplication from "./pages/Manager/Jobs/helpers/JobApplication";
import HiringFlow from "./pages/Manager/Jobs/helpers/HiringFlow";

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
          {/* Auth Routes */}
          <Routes>
            <Route path="/auth" element={<AuthPage />}>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<SignUp />} />
            </Route>
          </Routes>
          {/* Manager Routes */}
          <Routes>
            <Route path="/manager" element={<ManagerPage />}>
              <Route path="/manager/dashboard" element={<Dashboard />} />
              <Route path="/manager/interviews" element={<Interviews />} />
              <Route path="/manager/jobs" element={<Jobs />}></Route>
              <Route path="/manager/jobs/add" element={<AddJob />}>
                <Route
                  path="/manager/jobs/add/creation"
                  element={<JobCreation />}
                ></Route>
                <Route
                  path="/manager/jobs/add/application"
                  element={<JobApplication />}
                ></Route>
                <Route
                  path="/manager/jobs/add/hiringflow"
                  element={<HiringFlow />}
                ></Route>
              </Route>
              <Route path="/manager/mailbox" element={<Mailbox />} />
              <Route path="/manager/reports" element={<Reports />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
