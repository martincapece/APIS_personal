const boton1 = document.getElementById('boton1');
const boton2 = document.getElementById('boton2');
const boton3 = document.getElementById('boton3');
const contenedor = document.getElementById('contenedor-usuarios');
const barra_busqueda = document.getElementById('barra');
const buscar = document.getElementById('enviar');

const getData = async() => {
    try {
        const resp = await fetch(`https://reqres.in/api/users?page=1`);
        if (!resp.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await resp.json();
        console.log('Usuarios:', data.data);
        
        return data.data;

    } catch (error) {
        console.error('Hubo un error:', error);
    }
}


boton1.addEventListener('click', async() => {
    try {
        const data = await getData();

        data.map(user => {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
                <p classname="text-primary">${user.first_name} ${user.last_name}</p>
                <p>Email: ${user.email}</p>
                <img src="${user.avatar}" alt="${user.first_name}" width="50" />
                <hr/>
            `;
            contenedor.appendChild(userDiv);
        });
    } catch (error) {
        console.error('Hubo un error:', error);
    }
});

buscar.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const data = await getData();

        // Limpiar resultados anteriores antes de mostrar nuevos
        contenedor.innerHTML = '';

        const valorBusqueda = barra_busqueda.value.toLowerCase().trim();

        data.map(user => {
            const nombreCompleto = `${user.first_name} ${user.last_name}`.toLowerCase().trim();

            if (nombreCompleto.includes(valorBusqueda)) {
                const userDiv = document.createElement('div');
                userDiv.innerHTML = `
                    <p class="text-primary">${user.first_name} ${user.last_name}</p>
                    <p>Email: ${user.email}</p>
                    <img src="${user.avatar}" alt="${user.first_name}" width="50" />
                    <hr/>
                `;
                contenedor.appendChild(userDiv);
            }
        });
    } catch (error) {
        console.error('Hubo un error:', error);
    }
});
