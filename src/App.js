import "antd/dist/antd.css";
import Camions from "./Pages/Camions/Camions";
import Import from "./Pages/Reservations/Import";
import Export from "./Pages/Reservations/Export";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import LoginAdmin from "./Pages/Admin/Login";
import Container from "./Pages/Admin/Container";
import ImportAdmin from "./Pages/Admin/Reservations/Import";
import ExportAdmin from "./Pages/Admin/Reservations/Export";
import RegisterAdmin from "./Pages/Admin/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/user/camions" element={<Camions />} />
        <Route path="/user/import" element={<Import />} />
        <Route path="/user/export" element={<Export />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/register" element={<RegisterAdmin />} />
        <Route path="/admin/container" element={<Container />} />
        <Route path="/admin/import" element={<ImportAdmin />} />
        <Route path="/admin/export" element={<ExportAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
