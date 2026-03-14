import { Route, Routes, HashRouter, Link } from "react-router";
import React from "react";
import { Dash } from "../pages/Dash";

// eslint-disable-next-line import/no-unresolved


export function MainRouter() {
  return (
    <HashRouter>
      <div style={{ gap: 10, display: "flex" }}>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Registrar</Link>
        <Link to={"/dashboard"}>Dashboard</Link>
      </div>
      <Routes>
        <Route element={ <Dash/>} path="/" index={true}/>
      </Routes>
    </HashRouter>
  );
}