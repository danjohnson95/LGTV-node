import { EventEmitter } from 'events'
import * as Websocket from 'websocket'
import * as fs from 'fs'

var hello = "{\"type\":\"register\",\"id\":\"register_0\",\"payload\":{\"forcePairing\":false,\"pairingType\":\"PROMPT\",\"manifest\":{\"manifestVersion\":1,\"appVersion\":\"1.1\",\"signed\":{\"created\":\"20140509\",\"appId\":\"com.lge.test\",\"vendorId\":\"com.lge\",\"localizedAppNames\":{\"\":\"LG Remote App\",\"ko-KR\":\"리모컨 앱\",\"zxx-XX\":\"ЛГ Rэмotэ AПП\"},\"localizedVendorNames\":{\"\":\"LG Electronics\"},\"permissions\":[\"TEST_SECURE\",\"CONTROL_INPUT_TEXT\",\"CONTROL_MOUSE_AND_KEYBOARD\",\"READ_INSTALLED_APPS\",\"READ_LGE_SDX\",\"READ_NOTIFICATIONS\",\"SEARCH\",\"WRITE_SETTINGS\",\"WRITE_NOTIFICATION_ALERT\",\"CONTROL_POWER\",\"READ_CURRENT_CHANNEL\",\"READ_RUNNING_APPS\",\"READ_UPDATE_INFO\",\"UPDATE_FROM_REMOTE_APP\",\"READ_LGE_TV_INPUT_EVENTS\",\"READ_TV_CURRENT_TIME\"],\"serial\":\"2f930e2d2cfe083771f68e4fe7bb07\"},\"permissions\":[\"LAUNCH\",\"LAUNCH_WEBAPP\",\"APP_TO_APP\",\"CLOSE\",\"TEST_OPEN\",\"TEST_PROTECTED\",\"CONTROL_AUDIO\",\"CONTROL_DISPLAY\",\"CONTROL_INPUT_JOYSTICK\",\"CONTROL_INPUT_MEDIA_RECORDING\",\"CONTROL_INPUT_MEDIA_PLAYBACK\",\"CONTROL_INPUT_TV\",\"CONTROL_POWER\",\"READ_APP_STATUS\",\"READ_CURRENT_CHANNEL\",\"READ_INPUT_DEVICE_LIST\",\"READ_NETWORK_STATE\",\"READ_RUNNING_APPS\",\"READ_TV_CHANNEL_LIST\",\"WRITE_NOTIFICATION_TOAST\",\"READ_POWER_STATE\",\"READ_COUNTRY_INFO\"],\"signatures\":[{\"signatureVersion\":1,\"signature\":\"eyJhbGdvcml0aG0iOiJSU0EtU0hBMjU2Iiwia2V5SWQiOiJ0ZXN0LXNpZ25pbmctY2VydCIsInNpZ25hdHVyZVZlcnNpb24iOjF9.hrVRgjCwXVvE2OOSpDZ58hR+59aFNwYDyjQgKk3auukd7pcegmE2CzPCa0bJ0ZsRAcKkCTJrWo5iDzNhMBWRyaMOv5zWSrthlf7G128qvIlpMT0YNY+n/FaOHE73uLrS/g7swl3/qH/BGFG2Hu4RlL48eb3lLKqTt2xKHdCs6Cd4RMfJPYnzgvI4BNrFUKsjkcu+WD4OO2A27Pq1n50cMchmcaXadJhGrOqH5YmHdOCj5NSHzJYrsW0HPlpuAx/ECMeIZYDh6RMqaFM2DXzdKX9NmmyqzJ3o/0lkk/N97gfVRLW5hA29yeAwaCViZNCP8iC9aO0q9fQojoa7NQnAtw==\"}]}}}";

enum HandshakePermissions {
    Launch = "LAUNCH",
    LaunchWebApp = "LAUNCH_WEBAPP",
    AppToApp = "APP_TO_APP",
    Close = "CLOSE",
    TestOpen = "TEST_OPEN",
    TestProtected = "TEST_PROTECTED",
    ControlAudio = "CONTROL_AUDIO",
    ControlDisplay = "CONTROL_DISPLAY",
    ControlInputJoystick = "CONTROL_INPUT_JOYSTICK",
    ControlInputMediaRecording = "CONTROL_INPUT_MEDIA_RECORDING",
    ControlInputMediaPlayback = "CONTROL_INPUT_MEDIA_PLAYBACK",
    ControlInputTV = "CONTROL_INPUT_TV",
    ControlPower = "CONTROL_POWER",
    ReadAppStatus = "READ_APP_STATUS",
    ReadCurrentChannel = "READ_CURRENT_CHANNEL",
    ReadInputDeviceList = "READ_INPUT_DEVICE_LIST",
    ReadNetworkState = "READ_NETWORK_STATE",
    ReadRunningApps = "READ_RUNNING_APPS",
    ReadTVChannelList = "READ_TV_CHANNEL_LIST",
    WriteNotificationToast = "WRITE_NOTIFICATION_TOAST",
    ReadPowerState = "READ_POWER_STATE",
    ReadCountryInfo = "READ_COUNTRY_INFO"
}

class HandshakeSignature {
    signature: string = "eyJhbGdvcml0aG0iOiJSU0EtU0hBMjU2Iiwia2V5SWQiOiJ0ZXN0LXNpZ25pbmctY2VydCIsInNpZ25hdHVyZVZlcnNpb24iOjF9.hrVRgjCwXVvE2OOSpDZ58hR+59aFNwYDyjQgKk3auukd7pcegmE2CzPCa0bJ0ZsRAcKkCTJrWo5iDzNhMBWRyaMOv5zWSrthlf7G128qvIlpMT0YNY+n/FaOHE73uLrS/g7swl3/qH/BGFG2Hu4RlL48eb3lLKqTt2xKHdCs6Cd4RMfJPYnzgvI4BNrFUKsjkcu+WD4OO2A27Pq1n50cMchmcaXadJhGrOqH5YmHdOCj5NSHzJYrsW0HPlpuAx/ECMeIZYDh6RMqaFM2DXzdKX9NmmyqzJ3o/0lkk/N97gfVRLW5hA29yeAwaCViZNCP8iC9aO0q9fQojoa7NQnAtw=="
    signatureVersion: number = 1
}

class HandshakeSigned {
    appId: string = "com.lge.test"
    created: string = "20140509"
    localizedAppNames:
    localizedVendorNames: 
    permissions: HandshakeSignedPermissions[]
    serial: string = "2f930e2d2cfe083771f68e4fe7bb07"
    vendorId: string = "com.lge"
}

class HandshakeManifest {
    appVersion: string = '1.1'
    manifestVersion: number = 1
    permissions: HandshakePermissions[] = []
    signatures: HandshakeSignature[] = [new HandshakeSignature]
    signed: HandshakeSigned = new HandshakeSigned
}

class HandshakePayload {
    forcedPairing: boolean = false
    pairingType: string = 'PROMPT'
    manifest: HandshakeManifest = new HandshakeManifest
    "client-key"?: string
}

class HandshakeRequest {
    type: string = 'register'
    id: string = 'register_0'
    payload: HandshakePayload = new HandshakePayload
}

export class Connection {
    private commandCount: number = 0
    private eventEmitter: EventEmitter
    private websocketClient: Websocket.client
    private websocketConnection: Websocket.connection | null = null
    private readonly clientKeyFilename: string = 'client-key.txt'
    private readonly maxListeners: number = 0

    constructor (ipAddress: string) {
        this.eventEmitter = new EventEmitter
        this.websocketClient = new Websocket.client
        this.registerWebsocketListener()

        this.eventEmitter.setMaxListeners(this.maxListeners)
    }

    private storeClientKey (clientKey: string) {
        fs.writeFileSync(this.clientKeyFilename, clientKey)
    }

    private getHandshakeMsg (): HandshakeRequest {
        if (this.clientKeyExists()) {
            const clientKey = this.getClientKey()


        }

        this.
    }

    private registerWebsocketListener (): void {
        this.websocketClient.on('connect', (connection) => {
            this.websocketConnection = connection

            connection.on('error', (error) => {

            })

            connection.on('close', () => {
                this.eventEmitter.emit('lgtv_ws_closed')
            })

            connection.on('message', (message) => {
                const parsedMsg = JSON.parse(message)

                this.eventEmitter.emit(parsedMsg.id, parsedMsg)
            })
        })


    }
}