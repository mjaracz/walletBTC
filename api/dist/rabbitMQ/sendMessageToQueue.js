"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("./connect"));
connect_1.default.on('connect', () => console.log(' [AMQP] CONNECTED!'));
connect_1.default.on('disconnect', (err) => console.log(' [AMQP] DISCONNECTED' + err.stack));
const channelWrapper = connect_1.default.createChannel({
    json: true,
    setup: channel => channel.assertExchange('json_exchange', 'topic')
});
function sendMessageToQueue(routingKey, data) {
    channelWrapper.publish('json_exchange', routingKey, data)
        .then(() => {
        console.log('[AMQP] Message sent');
    })
        .catch(err => {
        console.log('[AMQP] Message Was Rejected ' + err.stack);
        channelWrapper.close();
        connect_1.default.close();
    });
}
;
exports.default = sendMessageToQueue;
//# sourceMappingURL=sendMessageToQueue.js.map