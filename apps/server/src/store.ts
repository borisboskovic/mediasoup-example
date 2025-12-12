import type { Router, AppData, WebRtcTransport } from 'mediasoup/types';

let router: Router<AppData> | null = null;
const transports = new Map<string, WebRtcTransport<AppData>>();

const getRouter = () => {
    return router;
};

const setRouter = (newValue: Router<AppData>) => {
    router = newValue;
};

const addTransport = (transport: WebRtcTransport<AppData>) => {
    transports.set(transport.id, transport);
};

const getTransportById = (id: string) => {
    return transports.get(id);
};

export const store = {
    getRouter,
    setRouter,
    addTransport,
    getTransportById,
};
