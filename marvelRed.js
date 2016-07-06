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


// // Make a call using the api


// marvel('/characters').then(function(json) {
//   var count = 0;
//   json.data.results.map(function(character){



//     var characterContainer = document.createElement('character') 
//     var imgPath = character.thumbnail.path + '.' + character.thumbnail.extension;
//     var name = character.name;

//     var img = document.createElement('img'); // Create an element node
//     img.setAttribute('src', imgPath); // Set some properties on the node

//     //document.querySelector('body').appendChild(img); // Attached the node to the document
   

    
//     var nameTag = document.createElement('character-name'); //create element node
//     var nameTextNode = document.createTextNode(name); //create text node

//     nameTag.appendChild(nameTextNode);
//     characterContainer.appendChild(nameTag);
//     characterContainer.appendChild(img);
    

//     var container = document.querySelector('characters');
//     // container.appendChild(characterContainer)

//     if (imgPath !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
//       container.appendChild(characterContainer)
//     } else {
//       count ++;
//     }


//   }); 
//   console.log(count);
// });

marvel('/characters').then(function(json) { 
  var finalCount = json.data.results.reduce(function(accumulator, character){
    
    var characterContainer = document.createElement('character');
    var imgPath = character.thumbnail.path + '.' + character.thumbnail.extension;
    var name = character.name;

    var img = document.createElement('img'); // Create an element node
    img.setAttribute('src', imgPath); // Set some properties on the node
  //  document.querySelector('body').appendChild(img); // Attached the node to the document

    var nameTag = document.createElement('character-name');
    var nameTextNode = document.createTextNode(name);
    
    var nameLinkNode = document.createElement('a');
    nameLinkNode.setAttribute('href', 'https://www.google.com/#q=' + encodeURIComponent(name));
    nameLinkNode.appendChild(nameTextNode);

    nameTag.appendChild(nameLinkNode);

    document.querySelector('body').appendChild(nameTag);

    characterContainer.appendChild(nameTag);
    characterContainer.appendChild(img);

    var container = document.querySelector('characters');
    container.appendChild(characterContainer);
    console.log('------------');
    console.log('accumulator:', accumulator);
    console.log('character:', character);

    var wasImgFound = (imgPath !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg')
    console.log('was found:', wasImgFound)
    var newCount = accumulator.count; //start with new count = to old count
      if (typeof accumulator.count === 'undefined' && wasImgFound){
        newCount = 0;
      } else if (typeof accumulator.count === 'undefined' && !wasImgFound) {
        newCount = 1
      } else if (typeof accumulator.count !== 'undefined' && !wasImgFound) {
        newCount++;
      }
      var characterWithCount = character;
        characterWithCount.count = newCount;
         return characterWithCount;
  }); 
  console.log(finalCount.count);
});









