import { readdir, readFile } from "fs"
import { dniRegex } from "./utils/regex.js"
import { applyAssistance } from "./utils/database.js"

readdir("chats", { encoding: "utf-8" }, (err, chatFiles) => {
  if (err) return console.log("There was an error reading the directory!")

  chatFiles?.forEach((filename) => {

    readFile(`chats/${filename}` as string, "utf-8", (err, content: string) => {
      if (err) return console.log("There was an error reading the file!", err)
      
      const matches: string[] | null = [...new Set(content.match(dniRegex as RegExp))]

      matches?.forEach((dni: string) => {
        applyAssistance(dni as string)
      })
    })

  })
})