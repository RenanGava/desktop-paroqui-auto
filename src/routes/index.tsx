import {
  Route,
  Routes,
  HashRouter,
  Navigate,
  Outlet,
} from "react-router";
import React, { useEffect } from "react";
import { DizimoDash } from "../pages/Dizimo";
import { OfertaDash } from "../pages/Ofertas";
import { ColetaDash } from '../pages/Coletas'
import { Header } from "../components/Header";
import { FieisDash } from "../pages/Fieis";
import { useAuth } from "../context/Auth";
import { HomePage } from "../pages/Home";
import { Comunidades } from "../pages/ConfigComunidades";
import { ConfigFieis } from "../pages/ConfigFieis";
import { ConfigColetas } from "../pages/ConfigColetas";

// eslint-disable-next-line import/no-unresolved


interface IPrivateProps {
  authenticated: boolean
}


function PrivateRoutes({ authenticated }: IPrivateProps) {


  if (!authenticated) {
    return <Navigate to='/' replace />
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )

}

export function MainRouter() {
  const { authenticated } = useAuth()

  useEffect(() => {

  }, [window.navigation.currentEntry?.url])


  console.log(authenticated);


  return (
    <HashRouter>
      {/* LoginPage */}
      <>
        <Routes>
          <Route>
            <Route
              path="/"
              element={
                authenticated
                  ? <Navigate to='/dizimo' />
                  : <HomePage />
              } />
          </Route>
          <Route element={
            <PrivateRoutes authenticated={authenticated} />
          }>
            <Route element={<DizimoDash />} path="/dizimo" />
            <Route element={<ColetaDash />} path="/coleta" />
            <Route element={<OfertaDash />} path="/oferta" />
            <Route element={<FieisDash />} path="/fieis" />
            <Route element={<Outlet />} path="/config">
              <Route element={<ConfigFieis />} path="fieis" />
              <Route element={<Comunidades />} path="comunidades" />
              <Route element={<ConfigColetas />} path="coletas" />
            </Route>
            <Route element={<Outlet/>} path="/register">

            </Route>
          </Route>

          <Route
            path="*"
            element={<Navigate to={authenticated ? '/dizimo' : '/'} />}
          />
        </Routes>
      </>
    </HashRouter>
  );
}
