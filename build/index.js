import { readdir, readFile } from "fs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const dniRegex = /[0-9]{8}/g;
// An iteration over the Chats folder allows the code to 
// recognize each chat file so it can be scanned to find 
// every student present in class
readdir("chats", { encoding: "utf-8" }, (err, chatFiles) => {
    if (err) {
        console.log("There was an error reading the directory!");
    }
    chatFiles?.forEach((filename) => {
        readFile(`chats/${filename}`, "utf-8", (err, content) => {
            if (err) {
                console.log("There was an error reading the file!");
                return;
            }
            const matches = content.match(dniRegex);
            matches?.forEach(async (dni) => {
                const updatedUser = await prisma.user.update({
                    where: { dni: dni },
                    data: {
                        assistances: {
                            increment: 1
                        }
                    }
                });
                if (!updatedUser) {
                    console.log("There was an error updating the assistance of the student!");
                    return;
                }
            });
        });
    });
});
