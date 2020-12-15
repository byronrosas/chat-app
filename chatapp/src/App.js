import logo from './logo.svg';
import './App.css';
import { Switch, BrowserRouter as Router, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { ChatPage } from './pages/chat.page';
import { AccountPage } from './pages/account.page';
function App() {
  return (
    <Router>
          <div>              
            <Switch>              
              <Route path="/public">
                <div>Hello chat app</div>
              </Route>
              <Route path="/login">
                <AccountPage />
              </Route>
              <PrivateRoute path="/">
                <ChatPage/>
              </PrivateRoute>
            </Switch>
          </div>
    </Router>
  );
}

function PrivateRoute({children={}, ...rest}) {
  
  return (

              
          <Route
          {...rest}
          render={({ location }) =>
            isLogin() ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
          }
        />
  );
}

function isLogin(){
  return localStorage.getItem("login")!=undefined && localStorage.getItem("login")!=null;
}

export default App;
