import { createWorker } from 'mediasoup';
import {
    ConnectTransportData,
    ConsumeData,
    ProduceData,
    CreateTransportResponse,
    ProduceResponse,
    ConsumeResponse,
} from '@mediasoup-example/shared/types';
import { config } from './config';
import { store } from './store';

async function createRouter() {
    const worker = await createWorker();
    const router = await worker.createRouter(config.routerOptions);
    store.setRouter(router);
    return router;
}

export async function createTransport(): Promise<CreateTransportResponse> {
    const transport = await store
        .getRouter()
        ?.createWebRtcTransport(config.transportOptions);

    if (!transport) {
        return Promise.reject('There is no router');
    }

    store.addTransport(transport);

    return {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
    };
}

export async function connectTransport(data: ConnectTransportData) {
    const { transportId, dtlsParameters } = data;
    const transport = store.getTransportById(transportId);
    if (!transport) {
        return Promise.reject('connectTransport: There is no transport');
    }

    await transport.connect({ dtlsParameters });
}

export async function produce(data: ProduceData): Promise<ProduceResponse> {
    const { transportId, rtpParameters, kind } = data;

    const transport = store.getTransportById(transportId);
    if (!transport) {
        return Promise.reject('produce: There is no transport');
    }

    const producer = await transport.produce({ rtpParameters, kind });

    return { producerId: producer.id };
}

export async function consume(data: ConsumeData): Promise<ConsumeResponse> {
    const { transportId, producerId, rtpCapabilities } = data;

    const transport = store.getTransportById(transportId);
    if (!transport) {
        return Promise.reject('produce: There is no transport');
    }

    const consumer = await transport.consume({
        producerId,
        rtpCapabilities,
        paused: false,
    });

    return {
        id: consumer.id,
        producerId,
        kind: consumer.kind,
        rtpParameters: consumer.rtpParameters,
    };
}

export async function initializeMediasoupServer() {
    await createRouter();
}
