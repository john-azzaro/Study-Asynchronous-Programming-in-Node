# Asynchronous Programming in Node

<br>

## What is Asynchronous Programming in Node Study?
"Asynchronous Programming in JavaScript Study" is an examination of 

<br>


### Asynchronous architecture is very different than Synchronous architecture.
As opposed to **synchronous** (or **blocking**) architecture which is where a program will process one thing first and then process a second, 
**asynchronous**  (or **non-blocking**) architecture uses a single thead to service multiple requests.

Let's use the analogy of a restraurant to show the difference between asynchronous vs synchronous architecture.  In both restaurants, there are two
tables, a kitchen to process the orders from the tables, and a waiter to send those orders from the table to the kitchen and back again.

In a **synchronous** (or **blocking**) restaurant, the waiter will:
1.   **Serve table 1**.
2.   Take that order to the kitchen.
3.   Wait at the kitchen for the order, then bring the food back to Table 1.
4.   **Serve Table 2**.
5.   Take that order to the kitchen.
6.   Wait at the kitchen for the order, then bring the food back to Table 2.

```JavaScript
console.log('Order 1 served...');
console.log('Order 2 served...')
```
In the example above, the first line is "blocking" the second line, which has to wait for the first line to execute.


The key takeaway here is that *this process is very inefficient* since the waiter has to wait at the kitchen for the order to fill and send back to
Table 1 before moving on to Table 2.  In this example, Table 1 is *blocking* the second table, which can only be served *after* table 1 is served.

In a **asynchronous** (or **non-blocking**) restaurant, the waiter will:
1.   **Serve table 1**.
2.   Take that order to the kitchen.
3.   **Serve Table 2**.
4.   Take that order to the kitchen.
5.   Depending on which meal is ready first, it will sit on top of the "event queue" shelf until ready.
6.   When both meals are ready, they will be taken out od queue and processed!.

The key takaway for asynchronous architecture here is that is it *much more efficient* than synchronous architecture because it does NOT block
the single-thread waiter from waiting on other tables.

<br>

### Node is Asynchronous
Node has an Asynchronous, "non-blocking" architecture that uses a single thread to service multiple requests.










### Asynchronous operations are executed in a different order then how they are listed in a program.




### Node has an asynchronous, non-blocking architecture.
This is a test

**Asynchronous programming** 

## How does Asynchronous Programming in JavaScript work in Node?

