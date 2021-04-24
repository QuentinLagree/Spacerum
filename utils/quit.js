let exit = () => {
        process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H');
}

module.exports = exit