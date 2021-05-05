import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  number_phone: string;

  @Column()
  admin_group: boolean;

  @Column()
  level: number;

  @Column()
  xp: number;

  @Column()
  active: boolean;

  @Column()
  language: string;

  @Column()
  office: string;

  @Column()
  commands: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { User };
