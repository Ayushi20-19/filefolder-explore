import "./App.css";
import { data } from "./data";
import { FileExplorer } from "./components/FileExplorer";
function App() {
  return (
    <div className="App">
      {data.map((data) => (
        <FileExplorer data={data} />
      ))}
    </div>
  );
}

export default App;
