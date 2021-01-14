import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import PrimaryButton from "../../Components/Misc/PrimaryButton";
import Input from "../../Components/Misc/Input";
import Error from "../../Components/Misc/Error";

function AlreadyCreatedProfile() {
    return localStorage.getItem("alias");
}

function CreateProfile(event, setError) {
    const maxLength = 50;

    event.preventDefault();
    const name = document.getElementById("name").value;

    if (name.length === 0) {
        setError("Hey! You should first enter your name.");
        return;
    } else if (name.length > maxLength) {
        setError("Whoa! Not THAT big (max 50 characters).");
        return;
    }

    localStorage.setItem("alias", name);
    window.location.href = "/workplace";
}

export default function Profile() {
    const [error, setError] = useState("");

    return (
        <HelmetProvider>
            <Helmet>
                <title>Toodle | Profile</title>
            </Helmet>

            <form className="content-container flex items-center justify-center flex-col">
                <h2>{ !AlreadyCreatedProfile() ? "First, tell us what's your name" : "Wish to change your alias?"}</h2>
                <Input id="name" autoFocus={true} placeholder="Hi, my name is ..." />
                <PrimaryButton onClick={(event) => CreateProfile(event, setError)}>Create</PrimaryButton>
                <Error className="mt-1">{error}</Error>
            </form>
        </HelmetProvider>
    )
}