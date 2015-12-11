import dotenv from "dotenv";
dotenv.load();

const server = process.env.SERVER;
const queue = process.env.QUEUE;
const encoding = process.env.ENCODING;
const message = process.argv.splice(2).join(" ") || "n/a";

import rabbitjs from "rabbit.js";
const context = rabbitjs.createContext(server);
console.log("[x] Context is %s", server);

context.on("ready", () => {
    console.log("[x] Context is ready");

    const pub = context.socket("PUB");
    pub.connect(queue, () => {
        console.log("[x] Connected to queue", queue);

        let data = JSON.stringify({ message: message });
        pub.write(data, encoding);
        console.log("[x] Send message: %s", message);

        setTimeout(() => {
            context.close()
            console.log("[x] Closed context");
        }, 500);
    })
})
