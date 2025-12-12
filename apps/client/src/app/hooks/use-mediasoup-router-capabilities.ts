import { useEffect, useState } from 'react';
import { RtpCapabilities } from 'mediasoup-client/types';

export const useMediasoupRouterCapabilities = () => {
    const [routerCapabilities, setRouterCapabilities] =
        useState<RtpCapabilities>();

    useEffect(() => {
        fetch('http://localhost:3000/router-capabilities')
            .then((res) => res.json())
            .then((res: RtpCapabilities) => {
                setRouterCapabilities(res);
            });
    }, []);

    return routerCapabilities;
};
