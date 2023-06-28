import React, { Component } from 'react';
import { Routes } from './src/routes';

export class App extends Component {
    render() {
        return <Routes {...this.props} />;
    }
}

export default App;
