//variables

const listaTweets= document.getElementById('lista-tweets');



//eventListeners

eventListeners();

function eventListeners() {
    //cuando se envia el formulario

    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // borrar tweets (delegation)
    listaTweets.addEventListener('click' , borrarTweet);

    // Contenido Cargado
    document.addEventListener('DOMContentLoaded', localStoragelisto);

};



//FUNCIONES
 
// Añadir tweet al formulario

function agregarTweet(e) {
    e.preventDefault();
    
    //-leer el valor de tex area
    const tweet = document.getElementById('tweet').value;
    //vacia el formulario
    document.getElementById('tweet').value= "";
    //- crear boton eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //- crear elemento y añadirle el contenido a la lista

    const li = document.createElement('li');
    li.innerText = tweet;
    listaTweets.appendChild(li); //añade el tweet a la lista.

    li.appendChild(botonBorrar); //añade el boton de borrar

    //Añadir al Local Storage
    agregarTweetLocalStorage(tweet);
};

//Elimina el Tweet del DOM.
function borrarTweet(e) {
    e.preventDefault;
    if(e.target.className === "borrar-tweet") {
       e.target.parentElement.remove();
//elimina el tweet del local storage
       borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

// Mostrar datos de local Storage en la lista
function localStoragelisto() {
    let tweets;

    tweets= obtenerTweetsLocalStorage();
    
    tweets.forEach(function(tweet) {

    //- crear boton eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //- crear elemento y añadirle el contenido a la lista

    const li = document.createElement('li');
    li.innerText = tweet;
    //añade el tweet a la lista.
    listaTweets.appendChild(li); 
    //añade el boton de borrar
    li.appendChild(botonBorrar);
    });
}

//Agregar tweet al Local Storage

function agregarTweetLocalStorage(tweet) {
   let tweets;
   tweets = obtenerTweetsLocalStorage();
   //Añadir el nuevo tweet
   tweets.push(tweet);
   // Convertir de arreglo a string para local Storage
   localStorage.setItem('tweets', JSON.stringify(tweets) );
   
}


// Comprobar que haya elementos en local Storage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;

    //Revisamos los valores de Local Storage
    if(localStorage.getItem('tweets') === null) {
        tweets = [];
    } else{
        tweets = JSON.parse(localStorage.getItem('tweets') );
    }
    return tweets;
}

//eliminar Tweet del local storage

function borrarTweetLocalStorage(tweet) {
     let tweets, tweetBorrar;

    //elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    })

    localStorage.setItem('tweets' , JSON.stringify(tweets) );

}