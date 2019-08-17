# Asynchronous Programming in Node

<br>

## What is asynchronous programming?
Asynchronous programming refers to the style of structure of a program whereby a call to some unit of functionality triggers an
action that is allowed to continue outside of the ongoing flow of the program. 

<br>

## What's the difference between "asynchronous" and "synchronous" architecture?

Let's use the analogy of a restraurant to show the difference between asynchronous vs synchronous architecture.  In both restaurants, there are two
tables, a kitchen to process the orders from the tables, and a waiter to send those orders from the table to the kitchen and back again.

<br>

### With synchronous architecture, the program is "blocked" until it finishes a task. 

In a **synchronous** (or **blocking**) restaurant, the waiter will:
1.   ***Serve table 1**.*
2.   *Take that order to the kitchen.*
3.   *Wait at the kitchen for the order, then bring the food back to Table 1.*
4.   ***Serve Table 2**.*
5.   *Take that order to the kitchen.*
6.   *Wait at the kitchen for the order, then bring the food back to Table 2.*

```JavaScript
        console.log('Order 1 served...');
        console.log('Order 2 served...');
```
In the example above, the first line is "blocking" the second line, which has to wait for the first line to execute.
```
        Order 1 served...
        Order 2 served...
```


The key takeaway here is that *this process is very inefficient* since the waiter has to wait at the kitchen for the order to fill and send back to
Table 1 before moving on to Table 2.  In this example, Table 1 is *blocking* the second table, which can only be served *after* table 1 is served.

<br>

### With asynchronous architecture, tasks are NOT blocked but scheduled to complete in the future.

In a **asynchronous** (or **non-blocking**) restaurant, the waiter will:
1.   ***Serve table 1***.
2.   *Take that order to the kitchen.*
3.   ***Serve Table 2**.*
4.   *Take that order to the kitchen.*
5.   *Depending on which meal is ready first, it will sit on top of the "event queue" shelf until ready.*
6.   *When both meals are ready, they will be taken out od queue and processed!.*

The key takaway for asynchronous architecture here is that is it *much more efficient* than synchronous architecture because it does NOT block
the single-thread waiter from waiting on other tables.

```JavaScript
        console.log('Order 1 served...')

        setTimeout(function() {   
        console.log('Order 2 -- SPECIAL REQUEST: SERVE LAST...')
        }, 2000);   

        console.log('Order 3 served...');
```
In this example, we have 3 orders to be executed.  However, the second order is an **asynchronous** function (i.e. setTimeout) which will run AFTER
2 seconds have expired. 

In a **synchronous program**, the program would simply execute the first order, execute the second order (after 2 seconds), and
then execute the third order as follows (assuming the setTimeout function is not there):
```
        Order 1 served...
        #################################################################
        After 2 seconds (blocking the rest of the program until complete)
        #################################################################
        Order 2 -- SPECIAL REQUEST: SERVE LAST...
        Order 3 served...
```
Of course, this is inefficient because the second order is "blocking" the third order from executing since the third order does not have any special 
instructions. 

In an **asynchronous program**, the program would execute in a "non-blocking" fashion, not waiting for parts of the code like the setTimeout function
from executing before moving on to the next one. 
```
        Order 1 served...
        Order 3 served...
        ########################################################
        After 2 seconds (non-blocking because Order 3 completed)
        ########################################################
        Order 2 -- SPECIAL REQUEST: SERVE LAST...
```
<br>

## Is Node asynchronous?
Node has an **asynchronous**  (or **non-blocking**) architecture that uses a **single thead to service multiple requests**.  Asynchronous operations 
allow Node.js to serve multiple requests efficiently as opposed to **synchronous** (or **blocking**) architecture, where a program must process one t
hing first and *then* move on to the next task.


<br>

## What are the patterns we can use in Node to deal with asynchronous code?
There are three patterns that can help deal with asynchronous code:
1.      Callbacks 
2.      Promises
3.      Async/Await


<br>

## What is a callback?
A **callback** is a function that will be called when the result of the asynchronous function is ready.

<br>

### How do you use a callback in a function?
Suppose you have a function that needs to return a user from a database. 

In the following example, we have a function that will get a user by id (i.e. getUser(id)).  When we call getUser, we *should* be able to
retrieve the information to be returned.  However, in real world application you might not be able to immediately retrieve the information
from a database immediatley, which is why in this case the delay is simulated by using a setTimeout of 2 seconds:

```JavaScript
        console.log('Before');
        const user = getUser(1);
        console.log(user);
        console.log('After');

        function getUser(id) {                               
                setTimeout(function() {
                        console.log('Reading a user from database...');
                        return { id: id, Username: 'Alan' }   ;                       
                }, 2000);
        }     
```

If you run the code above, you will see this in the console:
```
        Before
        undefined
        after
        Reading a user from a database...

```
 So why did we get *undefined* instead of the user when executed the code?  The reason is because the function within the setTimeout function executed
 2 seconds AFTER the initial execution.  In other words, the function was not available at the time of calling getUser to show in the console.  However, we
 can use a **callback** to deal with this issue.

<br>

### You can use callbacks to deal with asynchronous code!
To use a callback in the example above, we have to do 3 things:

1. Add "callback" to our function parameters.
2. Call the "callback" function (in this case with the user object).
3. Call the function (e.g. getUser) with two arguments: the id and function called with the argument (i.e. the user object).

```JavaScript
console.log('Before');
getUser(1, function(user) {                                    // Call get user with the id and a function that 
   console.log('User', user)                                   // is called with the user object as the argument.
});    
console.log('After');

function getUser(id, callback) {                               // Add callback as a second argument             
   setTimeout(function() {
      console.log('Reading a user from a database...');
         callback({ id: id, Username: 'Alan' });               // Call the callback WITH the user object!
   }, 2000);
}
```

If you run the code above, you will see this in the console:
```
        Before
        After
        Reading a user from a database...
        User { id: 1, Username: 'Alan' }

```

<br>

### However, using multiple callbacks can be hell...
One of the drawbacks to using callbacks is that your code can devolve into a series of nested callback functions, which is commonly referred to as 
*"Callback hell"* or *"Christmas tree problem"* or *"pyramid of doom"*.  This is something you want to avoid because it is associated with bad coding practices.


<br>

## How do promises make it easier to work with asynchronous operations
A "promise" is an object that holds the eventual result of an asynchrnous operation.  In other words, *a "promise" essentially promisses you to give you the result of an asynchronous operation.*  That result can have either another value or an error.  With promises, you can avoid the issues asociate with "callback hell".

A promise can have 3 different states: Pending, Resolved, or Rejected.  To show how these states stack up next to each other, take a look a the example below:

```
                                             [ Fulfilled ] => If async operation completed successfully.
    [ Pending ]  -------Asynchronous-------->      -or-
                         Operation           [ Rejected ]  => If aysnc operation has an error.
```

* When a promise is **PENDING**, the promise object is essentially created and can then kick-off some asynchronous operation.

* When a promise is **RESOLVED**, the result is ready from the asynchronous operationm, the promise can be fulfilled.  In other words, the
asynchronous operation completed successfully and you have a value ready for you to use.

* When a promise is **REJECTED**, something went wrong with the execution of the asychronous operation and the promise is rejected.

<br>

### How do you use Promises?
To use a promise, first create a *constructor* function which will create a promise that takes a function as an argument with two parameters, *resolve* or *reject*
and store as a constant with your preferred variable name (e.g. myProm).  

```JavaScript

                const myProm = new Promise(function(resolve, reject) {
                    // Some async work goes here.
                    ...
                    ...
                    ...
                   
                    ...
                    ...
                    ...
                    ...
                    ...

                });

```
Inside this promise, you can see a setTimeout function which is delayed 2 seconds and simulates an asynchronous operation.  This asynchronous operation will be
*consumed* (i.e. used) somewhere else in the code because the promise object *promises* us that the result (e.g. "The promise works!") will be given to us or else
we will get a rejected message (e.g. Sorry, the promise didnt work).


```JavaScript

                const myProm = new Promise(function(resolve, reject) {
                   setTimeout(function() {
                      resolve("The promise works!");                      
                      reject(new Error('Sorry, the promise didnt work'));  
                   }, 2000);                                                   
                });

                ...
                ...
                ...
                ...

```



```JavaScript

                const myProm = new Promise(function(resolve, reject) {
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

```

