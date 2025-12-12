import { useRef, useState } from 'react';
import {
    connectTransport,
    consume,
    createTransport,
} from '../services/mediasoup-service';
import { Device } from 'mediasoup-client';
import { RtpCapabilities } from 'mediasoup-client/types';
import { useMediasoupRouterCapabilities } from '../hooks/use-mediasoup-router-capabilities';

const connectToStream = async (
    producerId: string,
    capabilities: RtpCapabilities
) => {
    const webRtcTransport = await createTransport();

    const device = new Device();
    await device.load({ routerRtpCapabilities: capabilities });
    const deviceTransport = device.createRecvTransport(webRtcTransport);

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

    const consumeParams = await consume({
        transportId: deviceTransport.id,
        producerId: producerId,
        rtpCapabilities: device.rtpCapabilities,
    });

    return await deviceTransport.consume({
        id: consumeParams.id,
        producerId: producerId,
        kind: consumeParams.kind,
        rtpParameters: consumeParams.rtpParameters,
    });
};

const Watch = () => {
    const [connected, setConnected] = useState(false);
    const [producerId, setProducerId] = useState<string>("");
    const capabilities = useMediasoupRouterCapabilities();
    const videoRef = useRef<HTMLVideoElement>(null);

    const connectHandler = async () => {
        if (capabilities && producerId) {
            await connectToStream(producerId, capabilities).then((consumer) => {
                if (videoRef?.current) {
                    videoRef.current.srcObject = new MediaStream([
                        consumer.track,
                    ]);
                }
                setConnected(true);
            });
        }
    };

    return (
        <div className="border-2 border-pink-800 rounded-sm">
            <div className="bg-pink-800 text-white text-sm font-semibold text-center">
                Watch
            </div>
            <div className="text-center p-4">
                {connected || (
                    <div className="flex gap-2 justify-center">
                        <label htmlFor="producerId">Producer Id:</label>
                        <input
                            type="text"
                            className="border border-gray-700 w-80 text-center"
                            id="producerId"
                            value={producerId}
                            onChange={(e) => setProducerId(e.target.value)}
                        />
                        <button
                            onClick={connectHandler}
                            className="bg-gray-200 px-4 rounded font-semibold active:bg-gray-800 active:text-white"
                        >
                            CONNECT
                        </button>
                    </div>
                )}
                <video className="inline" ref={videoRef} autoPlay muted></video>
            </div>
        </div>
    );
};

export default Watch;
