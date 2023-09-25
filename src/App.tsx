import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

import IUser from './types/user.type';

import Cliente from './components/cliente/cliente'

type Props = {};

type State = {
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: IUser | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Sign Up
                </Link>
              </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Cliente />} />            
          </Routes>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;