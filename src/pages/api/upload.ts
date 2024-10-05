import type { IncomingMessage, ServerResponse } from "http";
import * as formidable from "formidable";
import { join } from "path";
import { db } from "~/server/db";

export default async function handler(request: IncomingMessage, response: ServerResponse) {
    if (request.method === "POST") {
        const form = new formidable.IncomingForm({
            uploadDir: join(process.cwd(), "/public/posts"),
            keepExtensions: true,
        });

        console.log(request.headers.cookie);

        const email = request.headers.cookie?.split("email=")[1]?.split(";")[0];
        const password = request.headers.cookie?.split("password=")[1]?.split(";")[0];
        if (!email || !password) {
            response.writeHead(401, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ error: "Unauthorized. No email or password found." }));
            response.end();
            return;
        }

        const user = await db.user.findFirst({
            where: {
                email,
            },
        });

        if (user?.password !== password) {
            response.writeHead(401, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ error: "Unauthorized. Password does not match." }));
            response.end();
            return;
        }

        form.parse(request, (err, _fields, files) => {
            if (err) {
                response.writeHead(500, { "Content-Type": "application/json" });
                response.write({ error: "File upload error" });
                response.end();
                return;
            }

            const uploadedFile = files.file;
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: true, filePath: uploadedFile ?? "" }));
            response.end();
            return;
        });
    } else {
        response.writeHead(405, { "Content-Type": "application/json" });
        response.write(JSON.stringify({ error: "Method not allowed" }));
        response.end();
        return;
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
