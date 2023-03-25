import { readFile } from "fs"
import { dniRegex } from "./regex.js"
import { removeDuplicates } from "./tools.js"

export const parseAssistances = (filename: string, callback: Function) => {
  readFile(`chats/${filename}` as string, "utf-8", (err, content: string) => {
    if (err) return console.log("There was an error reading the file!", err)
    
    const matches: RegExpMatchArray | null = content.match(dniRegex as RegExp)
    const uniqueMatches = removeDuplicates(matches)

    uniqueMatches?.forEach((dni: string) => callback(dni as string))
  })
}