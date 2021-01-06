import { config } from 'dotenv'
import { traceExpress, tracer, captureConsoleLogs } from '@recap.dev/client'
import express from 'express'
import { getConnection } from 'typeorm'
import mongoose from 'mongoose'

import { catFactsService } from './services/cat-facts-service'
import { createMysqlConnection, createPgConnection } from './db'
import { Post, Cat } from './db/entities'
import { authService } from './services/auth-service'

config()

traceExpress(express)
captureConsoleLogs()

const app = express()
const port = 3000

app.use((req, res, next) => {
  authService.authenticate()
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/trace-http-request', async (req, res) => {
  tracer.setUnitName('dev-get-cat-facts')
  const fact = await catFactsService.getFact()
  res.json(fact)
})

app.get('/trace-mysql-access', async (req, res) => {
  tracer.setUnitName('dev-trace-mysql-access')
  const post1 = await getConnection('mysql').getRepository(Post).findOne(req.params.id)
  const post2 = await getConnection('mysql').getRepository(Post).findOne(req.params.id)
  res.json([post1, post2])
})

app.get('/trace-pg-access', async (req, res) => {
  tracer.setUnitName('dev-trace-pg-access')
  const post1 = await getConnection('pg').getRepository(Post).findOne(req.params.id)
  const post2 = await getConnection('pg').getRepository(Post).findOne(req.params.id)
  res.json([post1, post2])
})

app.get('/trace-mongodb-access', async (req, res) => {
  tracer.setUnitName('dev-trace-mongodb-access')

  const kitty = new Cat({ name: 'Zildjian' })
  await kitty.save()

  const cats = await Cat.find()
  res.json(cats)
})

app.get('/trace-error', (req, res, next) => {
  tracer.setUnitName('dev-error')
  res.sendStatus(500)
  next(new Error('test error'))
})

Promise.all([createPgConnection(), createMysqlConnection(), mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })]).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})
