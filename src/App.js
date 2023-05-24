//Packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./Global";

//Auth Components
import AuthPage from "./pages/Auth/AuthPage";
import Login from "./pages/Auth/Login";

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
import JobDetails from "./pages/Manager/Jobs/helpers/JobDetails";
import CandidateProfile from "./pages/Manager/Jobs/Candidate/CandidateProfile";
import ScheduleInterview from "./pages/Manager/Jobs/Candidate/ScheduleInterview";

//Report Components
import Overview from "./pages/Manager/Reports/helpers/Overview";
import CandidateReport from "./pages/Manager/Reports/helpers/CandidateReport";
import JobsReport from "./pages/Manager/Reports/helpers/JobsReport";
import TeamReport from "./pages/Manager/Reports/helpers/TeamReport";

//Candidate Components
import CandidateDashboard from "./pages/Candidate/Dashboard/Candidatedashboard";
import CandidateJobDetails from "./pages/Candidate/Jobs/JobDetail";
import CandidatePage from "./pages/Candidate/CandidatePage";
import ManagerSignup from "./pages/Auth/Manager/ManagerSignup";
import CandidateSignup from "./pages/Auth/Candidate/CandidateSignup";

//Authentication
import RequireAuth from "./pages/Auth/RequireAuth";
import PersistLogin from "./pages/Auth/PersistLogin";
import OceanQuestionsForm from "./pages/Auth/helpers/OceanQuestionsForm";
import CandidateInterview from "./pages/Candidate/Interview/CandidateInterview";
import InterviewScreen from "./pages/Candidate/Interview/InterviewScreen";
import JobApplicationScreen from "./pages/Candidate/Interview/JobApplicationScreen";
const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

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
            <Route element={<PersistLogin />}>
              <Route path="/" element={<Login />} />
              <Route path="/auth" element={<AuthPage />}>
                <Route path="/auth/login" element={<Login />} />
                <Route
                  path="/auth/signup/manager"
                  element={<ManagerSignup />}
                />
                <Route
                  path="/auth/signup/ocean"
                  element={<OceanQuestionsForm />}
                />
                <Route
                  path="/auth/signup/candidate"
                  element={<CandidateSignup />}
                />
              </Route>

              {/* Manager Routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/manager" element={<ManagerPage />}>
                  <Route path="/manager/dashboard" element={<Dashboard />} />
                  <Route path="/manager/interviews" element={<Interviews />} />
                  <Route path="/manager/jobs" element={<Jobs />}></Route>
                  <Route
                    path="/manager/jobs/:jobId"
                    element={<JobDetails />}
                  ></Route>
                  <Route
                    path="/manager/jobs/:jobId/candidate/:candidateId"
                    element={<CandidateProfile />}
                  ></Route>
                  <Route
                    path="/manager/jobs/:jobId/candidate/:candidateId/interview"
                    element={<ScheduleInterview />}
                  ></Route>
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
                  <Route path="/manager/reports" element={<Reports />}>
                    <Route
                      path="/manager/reports/overview"
                      element={<Overview />}
                    ></Route>
                    <Route
                      path="/manager/reports/jobs"
                      element={<JobsReport />}
                    ></Route>
                    <Route
                      path="/manager/reports/candidates"
                      element={<CandidateReport />}
                    ></Route>
                    <Route
                      path="/manager/reports/team"
                      element={<TeamReport />}
                    ></Route>
                  </Route>
                </Route>
              </Route>

              {/* Candidate Routes */}

              <Route path="/candidate" element={<CandidatePage />}>
                <Route
                  path="/candidate/:candidateId"
                  element={<CandidateDashboard></CandidateDashboard>}
                ></Route>
                <Route
                  path="/candidate/interview"
                  element={<CandidateInterview></CandidateInterview>}
                ></Route>
                <Route
                  path="/candidate/interview/:jobId"
                  element={<JobApplicationScreen />}
                ></Route>
                <Route
                  path="/candidate/jobs/:jobId"
                  element={<CandidateJobDetails />}
                ></Route>
                <Route
                  path="/candidate/jobs/:jobId/apply"
                  element={<CandidateJobDetails />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
