import { readdir } from "fs"
import { parseAssistances } from "./utils/file.js"
import { applyAssistance } from "./utils/database.js"

readdir("chats", { encoding: "utf-8" }, (err, chatFiles) => {
  if (err) return console.log("There was an error reading the directory!")
  
  chatFiles?.forEach((filename) => parseAssistances(filename, applyAssistance))
})