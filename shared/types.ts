import {
    DtlsParameters,
    RtpCapabilities,
    MediaKind,
    IceCandidate,
    IceParameters,
    RtpParameters,
} from 'mediasoup-client/types';

export type CreateTransportResponse = {
    id: string;
    iceParameters: IceParameters;
    iceCandidates: IceCandidate[];
    dtlsParameters: DtlsParameters;
};

export type ConnectTransportData = {
    transportId: string;
    dtlsParameters: DtlsParameters;
};

export type ProduceData = {
    transportId: string;
    kind: MediaKind;
    rtpParameters: RtpParameters;
};

export type ProduceResponse = {
    producerId: string;
};

export type ConsumeData = {
    transportId: string;
    producerId: string;
    rtpCapabilities: RtpCapabilities;
};

export type ConsumeResponse = {
    id: string;
    producerId: string;
    kind: MediaKind;
    rtpParameters: RtpParameters;
};
