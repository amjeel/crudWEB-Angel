const API_URL = "https://retoolapi.dev/m1X1s8/data"

//funcion que llame la api y haga GET obtiene un JSON
async function ObtenerRegistros(){
    //hacemos GET al servidor y obtenemos su respuesta(response)
    const respuesta = await fetch (API_URL);

    //obtenemos los datos en forma de JSON a partir de la respuesta
    const data = await respuesta.json(); //este es el JSON necesario 

    //llamamos a MostrarRegistros y le enviamos el JSON
    MostrarRegistros(data)
}

//funcion para generar las filas de la tabla
//datos representara el JSON
function MostrarRegistros(datos){
    //Se llama al aelemento tbody dentro del table con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //para injectar codigo html se usa el innerHTML
    tabla.innerHTML = " "; //se vacian los contenidos/datos de la tabla

    datos.forEach(persona =>          //por cada persona en el JSON 
        {
            tabla.innerHTML += `
            <tr>
                <td> ${persona.id} </td>
                <td> ${persona.nombre} </td>
                <td> ${persona.apellido} </td>
                <td> ${persona.correo} </td>
                <td>
                    <button> Editar </button>
                    <button> Eliminar </button>
                </td>
            </tr>
            `;
        });
}


ObtenerRegistros();