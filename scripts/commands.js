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
Rel - (https://github.com/a-riceeater/rel) - An attempt to make a programming in Node.js without a lexer/parser/etc.

http://ghwosty.com
`

export const projects = `
<u>Versa</u> - A slack like chatting app with lots of user customization (https://github.com/a-riceeater/Versa)
<br><br>
<u>Rel</u> - An attempt to make a programming in Node.js without a lexer/parser/etc (https://github.com/a-riceeater/rel)
<br><br>
<u>Umbrella</u> - A web service consisting of docs, file storage/transfer, "payment" app (not real currency yet), password manager, and SSO (https://github.com/a-riceeater/Umbrella)
<br><br>
<u>UBConsole</u> - An unblocked console that has almost the same functions as your average chrome browser one, which can be injected via bookmarklet (https://github.com/a-riceeater/UBConsole)
<br><br>
<u>SyntaxHighlight.js</u> - A JS syntax highlight library, which can highlight a few languages (https://github.com/a-riceeater/SyntaxHiglight.js)
`