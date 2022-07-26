import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {

    const [state, dispatch] = React.useReducer(reducer, initialState);


    console.log(state);

    React.useEffect(() => {
        console.log("Empezando el efectio");

        if (state.loading) { //Simulación validacion con el backend
            dispatch({
                type: actionTypes.noerror
            })

            setTimeout(() => {
                console.log("Haciendo validación");

                if (state.value === SECURITY_CODE) {
                    dispatch({ type: actionTypes.confirm });
                    //onConfirm();
                }
                else {
                    dispatch({ type: actionTypes.error });
                    //onError();
                }

                console.log("Terminando la validación");
            }, 3000);
        }

        console.log("Terminando");
    }, [state.loading])

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>

                <p>Por favor, escribe el código de seguridad para comprobar que quieres eliminar.</p>

                {(state.error && !state.loading) && (<p>Error: El codigo es incorrecto</p>)}

                {state.loading && (<p>Cargando...</p>)}

                <input
                    type="text"
                    placeholder="Código de Seguridad"
                    value={state.value}
                    onChange={(event) => {
                        dispatch({ type: actionTypes.write, payload: event.target.value });
                        //onWrite(event.target.value);
                    }}
                />
                <button
                    onClick={() => dispatch({ type: actionTypes.check })}
                >Comprobar</button>
            </div>
        );
    }
    else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Pedimos confirmación. ¿Tas segurx?</p>
                <button
                    onClick={() => {
                        dispatch({ type: actionTypes.deleted });
                        //onDelete();
                    }}
                >Sí, eliminar</button>
                <button
                    onClick={() => {
                        dispatch({ type: actionTypes.reset });
                        //onReset();
                    }}
                >Nop, me arrepentí</button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>
                <button
                    onClick={() => {
                        dispatch({ type: actionTypes.reset });
                        //onReset();
                    }}
                >Volver al estado inicial</button>
            </React.Fragment>
        );
    }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
}

const actionTypes = {
    confirm: 'CONFIRM',
    delete: 'DELETE',
    reset: 'RESET',
    error: 'ERROR',
    noerror: 'NOERROR',
    write: 'WRITE',
    check: 'CHECK'

}

const reducerObject = (state, payload) => ({
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.noerror]: {
        ...state,
        error: false
    },
    [actionTypes.check]: {
        ...state,
        loading: true
    },
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    },
});

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state;
    }
}

export { UseReducer };
