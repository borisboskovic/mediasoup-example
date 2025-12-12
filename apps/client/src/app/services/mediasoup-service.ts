import {
    ConnectTransportData,
    ConsumeData,
    ConsumeResponse,
    CreateTransportResponse,
    ProduceData,
    ProduceResponse,
} from '@mediasoup-example/shared/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function createTransport(): Promise<CreateTransportResponse> {
    return await fetch(`${BASE_URL}/create-transport`, {
        method: 'POST',
    }).then((res) => res.json());
}

export async function connectTransport(data: ConnectTransportData) {
    return await fetch(`${BASE_URL}/connect-transport`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function produce(data: ProduceData): Promise<ProduceResponse> {
    return await fetch(`${BASE_URL}/produce`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json() as Promise<ProduceResponse>);
}

export async function consume(data: ConsumeData): Promise<ConsumeResponse> {
    return await fetch(`${BASE_URL}/consume`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json() as Promise<ConsumeResponse>);
}
