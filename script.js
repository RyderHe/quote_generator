const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Method 1.1: fetching from the api with proxy server to fix cors error

// Show loading 
function showLoadingSpinner(){
    loader.hidden= false;
    quoteContainer.hidden = true;
}

// Hide loading 
function removeLoadingSpinner() {
    loader.hidden= true;
    quoteContainer.hidden = false;
}

async function getQuote(){

    // show loader, stop quote 
    showLoadingSpinner();
    
    // // Method 1.1 : use proxy 
    proxyUrl = 'https://sleepy-harbor-32857.herokuapp.com/'; // own proxy server
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try {
        const response = await fetch(proxyUrl + apiUrl); // response will not be set until fetching the proxyUrl & apiUrl
        const data = await response.json(); // data will not be set until it returning this response in json format
        
        console.log(data);

        // set the quote and author texts

        // check if author field is blank, replace it with 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerHTML = 'Unknown';
        } else {
            authorText.innerHTML = data.quoteAuthor;
        }

        // check quote length to determine styling
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerHTML = data.quoteText;

        // stop loader, show quote
        removeLoadingSpinner();
    } catch (error) {
        // catch error here
        getQuote();
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; // or innerText
    window.open(twitterUrl, '_blank'); // allow opening the twitter in a new tab
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuote();
