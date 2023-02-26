import { ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./App"
import { store } from "./state/store"
import { BrowserRouter } from "react-router-dom"


const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    
    <Provider store={store}>
    <ColorModeScript />
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)


