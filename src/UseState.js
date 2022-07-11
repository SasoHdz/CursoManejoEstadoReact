import React from 'react';

function UseState({ name }){

    const [error, setError] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(()=>{
        console.log("Empezando el efectio");

        if(loading){ //Simulación validacion con el backend
            setTimeout(()=>{
                console.log("Haciendo validación");
                setLoading(false);
                console.log("Terminando la validación");
            },3000)
        }

        console.log("Terminando");
    },[loading])


    return (
        <div>
            <h2>Eliminar { name }</h2>
            <p>Por favor, escribe el código de seguridad para comprobar que quieres eliminar.</p>
            { error && (<p>Error: El codigo es incorrecto</p>)}
            { loading && (<p>Cargando...</p>)}
            <input type="text" placeholder="Código de Seguridad"/>
            <button
              onClick={()=> setLoading(true)}
            >Comprobar</button>
        </div>
    );
}

export { UseState };
