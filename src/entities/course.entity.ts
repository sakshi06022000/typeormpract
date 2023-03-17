import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm"
import { StudentEntity } from "./student.entity"

@Entity()
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    courseCode: string
}

  