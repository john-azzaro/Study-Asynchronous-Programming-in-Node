// Synchronous execution example:

console.log('Order One served...');              // When the first line executes, the program is "blocking" the second line until this line is done executing.
console.log('Order Two served...');              // This line executes only AFTER the first line executes.

/* 
The result would be:

    Order One served...
    Order Two served...

This program would be "synchronous" or "blocking" because one line must finish executing before the next line can execute.

*/
