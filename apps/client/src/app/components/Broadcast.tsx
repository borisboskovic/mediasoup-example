import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Device } from 'mediasoup-client';
import { useMediasoupRouterCapabilities } from '../hooks/use-mediasoup-router-capabilities';
import { Producer, RtpCapabilities } from 'mediasoup-client/types';
import {
    connectTransport,
    createTransport,
    produce,
} from '../services/mediasoup-service';
import { useVideoTrack } from '../hooks/use-video-track';

async function startBroadcast(
    capabilities: RtpCapabilities,
    track: MediaStreamTrack
) {
    const webRtcTransport = await createTransport();

    const device = new Device();
    await device.load({ routerRtpCapabilities: capabilities });
    const deviceTransport = device.createSendTransport(webRtcTransport);

    deviceTransport.on(
        'connect',
        async ({ dtlsParameters }, callback, errback) => {
            await connectTransport({
                transportId: deviceTransport.id,
                dtlsParameters,
            })
                .then(callback)
                .catch(errback);
        }
    );

    deviceTransport.on(
        'produce',
        async ({ kind, rtpParameters }, callback, errback) => {
            await produce({
                transportId: deviceTransport.id,
                kind,
                rtpParameters,
            })
                .then((res) => callback({ id: res.producerId }))
                .catch(errback);
        }
    );

    return await deviceTransport.produce({ track });
}

const Broadcast = () => {
    const [producer, setProducer] = useState<Producer>();
    const videoTrack = useVideoTrack();
    // TODO: This could be used in a wrapping component and passed down to Broadcast and Watch components (render error if failed)
    const capabilities = useMediasoupRouterCapabilities();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoTrack && videoRef.current) {
            videoRef.current.srcObject = new MediaStream([videoTrack]);
        }
    }, [videoTrack]);

    const startBroadcastHandler = async () => {
        if (capabilities && videoTrack) {
            const producer = await startBroadcast(capabilities, videoTrack);
            setProducer(producer);
        }
    };

    const copyHandler: MouseEventHandler<HTMLSpanElement> = async (event) => {
        const text = event.currentTarget.innerText;
        await navigator.clipboard.writeText(text);
    };

    return (
        <div className="border-2 border-blue-800 rounded-sm text-center">
            <div className="bg-blue-800 text-white text-sm font-semibold text-center">
                Broadcast
            </div>

            <div className="h-4"></div>
            {producer ? (
                <div>
                    <span>You are now live:</span>{' '}
                    <span
                        className="cursor-pointer bg-gray-100 rounded px-2"
                        onClick={copyHandler}
                        title="Click to copy to clipboard"
                    >
                        {producer.id}
                    </span>
                </div>
            ) : (
                <button
                    className="bg-gray-200 px-4 rounded font-semibold active:bg-gray-800 active:text-white"
                    onClick={startBroadcastHandler}
                >
                    START BROADCASTING
                </button>
            )}
            <div className="text-center p-4">
                <video className="inline" ref={videoRef} autoPlay muted></video>
            </div>
        </div>
    );
};

export default Broadcast;
