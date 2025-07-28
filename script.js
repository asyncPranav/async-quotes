// quote
const quoteText = document.querySelector(".quoteText");
const authorText = document.querySelector(".authorText");

// buttons
const favourite = document.querySelector(".favourite");
const favouriteIcon = document.querySelector(".fa-heart");
const next = document.querySelector(".next");
const nextIcon = document.querySelector(".fa-forward-step");

// navbar
const navbar = document.querySelector(".navbar");
const navButton = document.querySelector(".navButton");

// api
const API = "https://api.api-ninjas.com/v1/quotes";
const API_KEY = "J2ICniv/elWwchmFyDflKA==JOre6csUV9gtHltw";

// local storage key
let uniqueKey = `quote-${Date.now()}`;
let currentQuote = "";
let currentAuthor = "";

fetchQuotes();

// fetch quotes
async function fetchQuotes() {
    quoteText.textContent = "Fetching Quote...";
    authorText.textContent = " ~ Fetching Author...";

    try {
        const response = await fetch(API, {
            method: "GET",
            headers: {
                "X-Api-Key": API_KEY,
            },
        });

        const data = await response.json();
        const quoteObj = data[0];
        const quote = quoteObj.quote;
        const author = quoteObj.author;


        if (quote.length >= 200) {
            // console.log(quote.length);
            fetchQuotes();
            
        } else {
            // console.log(quote.length);
            quoteText.textContent = quote;
            authorText.textContent = "~ " + author;

            // local storage
            currentAuthor = author;
            currentQuote = quote;
        }
    } catch (error) {
        quoteText.textContent = error;
        console.error(error);
    }
}

// fetch next quote
next.addEventListener("click", () => {
    fetchQuotes();
    uniqueKey = `quote-${Date.now()}`;

});

// add to favourite
favourite.addEventListener("click", () => {
    localStorage.setItem(
        uniqueKey,
        JSON.stringify({
            quote: currentQuote,
            author: currentAuthor,
        })
    );
});

// nav button working
navButton.addEventListener("click", () => {
    navbar.classList.toggle("active");
    // console.log(navbar.classList);
    if (navButton.classList.contains("fa-chevron-right")) {
        navButton.classList.replace("fa-chevron-right", "fa-chevron-left");
    } else {
        navButton.classList.replace("fa-chevron-left", "fa-chevron-right");
    }
});
