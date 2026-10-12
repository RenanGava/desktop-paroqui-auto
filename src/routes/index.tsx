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
import { TiposConfig } from "../pages/Config";
import { FieisDash } from "../pages/Fieis";
import { SyncColetas } from "../components/Dashboard/ConfigApp/syncColetas";
import { useAuth } from "../context/Auth";
import { LoginPage } from "../pages/Home/Login";
import { HomePage } from "../pages/Home";

// eslint-disable-next-line import/no-unresolved


interface IPrivateProps {
  authentiicated: boolean
}


function PrivateRoutes({ authentiicated }: IPrivateProps) {


  if (!authentiicated) {
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
            <PrivateRoutes authentiicated={authenticated} />
          }>
            <Route element={<DizimoDash />} path="/dizimo" />
            <Route element={<ColetaDash />} path="/coleta" />
            <Route element={<OfertaDash />} path="/oferta" />
            <Route element={<TiposConfig />} path="/config" />
            <Route element={<FieisDash />} path="/fieis" />
            <Route element={<SyncColetas />} path="/syncColetas" />
            <Route element={<TiposConfig />} path="/tipos" />
          </Route>

          <Route
            path="*"
            element={<Navigate to={authenticated? '/dizimo': '/'} />}
          />
        </Routes>
      </>
    </HashRouter>
  );
}
