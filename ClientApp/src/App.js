import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Users } from './components/Users';
import { TopColours } from './components/TopColours';
import { Ages } from './components/Age';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/TopColours' component={TopColours} />
            <Route path='/Users' component={Users} />
            <Route path='/Age' component={Ages} />
      </Layout>
    );
  }
}
