module('task');

test('Task', function() {

    // -- Test Map / reduce --
    var values = new Array(9);
	var task = new Task();

    //Add functions to place the values 1 to 9 in an array
    task.map(values, function (index, value) {
        return index + 1;
    });

    //Add functions to sum the values from 0 to 9
    task.reduce(values, 0, function (index, value, total) {
        return (total + value);
    });

    task.execute({async: false}, function (result) {
        ok(result == 45, 'Simple reduced result is ' + result);
    });
    
    
    //-- Test 2, calculate no. of primes in first 50000 no's --
    //Create an array of booleans representing prime = false
    var bound = 50000;
    var composites = new Array(bound);
	var task2 = new Task();
	
    //Set all to prime (false) to start
    task2.map(composites, function(index, value) {
        return false;
    });

    //Calculate the sqr root of the upper bound
    var upperBoundSquareRoot = Math.floor(Math.sqrt(bound), 0);

    //For each item, calculate the non primes
    task2.map(composites, function(index, value) {

        if (index < 2 || index > upperBoundSquareRoot) return value;

        //If the array item is a prime then map all non primes
        if (!value) {

            var k = index * index;

            task2.map(composites, function(index2, value2) {

                if (index2 == k) {

                    k += index;
                    return true;
                }
                return value2;
            });
        }
        return value;
    });

    //Count only the primes
    task2.reduce(composites, 0, function(index, value, result) {

        if (index >= 2 && value == false) result++;
        return result;
    });
	
	//Stop the unit tests
    stop();

    task2.execute({async: true}, function (result) {
		ok(result == 5133, 'Prime total reduced result is ' + result);

		//continue the test  
        start();
    });

	
	//-- Test 3 - test single map. Classic word breaking map/reduce.	
	var matchSentence =  /[^.!?]+/g; //Regex to split text into sentences
	var matchWord = /[a-zA-Z0-9_]+/g; //Regex to split sentences into words
	var text = 'This is a sentence and this is a test.';
	var dictionary = {};
	
	//Split into sentences by using the supplied regex
    var sentences = text.match(matchSentence); //Any character that delimits a sentence
	var words;
	var task3 = new Task();
	
	//Trim each sentence and break into words
	task3.map(sentences, function(index, sentence) {
		
		words = sentence.trim().match(matchWord);
        
    	//Loop through all words and count the times they appear
    	task3.map(words, function(index2, word){
			
			word = word.toLowerCase();
			
			if (dictionary[word] == null) dictionary[word] = 0;
			dictionary[word]++;
			
			return word;				
		});
		
		return sentence;
	});
	
	task3.execute({async: false}, function (result) {
		
		//Get the keys in the index
		var keys = [], i=0;
		for (keys[i++] in dictionary);
		
		ok(keys.length > 0, 'Keys added to index: ' + keys.length);
		ok(dictionary['this'] == 2, 'Word count for "this" is 2');
		ok(dictionary['sentence'] == 1, 'Word count for "sentence" is 2');
		ok(dictionary['balloon'] == null, 'Word "balloon" not found.')
    });

});




