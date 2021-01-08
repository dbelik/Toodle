import React from 'react';
import anime from "animejs";

import PrimaryButton from "../../Components/Misc/PrimaryButton";
import Input from "../../Components/Misc/Input";

export default function Home() {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <h3 className="color-primary">Connect via share link ...</h3>
            <form className="w-full max-w-screen-sm px-4 flex flex-col items-center justify-center">
                <Input placeholder="Share link" />
                <div className="mt-2">
                    <PrimaryButton>Connect</PrimaryButton>
                </div>
            </form>
            
            <h3 className="color-primary mt-10">... or create</h3>
            <PrimaryButton>Create</PrimaryButton>
        </div>
    );
}