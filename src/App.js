import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FormData from "./components/FormData";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
const Table = lazy(() => import("./components/Table"))
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/form" element={<FormData />} />
        <Route path="/table"
          element={
            <Suspense fallback={<Spinner />}>
              <Table />
            </Suspense>
          } />
      </Routes>
    </Router>
  );
}

export default App;
