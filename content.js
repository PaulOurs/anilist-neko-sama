// Function to create the Neko-sama button
function createButton() {
  const button = document.createElement('button');
  button.textContent = 'Neko-sama';
  button.classList.add('neko-sama-button');
  button.style.cssText = 'padding: 15px; background-color: transparent; border: none; color: #A8A095; cursor: pointer;';

  button.onmouseover = () => button.style.color = '#002EAD';
  button.onmouseout = () => button.style.color = '#A8A095';

  return button;
}

// Function to append the button to the target element
function appendButton(button) {
  function attemptAppend() {
    const targetElement = document.querySelector("#app > div.page-content > div > div.header-wrap > div.header > div > div.content > div");
    if (targetElement) {
      targetElement.appendChild(button);
    } else {
      requestAnimationFrame(attemptAppend);
    }
  }
  requestAnimationFrame(attemptAppend);
}

// Function to fetch anime data
async function fetchAnimeData() {
  const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://neko-sama.fr/animes-search-vostfr.json'));
  return await response.json();
}

// Function to find the anime by title
function findAnime(data, title) {
  let anime = data.find(anime => anime.title.toLowerCase() === title.toLowerCase());
  if (!anime) {
    anime = data.find(
      anime =>
        anime.title.toLowerCase().includes(title.toLowerCase()) ||
        (anime.others && anime.others.toLowerCase().includes(title.toLowerCase()))
    );
  }
  return anime;
}

// Function to handle button click event
async function onButtonClick() {
  try {
    const animeTitle = document.querySelector('h1').textContent.trim();
    console.log(animeTitle);

    const data = await fetchAnimeData();
    const animeData = findAnime(data, animeTitle);

    const animeUrl = animeData ? animeData.url : 'https://neko-sama.fr/anime';
    window.open(animeUrl, '_blank');
  } catch (error) {
    console.error('Error fetching anime data:', error);
  }
}

// Main function to initialize the button and set event listeners
function initializeNekoSamaButton() {
  const existingButton = document.querySelector('.neko-sama-button');
  if (existingButton) {
    return; // Exit early if button already exists
  }

  const button = createButton();
  button.addEventListener('click', onButtonClick);
  appendButton(button);
}

initializeNekoSamaButton();