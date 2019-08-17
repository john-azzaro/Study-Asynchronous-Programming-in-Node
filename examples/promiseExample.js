

const myProm = new Promise(function(resolve, reject) {   
    console.log('Waiting to see if the promise worked...');
    
    setTimeout(function() {    
        resolve("The promise works!");  
        reject(new Error('Sorry, the promise didnt work'));                
    }, 2000);                                                     
});

myProm.then( function(result) {                 
    console.log('Result:', result);
}).catch( function(err) {                              
    console.log('Error:', err.message);
});
