var http = require('http');

// Parse first script arguments as the word to search.
var parse = function(arg) {
  var word = process.argv[2];
  var regex = new RegExp('^(?=[A-z]*$)(?:.{5}|.{7})$');

  if (!regex.test(word)) {
    console.log(word + ' is not a valid 5 or 7 letter word.');
    return;
  } else {
    search(word)
  }
};

// Run a search on all combinations of upper/lower case letters of the word.
var search = function(word) {
  console.log('searching ' + word);
  var ids = permutate(word)
  var interval = 3000;

  (function loop (i) {
    setTimeout(function() {
      console.log('interval! ' + ids[i-1]);
      if (--i) loop(i);
    }, 200);
  })(ids.length);

  // TODO, figure out appropriate rate limit and make requests for realsies
  //makeRequest(id);
};

// Make the HTTP GET to imgur for the given id.
var makeRequest = function(id) {
  var imgurURL = 'http://imgur.com/';

  var req = http.get(imgurURL + id, function(res) {
    
    // TODO, save 200s as good, discard 404s as bad
    switch (res.statusCode) {
      case 200: {
        console.log(id + ' status 200');
        break;
      }
      case 404: {
        console.log(id + ' status 404');
        break;
      }
      default: {
        console.log('Unexpected HTTP response code: ' + res.statusCode);
      }
    }
  });

  req.on('error', function(e) {
    console.log('Request error: ' + e);
  });
};

// Generate a list of all upper/lower case permutations of a word and return it.
var permutate = function(word) {
  var letters = word.split('');
  var words = [];

  var bits = 1 << letters.length;

  for (var i = 0; i < bits; i++) {
    for (var j = i, k = 0; j; j >>= 1, k++) {
      letters[k] = (j & 1) ? letters[k].toUpperCase() : letters[k].toLowerCase();
    }

    words.push(letters.join(''));
  }

  return words;
};

// Immediately invoke the parse function when script is called.
(function() {
  parse(process.argv[2]);
})();