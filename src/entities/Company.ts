// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
// import {Product} from './product';

// @Entity()
// export class Company {
//     @PrimaryGeneratedColumn()
//     id: number

//     @Column()
//     name: string

//     @Column()
//     description: string

//     @OneToMany(()=> Product, (products)=>products.company, {cascade :true ,eager :true}, )
//     products : Product[];
// }

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm"
import { Category } from './Category';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string;

    @OneToMany(() => Category, category => category.company)
    @JoinTable()
    categories: Category;
}
  