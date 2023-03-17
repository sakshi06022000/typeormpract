// import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
// import { Company} from "./Company"

// @Entity()
// export class Product{
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string

    
//     @Column()
//     price : number

//     @Column()
//     description: string

//     @ManyToOne(() => Company, (company)=> company.products, {onDelete :"CASCADE"})
//     company : Company;
// }


import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Category } from "./Category"

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    price : number

    @Column()
    description: string

    @ManyToOne(() => Category,  category => category.products, {onDelete :"CASCADE"})
    category : Category;

}





