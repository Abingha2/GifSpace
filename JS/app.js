let gifyApi;
async function ready() {
    let userMessage =prompt("Please enter Gify Api Key")
    localStorage.setItem("Api Key",userMessage)
   gifyApi = userMessage
    const display=document.querySelector(".gifmain")
    const categories = await gify(gifyApi,"categories")
    for (const image of categories.data){
        const gif=document.createElement("img")
        gif.src=image.gif.images.preview_gif.url
        const gifTitle=document.createElement("div")
        gifTitle.innerHTML=image.name
    //gif.src=image.images.preview_gif.url
    gif.classList.add("bees")
    const gifBlock=document.createElement("div")
    gifBlock.appendChild(gifTitle)
    gifBlock.appendChild(gif)
    gifTitle.classList.add("cat")
    display.appendChild(gifBlock)
    gifBlock.classList.add("lego")
    }
    //if user click search tab then activate the following function with user prompt.
    //might be wrong.
    if(window.location.href.indexOf("search.html")>-1)
    {
    //this set the variable search bar to whatever the user is inputing.
    const searchBar =document.querySelector("#search")
    //this is listening for the search result from the user as they type.
    searchBar.addEventListener("keydown",async(event)=>{
        //this is waiting for the user to hit enter with their completed search
        if (event.key === "Enter"){
        //this is displaying the search after the user hits enter.
            await search(display,event.target.value)
        }
    })
    }
}//needs to  call my api function and try to do something with the results 
//ab steps
async function search(display,userSearch){
    //prompt box appears on screen for user
    //user types in prompt box and hit enter
    //event listner.(personal stretch goal)
    //variables taken from users search in an empty string 
    //taking the results of usersearch and sends it to api with certain censors
    const searchResults= await gify(gifyApi,"search",null,0,"pg-13",userSearch)
    display.innerHTML=null
    //this one sends back the search results back to the program for the user to see.
    for(const image of searchResults.data) {
        //this line creates and element for the images to sit in for the user to view on the page
        //creates img that is gif
        const gif=document.createElement("img")
       //set the image of the gif to the result to the box
        gif.src=image.images.preview_gif.url
    gif.classList.add("bees")
    //this line creates the box for the gif to sit in like a frame.
    const gifBlock=document.createElement("div")
    //put the picture in the frame.
    gifBlock.appendChild(gif)
     //this line takes the array and adds them on by one to the boxes from the api results
     //the box of boxes being displayed on screen
     //telling gifblock you go inside of display.
    display.appendChild(gifBlock)
    //
    gifBlock.classList.add("lego")
    }
    }
    //varaibles sent to api
    //api responds with corresponding gifs to corresponding variables
    //program displays corresponding gifs on page for user to look through
    //user sees gifs
async function gify(gifyApi,endpoint,limit,offset,rating,query,){
    const action =await fetch(`https://api.giphy.com/v1/gifs/${endpoint}?api_key=${gifyApi}&tag=&rating=${rating}&offset=${offset}&limit=${limit}&q=${query}`,{headers:{"Content-Type": "application/json"}})
    const result=(await action.json())
    console.log(result)
    return result
}
document.addEventListener("DOMContentLoaded",ready)

