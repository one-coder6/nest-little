import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public sex: string;

  @Column()
  public age: number;

  @Column()
  public remark: string;

  @CreateDateColumn({ comment: '创建时间' })
  createTime: string;

  @UpdateDateColumn({ comment: '更新时间' })
  updateTime: string;
}
