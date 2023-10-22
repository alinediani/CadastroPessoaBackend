import './NovoCadastro.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class NovoCadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomeCompleto: '',
            dataNascimento: '',
            valorRenda: '',
            cpf: '',
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const pessoaData = {
            nomeCompleto: this.state.nomeCompleto,
            dataNascimento: this.state.dataNascimento,
            valorRenda: this.state.valorRenda,
            cpf: String(this.state.cpf),
        };


        axios.post('https://localhost:7075/api/pessoas', pessoaData)
            .then(response => {
                console.log('Pessoa criada com sucesso:', response.data);
            })
            .catch(error => {
                console.error('Erro ao criar a pessoa:', error);
            });
    }

    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>

                <div>
                    <label>Nome Completo:</label>
                    <input type="text" name="nomeCompleto" onChange={this.handleInputChange} />
                </div>
                <div>
                    <label>Data de Nascimento:</label>
                    <input type="date" name="dataNascimento" onChange={this.handleInputChange} />
                </div>
                <div>
                    <label>Valor da Renda:</label>
                    <input type="number" name="valorRenda" step="0.01" onChange={this.handleInputChange} />
                </div>
                <div>
                    <label>CPF:</label>
                    <input type="text" name="cpf" onChange={this.handleInputChange} />
                </div>
                <button type="submit">Criar Pessoa</button>

                
                </form>
                <Link to='/'>
                    <button >Voltar</button>
                </Link>
              </div>
                
        );
    }
}

export default NovoCadastro;

