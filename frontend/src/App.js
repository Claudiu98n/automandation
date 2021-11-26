// utils
import {Switch, Route} from 'react-router-dom';
import React, {Suspense, lazy} from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

// styling
import './App.scss';

// components
import GoToTop from './components/goToTop/GoToTop';

// pages
const SignIn = lazy (() => import ('./pages/signIn/SignIn'));
const SignUp = lazy (() => import ('./pages/signUp/SignUp'));

const App = () => {
  return (
    <main className="app">
      <Suspense
        fallback={
          <div className="loader">
            <CircleLoader size={120} color={'#7B1FA2'} />
          </div>
        }
      >
        <GoToTop />
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/sign-up" exact component={SignUp} />
          {/* <Route path="*" exact component={Page404} /> */}
        </Switch>
      </Suspense>
    </main>
  );
};

export default App;
