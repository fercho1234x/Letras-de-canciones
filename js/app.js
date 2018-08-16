import * as UI from './interfaz.js';
import {API} from './api.js';

UI.formularioBuscar.addEventListener('submit', (e) =>{
    e.preventDefault();

    // Obtener datos del formulario
    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;
    if (artista === '' || cancion === '') {
        // El usuario deja los campos vacios mostrar error
        UI.divMensajes.innerHTML = 'Error todos los campor son obligatorios...';
        UI.divMensajes.classList.add('error');
        setTimeout(()=>{
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove('error');
        },3000);
    } else {
        // Se hace la consulta a la API query// formulario completo
        const api = new API(artista, cancion);
        api.consultarAPI()
            .then(data => {
                // console.log(data);
                if (data.response.error) {
                    UI.divMensajes.innerHTML = `La cancion: ${cancion} del artista: ${artista} no existe...`;
                    UI.divMensajes.classList.add('error');
                    setTimeout(()=>{
                        UI.divMensajes.innerHTML = '';
                        UI.divMensajes.classList.remove('error');
                        UI.formularioBuscar.reset();
                    },5000);
                } else {
                    // La cancion existe
                    const cancion = data.response.lyrics;
                    // console.log(cancion);
                    // UI.divResultado.classList.add('error');
                    UI.divResultado.innerHTML = cancion;
                }
            })
    }
});
