import React, { Component } from 'react';

class Link extends Component {

    onClick = (e) => {
        if (e.metaKey || e.ctrlKey){
            return;
        }
        e.preventDefault();
        window.history.pushState({}, '', this.props.href);
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    render() { 
        return ( 
            <a href={this.props.href} className={this.props.className} onClick={this.onClick}>
                {this.props.children}
            </a>
         );
    }
}
 
export default Link;