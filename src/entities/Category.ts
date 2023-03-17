import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany, JoinTable } from "typeorm"
import { Company } from "./Company"
import {Product} from "./product"

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => Company, company => company.categories)
    company: Company;

    @OneToMany(() => Product, product=> product.category)
    @JoinTable()
    products: Product[];
}






