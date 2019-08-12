// Asynchronous example

console.log('Order 1 served...');                                  

setTimeout(function() {                                      
console.log('Order 2 -- SPECIAL REQUEST: SERVE LAST...');                           
}, 2000);   

console.log('Order 3 served...');    

/* 
When this code is executed:
    1. "Order 1 served..." is displayed to the console.
    2. "Order 3 served..." is displayed to the console.
    3. "Order 2 -- SPECIAL REQUEST: SERVE LAST..." is displayed to the console after 2 seconds expire.

The setTimeout function is "asynchronous", when the function is called it will schedule a task to be performed
in the future, specifically 2 seconds in the future.

    IMPORTANT TO NOTE, the rest of the program was NOT BLOCKED when the setTimout function runs.  Instead, the setTimeout
    function is ready, the message which was prepared in the "event queue", will be taken out of queue to be executed! 

With all that in mind, the result would be:

    Order 1 served...
    Order 3 served...
    Order 2 -- SPECIAL REQUEST: SERVE LAST...

*/