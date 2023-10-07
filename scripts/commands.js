export const commands = ["banner", "help", "search", "github", "about", "projects"]
export const preCmds = ["help", "about", "banner"]

export let banner;

const req = new XMLHttpRequest();
req.addEventListener("load", handleBanner);
req.open("GET", "./ascii.txt");
req.send();

function handleBanner() {
    banner = this.responseText;
}
export const help = `
    banner - display the banner
    help - display this command
    about - display about me information
`

export const github = `
    github/a-riceeater
`

export const about = `
Hi, I'm @ghwosty/@a-riceeater.

I use Java, HTML, JS, CSS, and Python. More recently, I have been using Node.js to create web servers.
I like to work on projects with other people

Important projects:
Codestack (http://codestack.ga [domain down]) - Made with friends, a web app for developers to buy libraries, API access, etc
Versa - (https://github.com/a-riceeater/Versa) - Made by myself (read github for info)

http://ghwosty.com
`

export const projects = `
Versa - 
`