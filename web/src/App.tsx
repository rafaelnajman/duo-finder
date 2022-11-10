import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import "./styles/main.css";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
//grid grid-flow-col auto-cols-[20%]  gap-6 mt-16
