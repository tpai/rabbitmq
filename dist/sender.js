"use strict";

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _rabbit = require("rabbit.js");

var _rabbit2 = _interopRequireDefault(_rabbit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

var server = process.env.SERVER;
var queue = process.env.QUEUE;
var encoding = process.env.ENCODING;
var message = process.argv.splice(2).join(" ") || "n/a";

var context = _rabbit2.default.createContext(server);
console.log("[x] Context is %s", server);

context.on("ready", function () {
    console.log("[x] Context is ready");

    var pub = context.socket("PUB");
    pub.connect(queue, function () {
        console.log("[x] Connected to queue", queue);

        var data = JSON.stringify({ message: message });
        pub.write(data, encoding);
        console.log("[x] Send message: %s", message);

        setTimeout(function () {
            context.close();
            console.log("[x] Closed context");
        }, 500);
    });
});