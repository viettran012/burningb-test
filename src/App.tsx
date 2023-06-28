import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./pages/Product";
import MainLayout from "./layouts/main";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App flex items-center flex-col text-slate-800">
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Page></Page>
              </MainLayout>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
