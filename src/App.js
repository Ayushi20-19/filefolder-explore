import "./App.css";
import { initialData } from "./data";
import { FileExplorer } from "./components/FileExplorer";
import { useState } from "react";
function App() {
  const [data, setData] = useState(initialData);
  const deleteItem = (data, id) => {
    if (data.id === id) {
      return null;
    }
    if (data.children) {
      data.children = data.children
        .map((child) => deleteItem(child, id))
        .filter((child) => child !== null);
      if (data.children.length === 0) {
        delete data.children;
      }
    }

    return data;
  };
  const handleDelete = (id) => {
    const deleteItem = (data) => {
      if (data.id === id) {
        return null;
      }
      if (data.children) {
        data.children = data.children
          .map((child) => deleteItem(child))
          .filter((child) => child !== null);
      }
      return data;
    };
    const updatedData = data
      .map((item) => deleteItem(item))
      .filter((item) => item !== null);
    setData(updatedData);
  };
  return (
    <div className="App">
      {data?.map((data) => (
        <FileExplorer key={data.id} data={data} onDelete={handleDelete} />
      ))}
      <footer className="footer">
        <p>&copy; 2024 File Explorer. @Ayushi20-19</p>
      </footer>
    </div>
  );
}

export default App;
