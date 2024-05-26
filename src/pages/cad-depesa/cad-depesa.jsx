import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import "./cad-despesa.css";
import { useEffect, useState } from "react";
import api from "../../services/api.js";


//function CadDespesa(){}  
const CadDespesa = () => {

    const { idUrl } = useParams();
    const navigte = useNavigate();
    const [valor, setValor] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [forma, setForma] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");


    const SalvarDados = async () => {
        try {
            if (idUrl !== "add") {
                await api.put("/despesa/" + idUrl, {
                    valor: valor,
                    descricao: descricao,
                    categoria: categoria,
                    forma: forma,
                    mes: mes,
                    ano: ano,
                });
                alert("Dados Editados com Sucesso!")
            } else {
                await api.post("/despesa", {
                    descricao: descricao,
                    categoria: categoria,
                    forma: forma,
                    mes: mes,
                    ano: ano,
                    valor: valor,
                });

                alert("Dados Salvos  com Sucesso!")

            }
        } catch (error) {

            alert("Erro ao Salvar ou Editar os dados." + error);
            console.log(error);
        }
        navigte("/");
    }

    const GetDadosDespesas = async (id) => {
        try {
            //faz GET na API...

            const response = await api.get("/despesa/" + id);

            setValor(response.data.valor);
            setDescricao(response.data.descricao);
            setCategoria(response.data.categoria);
            setForma(response.data.forma);
            setMes(response.data.mes);
            setAno(response.data.ano);
        } catch (error) {
            alert("Erro ao buscar dados no Banco!");
            console.log(error);
        }
    }

    useEffect(() => {
        if (idUrl !== "add") {
            GetDadosDespesas(idUrl);
        };
    }, []);

    return <>
        <   Navbar />
        <Sidebar />
        <div className="container-depesa-cad">

            <div className="box-despesa-cad">

                {
                    idUrl !== "add" ? <h1>Editar Despesa</h1> : <h1> Nova Despesa</h1>
                }


                <div className="input-group">
                    <p>Valor</p>
                    <input type="text" className="input-lg w100" id="valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)} />
                </div>

                <div className="input-group">
                    <p>Descrição</p>
                    <input type="text" className="w100" id="valor"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)} />
                </div>

                <div className="input-group">
                    <p>Categoria</p>
                    <select id="categoria" className="w100"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}>
                        <option value="Carro">Carro</option>
                        <option value="Casa">Casa</option>
                        <option value="Lazer">Lazer</option>
                        <option value="Mercado">Mercado</option>
                        <option value="Educação">Educação</option>
                        <option value="Viagem">Viagem</option>
                    </select>
                </div>


                <div className="input-group">
                    <p>Forma de Pagamento</p>
                    <select id="categoria" className="w100"
                        value={forma}
                        onChange={(e) => setForma(e.target.value)}>
                        <option value="Debito">Débito</option>
                        <option value="Credito">Crédito</option>
                    </select>
                </div>

                <div className="w100 mes-ano">
                    <div>
                        <p>Mês</p>
                        <select id="categoria" className="w100"
                            value={mes}
                            onChange={(e) => setMes(e.target.value)}>
                            <option value="Janeiro">Janeiro</option>
                            <option value="Fevereiro">Fevereiro</option>
                            <option value="Março">Março</option>
                            <option value="Abril">Abril</option>
                            <option value="Maio">Maio</option>
                            <option value="Junho">Junho</option>
                            <option value="Julho">Julho</option>
                            <option value="Agosto">Agosto</option>
                            <option value="Setembro">Setembro</option>
                            <option value="Outubro">Outubro</option>
                            <option value="Novembro">Novembro</option>
                            <option value="Dezembro">Dezembro</option>
                        </select>
                    </div>

                    <div>
                        <p>Ano</p>
                        <select id="categoria" className="w100"
                            value={ano}
                            onChange={(e) => setAno(e.target.value)}>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>

                </div>

                <div className="btn-group text-right">
                    <button onClick={() => navigte("/")} className="btn btn-blue-outline">Cancelar</button>
                    <button onClick={(SalvarDados)} className="btn btn-blue ml-20">Salvar</button>

                </div>


            </div>

        </div>
    </>
}

export default CadDespesa;