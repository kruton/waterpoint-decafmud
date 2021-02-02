import "./DecafMUD/src/js/decafmud.js";
import "./DecafMUD/src/js/decafmud.interface.simple.js";
import "./DecafMUD/src/js/decafmud.display.standard.js";
import "./DecafMUD/src/js/decafmud.encoding.iso885915.js";
import "./DecafMUD/src/js/decafmud.socket.websocket.js";
import "./DecafMUD/src/js/decafmud.storage.standard.js";

import "./DecafMUD/src/css/mud-colors.css"
import "./DecafMUD/src/css/decafmud.css"
import "./DecafMUD/src/css/decafmud-dark.css"

export default function() {
    new DecafMUD({
        host: "waterpoint-wss.the-b.org",
        autoreconnect: false,
        autoconnect: true,

        set_socket: {
            wsport: 443,
            wspath: "/client/websocket",
            ssl: true
        },

        set_interface: {
            container: "#wpt-client",
            connect_hint: false,
            repeat_input: false,
            start_full: false
        },

        language: "en",
        encoding: "utf8",
        socket: "websocket"
    });
}
