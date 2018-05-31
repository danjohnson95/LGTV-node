import * as lgtv from 'lgtv'
import { Connection, CommandTypes } from './Connection'

export class LGTV {
    private connection: Connection

    hostname: string

    constructor (hostname: string) {
        this.hostname = hostname
        this.connection = new Connection(this.hostname)
    }

    connect (): Promise<void> {
        return this.connection.connect()
    }

    disconnect (): Promise<void> {
        return this.connection.disconnect()
    }

    turnOn (): void {
        // TODO: Send magic packet.
    }

    turnOff (): Promise<any> {
        return this.connection.sendCommand('', CommandTypes.Request, 'ssap://system/turnOff')
    }

    displayMessage (message: string): Promise<any> {
        const payload = { message }
        
        return this.connection.sendCommand('', CommandTypes.Request, 'ssap://system.notifications/createToast', payload)
    }

    setVolume (volume: number): Promise<any> {
        const payload = { volume }

        return this.connection.sendCommand('', CommandTypes.Request, 'ssap://audio/setVolume', payload)
    }

    volumeUp (): Promise<any> {
        return this.connection.sendCommand('volumeup_', CommandTypes.Request, 'ssap://audio/volumeUp')
    }

    volumeDown (): Promise<any> {
        return this.connection.sendCommand('volumedown_', CommandTypes.Request, 'ssap://audio/volumeDown')
    }

}