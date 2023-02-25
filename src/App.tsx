import '@fontsource/comfortaa/700.css'
import '@fontsource/open-sans/700.css'

import * as React from "react"
import { Routes, Route } from 'react-router-dom';
import {
  ChakraProvider
} from "@chakra-ui/react";
import theme from './theme';
import StartPage from "./pages/StartPage";
import QuestionPage from './pages/QuestionPage';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/question" element={<QuestionPage />} />
    </Routes>
  </ChakraProvider>
)
