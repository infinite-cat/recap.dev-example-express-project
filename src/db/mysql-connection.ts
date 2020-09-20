import { createConnection } from 'typeorm'
import { Post } from './entities'

export const createMysqlConnection = async () => {
  await createConnection({
    name: 'mysql',
    logger: 'simple-console',
    type: 'mysql',
    host: 'localhost',
    port: 8001,
    username: 'user',
    password: 'password',
    database: 'recap-dev-test-db',
    logging: true,
    synchronize: true,
    entities: [Post],
    extra: {
      max: 20,
    },
  })
}
