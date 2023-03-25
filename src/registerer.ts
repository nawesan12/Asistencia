import { prisma } from "./database/client.js"
import reader from "xlsx"

const file = reader.readFile("alumnos.xlsx")

let studentsFileContent: any = []
  
const sheets = file.SheetNames
  
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      studentsFileContent.push(res)
   })
}
  
// Printing data
const students = studentsFileContent.map((e: any) => { 
  const values = Object.values(e)

  if(values[0] === "Orden" || values[1] === undefined) return

  return { dni: values[1], name: values[3], surname: values[2] } 
})

students?.forEach((student: { dni: number, name: string, surname: string }) => {

  prisma.user.create({
    data: student
  })
  .then(data => console.log(data.name))
  .catch(err => console.log(student, err))
})