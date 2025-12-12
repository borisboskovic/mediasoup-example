import { useEffect, useState } from 'react';

export const useVideoTrack = () => {
    const [track, setTrack] = useState<MediaStreamTrack>();

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: true })
            .then((res) => {
                const tracks = res.getVideoTracks();
                if (tracks.length > 0) {
                    setTrack(tracks[0]);
                }
            });
    }, []);

    return track;
};
