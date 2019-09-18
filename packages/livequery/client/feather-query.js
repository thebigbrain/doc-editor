const io = require('socket.io-client')
const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')

const socket = io('http://api.my-feathers-server.com')
const client = feathers()

client.configure(socketio(socket))

export default class LiveQueryService {
  constructor(option) {
    this.option = option
  }

  async initialize() {

  }
}
