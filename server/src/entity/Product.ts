import { Entity, Column, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { ProductDTO } from "../../../models";

@Entity()
export class Product implements ProductDTO{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;
}