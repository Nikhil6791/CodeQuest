import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { GameProvider } from "./context/GameContext";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Concept from "./pages/Concept";
import Games from "./pages/Games";
import Progress from "./pages/Progress";
import Badges from "./pages/Badges";
import TeacherDashboard from "./pages/TeacherDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RobotMaze from "./games/RobotMaze";
import SequenceGame from "./games/SequenceGame";
import IfElseGame from "./games/IfElseGame";
import LoopGame from "./games/LoopGame";
import DebugGame from "./games/DebugGame";
import VariablesGame from "./games/VariablesGame";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <GameProvider key={user?.username ?? "guest"}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/learn"
          element={
            <RequireAuth>
              <Learn />
            </RequireAuth>
          }
        />
        <Route
          path="/learn/:conceptId"
          element={
            <RequireAuth>
              <Concept />
            </RequireAuth>
          }
        />
        <Route
          path="/games"
          element={
            <RequireAuth>
              <Games />
            </RequireAuth>
          }
        />
        <Route
          path="/games/robot-maze"
          element={
            <RequireAuth>
              <RobotMaze />
            </RequireAuth>
          }
        />
        <Route
          path="/games/sequence"
          element={
            <RequireAuth>
              <SequenceGame />
            </RequireAuth>
          }
        />
        <Route
          path="/games/if-else"
          element={
            <RequireAuth>
              <IfElseGame />
            </RequireAuth>
          }
        />
        <Route
          path="/games/loops"
          element={
            <RequireAuth>
              <LoopGame />
            </RequireAuth>
          }
        />
        <Route
          path="/games/debugging"
          element={
            <RequireAuth>
              <DebugGame />
            </RequireAuth>
          }
        />
        <Route
          path="/games/variables"
          element={
            <RequireAuth>
              <VariablesGame />
            </RequireAuth>
          }
        />
        <Route
          path="/progress"
          element={
            <RequireAuth>
              <Progress />
            </RequireAuth>
          }
        />
        <Route
          path="/badges"
          element={
            <RequireAuth>
              <Badges />
            </RequireAuth>
          }
        />
        <Route
          path="/teacher"
          element={
            <RequireAuth role="teacher">
              <TeacherDashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </GameProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
