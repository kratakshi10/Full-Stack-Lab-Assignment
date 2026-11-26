
async function getJoke() {

    const jokeElement = document.getElementById("joke");

    jokeElement.innerHTML = "Loading joke...";

    try {
        const response = await fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch joke");
        }

        const data = await response.json();

        jokeElement.innerHTML = data.joke;

    } catch (error) {
        jokeElement.innerHTML = "Unable to load joke. Please try again!";
    }
}
