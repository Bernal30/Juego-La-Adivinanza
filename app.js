let numeroSecreto = 0;
let intentosJugador = 0;
let numerosSorteados = [];
let numeroMaximo = 10;
let maximosIntentos = 5;

/*
Esta funci.ón ejecuta toda la logica del juego desde, verificar el intento, dar pistas
y hacer el conteo de los intentos del usuario
*/
function verificarIntento(){
     //.value es para obtener el valor del objeto llamado por su Id mediante la funcion document.getElementById()
     let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
     //El triple igualo verifica en valor y en tipo de de dato (string, number, boolean) 
     if(numeroSecreto === numeroDeUsuario){
          asignarValorElementoHTML('p', `Acertaste el número en ${intentosJugador} ${(intentosJugador === 1) ? 'intento' : 'intentos'}!`);
          limpiarCaja();
          document.getElementById('reiniciar').removeAttribute('disabled');
     } else{
          //el ususario no acerto
          if(numeroDeUsuario > numeroSecreto){
               asignarValorElementoHTML('p', 'El número secreto es menor.');
          } else {
               asignarValorElementoHTML('p', 'El número secreto es mayor.');
          }
          
          limpiarCaja();
          //Se llego al número maximo de intentos (OTRA CONDICIÓN DE SALIDA DE LA RECURSIVIDAD)
          if (intentosJugador === maximosIntentos){
               asignarValorElementoHTML('p', 'Lo siento has llegado al número maximo de intentos');
               document.getElementById('reiniciar').removeAttribute('disabled');
          }
          intentosJugador++;
     }
     return;
}

//Esta función limpia el input
function limpiarCaja(){
     //dentro de las '' usando el # el querySelector busca solo elemento por el Id.
     document.querySelector('#valorUsuario').value = '';
}

/*
Esta función modfifica una etiqueta HTML (parrafo o titulo) a un valor texto 
para cominucarnos con el usuario
*/
function asignarValorElementoHTML(etiqueta, texto) {
     //guardamos en una variable el objeto (etiqueta)
     let etiquetaHTML = document.querySelector(etiqueta);
     //se define un valor al objeto seleccionado mediante variable.innerHMTL
     etiquetaHTML.innerHTML = texto;
     return;
}

/*
Esta función general un número pseudo aleatoria entre 1 y 10
Con una condicional If verifica si el número sorteado esta en el array numerosSorteados de ser true
genera un nuevo numero aleatorio y sino se agrega ese nuevo número al array numerosSorteados y 
retorna el numero generado
*/
function generarNumerSecreto() {
     let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
     console.log(numeroGenerado);
     console.log(numerosSorteados);
     //Si ya se sortearon todos los números posibles (CONDICIÓN DE SALIDA DE LA RECURSIVIDAD)
     if (numerosSorteados.length == numeroMaximo) {
          asignarValorElementoHTML('p', 'Ya se sortearon todos los números posibles. Gracias por jugar!')
     } else {
          //si el número generado esta incluido en el array numerosSorteados
          if (numerosSorteados.includes(numeroGenerado)){
               //La función se llama a si misma para obtener un número no sorteado (RECURSIVIDAD)
               return generarNumerSecreto(); 
          } else {
               numerosSorteados.push(numeroGenerado);
               return numeroGenerado;
          }
     }
}

/*
La función condicioneIniciales();
Establece los requisitos predeterminados para el juego, como la bienvenida, 
como jugar, un número aleatorio y los intentos que comienzan en 1
*/
function condicionesIniciales() {
     asignarValorElementoHTML('h1', 'Bienvenido al Juego la Adivinanza!!');
     asignarValorElementoHTML('p', `Digite un número del 1 al ${numeroMaximo}, tiene ${maximosIntentos} intentos.`);
     numeroSecreto = generarNumerSecreto();
     intentosJugador = 1;
}

/*
Esta función reinicia el juego, limpia el input y desactiva el boton "reiniciar"
*/
function reiniciarJuego() {
     //limpiar caja
     limpiarCaja();
     //indicar mensaje de intervalo de números
     //Generar el número aleatorio
     //Reiniciar el número de intentos
     condicionesIniciales();
     //Dashabilitar el boton de reiniciar juego
     document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();



