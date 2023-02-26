import '@fontsource/comfortaa/700.css'
import '@fontsource/open-sans/700.css'

import * as React from "react"
import { Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from "@chakra-ui/react";
import theme from './theme';
import StartPage from "./pages/StartPage";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
        <Route path="/" element={<StartPage />}/>
    </Routes>
  </ChakraProvider>
)
