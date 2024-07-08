async function createNekoSamaButton() {
  const existingButton = document.querySelector('.neko-sama-button');
  if (existingButton) {
    return; // Exit early if button already exists
  }

  const nekoSamaButton = document.createElement('button');
  nekoSamaButton.textContent = 'Neko-sama';
  nekoSamaButton.classList.add('neko-sama-button');
  nekoSamaButton.style.cssText = 'padding: 15px; background-color: transparent; border: none; color: #A8A095; cursor: pointer;';

  nekoSamaButton.onmouseover = function () {
    nekoSamaButton.style.color = '#002EAD';
  }

  nekoSamaButton.onmouseout = function () {
    nekoSamaButton.style.color = '#A8A095';
  }

  // Set onclick event using addEventListener for better event handling
  nekoSamaButton.addEventListener('click', async function () {
    try {
      const animeTitle = document.querySelector('h1').textContent.trim();
      console.log(animeTitle);

      const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://neko-sama.fr/animes-search-vostfr.json'));
      const data = await response.json();

      const animeData = data.find(
        anime =>
          anime.title.toLowerCase().includes(animeTitle.toLowerCase()) ||
          anime.others.toLowerCase().includes(animeTitle.toLowerCase())
      );

      const animeUrl = animeData ? animeData.url : 'https://neko-sama.fr/anime';
      window.open(animeUrl, '_blank');
    } catch (error) {
      console.error('Error fetching anime data:', error);
    }
  });

  // Delayed append using requestAnimationFrame for DOM readiness
  function appendButton() {
    const targetElement = document.querySelector("#app > div.page-content > div > div.header-wrap > div.header > div > div.content > div");
    if (targetElement) {
      targetElement.appendChild(nekoSamaButton);
    } else {
      requestAnimationFrame(appendButton);
    }
  }
  requestAnimationFrame(appendButton);
}

createNekoSamaButton();