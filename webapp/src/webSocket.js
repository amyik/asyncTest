import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

var stompClient = null;

document.querySelector('#btnConnectWebSocket').addEventListener('click', event => {

    let socket = new SockJS('http://localhost:8080/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        document.querySelector('#webSocketContents').innerHTML = `<h3>Connected!</h3>`;
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings', function (greeting) {
            let message = JSON.parse(greeting.body).contents;
            console.log(message);
            let div = document.createElement("div");
            div.innerHTML = `<h3>${(message)}</h3>`;
            document.querySelector('#webSocketContents').appendChild(div);
        });
    });
});

document.querySelector('#btnSendMessage').addEventListener('click', event => {

    stompClient.send("/app/hello", {}, JSON.stringify({'name': 'albert'}));
});

document.querySelector('#btnClearWebSocket').addEventListener('click', event => {

    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
    document.querySelector('#webSocketContents').innerHTML = `<h3>Disconnected..</h3>`;
});
