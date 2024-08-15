const content = document.querySelector("#content");
const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const pageInfo = document.querySelector("#page-info");

const URL = "https://jsonplaceholder.typicode.com/photos";
const ITEMS_PER_PAGE = 18; // Number of items to display per page
let currentPage = 1;
let totalPages = 0;

const fetchAndDisplayData = async (page) => {
    console.log("Getting data...");
    let response = await fetch(URL);
    let data = await response.json();

    totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    const items = data.slice(start, end);

    content.innerHTML = '';

    items.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `albumId: ${item.albumId}<br>id: ${item.id}<br>title: ${item.title}<br>`;

        const img = document.createElement('img');
        img.src = item.url;
        img.width = 100;
        itemDiv.appendChild(img);

        content.appendChild(itemDiv);
    });

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
};

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchAndDisplayData(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchAndDisplayData(currentPage);
    }
});

// Initial fetch
fetchAndDisplayData(currentPage);

