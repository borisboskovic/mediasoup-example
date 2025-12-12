import { WebRtcTransportOptions, RouterOptions } from 'mediasoup/types';

const routerOptions: RouterOptions = {
    mediaCodecs: [
        {
            kind: 'audio',
            mimeType: 'audio/opus',
            clockRate: 48000,
            channels: 2,
        },
        { kind: 'video', mimeType: 'video/VP8', clockRate: 90000 },
    ],
};

const transportOptions: WebRtcTransportOptions = {
    listenInfos: [
        { protocol: 'udp', ip: '0.0.0.0', announcedAddress: '127.0.0.1' },
        { protocol: 'tcp', ip: '0.0.0.0', announcedAddress: '127.0.0.1' },
    ],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
};

export const config = {
    routerOptions,
    transportOptions,
};
