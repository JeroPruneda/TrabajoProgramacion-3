import React, {Component} from "react";

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            valor: ""

        }
    }
    eSubmit(event){
        event.preventDefault()
    }

    controlarCambios(event){
        this.setState({
            valor: event.target.value
        }, () => this.props.buscar(this.state.valor)
        )
    }
    render(){
        return(
        <>
        <div className="buscador">
            <form className="interno" onSubmit={(event) => this.eSubmit(event)}>
                <input className="container" type="text" onChange= {(event) => this.controlarCambios(event)} value={this.state.valor}></input>
                <button className="bot" type="submit"> Buscar</button>
            </form>
            </div>
        </> 
        )
    }

}
export default Search