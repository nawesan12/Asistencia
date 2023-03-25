import { prisma } from "../database/client.js"

export const applyAssistance = (dni: string) => {
  prisma.user.update({
    where: { dni: Number(dni) as number},
    data: {
      assistances: {
        increment: 1 as number
      }
    }
  })
  .then(() => console.log("Assistance applied!"))
  .catch(() => console.log(`There was an error applying the assistance of the student: ${dni}`))
}