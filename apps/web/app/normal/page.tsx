'use client';

import { useRef, useState } from 'react';
import Button from '@mui/material/Button';

export default function CreateConnectionComponent(): JSX.Element {
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const [peer, setPeer] = useState<RTCPeerConnection | null>(null);
    const [localOffer, setLocalOffer] = useState<RTCSessionDescriptionInit>();
    const [remoteOffer, setRemoteOffer] = useState<RTCSessionDescriptionInit>();

    const setupVideoPlayer = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })

        const localVideo = localVideoRef.current;
        if (!localVideo) return;

        localVideo.srcObject = stream;

        localVideo.onloadedmetadata = () => {
            localVideo.play();
        };

        return stream;
    }

    const connectOffer = () => {
        if (!remoteOffer) return;

        console.log({remoteOffer})

        const p = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun1.l.google.com:19302' },
            ]
        });

        console.log(1, {p});

        (async () => {
            console.log(2, {remoteOffer})
            await p.setRemoteDescription(remoteOffer);

            const stream = await setupVideoPlayer();
            if (!stream) return;
            stream.getTracks().forEach((track) => {
                console.log({track})
                p.addTrack(track);
            });

            const answer = await p.createAnswer();
            await p.setLocalDescription(answer);
            setLocalOffer(answer);

            console.log('2asdwasdwasd')

            p.ontrack = ({ streams }) => {
                const remoteVideo = remoteVideoRef.current;

                console.log('1wasdwasdwasd', {streams})

                if (!remoteVideo) return;

                console.log('wasdwasdwasd', {streams})

                streams.forEach(stream => {
                    remoteVideo.srcObject = stream;
                });

                remoteVideo.onloadedmetadata = () => {
                    remoteVideo.play();
                };
            };

            setPeer(p);
        })();
    }

    return (
        <main>
            <div style={{ display: 'flex', width: '100vw' }}>
                <video ref={localVideoRef} autoPlay muted />
                <video ref={remoteVideoRef} autoPlay />
            </div>

            <div style={{ display: 'flex', width: '100vw' }}>
                <label>offer</label>
                <input
                    onChange={e => setRemoteOffer(JSON.parse(e.target.value))}
                    value={JSON.stringify(remoteOffer) || ''}
                />
            </div>
            <div style={{ display: 'flex', width: '100vw' }}>
                <label>answer</label>
                <input
                    onChange={e => setLocalOffer(JSON.parse(e.target.value))}
                    value={JSON.stringify(localOffer) || ''}
                    readOnly
                />
            </div>

            <Button onClick={connectOffer} disabled={!Boolean(remoteOffer)}>Connect</Button>
        </main>
    );
}
