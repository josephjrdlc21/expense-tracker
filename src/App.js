import './App.css';
import Navbar from './components/Navbar';
import Tracker from './components/Tracker';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="overflow-hidden">
        <Routes>
          <Route
            path="/tracker/*"
            element={
              <>
                <header className="bg-white w-full h-auto md:h-[70px] p-2">
                  <Navbar />
                </header>
                <main className="md:max-w-[1280px] p-2 mx-auto mt-5">
                  <Tracker />
                </main>
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Login />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
