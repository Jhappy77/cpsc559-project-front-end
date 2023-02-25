import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "",
      },
    }),
  },
  fonts: {
    heading: `'Comfortaa', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
});

export default theme;
