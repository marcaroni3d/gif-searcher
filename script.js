// ELEMENTS
const img = document.querySelector('img')
const newImageButton = document.querySelector('.new-image-button')
const searchButton = document.querySelector('.search-button')
const searchInput = document.querySelector('.search-input')
const searchDisplay = document.querySelector('.search-display')
const loader = document.querySelector('.loading')

let searchString = ''
const defaultSearch = 'cats'

// LISTENERS
newImageButton.onclick = fetchHandler
searchButton.onclick = handleSearch
searchInput.onkeydown = (e) => { if (e.keyCode === 13) handleSearch() }
window.onload = init()

// FUNCTIONS
function init() {
    searchString = defaultSearch
    searchDisplay.innerHTML = searchString
    searchInput.value = ''
    fetchHandler()
}

function handleSearch() {
    searchString = searchInput.value
    searchDisplay.innerHTML = searchString
    fetchHandler()
}

function fetchHandler() {
    displayLoading()

    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=zhtTBSfywHzSGo8tDczGNW4T7rNgJ0pz&s=${searchString}`, {mode: 'cors'})
    .then(response => response.json())
    .then(function(response) {
        img.src = response.data.images.original.url
        hideLoading()
    });
}

function displayLoading() {
    loader.classList.add('display')
    setTimeout(() => {
        loader.classList.remove('display')
    }, 5000)
}

function hideLoading() {
    loader.classList.remove('display')
}