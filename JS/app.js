async function ready() {
    let userMessage =prompt("Please enter Gify Api Key")
    localStorage.setItem("Api Key",userMessage)
    const gifyApi= userMessage
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
    
}
async function gify(gifyApi,endpoint,limit,offset,rating){
    const action =await fetch(`https://api.giphy.com/v1/gifs/${endpoint}?api_key=${gifyApi}&tag=&rating=${rating}&offset=${offset}&limit=${limit}`,{headers:{"Content-Type": "application/json"}})
    const result=(await action.json())
    console.log(result.data)
    return result
}
document.addEventListener("DOMContentLoaded",ready)

