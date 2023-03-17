import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,JoinTable } from "typeorm"
import { CourseEntity } from "./course.entity"

@Entity()
export class StudentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    age: number

    @Column()
    fatherName: string

    @ManyToMany( () => CourseEntity,{cascade : true, eager :true})
    @JoinTable()
    courses: CourseEntity[]
}

  