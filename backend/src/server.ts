import 'dotenv/config'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'

import Fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'
import cors from '@fastify/cors'
import { authRoute } from './routes/auth'
import { uploadRoute } from './routes/upload'
import { resolve } from 'node:path'

const fastify = Fastify({
  logger: true
})

fastify.register(cors, {
  origin: true
})

fastify.register(multipart)

fastify.register(jwt, {
  secret: 'ad7d94544b64e1fe46b0baa3f0da95a0'
})

fastify.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads'
})

fastify.register(memoriesRoutes)
fastify.register(authRoute)
fastify.register(uploadRoute)

fastify
  .listen({
    port: 3333
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
