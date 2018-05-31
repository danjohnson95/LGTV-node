import * as lgtv from 'lgtv'
import { Connection } from './Connection'

export interface CommandBody {
    id: string,
    type: string,
    uri: string,
    payload?: string
}

export class LGTV {
    private commandCount: number = 0
    private connection: Connection

    hostname: string

    constructor (hostname: string) {
        this.hostname = hostname
        this.connection = new Connection(this.hostname)
    }

    private sendCommand (prefix, type, uri, payload): Promise<Any> {
        this.commandCount += 1
        const id = String(prefix + this.commandCount)
        let msg: CommandBody = { id, type, uri }

        return new Promise((resolve, reject) => {
            try {
                this.eventEmitter.once(id, (message) => {
                    resolve()
                })

                this.sendWebsocket(msg)
            } catch (err) {
                return reject()
            }
        })
    }

    private sendWebsocket (msg: CommandBody): void {

    }

    connect () {
        return new Promise((resolve: any, reject: any) => {
            lgtv.connect(this.hostname, (err: any, response: any) => {
                if (err) {
                    return reject(response)
                }

                return resolve(response)
            })
        })
    }

    disconnect (): Promise<void> {
        return new Promise((resolve: any, reject: any) => {
            lgtv.disconnect((success: boolean) => {
                return success ? resolve() : reject()
            })
        })
    }

    turnOff (): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            lgtv.turn_off((err: any, response: any) => {
                if (err) {
                    return reject(err)
                }

                return resolve(response)
            })
        })
    }

    displayMessage (message: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            lgtv.show_float(message, (err: any, response: any) => {
                if (err) {
                    return reject(err)
                }

                resolve(response)
            })
        })
    }

    getCurrentChannel (): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            lgtv.channel()
        })
    }
}