const express = require("express");
const dataSource = require('./db.js')
const port = 4040;

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
})


dataSource.initialize().then(() => {
    console.log("Database Connection");

    app.listen(port, () => {
        console.log(`Server is Workng on port :http://localhost/${port}`);
    })
}).catch((err) => {
    console.log(err.message)
})

