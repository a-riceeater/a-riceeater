export const commands = ["banner", "help", "search", "github", "about"]

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
`

export const github = `
    github/a-riceeater
`

export const about = `
Hi, I'm @ghwosty/@a-riceeater.

I use Java, HTML, JS, CSS, and Python.
I like to work on projects with other people
Currently working on an important project with friends (repo private, https://codestack.ga)
http://ghwosty.com
`