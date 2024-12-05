import { User } from '@/users/entities/user.entity'
import { Column, JoinColumn, ManyToOne } from 'typeorm'
import { TypeAccessConvert } from '../utils'
import { EDateAndSoftDelete, EDateAndSoftDeleteFields } from './EDateAndSoftDelete'

export class EUpdatorAndSorfDelete extends EDateAndSoftDelete {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'updater_id' })
  updater: User

  // todo: xem xét cách lưu creator và updater
  @Column({ name: 'updater_id', nullable: true })
  updaterId: number

  @Column({ name: 'creator_id', nullable: true })
  creatorId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User
}

export const EUpdatorAndSorfDeleteFields = {
  ...EDateAndSoftDeleteFields,
  creatorId: TypeAccessConvert.NUMBER,
  updaterId: TypeAccessConvert.NUMBER
}
