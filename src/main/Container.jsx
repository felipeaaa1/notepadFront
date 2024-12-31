import React, {Component} from "react";
import './Container.css'

import Text from "../components/Text";
import Note from "../components/Note";


export default class Notes extends Component{
    
    
    state = {
        idNota: null,
        titulo: "", // Título da nota
        nota: "",   // Corpo da nota
        notas: [],  // Lista de notas
    };

    // Atualiza o estado do título ou da nota dependendo do campo alterado
    handleInputChange = (event) => {
        const { name, value } = event.target;

        // Atualiza apenas o campo correspondente no estado
        this.setState({ [name]: value }
             //, () =>console.log(this.state)
             );
    };

    // Salva uma nova nota na API
    handleSave = () => {
        const { idNota, titulo, nota } = this.state;
        console.log(this.state)
        // Verifica se os campos estão preenchidos
        if (!titulo || !nota) {
            alert("Por favor, preencha o título e o conteúdo da nota.");
            return;
        }

        fetch("http://localhost:8080/notas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: idNota, 
                titulo,
                nota,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                window.location.reload();
            })            
            .catch((error) => {
                console.error("Erro ao salvar a nota:", error);
                alert(`Erro ao salvar: ${error.message || error}`);
            });
    };

    // Busca as notas da API ao montar o componente
    componentDidMount() {
        fetch('http://localhost:8080/notas')
            .then((response) => {
                if (!response.ok) {    
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                this.setState({                         
                                titulo: "", // limpa título
                                nota: "",   // limpa Corpo da nota
                                notas: data }); // Atualiza o estado com as notas
            })
            .catch((error) => {
                console.error('Erro ao buscar notas:', error);
                alert(`Erro ao carregar as notas: ${error.message}`)
            });
    };
    // carregar nota para editar
    loadNote = (nota) =>{
        this.setState({
            idNota: nota.id,
            titulo: nota.titulo,
            nota: nota.nota}
            //, () =>console.log(this.state)
            )};

            
    limpaState = () =>{
        this.setState({
            idNota: null,
            titulo: "",
            nota: ""
        });
        //console.log(this.state);
    };

    handleDelete = () => {
        const { idNota } = this.state;
        if(idNota == null){
            alert(`Clique na nota que deseja excluir`)
        }
        else{
            fetch("http://localhost:8080/notas/"+idNota, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }

            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                })
                .then(() => {
                    window.location.reload();
                })            
                .catch((error) => {
                    console.error("Erro ao excluir a nota:", error);
                    alert(`Erro ao salvar: ${error.message || error}`);
                });  
        }
    };
    
    render(){
        const { titulo, nota, notas } = this.state; // Desestrutura os valores do estado

        return(
            <div className="notes">
                <h2>titulo</h2>
                <Text cols="10" rows="1" id="titulo" value={this.state.titulo} name="titulo" onChange={this.handleInputChange} />
                <h2>nota</h2>
                <Text cols="25" rows="3" id="corpo" value= {this.state.nota}name="nota" onChange={this.handleInputChange} />
                <button className="clearButton" onClick={this.limpaState}> Limpar</button>
                <button className="saveButton" onClick={this.handleSave}> salvar</button>
                <button className="deleteButton" onClick={this.handleDelete}> Excluir</button>
                <ul>
                    {/* Mapeia as notas carregadas e exibe cada uma como Note_element */}
                    {this.state.notas.map((nota) => (
                        <Note onClick={() => this.loadNote(nota)} id={nota.id} text={`${nota.titulo}: ${nota.nota}`} />
                    ))}
                </ul>
            </div>

        )
    }


}