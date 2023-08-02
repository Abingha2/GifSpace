let gifyApi;
let favoriteGif=[];

async function ready() {
    gifyApi =localStorage.getItem("Api Key") || prompt("Please enter Gify Api Key")
    localStorage.setItem("Api Key", gifyApi)
    const display = document.querySelector(".gifmain")
    const categories = await gify(gifyApi, "categories") 
    for (const image of categories.data) {
        const gif = image.gif.images.preview_gif.url
        const gifTitle = image.name
        const gifBlock = await showGif(gif, gifTitle)
        display.appendChild(gifBlock)
    }
    //if user click search tab then activate the following function with user prompt.
    if (window.location.href.indexOf("search.html") > -1) {
        //this set the variable search bar to whatever the user is inputing.
        const searchBar = document.querySelector("#search")
        //this is listening for the search result from the user as they type.
        searchBar.addEventListener("keydown", async (event) => {
            //this is waiting for the user to hit enter with their completed search
            if (event.key === "Enter") {
                //this is displaying the search after the user hits enter.
                await search(display, event.target.value)
            }
        })
    } else if(window.location.href.indexOf("favorites.html")> -1) {
        display.innerHTML = null
        await loadFavorites();
        for(const favorite of favoriteGif){
            display.appendChild( await showGif(favorite))
        }
    }
}//needs to  call my api function and try to do something with the results 
//ab steps
async function search(display, userSearch) {
    //prompt box appears on screen for user
    //user types in prompt box and hit enter
    //event listner.(personal stretch goal)
    //variables taken from users search in an empty string 
    //taking the results of usersearch and sends it to api with certain censors
    const searchResults = await gify(gifyApi, "search", null, 0, "pg-13", userSearch)
    display.innerHTML = null
    //this one sends back the search results back to the program for the user to see.
    for (const image of searchResults.data) {
        const gifBlock = await showGif(image.images.preview_gif.url)
        display.appendChild(gifBlock)
    }
}
//varaibles sent to api
//api responds with corresponding gifs to corresponding variables
//program displays corresponding gifs on page for user to look through
//user sees gifs
async function gify(gifyApi, endpoint, limit, offset, rating, query,) {
    const action = await fetch(`https://api.giphy.com/v1/gifs/${endpoint}?api_key=${gifyApi}&tag=&rating=${rating}&offset=${offset}&limit=${limit}&q=${query}`, { headers: { "Content-Type": "application/json" } })
    const result = (await action.json())
    console.log(result)
    return result
}

// searchBar.addEventListener("click", async (event) => {
    //const userFavorites = await 
    //add to favorites.html so that user can see it 
function saveFavorites(){
    // To store to localStorage...
    localStorage.setItem("favorites",JSON.stringify(favoriteGif))
    
}

async function loadFavorites () {
    favoriteGif=JSON.parse(localStorage.getItem("favorites"))
    return true
}

async function showGif(image, name){
      //this line creates an element for the images to sit in for the user to view on the page
      //creates img that is gif
    const gif = document.createElement("img")
     //set the image of the gif to the result to the box
    gif.src = image
    const gifTitle = document.createElement("div")
    gifTitle.innerHTML = name
    gif.classList.add("bees")
    //this line creates the box for the gif to sit in like a frame.
    const gifBlock = document.createElement("div")
    // Check if a value was passed for the argument "name" - if there was, then we should add "gifTitle" to the "gifBlock" element in our HTML. 
    if(name){
        gifBlock.appendChild(gifTitle)
    }
    //put the picture in the frame.
    gifBlock.appendChild(gif)
    
    const heartButton = document.createElement("button")
    heartButton.classList.add("favoriteButton")
    heartButton.innerHTML = "♥";
    gifBlock.appendChild(heartButton)
    heartButton.addEventListener("click", async ()=>{
        addToFavorites(image) 
    })
    gifTitle.classList.add("cat")
    gifBlock.classList.add("lego")
        //this line takes the array and adds them on by one to the boxes from the api results
        //the box of boxes being displayed on screen
        //telling gifblock you go inside of display.
    return gifBlock;
}

function addToFavorites(image){
    favoriteGif.push(image)
    saveFavorites()
}
document.addEventListener("DOMContentLoaded", ready)

