const url = document.URL;
const replyEmail = url.split("?email=")[1];

document.querySelector("#rp-em").innerText = replyEmail;