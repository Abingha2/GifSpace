async function ready() {
    let userMessage =prompt("Please enter Gify Api Key")
    localStorage.setItem("Api Key",userMessage)
    const gifyApi= userMessage
    const result =await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${gifyApi}&tag=&rating=g`,{headers:{"Content-Type": "application/json"}})
    let test1=(await result.json())
    console.log(test1.data.images.preview_gif.url)
    const display=document.querySelector(".gifmain")
    const gif=document.createElement("img")
    gif.src=test1.data.images.preview_gif.url
    display.appendChild(gif)
}
document.addEventListener("DOMContentLoaded",ready)
