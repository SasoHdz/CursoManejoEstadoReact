import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }){

    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    });


    console.log(state);

    const onConfirm = () => {

        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true
        })
    }

    const onError = () => {

        setState({
            ...state,
            error: true,
            loading: false,
        })
    }

    const onWrite = (e) => {
        setState({
            ...state,
            value:e
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            loading: true
        })
    }
    
    const onDelete = () => {

        setState({
            ...state,
            deleted: true,
        })
    }

    const onReset = () => {

        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value:''
        })

    }

    React.useEffect(()=>{
        console.log("Empezando el efectio");

        if(state.loading){ //Simulación validacion con el backend
            setState({
                ...state,
                error:false
            })
            
            setTimeout(()=>{
                console.log("Haciendo validación");

                if(state.value === SECURITY_CODE) {
                    onConfirm();
                }
                else {
                    onError();
                }

                console.log("Terminando la validación");
            },3000);
        }

        console.log("Terminando");
    },[state.loading])

    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h2>Eliminar { name }</h2>
    
                <p>Por favor, escribe el código de seguridad para comprobar que quieres eliminar.</p>
    
                { (state.error && !state.loading) && (<p>Error: El codigo es incorrecto</p>)}
    
                { state.loading && (<p>Cargando...</p>)}
    
                <input 
                    type="text" 
                    placeholder="Código de Seguridad"
                    value={state.value}
                    onChange= {(event)=>{
                        onWrite(event.target.value);
                    }}
                />
                <button
                  onClick={()=> onCheck()}
                >Comprobar</button>
            </div>
        );
    }
    else if (!!state.confirmed && !state.deleted){
        return (
            <React.Fragment>
                <p>Pedimos confirmación. ¿Tas segurx?</p>
                <button
                    onClick={()=>{
                        onDelete();
                    }}
                >Sí, eliminar</button>
                <button
                    onClick={()=> {
                        onReset();
                    }}
                >Nop, me arrepentí</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button
                    onClick={()=> {
                        onReset();
                    }}
                >Volver al estado inicial</button>
            </React.Fragment>
        );
    }
}

export { UseState };
