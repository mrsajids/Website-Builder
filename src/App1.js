import logo from "./logo.svg";
import "./App.css";
import MyComponent from "./MyComponent";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MyComponent2 from "./MyComponent2";

function App() {
  function EditorParent({ children }) {
    return <div style={{height:"100vh",width:"100%"}}>{children}</div>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Link to="component1">Component 1</Link> &nbsp;
              <Link to="component2">Component 2</Link>
            </>
          }
        />
        <Route path="component1" element={<EditorParent><MyComponent /></EditorParent>} />
        <Route path="component2" element={<EditorParent><MyComponent2 /></EditorParent>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
