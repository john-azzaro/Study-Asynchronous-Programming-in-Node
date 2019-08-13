console.log('Before');
getUser(1, function(user) {                                        // call get user with the id and a function that is called with the user object as the argument.
    console.log('User', user)       
});    
console.log('After');

function getUser(id, callback) {                                    // add callback as a second argument             
    setTimeout(function() {
            console.log('Reading a user from a database...');
            callback({ id: id, Username: 'Alan' });                 // call the callback WITH the user object!
    }, 2000);
}



/* 
The result will be:

$ node callbackExample2.js
Before
After
Reading a user from a database...
User { id: 1, Username: 'Alan' }

*/