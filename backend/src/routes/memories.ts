import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  fastify.get('/memories', async (request) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...')
      }
    })
  })

  fastify.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id
      }
    })

    if (!memory.isPublic && memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    return memory
  })

  fastify.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false)
    })
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: request.user.sub
      }
    })
    return memory
  })

  fastify.put('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false)
    })
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id
      }
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401)
    }

    memory = await prisma.memory.update({
      where: {
        id
      },
      data: {
        content,
        coverUrl,
        isPublic
      }
    })
    return memory
  })

  fastify.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id
      }
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401)
    }

    await prisma.memory.delete({
      where: {
        id
      }
    })
  })
}
