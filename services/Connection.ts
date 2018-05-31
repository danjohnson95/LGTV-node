import { EventEmitter } from 'events'
import * as Websocket from 'websocket'
import * as fs from 'fs'

import { HandshakeRequest } from './Handshake'

export interface CommandBody {
    id: string,
    type: string,
    uri: string,
    payload?: string
}

export enum CommandTypes {
    Request = 'request',
    Subscribe = 'subscribe'
}

export class Connection {
    private ipAddress: string
    private commandCount: number = 0
    private eventEmitter: EventEmitter = new EventEmitter
    private websocketClient: Websocket.client = new Websocket.client
    private websocketConnection: Websocket.connection | null = null
    private handshaken: boolean = false
    private readonly clientKeyFilename: string = 'client-key.txt'
    private readonly maxListeners: number = 0

    constructor (ipAddress: string) {
        this.ipAddress = ipAddress
        this.eventEmitter.setMaxListeners(this.maxListeners)
        this.registerWebsocketListener()
    }

    private get websocketHost (): string {
        return `ws://${this.ipAddress}:3000`
    }

    private storeClientKey (clientKey: string) {
        fs.writeFileSync(this.clientKeyFilename, clientKey)
    }

    private clientKeyExists (): boolean {
        return fs.existsSync(this.clientKeyFilename)
    }

    private getClientKey (): string {
        return fs.readFileSync(this.clientKeyFilename).toString()
    }

    private getHandshakeMsg (): HandshakeRequest {
        if (this.clientKeyExists()) {
            const clientKey = this.getClientKey()

            return new HandshakeRequest(clientKey)
        }

        return new HandshakeRequest()
    }

    private registerWebsocketListener (): void {
        this.websocketClient.on('connect', (connection) => {
            this.websocketConnection = connection

            connection.on('error', (error) => {

            })

            connection.on('close', () => {
                this.websocketConnection = null
                this.eventEmitter.emit('lgtv_ws_closed')
            })

            connection.on('message', (message) => {
                const parsedMsg = JSON.parse(message.toString())

                this.eventEmitter.emit(parsedMsg.id, parsedMsg)
            })

            connection.send(this.getHandshakeMsg())
        })
    }

    private emptyPromise (): Promise<void> {
        return new Promise((resolve) => {
            resolve()
        })
    }

    private openConnection (): Promise<void> {
        this.websocketConnection = null
        
        return new Promise((resolve, reject) => {
            try {
                this.websocketClient.connect(this.websocketHost)
                resolve()
            } catch (err) {
                reject()
            }
        })
    }

    private performHandshake (): Promise<void> {
        return new Promise((resolve, reject) => {
            this.eventEmitter.on(HandshakeRequest.id, (message) => {
                const clientKey = message.payload['client-key']

                this.storeClientKey(clientKey)
                this.handshaken = true
                resolve()
            })
        })
    }

    private sendWebsocket (command: CommandBody): boolean {
        if (!this.isConnected()) {
            return false
        }

        this.websocketConnection!.send(command)

        return this.isConnected()
    }

    isConnected (): boolean {
        return !!(this.websocketConnection && this.websocketConnection.connected)
    }

    connect (): Promise<void> {
        if (this.isConnected() && this.handshaken) {
            return this.emptyPromise()
        }

        return this.openConnection().then(() => this.performHandshake())
    }

    disconnect (): Promise<void> {
        if (!this.isConnected()) {
            return this.emptyPromise()
        }

        this.websocketConnection!.close()

        return new Promise((resolve) => {
            this.eventEmitter.once('lgtv_ws_closed', () => {
                resolve()
            })
        })
    }

    sendCommand (prefix: string, type: CommandTypes, uri: string, payload: any = null): Promise<Any> {
        this.commandCount += 1
        const id = String(prefix + this.commandCount)
        let msg: CommandBody = { id, type, uri }

        return new Promise((resolve, reject) => {
            try {
                this.eventEmitter.once(id, (message) => {
                    resolve()
                })

                const sendSuccess = this.sendWebsocket(msg)

                if (!sendSuccess) {
                    reject()
                }
            } catch (err) {
                return reject()
            }
        })
    }
}