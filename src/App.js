import React from 'react';
import Homepage from './Pages/homepage/homepage';
import { Switch, Route, Redirect } from 'react-router-dom';
import Compose from './Pages/compose/Compose';
import ScheduleMail from './Pages/scheduled-mail/scheduled-mail';
import ShowMailList from './Pages/history-mail/history-mail';
import SignInAndSignUpPage from './Pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    // const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Homepage currentUser={this.state.currentUser} />}
          />
          <Route
            exact
            path="/signin"
            render={() =>
              this.state.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route exact path="/scedulemail" component={ScheduleMail} />
          <Route exact path="/mail" component={ShowMailList} />
          <Route exact path="/c" component={Compose} />
        </Switch>
      </div>
    );
  }
}

export default App;
