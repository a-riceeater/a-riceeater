/*document.querySelector(".hc-about-btn").addEventListener("click", () => {
    window.location = "#about"
})*/

document.querySelector("#h_drop").addEventListener("click", (e) => {
    document.querySelector("#h_drop").classList.add("hidden")
    document.querySelector("#h_close").classList.remove("hidden")
})

document.querySelector("#h_close").addEventListener("click", (e) => {
    document.querySelector("#h_close").classList.add("hidden")
    document.querySelector("#h_drop").classList.remove("hidden")
})