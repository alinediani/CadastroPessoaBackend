import React from 'react';
import './NovoCadastro.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>

            <Link to='/Editar' className="user-button">
                    <i className="fas fa-user"></i>
            </Link>


            <Link to='/Novo'>
                <button>Ir para a página de cadastro</button>
            </Link>
        </div>
    );
}

export default Home