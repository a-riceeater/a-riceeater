const userInput = document.getElementById("user-input");
const terminal = document.getElementById("terminal")
import * as cmds from './commands.js';

const i = setInterval(() => {
    if (!cmds["banner"]) return;
    wl(cmds["banner"], 'dft-term-text', 'banner')

    clearInterval(i);
}, 1)

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();

        if (userInput.value.trim() == "") {
            return;
        }

        try {
            if (cmds.commands.includes(userInput.value) || userInput.value.startsWith("search ")) {
                // handle command

                if (userInput.value.split(" ")[0] == 'search') {
                    fetch(`https://serpapi.com/search.json?engine=google&q=${userInput.value.replace("search ", "")}`)
                        .then((data) => {
                            wl(JSON.stringify(data), "dft-term-text", "search")
                        })
                        .catch((err) => {
                            alert(err);
                            wl(err.toString(), "cmd-err", userInput.value)
                        })
                }
                else wl(cmds[userInput.value], 'dft-term-text', userInput.value)
            } else {
                // throw error
                wl(`system: $ command \"${userInput.value}\" not found`, "cmd-err", userInput.value)
            }
        } catch (err) {
            alert(err)
        } finally {
            userInput.value = ''
        }
    }

    setTimeout(() => {
        if (!cmds.commands.includes(userInput.value) && userInput.value && !userInput.value.startsWith("search ")) userInput.style.color = "red"
        else userInput.style.color = 'rgb(134, 234, 212)'
    })
})

Object.prototype.scrollBottom = function () {
    const scrollToBottom = (node) => {
        node.scrollTop = node.scrollHeight;
    }
    scrollToBottom(this)
}

function wl(message, cl, command) {
    const uid = document.createElement("p")
    uid.innerHTML = `
    <span>user@ghwosty.com:$ ~ </span>
    <span style="color: rgb(134, 234, 212) !important;">${command}</span>
    `
    uid.classList.add("user-identify")

    terminal.append(uid)

    const m = document.createElement(command == 'banner' || command == 'help' ? 'pre' : 'p')
    m.classList.add(cl)
    terminal.appendChild(m);

    if (command === 'help') m.style.textShadow = '5px 5px 5px #000000;'

    terminal.scrollBottom();

    let i = 0;
    let interval;
    if (message.toString().includes("\n")) interval = 1;
    else interval = getRand(10, 25)

    function write() {
        m.innerHTML += interval == 1 ? message.charAt(i) + message.charAt(i + 1) : message.charAt(i)
        if (i < message.length) {
            interval == 1 ? i += 2 : i++; 
            setTimeout(write, interval)
        }
    }
    write();

    terminal.scrollBottom();

    terminal.appendChild(document.getElementById("uidMain"));
    userInput.focus();
    
    terminal.scrollBottom();
}

function getRand(min, max) {
    return Math.random() * (max - min) + min;
  }
