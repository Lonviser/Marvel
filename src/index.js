import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import "./style/style.scss";
import MarvelService from "./services/MarvelService";
 
const marvelService = new MarvelService();



// marvelService.getCharacter(32).then(res=>{console.log(res)});


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
