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

var context = _rabbit2.default.createContext(server);
console.log("[x] Created context %s", server);

context.on("ready", function () {
    console.log("[x] Context is ready");

    var sub = context.socket("SUB");
    sub.connect(queue, function () {
        console.log("[x] Connected to queue", queue);
        sub.on("data", function (data) {
            console.log("[x] Received data: %s", data);
        });
    });
});