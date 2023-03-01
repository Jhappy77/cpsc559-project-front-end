import "@fontsource/comfortaa/700.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import StartPage from "./pages/StartPage";
import JoinPage from "./pages/JoinPage";
import QuestionPage from "./pages/QuestionPage";
import LeaderboardPage from "./pages/LeaderboardPage";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
    </Routes>
  </ChakraProvider>
);
