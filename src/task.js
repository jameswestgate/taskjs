/*
* JavaScript browser Task processing library
* https://github.com/jameswestgate/taskjs
*
* Copyright (c) James Westgate 2012
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

//-- Task / Map / Reduce
(function(root) {
	
	//Define the Task class
	
	//TODO: synchronise multiple tasks onto one timer
	//TODO: serialise task onto worker (if available)
	root.Task = function() {
	
	    //Define variables for map/reduce
	    var stack = []; //Contain an array of functions for each dimension
	    var pointer = -1; //Dimension of stack to use
	    var result = null; //Reduce result
			
		var reset = this.reset = function() {
			stack = []; 
	    	pointer = -1;
	    	result = null;
		}
	    
	    //Replace each value in array provided with result of the function
	    this.map = function(a, f) {
	
	        pointer++;
	
	        //Define stack array for this level and add function to stack
	        if (stack.length <= pointer) stack[pointer] = [];
	        stack[pointer].push({ f: function (i) { a[i] = f(i, a[i]); }, i: 0, a: a });
	
	        pointer--;
	    };
	
	    //Update a single result by applying a function to each value in the array
	    this.reduce = function(a, init, f) {
	
	        pointer++;
	
	        //Make sure reduce higher than map cannot be called
	        if (pointer <= stack.length) {
	
	            //Initialise and place function on stack
	            result = init;
	            stack[pointer].push({ f: function (i) { result = f(i, a[i], result); }, i: 0, a: a });
	        }
	
	        pointer--;
	    };
	
	    //Execute the functions added to the stack
	    this.execute = function(options, callback) {
	
			result = null;

			if (typeof options === 'undefined') options = {};
			if (typeof options.interval === 'undefined') options.interval = "20";
			if (typeof options.async === 'undefined') options.async = true;
	        if (typeof callback !== 'function') callback = function () {};
	
	        var executeStack = function () {
	
	            //Check if there are functions in a higher stack
	            if (pointer < stack.length - 1 && stack[pointer + 1].length) pointer++;
	
	            //Execute the function in the current stack dimension and increment array index
	            var obj = stack[pointer][0];
	            obj.f(obj.i);
	            obj.i++;
	
	            //Remove function from stack if completed
	            if (obj.i === obj.a.length) {
	                stack[pointer].shift();
	                if (!stack[pointer].length) {
						stack.splice(pointer, pointer + 1);
						if (!stack[pointer] || !stack[pointer].length) pointer--;
					}
	            }
	        };
	
	        //Execute the functions asynchronously on a timer, or synchronously
	        if (options.async) {
	            var timer = setTimeout(function () {
	                
					//Execute for 20 ms at a time
					var timeout = new Date().getTime() + options.interval;
					
					while (new Date().getTime() <= timeout) {
					
						//If end of stack then quit
						if (!stack.length) {
							callback(result);
							clearInterval(timer);
							reset();
							return;
						}
						
						executeStack();
					};
	                
	                //Recall this anonymous function in eg 20 ms
	                timer = setTimeout(arguments.callee, options.interval);
					
	            }, options.interval);
	        }
	        else {
	
	            while (stack.length) executeStack();
	            callback(result);
				reset();
	        }
	    };
	}

})(window);
	