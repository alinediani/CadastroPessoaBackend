
import './App.css';
import NovoCadastro from './Cadastro/NovoCadastro'
import Tabela from './Edit/Tabela'
import Home from './Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Editar" element={<Tabela />} />
        <Route path="/Novo" element={<NovoCadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
