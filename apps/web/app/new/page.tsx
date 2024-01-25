'use client';

import { Button } from "@mui/material";
import { useRef, useState } from "react";

export default function CreateConnectionComponent(): JSX.Element {
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const [peer, setPeer] = useState<RTCPeerConnection | null>(null);
    const [localOffer, setLocalOffer] = useState<RTCSessionDescription | null>(null);
    const [remoteAnswer, setRemoteAnswer] = useState<RTCSessionDescription | null>(null);

    const generateOffer = async () => {
      const p = new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun1.l.google.com:19302' },
        ]
      });

      p.ontrack = ({ streams }) => {
        const remoteVideo = remoteVideoRef.current;
        if (!remoteVideo) return;

        remoteVideo.onloadedmetadata = () => {
          remoteVideo.play();
        };

        console.log(streams)
  
        remoteVideo.srcObject = streams[0]!;
      };

      console.log(1, {p});

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  
      const localVideo = localVideoRef.current;
      if (!localVideo) return;
  
      stream.getTracks().forEach((track) => {
        console.log('123wasdwasds', { track })
        p.addTrack(track)
      });

      localVideo.srcObject = stream;
  
      const o = await p.createOffer({
        iceRestart: true,
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      })

      console.log({o})
  
      
      await p.setLocalDescription(o);
      
      setLocalOffer(p.localDescription);
      setPeer(p);
    };
  
    const connectAnswer = () => {
      if (!remoteAnswer || !peer) return;

      console.log({remoteAnswer})
      
      peer.setRemoteDescription(new RTCSessionDescription(remoteAnswer));
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
                onChange={e => setLocalOffer(JSON.parse(e.target.value))}
                value={JSON.stringify(localOffer ?? undefined)}
                readOnly
            />
            </div>
            <div style={{ display: 'flex', width: '100vw' }}>
                <label>answer</label>
                <input
                    onChange={e => setRemoteAnswer(JSON.parse(e.target.value))}
                    value={JSON.stringify(remoteAnswer ?? undefined)}
                />
            </div>
  
        <Button onClick={generateOffer} disabled={Boolean(localOffer)}>Generate Offer</Button>
        <Button onClick={connectAnswer} disabled={!Boolean(localOffer)}>Connect</Button>
      </main>
    );
  }
  