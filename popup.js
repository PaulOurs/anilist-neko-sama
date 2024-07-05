  // Create the Neko-sama button
  const nekoSamaButton = document.createElement('button');
  nekoSamaButton.textContent = 'Neko-sama';
  nekoSamaButton.style.cssText = 'padding: 15px; background-color: transparent; border: none; color: #A8A095; cursor: pointer;';

  // Set the onmouseover event for the button
  nekoSamaButton.onmouseover = function () {
    nekoSamaButton.style.color = '#002ead';
  };

  // Set the onmouseout event for the button
  nekoSamaButton.onmouseout = function () {
    nekoSamaButton.style.color = '#A8A095';
  };

// Set the onclick event for the button
nekoSamaButton.onclick = async function () {
  // Get the title of the anime from the page
  const animeTitle = document.querySelector('h1').textContent.trim();
  console.log(animeTitle);
  // Fetch the Neko-sama data
  const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://neko-sama.fr/animes-search-vostfr.json'));
  const data = await response.json();
  // Find the data for the anime
  const animeData = data.find(
    anime =>
      anime.title.toLowerCase().includes(animeTitle.toLowerCase()) ||
      anime.others.toLowerCase().includes(animeTitle.toLowerCase())
  );

  // Open the Neko-sama link for the anime or the main page if not found
  const animeUrl = animeData ? animeData.url : 'https://neko-sama.fr/anime';
  window.open(animeUrl, '_blank');
};

// Append the button to the page after a delay of 1 second
setTimeout(() => {
  document.querySelector("#app > div.page-content > div > div.header-wrap > div.header > div > div.content > div").appendChild(nekoSamaButton);
}, 1000);