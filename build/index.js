import { readdir, readFile } from "fs";
import { prisma } from "./database/client.js";
const dniRegex = /[0-9]{8}/g;
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
            const uniqueMatches = [...new Set(matches)];
            uniqueMatches?.forEach((dni) => {
                prisma.user.update({
                    where: { dni: Number(dni) },
                    data: {
                        assistances: {
                            increment: 1
                        }
                    }
                })
                    .then((data) => {
                    console.log("Updated student!");
                })
                    .catch((err) => {
                    console.log("There was an error updating the assistance of the student!", err);
                });
            });
        });
    });
});
