const img = document.querySelector('img')
const button = document.querySelector('button')
const loadingText = document.querySelector('.loading-text')

function fetchCats() {
    updateLoadingText()
    fetch('https://api.giphy.com/v1/gifs/translate?api_key=zhtTBSfywHzSGo8tDczGNW4T7rNgJ0pz&s=cats', {mode: 'cors'})
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        img.src = response.data.images.original.url
        setTimeout(updateLoadingText, 500)
    });
}

function updateLoadingText() {
    if (loadingText.textContent == null || loadingText.textContent == undefined || loadingText.textContent == '') {
        loadingText.textContent = 'Loading...'
    }
    else {
        loadingText.textContent = ''
    }
}

button.onclick = fetchCats

fetchCats()