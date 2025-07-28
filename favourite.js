const container = document.querySelector(".favouriteContainer");
const quoteText = document.querySelector(".quoteText");
const authorText = document.querySelector(".authorText");
const removeBtn = document.querySelector(".removeBtn");

function loadFavourites() {
    container.innerHTML = "";

    if (localStorage.length === 0) {
        container.innerHTML = "<p>You haven’t saved any quotes yet.</p>";
        return;
    } else {
        Object.keys(localStorage).forEach((key) => {
            try {
                const { quote, author } = JSON.parse(localStorage.getItem(key));

                const newQuote = document.createElement("div");
                newQuote.className = "wrapper";
                newQuote.innerHTML = `
                    <div class="quoteContainer">
                        <div class="quote">
                            <i class="fa-solid fa-quote-left"></i>
                            <p class="quoteText">${quote}</p>
                            <i class="fa-solid fa-quote-right"></i>
                        </div>
                        <div class="author">
                            <p class="authorText">~ ${author}</p>
                        </div>
                        <div class="remove">
                            <button class="removebtn" data-key=${key}><i class="fa-solid fa-trash"></i></button>
                        </div>

                    </div>
                `;

                container.append(newQuote);
            } catch (error) {
                console.log(error);
            }
        });
    }
}

loadFavourites();



// Event delegation for all remove buttons
container.addEventListener("click", (e) => {
    // find button (in case user clicked on the icon inside)
    const btn = e.target.closest(".removebtn");

    if (btn) {
        const key = btn.getAttribute("data-key");
        localStorage.removeItem(key);
        loadFavourites();
    }
});
