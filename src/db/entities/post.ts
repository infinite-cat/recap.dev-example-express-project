import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'posts' })
class Post {
  constructor(partial?: Partial<Post>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number
}

export { Post }
