import React from 'react';
import anime from "animejs";

import PrimaryButton from "../../Components/Misc/PrimaryButton";
import Input from "../../Components/Misc/Input";

function showSecondSlide(event) {
    const leavingSpeed = 1200;

    // Hide first slide.
    anime({
        targets: "#home__first-slide",
        marginTop: -window.innerHeight,
        duration: leavingSpeed,
    });

    // Show second slide.
    anime({
        targets: ".home__second-slide__form",
        top: 0,
        duration: leavingSpeed,
        delay: leavingSpeed/1.5
    });
}

export default function Home() {
    return (
        <div className="h-screen overflow-hidden">
            <div id="home__first-slide" className="w-full h-full flex items-center justify-center flex-col">
                <h1 className="color-primary">Toodle</h1>
                <PrimaryButton onClick={showSecondSlide}>Start texting</PrimaryButton>
            </div>
            <div className="w-full h-full flex items-center justify-center text-center relative">
                <div className="home__second-slide__form top-6-over-5 w-1/2 h-full flex flex-col items-center justify-center relative">
                    <h3 className="color-primary">Connect via share link</h3>
                    <form className="w-full max-w-screen-sm px-4 flex flex-col items-center justify-center">
                        <Input placeholder="Share link" />
                        <div className="mt-2">
                            <PrimaryButton>Connect</PrimaryButton>
                        </div>
                    </form>
                </div>
                <div className="w-1 h-full bg-primary absolute top-0 left-1/2 -translate-x-half"></div>
                <div className="home__second-slide__form top-6-over-5 w-1/2 h-full flex items-center justify-center relative">
                    <div>
                        <h3 className="color-primary">or create new lobby</h3>
                        <div className="flex justify-center mt-2">
                            <PrimaryButton>Create</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}