import { BrowserRouter } from "react-router";
import Router from "./routes/Router";
import { AuthContextProvider } from "./context/AuthContextProvider";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
