import React from "react";
import { Routes, Route } from "react-router-dom";

import Vagas from "./views/Vagas/Index";
import Layout from "./components/layout/Index";
import Cadastro from "./views/Cadastro/Index";
import Login from "./views/Login/Index";
import Candidatos from "./views/Candidatos/Index";
//import Perfil from "./views/Perfil/Index";

const AppRoutes = () => (
  <Routes>
    <Route path="/Vagas" element={<Layout drawer />}>
      <Route index element={<Vagas title="Vagas" />} />
    </Route>
    <Route element={<Layout />}>
      <Route index element={<Login title="Login" />} />
    </Route>
    <Route path="/Login" element={<Layout />}>
      <Route index element={<Login title="Login" />} />
    </Route>
    <Route path="/Cadastro" element={<Layout />}>
      <Route index element={<Cadastro title="Cadastro" />} />
    </Route>
    <Route path="/Candidatos" element={<Layout drawer />}>
      <Route index element={<Candidatos title="Candidatos" />} />
    </Route>
    {/*
    <Route path="/Perfil" element={<Layout drawer />}>
      <Route index element={<Perfil title="Perfil" />} />
    </Route>
*/}
  </Routes>
);

export default AppRoutes;
