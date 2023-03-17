const path = require("path")
const typeorm = require("typeorm")

const dataSource = new typeorm.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "type",
    synchronize: true,
    entities: [path.join(__dirname,".","entities/*/*.js")],
})

module.exports = dataSource;