const ASCII_IMAGE = `
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████████████─████████████───────────██████─██████──██████─██████████████─██████████████────██████████████─██████████████────██████████████─██████──██████─██████████████─
─██░░░░░░░░░░██─██░░░░░░░░████─────────██░░██─██░░██──██░░██─██░░░░░░░░░░██─██░░░░░░░░░░██────██░░░░░░░░░░██─██░░░░░░░░░░██────██░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░░░██─
─██░░██████░░██─██░░████░░░░██─────────██░░██─██░░██──██░░██─██░░██████████─██████░░██████────██████░░██████─██░░██████░░██────██████░░██████─██░░██──██░░██─██░░██████████─
─██░░██──██░░██─██░░██──██░░██─────────██░░██─██░░██──██░░██─██░░██─────────────██░░██────────────██░░██─────██░░██──██░░██────────██░░██─────██░░██──██░░██─██░░██─────────
─██░░██████░░██─██░░██──██░░██─────────██░░██─██░░██──██░░██─██░░██████████─────██░░██────────────██░░██─────██░░██──██░░██────────██░░██─────██░░██████░░██─██░░██████████─
─██░░░░░░░░░░██─██░░██──██░░██─────────██░░██─██░░██──██░░██─██░░░░░░░░░░██─────██░░██────────────██░░██─────██░░██──██░░██────────██░░██─────██░░░░░░░░░░██─██░░░░░░░░░░██─
─██░░██████░░██─██░░██──██░░██─██████──██░░██─██░░██──██░░██─██████████░░██─────██░░██────────────██░░██─────██░░██──██░░██────────██░░██─────██░░██████░░██─██░░██████████─
─██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─────────██░░██─────██░░██────────────██░░██─────██░░██──██░░██────────██░░██─────██░░██──██░░██─██░░██─────────
─██░░██──██░░██─██░░████░░░░██─██░░██████░░██─██░░██████░░██─██████████░░██─────██░░██────────────██░░██─────██░░██████░░██────────██░░██─────██░░██──██░░██─██░░██████████─
─██░░██──██░░██─██░░░░░░░░████─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─────██░░██────────────██░░██─────██░░░░░░░░░░██────────██░░██─────██░░██──██░░██─██░░░░░░░░░░██─
─██████──██████─████████████───██████████████─██████████████─██████████████─────██████────────────██████─────██████████████────────██████─────██████──██████─██████████████─
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
───────────────────────────██████████████─██████████████─██████████████─████████████──────██████─────────██████████─██████████████─██████████████───────────────────────────
───────────────────────────██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░████────██░░██─────────██░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██───────────────────────────
───────────────────────────██░░██████████─██░░██████░░██─██░░██████░░██─██░░████░░░░██────██░░██─────────████░░████─██░░██████████─██░░██████████───────────────────────────
───────────────────────────██░░██─────────██░░██──██░░██─██░░██──██░░██─██░░██──██░░██────██░░██───────────██░░██───██░░██─────────██░░██───────────────────────────────────
───────────────────────────██░░██─────────██░░██──██░░██─██░░██──██░░██─██░░██──██░░██────██░░██───────────██░░██───██░░██████████─██░░██████████───────────────────────────
───────────────────────────██░░██──██████─██░░██──██░░██─██░░██──██░░██─██░░██──██░░██────██░░██───────────██░░██───██░░░░░░░░░░██─██░░░░░░░░░░██───────────────────────────
───────────────────────────██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─██░░██──██░░██────██░░██───────────██░░██───██░░██████████─██░░██████████───────────────────────────
───────────────────────────██░░██──██░░██─██░░██──██░░██─██░░██──██░░██─██░░██──██░░██────██░░██───────────██░░██───██░░██─────────██░░██───────────────────────────────────
───────────────────────────██░░██████░░██─██░░██████░░██─██░░██████░░██─██░░████░░░░██────██░░██████████─████░░████─██░░██─────────██░░██████████───────────────────────────
───────────────────────────██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░░░░░████────██░░░░░░░░░░██─██░░░░░░██─██░░██─────────██░░░░░░░░░░██───────────────────────────
───────────────────────────██████████████─██████████████─██████████████─████████████──────██████████████─██████████─██████─────────██████████████───────────────────────────
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
────────────────────────────────────────██████████████─████████████████───██████████████─██████──██████─██████████████─██████───────────────────────────────────────────────
────────────────────────────────────────██░░░░░░░░░░██─██░░░░░░░░░░░░██───██░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░░░██─██░░██───────────────────────────────────────────────
────────────────────────────────────────██████░░██████─██░░████████░░██───██░░██████░░██─██░░██──██░░██─██░░██████████─██░░██───────────────────────────────────────────────
────────────────────────────────────────────██░░██─────██░░██────██░░██───██░░██──██░░██─██░░██──██░░██─██░░██─────────██░░██───────────────────────────────────────────────
────────────────────────────────────────────██░░██─────██░░████████░░██───██░░██████░░██─██░░██──██░░██─██░░██████████─██░░██───────────────────────────────────────────────
────────────────────────────────────────────██░░██─────██░░░░░░░░░░░░██───██░░░░░░░░░░██─██░░██──██░░██─██░░░░░░░░░░██─██░░██───────────────────────────────────────────────
────────────────────────────────────────────██░░██─────██░░██████░░████───██░░██████░░██─██░░██──██░░██─██░░██████████─██░░██───────────────────────────────────────────────
────────────────────────────────────────────██░░██─────██░░██──██░░██─────██░░██──██░░██─██░░░░██░░░░██─██░░██─────────██░░██───────────────────────────────────────────────
────────────────────────────────────────────██░░██─────██░░██──██░░██████─██░░██──██░░██─████░░░░░░████─██░░██████████─██░░██████████───────────────────────────────────────
────────────────────────────────────────────██░░██─────██░░██──██░░░░░░██─██░░██──██░░██───████░░████───██░░░░░░░░░░██─██░░░░░░░░░░██───────────────────────────────────────
────────────────────────────────────────────██████─────██████──██████████─██████──██████─────██████─────██████████████─██████████████───────────────────────────────────────
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────`;

export default () => console.log(ASCII_IMAGE);
