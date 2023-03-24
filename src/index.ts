import { readdir, readFile } from "fs"
import { PrismaClient } from "@prisma/client"

const prisma: PrismaClient = new PrismaClient()
const dniRegex: RegExp = /[0-9]{8}/g

readdir("chats", { encoding: "utf-8" }, (err, chatFiles) => {
  if (err) {
    console.log("There was an error reading the directory!")
  }

  chatFiles?.forEach((filename) => {

    readFile(`chats/${filename}` as string, "utf-8", (err, content: string) => {
      if (err) {
        console.log("There was an error reading the file!")
        return
      }

      const matches: RegExpMatchArray | null = content.match(dniRegex)

      matches?.forEach(async (dni: string) => {
        const updatedUser = await prisma.user.update({
          where: { dni: dni as string},
          data: {
            assistances: {
              increment: 1 as number
            }
          }
        })

        if(!updatedUser) {
          console.log("There was an error updating the assistance of the student!")
          return
        }
      })
    })

  })
})