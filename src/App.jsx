import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { GameProvider } from "./context/GameContext";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Concept from "./pages/Concept";
import Games from "./pages/Games";
import Progress from "./pages/Progress";
import Badges from "./pages/Badges";
import TeacherDashboard from "./pages/TeacherDashboard";
import RobotMaze from "./games/RobotMaze";
import SequenceGame from "./games/SequenceGame";
import IfElseGame from "./games/IfElseGame";
import LoopGame from "./games/LoopGame";
import DebugGame from "./games/DebugGame";

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:conceptId" element={<Concept />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/robot-maze" element={<RobotMaze />} />
          <Route path="/games/sequence" element={<SequenceGame />} />
          <Route path="/games/if-else" element={<IfElseGame />} />
          <Route path="/games/loops" element={<LoopGame />} />
          <Route path="/games/debugging" element={<DebugGame />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
