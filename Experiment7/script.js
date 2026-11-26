async function searchUniversities() {

    const country = document.getElementById("country").value.trim();
    const list = document.getElementById("universityList");
    const message = document.getElementById("message");

    list.innerHTML = "";
    message.innerHTML = "";

    if (country === "") {
        message.innerHTML = "Please enter a country name!";
        return;
    }

    message.innerHTML = "Loading universities...";

    try {
        const response = await fetch(
            `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}}`
        );
        console.log("Country:",country);

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const universities = await response.json();

        if (universities.length === 0) {
            message.innerHTML = "No universities found!";
            return;
        }

        message.innerHTML = universities.length + " universities found.";

        universities.forEach(university => {

            const card = document.createElement("div");
            card.className = "card";

            const website = university.web_pages[0] || "#";

            card.innerHTML = `
                <h3>${university.name}</h3>
                <p><b>Country:</b> ${university.country}</p>
                <p><b>State:</b> ${university["state-province"] || "Not Available"}</p>
                <p><b>Website:</b>
                    <a href="${website}" target="_blank" rel="noopener noreferrer">
                        Visit Website
                    </a>
                </p>
            `;

            list.appendChild(card);
        });

    } catch (error) {
        message.innerHTML = "Unable to fetch data. Please try again!";
    }
}