/*document.querySelector(".hc-about-btn").addEventListener("click", () => {
    window.location = "#about"
})*/

document.querySelector("#h_drop").addEventListener("click", () => {
    document.querySelector("#h_drop").classList.add("hidden")
    document.querySelector("#h_close").classList.remove("hidden")
    document.querySelector("#sticky-drop").style.display = "block"
})

document.querySelector("#h_close").addEventListener("click", () => {
    document.querySelector("#h_close").classList.add("hidden")
    document.querySelector("#h_drop").classList.remove("hidden")
    document.querySelector("#sticky-drop").style.display = "none"
})

document.querySelector(".cc-form").addEventListener("submit", (e) => {
    e.preventDefault();

    if (document.querySelector(".ccf-send").classList.contains("disabled")) return

    const name = document.querySelector("#cc-name-inp").value.trim();
    const email = document.querySelector("#cc-email-inp").value.trim();
    const message = document.querySelector("#cc-message-inp").value.trim();

    if (!name || !email || !message || !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase())) {
        document.querySelector("#inv-field").classList.remove("hidden")
        document.querySelector("#inv-field").classList.add("bounceright")
        document.querySelector("#rq-failed").classList.add("hidden")
        setTimeout(() => {
            document.querySelector("#inv-field").classList.remove("bounceright")
            document.querySelector("#inv-field").classList.add("hidden")
        }, 2000);
        return
    }

    document.querySelector(".ccf-send").classList.add('disabled');

    fetch("/api/send-message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
        .then((d) => d.json())
        .then((d) => {
            document.querySelector(".ccf-send").classList.remove('disabled');

            if (d.rateLimit) {
                alert("You have sent too many requests!")
            }

            if (!d.success) {
                document.querySelector("#rq-failed").classList.remove("hidden")
                document.querySelector("#rq-failed").classList.add("bounceright")
                document.querySelector("#inv-field").classList.add("hidden")
                setTimeout(() => {
                    document.querySelector("#rq-failed").classList.remove("bounceright")
                    document.querySelector("#rq-failed").classList.add("hidden")
                }, 2000);
                return
            }

            window.location = '/message-sent?email=' + email
        })
        .catch((err) => {
            document.querySelector("#rq-failed").classList.remove("hidden")
            document.querySelector("#rq-failed").classList.add("bounceright")
            document.querySelector("#inv-field").classList.add("hidden")
            setTimeout(() => {
                document.querySelector("#rq-failed").classList.remove("bounceright")
                document.querySelector("#rq-failed").classList.add("hidden")
            }, 2000);
            document.querySelector(".ccf-send").classList.remove('disabled');
            console.error(err)
        })
})