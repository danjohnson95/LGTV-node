enum Permissions {
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
    ReadCountryInfo = "READ_COUNTRY_INFO",
    TestSecure = "TEST_SECURE",
    ControlInputText = "CONTROL_INPUT_TEXT",
    ControlMouseAndKeyboard = "CONTROL_MOUSE_AND_KEYBOARD",
    ReadInstalledApps = "READ_INSTALLED_APPS",
    ReadLGESDX = "READ_LGE_SDX",
    ReadNotifications = "READ_NOTIFICATIONS",
    Search = "SEARCH",
    WriteSettings = "WRITE_SETTINGS",
    WriteNotificationAlert = "WRITE_NOTIFICATION_ALERT",
    ReadUpdateInfo = "READ_UPDATE_INFO",
    UpdateFromRemoteApp = "UPDATE_FROM_REMOTE_APP",
    ReadLGETVInputEvents = "READ_LGE_TV_INPUT_EVENTS",
    ReadTVCurrentTime = "READ_TV_CURRENT_TIME"
}

class Signature {
    signature: string = "eyJhbGdvcml0aG0iOiJSU0EtU0hBMjU2Iiwia2V5SWQiOiJ0ZXN0LXNpZ25pbmctY2VydCIsInNpZ25hdHVyZVZlcnNpb24iOjF9.hrVRgjCwXVvE2OOSpDZ58hR+59aFNwYDyjQgKk3auukd7pcegmE2CzPCa0bJ0ZsRAcKkCTJrWo5iDzNhMBWRyaMOv5zWSrthlf7G128qvIlpMT0YNY+n/FaOHE73uLrS/g7swl3/qH/BGFG2Hu4RlL48eb3lLKqTt2xKHdCs6Cd4RMfJPYnzgvI4BNrFUKsjkcu+WD4OO2A27Pq1n50cMchmcaXadJhGrOqH5YmHdOCj5NSHzJYrsW0HPlpuAx/ECMeIZYDh6RMqaFM2DXzdKX9NmmyqzJ3o/0lkk/N97gfVRLW5hA29yeAwaCViZNCP8iC9aO0q9fQojoa7NQnAtw=="
    signatureVersion: number = 1
}

class LocalizedAppNames {
    "": string = "LG Remote App"
    "ko-KR": string = "리모컨 앱"
    "zxx-XX": string = "ЛГ Rэмotэ AПП"
}

class LocalizedVendorNames {
    "": string = "LG Electronics"
}

class Signed {
    appId: string = "com.lge.test"
    created: string = "20140509"
    localizedAppNames: LocalizedAppNames = new LocalizedAppNames
    localizedVendorNames: LocalizedVendorNames = new LocalizedVendorNames

    permissions: Permissions[] = [
        Permissions.TestSecure,
        Permissions.ControlInputText,
        Permissions.ControlMouseAndKeyboard,
        Permissions.ReadInstalledApps,
        Permissions.ReadLGESDX,
        Permissions.ReadNotifications,
        Permissions.Search,
        Permissions.WriteSettings,
        Permissions.WriteNotificationAlert,
        Permissions.ControlPower,
        Permissions.ReadCurrentChannel,
        Permissions.ReadRunningApps,
        Permissions.ReadUpdateInfo,
        Permissions.UpdateFromRemoteApp,
        Permissions.ReadLGETVInputEvents,
        Permissions.ReadTVCurrentTime
    ]

    serial: string = "2f930e2d2cfe083771f68e4fe7bb07"
    vendorId: string = "com.lge"
}

class Manifest {
    appVersion: string = '1.1'
    manifestVersion: number = 1

    permissions: Permissions[] = [
        Permissions.Launch,
        Permissions.LaunchWebApp,
        Permissions.AppToApp,
        Permissions.Close,
        Permissions.TestOpen,
        Permissions.TestProtected,
        Permissions.ControlAudio,
        Permissions.ControlDisplay,
        Permissions.ControlInputJoystick,
        Permissions.ControlInputMediaRecording,
        Permissions.ControlInputMediaPlayback,
        Permissions.ControlInputTV,
        Permissions.ControlPower,
        Permissions.ReadAppStatus,
        Permissions.ReadCurrentChannel,
        Permissions.ReadInputDeviceList,
        Permissions.ReadNetworkState,
        Permissions.ReadRunningApps,
        Permissions.ReadTVChannelList,
        Permissions.WriteNotificationToast,
        Permissions.ReadPowerState,
        Permissions.ReadCountryInfo
    ]

    signatures: Signature[] = [new Signature]
    signed: Signed = new Signed
}

class Payload {
    forcedPairing: boolean = false
    pairingType: string = 'PROMPT'
    manifest: Manifest = new Manifest
    "client-key"?: string

    constructor (clientKey: string | null = null) {
        if (clientKey) {
            this["client-key"] = clientKey
        }
    }
}

export class HandshakeRequest {
    static readonly type = 'register'
    static readonly id = 'register_0'

    type: string = HandshakeRequest.type
    id: string = HandshakeRequest.id
    payload: Payload


    constructor (clientKey: string | null = null) {
        this.payload = new Payload(clientKey)
    }
}