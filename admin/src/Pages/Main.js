import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'

function Math() {
    return (
        <div>
            <Router>
                <Route path="/login/" exact component={Login}></Route>
            </Router>
        </div>
    )
}
export default Math
