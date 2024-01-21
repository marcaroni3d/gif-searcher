// ELEMENTS
const img = document.querySelector('img')
const newImageButton = document.querySelector('.new-image-button')
const searchButton = document.querySelector('.search-button')
const searchInput = document.querySelector('.search-input')
const searchDisplay = document.querySelector('.search-display')
const errorDisplay = document.querySelector('.error')
const loader = document.querySelector('.loading')

let searchString = ''
const defaultSearch = 'cats'

// LISTENERS
newImageButton.onclick = fetchHandler
searchButton.onclick = handleSearch
searchInput.onkeydown = (e) => { if (e.keyCode === 13) handleSearch() }
window.onload = init()

// INIT
function init() {
    searchString = defaultSearch
    searchDisplay.innerHTML = searchString
    searchInput.value = ''
    fetchHandler()
}

// LOADER
function displayLoading() {
    loader.classList.add('display')
    setTimeout(() => {
        loader.classList.remove('display')
    }, 5000)
}

function hideLoading() {
    loader.classList.remove('display')
}

// FETCHING
function handleSearch() {
    searchString = searchInput.value
    searchDisplay.innerHTML = searchString
    fetchHandler()
}

async function fetchHandler() {
    displayLoading()
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=zhtTBSfywHzSGo8tDczGNW4T7rNgJ0pz&s=${searchString}`, {mode: 'cors'})
            if (!response.ok) throw new Error ('Something went wrong')
        const gifs = await response.json()
            if (gifs.data.images === undefined) throw new Error ('No results found')
        img.src = gifs.data.images.original.url
    }
    catch(error) {
        displayError(error)
    }
    hideLoading()
}

function displayError(text) {
        hideLoading()
        errorDisplay.innerHTML = `${text}`
}