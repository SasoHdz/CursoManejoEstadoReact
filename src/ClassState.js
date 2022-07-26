import React from 'react';

import {Loading} from './Loading';

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {

    constructor(props){
        super(props);

        this.state= {
            error: false,
            loading: false,
            value: ''
        };
    }

    /* UNSAFE_componentWillMount(){
        console.log("componentWillMount");
    } */

    /* componentDidMount(){
        console.log("componentDidMount"); 
    } */

    componentDidUpdate(){
        console.log("Actualizacion");

        if(this.state.loading){ //Simulación validacion con el backend
            setTimeout(()=>{
                console.log("Haciendo validación");

                if(SECURITY_CODE === this.state.value){
                    this.setState({error: false, loading: false});
                }
                else{
                    this.setState({error: true, loading: false});
                }

                console.log("Terminando la validación");
            },3000)
        }
    }


    render(){
        return(
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad para comprobar que quieres eliminar.</p>
                { (this.state.error && !this.state.loading) && (<p>Error: El codigo es incorrecto</p>)}
                { this.state.loading && (<Loading/>)}
                <input 
                    type="text" 
                    placeholder="Código de Seguridad"
                    value = {this.state.value}
                    onChange = { (e)=> {
                        this.setState({value:e.target.value});
                    }}
                />
                <button
                    onClick={()=>this.setState({ loading: true})}
                >Confirmar</button>
            </div>
        );
    };  
}

export { ClassState };