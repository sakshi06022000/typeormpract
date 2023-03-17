import "reflect-metadata";
import express from 'express';
import { DataSource, LessThan } from "typeorm";
// import { User } from "../src/entities/User";
// import { Profile } from "../src/entities/Profile"
import { Product } from "../src/entities/product";
import { Category } from "../src/entities/Category";
import { Company } from "../src/entities/Company";

// import { StudentEntity } from "../src/entities/student.entity"
// import { CourseEntity } from "../src/entities/course.entity"

const app = express();
app.use(express.json());
const port = 4000;
const hostname = "localhost";

// app.get('/', async (req, res) => {
//     const userRepo = AppDataSource.getRepository(User)
//     const profileRepo = AppDataSource.getRepository(Profile)
// // find all records
// const allRecords =  await userRepo.find();
// res.json(allRecords);


// //for delete
//  const del = await userRepo.delete(1);
//  res.json("Deleted Successfully");

//  //for insert
//  let user : User =new User()
//  user.firstName = "xyz";
//  user.lastName  = "abc";
//  user.email = "xyz@gmail.com";

//  const insert = await userRepo.save(user);
//  res.json(insert);


// //for update
// const update = await userRepo.update(2,{firstName : "xyzpqr", lastName : "abcstu",email : "xyzpqr@gmail.com"})
// res.send(" Record updated");

// //get & find by firstname or filter
// const record = await userRepo.findOne ({where : {firstName : "xyzpqr"}})
// res.json(record)


// //one to one relation
// //for insert for profile
// let profile: Profile = new Profile()
// profile.gender = "male";
// profile.photo = "This is my Photo";

// //if we doesn't use cascade in
// // const profileInserted = await profileRepo.save(profile);

// // insert for user
// let user: User = new User()
// user.firstName = "xyz";
// user.lastName = "abc";
// user.email = "xyz@gmail.com";
// //  user.profile = profileInserted;
// user.profile = profile;

// const userInserted = await userRepo.save(user);
// res.json(userInserted);


// //find all records
// const allRecords = await userRepo.find();
// res.json(allRecords);

// //update record
// const  userFound = await userRepo.findOne({where :{ id :4}})
// if(userFound){
//     userFound.email = "email@gmail.com";
//     userFound.firstName = "Test";
//     userFound.lastName = "Test"
//     userFound.profile.gender = "female";
//     userFound.profile.photo = "no photo";
//     const updatedUser = await userRepo.save(userFound);
//     res.json(updatedUser);

// }else{
// res.send("Record does not found")
// }

// //delete record
// const userDeleted = await profileRepo.delete(1)
// res.send("Profile deleted")

// res.send("Hello World");
// })


//new project for one to many and many to one
app.get('/', async (req, res) => {
    // res.send("Hello World");
    //for one to many
    const companyRepo = AppDataSource.getRepository(Company)

    const categoryRepo = AppDataSource.getRepository(Category)
    //for many to one
    const productRepo = AppDataSource.getRepository(Product)

    // //insert 

    // let products : Product[] = [];

    // let iphone = new Product();
    // iphone.name = "Iphone";
    // iphone.price = 250000;  
    // iphone.description = "Iphone 6";

    // let ipad = new Product();
    // ipad.name = "Ipad";
    // ipad.price = 25000;  
    // ipad.description = "Tablet";

    // let macBook = new Product();
    // macBook.name = "MacBook";
    // macBook.price = 300000;  
    // macBook.description = "Laptop";

    // products.push(iphone,ipad,macBook);


    // let company : Company = new Company();
    // company.name = "Apple";
    // company.description = "Tech Company";
    // company.products = products;

    // const DataInserted = await companyRepo.save(company)
    // res.json(DataInserted)


    // //get method

    // const companyFound = await companyRepo.find({
    //     relations : {
    //         products : true
    //     },
    //     // where :{
    //     //     products :{
    //     //         price :LessThan(100000),
    //     //     }
    //     // }
    // });
    // res.json(companyFound);


    // get method for more than 2 tables
    const companyFound = await companyRepo.find({
        relations: { categories: true },
        // where :{categories : Categoryid}
    });

    const categoryFound = await categoryRepo.find({
        relations: { products: true },
        where: { company: companyFound }
    });

    const productFound = await productRepo.find({
        where: { category: categoryFound }
    });


    const results = await companyRepo
        // getRepository(Company)
        .createQueryBuilder('company')
        .leftJoinAndSelect('company.categories', 'categories')
        .leftJoinAndSelect('categories.products', 'products')
        // .where('company.id = :id', { id: 1 })
        .getMany();


    res.json(results)

    // res.json(companyFound);

    // //update data
    // let company = await companyRepo.findOne({where : {id : 3}})
    // if(company){
    //     company.name = "Apple Updated";
    //     for(let x= 0; x<company.products.length; x++){
    //         company.products[x].price = 1000;
    //     }  
    //    const dataChanged = await companyRepo.save(company);
    //    res.json(dataChanged)
    // }else{
    //     res.status(404).send({message : "Company not found"});
    // }

    //DELETE
    //SAME AS ONE TO ONE 
})


//new project for many to many
// app.get('/',async(req,res)=>{
// const stuentRepo = AppDataSource.getRepository(StudentEntity);
// const courseRepo = AppDataSource.getRepository(CourseEntity);

// //for course entry
// let course1 = new CourseEntity();
// course1.name = "Database";
// course1.courseCode = "DB";
// course1.description = "Database System";

// let course2 = new CourseEntity();
// course2.name = "Java";
// course2.courseCode = "JA";
// course2.description = "JAVA";


// let student = new StudentEntity();
// student.age = 25;
// student.name = "amir";
// student.fatherName = "ashok";
// student.courses = [course1, course2];

// const students = await stuentRepo.save(student);
// res.json(students);

//     let student = await stuentRepo.find()
//     res.json(student)

// })



//first initaialized db
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "typeorm_db",
    entities: [
        // User, Profile,
        Company, Product, Category
        // StudentEntity,CourseEntity

    ],
    // entities : ["/src/entities/*User"],
    // migrations: [__dirname + "/src/en tities/*{.ts,.js}"],
    // subscribers: [],
    // typeorm migration:create -n UrlMigration -d src/migrations 
    synchronize: true,
    logging: true
})


//we can up server after db is connected
AppDataSource.initialize()
    .then(() => {
        console.log("Database Connection");
        app.listen(port, hostname, () => {
            console.log(`Server is working on port: http://${hostname}:${port}`)
        });
    })
    .catch((err) => {
        console.log("Not Connected", err.message)
    });


// app.listen(port, hostname, () => {
//     console.log(`Server is working on port: http://${hostname}:${port}`)
// })