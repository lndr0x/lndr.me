import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import * as Icons from "../src/Icons";
import Head from "next/head";
import { Spotify } from "../src/components/spotify";

const App = () => {
    const containerAnim = {
        init: {
            opacity: 1,
        },
        load: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const childAnim = {
        init: {
            opacity: 0,
            x: 25,
        },
        load: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
    };

    const linkAnimParent = {
        init: {
            opacity: 1,
        },
        load: {
            opacity: 1,
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.1,
            },
        },
    };

    const linkAnim = {
        init: {
            opacity: 0,
            y: 10,
        },
        load: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
    };

    const [time, setTime] = useState("00:00:00 p.m.");
    const [presence, setPresence] = useState({ spotify: null }) as any;

    useEffect(() => {
        updateTime();
    }, []);

    useEffect(() => {
        fetch("/api/fetchPresence")
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(json => setPresence(json.data));
    }, []);

    function updateTime() {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: "Europe/Berlin"
    };
    
    let current = new Date().toLocaleTimeString('de-DE', options);
    setTime(current);
    setTimeout(updateTime, 1000);
}

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Leander Schlichting</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="keywords"
                    content="cnrad, Leander Schlichting, Leander, Schlichting, web developer, github, typescript"
                />
                <meta name="description" content="Leander Schlichting - Full-stack TypeScript Developer." />
                <meta name="author" content="Leander Schlichting" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <noscript>
                    <style>{"* {opacity: 1 !important;}"}</style>
                </noscript>
            </Head>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap"
                rel="stylesheet"
            />
            <Wrapper>
                <Container initial="init" animate="load" variants={containerAnim}>
                    <Header variants={childAnim}>Leander Schlichting</Header>
                    <Bio variants={childAnim}>
                        Python{" "}
                        <DevLink color="#949eb3" href="https://github.com/lndr0x">
                            developer
                        </DevLink>
                        .
                    </Bio>
                    <Time variants={childAnim}>
                        <Icons.ClockIcon />
                        {time}
                    </Time>
                    <Contact initial="init" animate="load" variants={linkAnimParent}>
                        <To variants={linkAnim} color="#ccc" target="_blank" href="mailto:email@leanderschlichting.org">
                            <Icons.MailIcon />
                        </To>
                        <To variants={linkAnim} color="#ccc" target="_blank" href="https://rickroll.com">
                            <Icons.TwitterIcon />
                        </To>
                        <To variants={linkAnim} color="#ccc" target="_blank" href="https://github.com/lndr0x">
                            <Icons.GitHubIcon />
                        </To>
                        <To variants={linkAnim} color="#ccc" target="_blank" href="https://rickroll.com">
                            <Icons.LinkedinLogo />
                        </To>

                        {/*<To variants={linkAnim} color="#ccc" target="_blank" href="https://poly.work/cnrad">
                            <Icons.PolyworkIcon />
                        </To> */}
                    </Contact>

                    <Spotify />
                </Container>
                <Background
                    src="/assets/background.jpg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, easing: [0, 1, 0.5, 1] }}
                />
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    position: fixed;
    inset: 0;
    margin: 0;
    height: 100vh;
    font-size: 16px;
    font-family: "Inter", sans-serif;
    color: #fff;
`;

const Background = styled(motion.img)`
    z-index: 0;
    position: fixed;
    top: -5rem;
    right: 0;
    object-fit: cover;

    width: 100vw;
    height: auto;
    min-height: 70rem;
    filter: grayscale(45%);
    pointer-events: none;
`;

const Container = styled(motion.div)`
    z-index: 1;
    position: fixed;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    width: 20%;
    min-width: 25rem;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    overflow: hidden;
    box-shadow: 0px 0px 100px 150px rgba(0, 0, 0, 0.9);

    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    padding-left: 4rem;

    & > * {
        margin-bottom: 25px;
    }
`;

const Header = styled(motion.div)`
    font-size: 2rem;
    font-weight: 600;
`;

const Bio = styled(motion.div)`
    font-size: 1.4rem;
    font-weight: 400;
    margin-top: -20px;
    color: #7b8290;
`;

const DevLink = styled(motion.a)<{ color: string }>`
    color: ${({ color }) => color};
    text-decoration: none;
    transition: color 0.15s ease-in-out;
    position: relative;

    &:hover {
        color: #fff;
    }

    &:before {
        content: "";
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -1px;
        left: 0;
        background-color: #fff;
        visibility: hidden;
        transition: all 0.3s ease-in-out;
    }

    &:hover:before {
        visibility: visible;
        width: 100%;
    }
`;

const To = styled(motion.a)<{ color: string }>`
    color: ${({ color }) => color};
    text-decoration: none;
    transition: color 0.15s ease-in-out;
    position: relative;

    &:hover {
        color: #fff;
    }
`;

const Time = styled(motion.div)`
    font-size: 1.25rem;
    font-weight: 300;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    height: 1.25rem;
    padding: 2px 0;

    & > * {
        margin-right: 15px;
    }
`;
const Contact = styled(motion.div)`
    display: flex;
    flex-direction: row;

    height: auto;
    width: 100%;
    color: #ddd;

    & > * {
        margin-right: 15px;
    }
`;

export default App;
