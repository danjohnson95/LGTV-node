import * as lgtv from 'lgtv'
import { Connection } from './Connection'

export class LGTV {
    private connection: Connection

    hostname: string

    constructor (hostname: string) {
        this.hostname = hostname
        this.connection = new Connection(this.hostname)
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