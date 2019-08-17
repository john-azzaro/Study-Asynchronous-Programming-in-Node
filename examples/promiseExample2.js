function getUser(id) {                                              
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'joe' });                   
        }, 2000);
})};

getUser(1)
    .then(function(result) {
       console.log('it worked!');     
    });