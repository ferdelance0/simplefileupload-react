import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css/animate.min.css';
import LoginAndSignup from './Auth/LoginAndSignUp';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (
    <>
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginAndSignup} />
          <Route path="/dashboard" component={Dashboard} />
          {/* Add more routes for other pages */}
        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;
