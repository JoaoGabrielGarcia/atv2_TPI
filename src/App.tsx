import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Sidebar';
import ClientesPage from './pages/ClientesPage';
import ProdutosPage from './pages/ProdutosPage';
import ServicosPage from './pages/ServicosPage';
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <main className="pt-20 min-h-screen">
            <Routes>
              <Route path="/clientes" element={<ClientesPage />} />
              <Route path="/produtos" element={<ProdutosPage />} />
              <Route path="/servicos" element={<ServicosPage />} />
              <Route path="*" element={<Navigate to="/clientes" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
