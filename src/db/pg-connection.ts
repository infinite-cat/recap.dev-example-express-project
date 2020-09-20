import { createConnection } from 'typeorm'
import { Post } from './entities'

export const createPgConnection = async () => {
  await createConnection({
    name: 'pg',
    logger: 'simple-console',
    type: 'postgres',
    host: 'localhost',
    port: 8002,
    username: 'postgres',
    password: 'password',
    database: 'postgres',
    logging: true,
    synchronize: true,
    entities: [Post],
    extra: {
      max: 20,
    },
  })
}
