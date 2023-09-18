import React from "react";
import { Routes, Route } from "react-router-dom";

import AdmVagas from "./views/AdmVagas/Index";
import MinhasVagas from "./views/MinhasVagas/Index";
import VagasDisponiveis from "./views/VagasDisponiveis/Index";
import Layout from "./components/layout/Index";
import Cadastro from "./views/Cadastro/Index";
import Login from "./views/Login/Index";
import AdmCandidatos from "./views/AdmCandidatos/Index";
//import Perfil from "./views/Perfil/Index";

const AppRoutes = () => (
  <Routes>
    <Route path="/AdmVagas" element={<Layout drawer />}>
      <Route index element={<AdmVagas title="Vagas" />} />
    </Route>
    <Route path="/MinhasVagas" element={<Layout drawer />}>
      <Route index element={<MinhasVagas title="Minhas Vagas" />} />
    </Route>
    <Route path="/VagasDisponiveis" element={<Layout drawer />}>
      <Route index element={<VagasDisponiveis title="Vagas Disponiveis" />} />
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
    <Route path="/AdmCandidatos" element={<Layout drawer />}>
      <Route index element={<AdmCandidatos title="Candidatos" />} />
    </Route>
    {/*
    <Route path="/Perfil" element={<Layout drawer />}>
      <Route index element={<Perfil title="Perfil" />} />
    </Route>
*/}
  </Routes>
);

export default AppRoutes;
