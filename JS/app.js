async function ready() {
    let userMessage =prompt("Please enter Gify Api Key")
    localStorage.setItem("Api Key",userMessage)
    const gifyApi= userMessage
    const endpoint = "trending"
    const limit = 16
    const offset = 0
    const rating = "pg-13"
    const result =await fetch(`https://api.giphy.com/v1/gifs/${endpoint}?api_key=${gifyApi}&tag=&rating=${rating}&offset=${offset}&limit=${limit}`,{headers:{"Content-Type": "application/json"}})
    let test1=(await result.json())
    console.log(test1.data[0].images.preview_gif.url)
    const display=document.querySelector(".gifmain")
    for (const image of test1.data){
        const gif=document.createElement("img")
    gif.src=image.images.preview_gif.url
    gif.classList.add("bees")
    display.appendChild(gif)
    }
    
}
document.addEventListener("DOMContentLoaded",ready)
