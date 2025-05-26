import { useState, useEffect } from "react";
import { useLanyard } from "use-lanyard";
import styled from "styled-components";
import { motion } from "framer-motion";

export function Spotify() {
    const { data: user } = useLanyard("1159863525561356379");
    const [currentTime, setCurrentTime] = useState(Date.now());

    // Update current time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!user || !user.spotify) {
        return <></>;
    }

    const { start, end } = user.spotify.timestamps;
    const progress = Math.min(
        ((currentTime - start) / (end - start)) * 100,
        100
    );

    return (
        <Presence
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: -100 }}
            transition={{ duration: 1.25, easing: [0, 0.5, 0.28, 0.99] }}
        >
            <ListeningTo>Listening to Spotify</ListeningTo>
            <SpotifyCont>
                <AlbumImg src={user.spotify.album_art_url ?? undefined} />
                <SpotifyIcon src="/assets/spotify-logo.svg" />
                <TextCont>
                    <SongTitle
                        href={`https://open.spotify.com/track/${user.spotify.track_id}`}
                        target="_blank"
                    >
                        {user.spotify.song}
                    </SongTitle>
                    <SongArtist>{user.spotify.artist}</SongArtist>
                </TextCont>
            </SpotifyCont>
            <ProgressBarContainer>
                <ProgressBar progress={progress} />
            </ProgressBarContainer>
        </Presence>
    );
}

// Neue Styled Components für die Progressbar
const ProgressBarContainer = styled.div`
    width: 100%;
    height: 4px;
    background-color: #333;
    border-radius: 2px;
    margin-top: 0.5rem;
    overflow: hidden;
`;

const ProgressBar = styled.div.attrs((props) => ({
    style: {
        width: `${props.progress}%`,
    },
}))`
    height: 100%;
    background-color: #1db954;
    border-radius: 2px;
    transition: width 1s linear;
`;

// Vorhandene Styled Components bleiben unverändert
const Presence = styled(motion.div)`
    /* unverändert */
`;
const ListeningTo = styled(motion.p)`
    /* unverändert */
`;
const SpotifyCont =