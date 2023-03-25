import { readdir, readFile } from "fs"
import { prisma } from "./database/client.js"

const dniRegex: RegExp = /[0-9]{8}/g

readdir("chats", { encoding: "utf-8" }, (err, chatFiles) => {
  if (err) {
    console.log("There was an error reading the directory!")
  }

  chatFiles?.forEach((filename) => {

    readFile(`chats/${filename}` as string, "utf-8", (err, content: string) => {
      if (err) {
        console.log("There was an error reading the file!", err)
        return
      }

      const matches: RegExpMatchArray | null = content.match(dniRegex as RegExp)
      const uniqueMatches = [...new Set(matches)]

      uniqueMatches?.forEach((dni: string) => {
        prisma.user.update({
          where: { dni: Number(dni) as number},
          data: {
            assistances: {
              increment: 1 as number
            }
          }
        })
        .then(() => {
          console.log("Updated student!")
        })
        .catch(() => {
          console.log("There was an error updating the assistance of the student!", dni)
        })
      })
    })
  })
})