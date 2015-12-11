import dotenv from "dotenv";
dotenv.load();

const server = process.env.SERVER;
const queue = process.env.QUEUE;
const encoding = process.env.ENCODING;

import rabbitjs from "rabbit.js";
const context = rabbitjs.createContext(server);
console.log("[x] Created context %s", server);

context.on("ready", () => {
    console.log("[x] Context is ready");

    const sub = context.socket("SUB");
    sub.connect(queue, () => {
        console.log("[x] Connected to queue", queue);
        sub.on("data", data => {
            console.log("[x] Received data: %s", data);
        })
    })
})
