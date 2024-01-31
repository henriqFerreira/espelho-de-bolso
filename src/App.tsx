import React, { useEffect } from "react";
import "./App.css";

function App() {
    function toggleDarkMode(event: any) {
        const darkMode = document.querySelector(".dark-mode") as HTMLElement;
        const label = document.querySelector("label") as HTMLElement;

        if (!darkMode || !label) {
            return;
        }

        if (event.target.checked) {
            darkMode.style.opacity = "1";
            label.style.color = "white";
        } else {
            darkMode.style.opacity = "0";
            label.style.color = "black";
        }
    }

    useEffect(() => {
        async function getMediaStream() {
            const constraints = {
                video: {
                    width: {
                        min: 1280,
                        ideal: 1920,
                        max: 2560,
                    },
                    height: {
                        min: 720,
                        ideal: 1080,
                        max: 1440,
                    },
                },
            };

            try {
                const stream = await navigator.mediaDevices.getUserMedia(
                    constraints
                );
                const video = document.getElementById(
                    "video"
                ) as HTMLVideoElement;
                video.srcObject = stream;
                video.onloadedmetadata = () => video.play();
            } catch (error) {
                console.error(error);
            }
        }

        getMediaStream();
    }, []);

    return (
        <main>
            <label htmlFor="modoEscuro">
                <input
                    type="checkbox"
                    onClick={toggleDarkMode}
                    id="modoEscuro"
                />
                Modo escuro
            </label>
            <video className="video" id="video" autoPlay></video>
            <section className="dark-mode"></section>
        </main>
    );
}

export default App;
