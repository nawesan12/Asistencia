import { prisma } from "./database/client.js"
import reader from "xlsx"

const file = reader.readFile("alumnos.xlsx")

let studentsFileContent: any = []
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
  temp.forEach((res) => studentsFileContent.push(res))
}
  
const students = studentsFileContent.map((e: any) => { 
  const values = Object.values(e)

  if(values.includes(undefined) || values.includes("Orden")) return

  return { dni: values[1], surname: values[2], name: values[3] } 
})

students?.forEach((student: { dni: number, name: string, surname: string }) => {
  prisma.user.create({ data: student })
    .then(data => console.log(`Student ${data.name} uploaded succesfully!`))
    .catch(err => console.log(`There was an error uploading the student: ${student}!`, err))
})