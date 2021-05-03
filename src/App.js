import './App.css';
import LoginForm from '../src/components/login/Loginfrm';
import Forsignup from '../src/components/signup/Forsignup';
import { AuthProvider } from './context/AuthProvider';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Fordashboard from './components/dashboard/Fordashboard';
import PrivateRoute from './components/private/PrivateRoute';
import PublicRoute from './components/public/PublicRoute';
import Forforgotpassword from './components/forgotpassword/Forforgotpassword';
import Fortopbar from './components/topbar/Fortopbar';
import Forpagenotfound from './components/pagenotfound/Forpagenotfound';

function App() {
  return (
    
    <Router>
    
      <AuthProvider>
        
        <div className="App">
          <Fortopbar/>
          <Switch>
            <PrivateRoute exact path = "/" component={Fordashboard} />
            <PublicRoute exact path = "/login" component={LoginForm} />
            <PublicRoute exact path = "/signup" component={Forsignup} />
            <PublicRoute exact path = "/forgot_password" component={Forforgotpassword} />
            <PublicRoute component = {Forpagenotfound} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
    
  );
}

export default App;
