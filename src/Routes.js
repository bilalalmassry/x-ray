import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import App from './App';
import Requests from './Requests';
import ResponsiveAppBar from "./components/AppBar";
export default function MyRoutes() {
    return (
        <div className="App">
            <ResponsiveAppBar >
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/Requests/:id" element={<Requests />} />
            </Routes>
            </ResponsiveAppBar>
        </div>
    );
}