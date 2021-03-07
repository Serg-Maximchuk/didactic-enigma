import KeyboardListener from "./keyboard";
import GameServer from './gameServer'
import global from '../entities/global'
import Greeting from '../entities/changes/greeting'
import objectsWarehouse from './objects-warehouse';

const playerSettings = global.playerSettings;

function spawnNewUser(user) {
    console.log("spawning new user:", user);
    objectsWarehouse.spawnNewUser(user);
}

function processUserChange(userChange) {
    objectsWarehouse.setPosition(userChange.id, userChange.coordinates);
}

function dismissUser(userId) {
    objectsWarehouse.dismissUser(userId);
}

const localSocket = "ws://localhost:8080/conn";
const globalSocket = "ws://18.184.23.62:8080/conn";

const gameActions = {
    connectToServer: function (document, nickname) {
        this._document = document;
        const connectionURL = process.env.WS_URL || ((process.env.NODE_ENV === 'development')
            ? localSocket : globalSocket);
        this._server = new GameServer(connectionURL)
            .userData({nickname})
            .onGreeting(this.onGreeting.bind(this))
            .onMessage(this.onMessage.bind(this))
            .onClose(this.onClose.bind(this))
            .connect();
    },
    onGreeting(response) {
        console.log(response);
        const greeting = new Greeting(response);
        this.keyListener = new KeyboardListener(this._document, this._server);
        playerSettings.id = greeting.id;

        processUserChange(greeting);

        greeting.users.forEach(spawnNewUser);
    },
    onMessage: function (response) {
        const message = JSON.parse(response.data);
        console.log(message);
        const userChange = message.user;

        if (userChange) {
            if (message.greeting) spawnNewUser(userChange);
            if (userChange.positionChange) processUserChange(userChange);
            if (userChange.leavingGameEvent) dismissUser(userChange.id);
        }
    },
    onClose() {
        this.keyListener && this.keyListener.shutDown();
    }
};

export default gameActions;