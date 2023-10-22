import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Tabela extends Component {
    state = {
        pessoas: [],
        pessoaSelecionada: null, 
    };

    async componentDidMount() {
        try {
            const response = await axios.get('https://localhost:7075/api/pessoas');
            this.setState({ pessoas: response.data });
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    handleEdit = (pessoa) => {
        this.setState({ pessoaSelecionada: pessoa });
    };

    handleUpdate = async () => {
        const { pessoaSelecionada } = this.state;

        try {
            await axios.put(`https://localhost:7075/api/pessoas/${pessoaSelecionada.id}`, pessoaSelecionada);
            this.setState((prevState) => ({
                pessoas: prevState.pessoas.map((pessoa) => {
                    if (pessoa.id === pessoaSelecionada.id) {
                        return pessoaSelecionada;
                    }
                    return pessoa;
                }),
                pessoaSelecionada: null, 
            }));
        } catch (error) {
            console.error('Erro ao atualizar pessoa:', error);
        }
    };

    handleCancelEdit = () => {
  
        this.setState({ pessoaSelecionada: null });
    };

    handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7075/api/pessoas/${id}`);

            this.setState((prevState) => ({
                pessoas: prevState.pessoas.filter((pessoa) => pessoa.id !== id),
            }));
        } catch (error) {
            console.error('Erro ao excluir pessoa:', error);
        }
    };

    render() {
        const { pessoas, pessoaSelecionada } = this.state;

        return (
            <div>
                <Link to='/' className="user-button">
                        <i className="fas fa-user"></i>
                </Link>
            <table id="cadastros-table">
                <thead>
                    <tr>
                        <th>Nome Completo</th>
                        <th>Data de Nascimento</th>
                        <th>Valor Renda</th>
                        <th>CPF</th>
                        <th colSpan="2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pessoas.map((pessoa) => (
                        <tr key={pessoa.id}>
                            <td>{pessoa.nomeCompleto}</td>
                            <td>{String(pessoa.dataNascimento).substring(0, 10)}</td>
                            <td>{pessoa.valorRenda}</td>
                            <td>{pessoa.cpf}</td>
                            <td>
                                <button className="edit-button" onClick={() => this.handleEdit(pessoa)}>
                                    ✏️
                                </button>
                            </td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => this.handleDelete(pessoa.id)}
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {pessoaSelecionada && (
                    <tr>
                        <td>
                            <input
                                type="text" 
                                value={pessoaSelecionada.nomeCompleto}
                                onChange={(e) =>
                                    this.setState({
                                        pessoaSelecionada: {
                                            ...pessoaSelecionada,
                                            nomeCompleto: e.target.value,
                                        },
                                    })
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="date"
                                value={pessoaSelecionada.dataNascimento}
                                onChange={(e) =>
                                    this.setState({
                                        pessoaSelecionada: {
                                            ...pessoaSelecionada,
                                            dataNascimento: e.target.value,
                                        },
                                    })
                                }
                            />
                        </td>
                        <td>
                            <input
                                    type="number" step="0.01"
                                value={pessoaSelecionada.valorRenda}
                                onChange={(e) =>
                                    this.setState({
                                        pessoaSelecionada: {
                                            ...pessoaSelecionada,
                                            valorRenda: e.target.value,
                                        },
                                    })
                                }
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={pessoaSelecionada.cpf}
                                onChange={(e) =>
                                    this.setState({
                                        pessoaSelecionada: {
                                            ...pessoaSelecionada,
                                            cpf: e.target.value,
                                        },
                                    })
                                }
                            />
                        </td>
                        <td>
                            <button className="update-button" onClick={this.handleUpdate}>
                                Atualizar
                            </button>
                        </td>
                        <td>
                            <button className="cancel-button" onClick={this.handleCancelEdit}>
                                Cancelar
                            </button>
                        </td>
                    </tr>
                )}
                </table>
            </div>
        );
    }
}

export default Tabela;
