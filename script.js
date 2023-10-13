// JavaScript code for APOD web page

// Select elements from the HTML
const img = document.querySelector("#galaxy"); // Image container
const h2 = document.querySelector("#pic_txt"); // Picture title
const p = document.querySelector("#pic_p"); // Picture description
const h3 = document.querySelector("#copy"); // Copyright text
const main = document.querySelector(".main"); // Main content container

// API URL for NASA APOD (Astronomy Picture of the Day)
const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=";

// Get the date input element
const dateInput = document.getElementById("date");

// Listen for the change event on the date input
dateInput.addEventListener("change", async function () {
    // Show the main content
    main.classList.add("main-visible");
    h2.innerText = ""; // Clear the picture title
    p.innerText = ""; // Clear the picture description

    // Get the selected date from the date input
    const selectedDate = dateInput.value;
    console.log("Selected date:", selectedDate);

    try {
        // Fetch data from the NASA APOD API using the selected date
        const response = await fetch(url + selectedDate);
        const data = await response.json();

        // Clear the picture title and description
        h2.innerText = "";
        p.innerText = "";

        // Set the copyright text
        h3.innerText = "Copyright: " + data.copyright;

        // Set the background image for the main image container
        const img_url = data.url;
        img.style.backgroundImage = 'url("' + img_url + '")';

        // Apply a typewriter effect to the picture title
        typewriterEffect(h2, data.title);

        // Apply a typewriter effect to the picture description
        typewriterEffect(p, data.explanation);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    // Function to add a typewriter effect to an element
    function typewriterEffect(element, text) {
        const characters = text.split('');
        let i = 0;
        element.innerText = "";

        const typeWriterInterval = setInterval(function () {
            if (i < characters.length) {
                if (characters[i] === '\n') {
                    element.appendChild(document.createElement('br'));
                } else {
                    element.appendChild(document.createTextNode(characters[i]));
                }
                i++;
            } else {
                clearInterval(typeWriterInterval);
            }
        }, 15);
    }
});

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
