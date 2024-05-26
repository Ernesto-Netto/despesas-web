
//function Home(){}

import Sidebar from "../../components/sidebar/sidebar.jsx";
import Navbar from "../../components/navbar/navbar.jsx";
import "./home.css";
import icon from "../../styles/icon.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Home = () => {

    /*    let dados = [
            { id: 1, icon: "https//jornadajs-devpoint.s3.amazonaws.com/icon-carro.png", categoria: "Carro", descricao: "Pagamento IPVA", forma: "Débito", mes: "Maio", ano: "2024", valor: 2500 },
            { id: 2, icon: "https//jornadajs-devpoint.s3.amazonaws.com/icon-casa.png", categoria: "Casa", descricao: "Condomínio", forma: "Débito", mes: "Maio", ano: "2024", valor: 620 },
            { id: 3, icon: "https//jornadajs-devpoint.s3.amazonaws.com/icon-lazer.png", categoria: "Lazer", descricao: "Sorvete no Parque", forma: "Débito", mes: "Maio", ano: "2024", valor: 17.50 },
            { id: 4, icon: "https//jornadajs-devpoint.s3.amazonaws.com/icon-mercado.png", categoria: "Mercado", descricao: "Compras do Mês", forma: "Crédito", mes: "Maio", ano: "2024", valor: 375 },
            { id: 5, icon: "https//jornadajs-devpoint.s3.amazonaws.com/icon-treinamento.png", categoria: "Educação", descricao: "Faculdade", forma: "Débito", mes: "Maio", ano: "2024", valor: 490 },
            { id: 6, icon: "https//jornadajs-devpoint.s3.amazonaws.com/icon-viagem.png", categoria: "Viagem", descricao: "Passagem Aérea", forma: "Crédito", mes: "Maio", ano: "2024", valor: 610 },
            { id: 7, icon: "https//jornadajs-devpoint.s3.amazonaws.com/icon-mercado.png", categoria: "Mercado", descricao: "Churrasco", forma: "Crédito", mes: "Maio", ano: "2024", valor: 144.3 },
            { id: 8, icon: "https//jornadajs-devpoint.s3.amazonaws.com/icon-viagem.png", categoria: "Viagem", descricao: "Hotel", forma: "Crédito", mes: "Maio", ano: "2024", valor: 330 },
        ];*/

    /*
    let dadosFiltrados = [
        { id: 1, icon: "https//jornadajs-devpoint.s3.amazonaws.com/icon-carro.png", categoria: "Carro", descricao: "Pagamento IPVA", forma: "Débito", mes: "Maio", ano: "2024", valor: 2500 },
    ];
    */


    const navigate = useNavigate();
    const [despesas, setDespesas] = useState([]);
    const [total, setTotal] = useState(0);

    const ListarDespesa = async (busca) => {
        try {
            //Acessar dados na API
            const response = await api.get("/despesa", {
                params: {
                    filtro: busca
                }
            });

            setDespesas(response.data);

            let soma = 0;
            for (var i = 0; i < response.data.length; i++) {
                soma = soma + Number(response.data[i].valor);
            }

            setTotal(soma);

        } catch (error) {
            alert("Erro ao buscar dados");
            console.log(error);
        }
    }


    const OpenDespesa = (id) => {
        navigate("/despesa/" + id);
    }

    const DeleteDespesa = async (id) => {
        try {

            confirmAlert({
                title: "Exclusão",
                message: "Confirmar Exclusão da despesa?",
                buttons: [{
                    label: "Sim",
                    onClick: async () => {
                        await api.delete("/despesa/" + id);
                        ListarDespesa();
                    }
                },
                {
                    label: "Não",
                    onClick: () => { }
                }]
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        ListarDespesa();
    }, []);

    return <>
        <Sidebar />
        <Navbar onClickSearch={ListarDespesa}
            total={total}
            search={true} />
        <div className="container-home">
            <div className="title-home">
                <h1>Despesas Mensais</h1>
                <button onClick={() => navigate("/despesa/add")} className="btn btn-green">Adicionar Despesa</button>
            </div>

            <div className="box-despesa">
                <table>
                    <thead>
                        <tr className="text-center">
                            <th style={{ visibility: "collapse" }}>-</th>
                            <th>Ano</th>
                            <th>Mês</th>
                            <th>Descrição da Despesa</th>
                            <th>Categoria da Despesa</th>
                            <th>Forma Pagamento</th>
                            <th className="text-right">Valor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            despesas.map((desp) => {
                                return <tr className="text-center">
                                    <td style={{ visibility: "collapse" }}>{desp.id}</td>
                                    <td>{desp.ano}</td>
                                    <td>{desp.mes}</td>
                                    <td>{desp.descricao}</td>
                                    <td>
                                        <div>
                                            <img className="icon-sm" src={desp.categoriaDetalhe.icon} alt="" />
                                            <span className="ml-10">{desp.categoria}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <img className="icon-sm" src={desp.formaDetalhe.icon} alt="" />
                                            <span className="ml-10">{desp.forma}</span>
                                        </div>
                                    </td>
                                    <td className="text-right">R$ {Number(desp.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                    <td className="text-right">
                                        <button onClick={() => OpenDespesa(desp.id)}
                                            className="btn btn-blue">
                                            <img className="icon-sm" src={icon.edit} alt="" />
                                        </button>
                                        <button onClick={() => DeleteDespesa(desp.id)}
                                            className="btn btn-red ml-10">
                                            <img className="icon-sm" src={icon.remover} alt="" />
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>


                {
                    despesas.length === 0 && <div className="empty-despesa">
                        <img src={icon.empty} alt="" />
                        <p>Nenhuma despesa encontrada!</p>
                    </div>
                }

            </div>
        </div>
    </>


}

export default Home;