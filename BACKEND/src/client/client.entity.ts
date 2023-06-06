//type orm entity for client to save username and ethereum address

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';



@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    ethAddress: string;
}
