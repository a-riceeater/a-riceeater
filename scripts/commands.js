export const commands = ["banner", "help"]

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