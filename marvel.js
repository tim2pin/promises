function fetchJSON(url) {
  return fetch(url).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
}

function marvelFactory(config) {
  return function(path) {
    var timestamp = new Date().getTime();
    var hash = CryptoJS.MD5(timestamp + config.privateKey + config.publicKey).toString();
    var url = config.hostname + '/v' + config.version + '/public' + path + '?apikey=' + config.publicKey + '&ts=' + timestamp + '&hash=' + hash;
    console.log(url);

    return fetchJSON(url);
  }
}

// Get an instance of the marvel api
var marvel = marvelFactory({
  hostname: 'http://gateway.marvel.com',
  publicKey: '1e883cd8e8224161c01454a8a00291d4',
  privateKey: '88effafb5aac6f6ed47faa06d51782c4c8e796f7',
  version: '1'
});

// 1. Sign up for the marvel api: https://developer.marvel.com
// 2. Get your public and private key from: https://developer.marvel.com/account
// 3. Replace the above config with your own public and private key
// 4. On the account page, a new allowed referer: localhost
// 5. Make sure you hit update!
// 6. Fork jimthedev/promises on github
// 7. Clone <<yourusername>>/promises from github to your computer
// 8. cd in your promises folder and run `npm install`.
// 9. Modify marvel.js to add the name of the character as well.
// 10.You can run a server with: `./node_modules/.bin/http-server`
// 11.Once the server is running, you can see the code at:
//       http://localhost:8080/marvel.html
//

// Make a call using the api
marvel('/characters').then(function(json) { 
  json.data.results.map(function(character){

    var characterContainer = document.createElement('character') 
    var imgPath = character.thumbnail.path + '.' + character.thumbnail.extension;

    var name = character.name;

    var img = document.createElement('img'); // Create an element node
    img.setAttribute('src', imgPath); // Set some properties on the node

    //document.querySelector('body').appendChild(img); // Attached the node to the document
   

    
    var nameTag = document.createElement('character-name'); //create element node
    var nameTextNode = document.createTextNode(name); //create text node

    nameTag.appendChild(nameTextNode);
    characterContainer.appendChild(nameTag);
    characterContainer.appendChild(img);


    var container = document.querySelector('characters');


    container.appendChild(characterContainer);


  }); 
});

