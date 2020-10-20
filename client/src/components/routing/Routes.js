import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Posts from "../posts/Posts";
import PrivateRoute from "./PrivateRoute";
import Profile from "../profile/Profile";
import Profiles from "../profiles/Profiles";

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/timeline' component={Posts} />
        <PrivateRoute exact path='/profile/:userId' component={Profile} />
        <PrivateRoute exact path='/profiles' component={Profiles} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
