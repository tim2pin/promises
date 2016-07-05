
// // Return is synchronous
// function hello() {
//   return 'Synchronous: world';
// }
// var word = hello(); // synchronous
// console.log(word);


// // Callbacks are on method of dealing with
// // asynchronicity
// function someAction(callback) {

//   // calling this immediately
//   callback();

//   // call it later
//   setTimeout(function(){
//     callback();
//   }, 4000); //
// }

// function myOtherAnimals(callback){
//   // call it later
//   setTimeout(function(){
//     callback();
//   }, 1000); //
// }

// // PYRAMID OF DOOM
// someAction(function() {
//   myOtherAnimals(function(){
//     console.log('Asynchronous: Horses + other animals 5 seconds');
//   });
// });

// // Outside the callback of the async function
// console.log('PRANCY IS THE BEST');





















// Promises are a way around the pyramid of doom

var deliverPrancy = new Promise(function(resolve, reject) {
  // Immitate us waiting on a server
  console.log('initiating horse delivery now');
  setTimeout(function(){
    var twins = true;
    if(twins) {
      console.log('twins were born!');
      return resolve('Prancy');
    } else {
      return reject('the mother did not have twins.');
    }
  }, 2000, "foo");
});

var deliverButtercup = new Promise(function(resolve, reject) {
  // Immitate us waiting on a server
  console.log('initiating buttercup delivery now');
  setTimeout(function(){
    return resolve('Buttercup');
  }, 1000, "foo");
});

var feedHorses = function(values) {
  return new Promise(function(resolve, reject) {
    console.log('initiating feeding of horses now', values);
    setTimeout(function() {
      resolve('thirty');
    }, 4000);
  });
}

// transformation
function upper(str) {
  return str.toUpperCase();
}

// transformation
function stringReverse(str) {
  return str.split('').reverse().join('');
}

// side effect
function introduce(str) {
  console.log(str + ' was born!');
  return str;
}

// Side effect
function foodReport(lbs) {
 console.log('The horses ate ' + lbs + ' lbs of food.');
 return lbs;
}

// Triggers prancy
var prancy = deliverPrancy // name
  .then(upper)
  .then(stringReverse)
  .then(introduce)
  .catch(function(reason) {
    // If you the script to end,
    // you must re-throw the error
    throw new Error('Horse could not be delivered because ' + reason);
  });

// Triggers buttercup
var buttercup = deliverButtercup
  .then(upper)
  .then(introduce)
  .catch(function(reason) {
    // If you the script to end,
    // you must re-throw the error
    throw new Error('Horse could not be delivered because ' + reason);
  });;

// Triggers second
// feedHorses
//   .then(upper)
//   .then(stringReverse)
//   .then(foodReport);

// Both horses are ordered at the exact same time
// but we know prancy will take longer to be delivered.
// The 'horses arrived' message will 
Promise.all([prancy, buttercup])
  .then(feedHorses)
  .then(foodReport)
  .catch(function(reason) {
    // If you the script to end,
    // you must re-throw the error
    throw new Error('Some horses could not be fed because ' + reason);
  });

