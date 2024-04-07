import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css/animate.min.css';
import LoginAndSignup from './Auth/LoginAndSignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import FileUpload from './Dashboard/FileUpload';
function App() {
  
  return (
    <>
    <Router>
      <div className="App">
        <Routes>
          <Route index element={<LoginAndSignup/>} />
          <Route path="/dashboard" element={ <Dashboard />} />
          <Route path="/upload" element={ <FileUpload />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
