const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Method 1.2: fetching from the api without proxy server
let apiQuotes = [];

// Show loading
function loading(){
    loader.hidden= false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    loader.hidden= true;
    quoteContainer.hidden = false;
}

function newQuote() {
    loading();
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    // change the content of html

    // check if author field is blank, replace it with 'unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    
    complete()
}

async function getQuotes(){
    loading();
    
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl); // response will not be set until fetching the apiUrl
        apiQuotes = await response.json(); // apiQuotes will not be set until it returning this response in json format
        
        // pick a quote
        newQuote();

    } catch (error) {
        // catch error here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank'); // allow opening the twitter in a new tab
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();




// // Method 2: local load (in case the api is down)
// function newQuote() {
//     // pick a random quote from apiQuotes array
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
//     console.log(quote);
// }
// // on load
// newQuote();