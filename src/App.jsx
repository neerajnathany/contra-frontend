import React, { Component } from 'react';
import Dashboard from './views/Dashboard';

class App extends Component {
    state = {location:window.location.pathname}

    componentDidMount(){
        const onLocationChange = () => {
            this.setState({location: window.location.pathname});
        };
        window.addEventListener('popstate', onLocationChange);
        return () => {
            window.removeEventListener('popstate', onLocationChange);
        };
    }

    showView = () => {
        return (
            <Dashboard />
        )
    }


    render() { 
        return ( 
            <div>{this.showView()}</div>
         )
    }
}
 
export default App;
