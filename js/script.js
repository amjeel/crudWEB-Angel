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


//proceso para agregar registros
const modal = document.getElementById("mdAgregar");
const btnAgregar = document.getElementById("btnAgregar");
const btnCerrar = document.getElementById("cerrarModal");

btnAgregar.addEventListener("click", () =>{
    modal.showModal();
});

btnCerrar.addEventListener("click", ()=>{
    modal.close();
})

//agregar un nuevo registro desde el frm

document.getElementById("frmAgregar").addEventListener("submit", async e =>{
    e.preventDefault(); //evita que los datos se envien por defecto ¿?

    //capturar los vlores del formulario
    const nombre = document.getElementById("txtNombre").value.trim();
    const apellido = document.getElementById("txtApellido").value.trim();
    const correo = document.getElementById("txtCorreo").value.trim();

    //Validacion basica
    if(!nombre || !apellido || !correo){
        alert("Complete todos los campos")
        return;
    }

    //Llamar a la API para enviar los datos
    //llamar a la API y mandar datos
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nombre,apellido,correo})
    });
 
    if(respuesta.ok){
        //mensaje de confirmacion
        alert("El registro fue agregado correctamente");
 
        //limpiar el formulario
        document.getElementById("frmAgregar").reset();
 
        //cerrar el ,odal (dialog)
        modal.close();
 
        //recargar la tabla
        ObtenerRegistros();
    }
    else{
        alert("Hubo un error");
    }
});