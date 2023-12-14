import React, { Component } from 'react'
import './styles.css';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <h4 className="text-center" style={{color: "white"}}>Task Management App</h4>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent