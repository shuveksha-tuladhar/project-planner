export const resetPasswordTemplate = (token, id) => {
    return `
    <html>
        <h1>Reset your Password</h1>
        <p>Click <a href ="http://localhost:3000/reset-password/${token}/${id}" target="_blank">here</a></p>
        <a></a>
    </html>`
}