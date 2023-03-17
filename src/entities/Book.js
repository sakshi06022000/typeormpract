var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Book",
    tableName: "books",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        title: {
            type: "varchar",
        },
        price: {
            type: "int",
        },
    }
})
