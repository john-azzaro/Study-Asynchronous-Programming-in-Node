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

### Synchronous architecture "blocks" a program 

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

### With asynchronous architecture, taks are NOT blocked but scheduled to complete in the future.

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


##Is Node asynchronous?
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

### How do you use a callback in a function?
Suppose you have a function that needs to return a user
 



