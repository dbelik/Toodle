import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import PrimaryButton from "../../Components/Misc/PrimaryButton";
import Input from "../../Components/Misc/Input";
import Error from "../../Components/Misc/Error";

function setCurrentAlias(alias) {
    localStorage.setItem("alias", alias);
}

function getAliases() {
    return JSON.parse(localStorage.getItem("aliases")) || [];
}

function addAlias(alias) {
    const maxAliases = 3;

    const aliases = getAliases();
    if (aliases) {
        if (aliases.length >= maxAliases) aliases.shift();
        aliases.push(alias);
    }
    localStorage.setItem("aliases", JSON.stringify(aliases ? aliases : [alias]));
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

    addAlias(name);
    setCurrentAlias(name);
    window.location.href = "/workplace";
}

function SuggestionClick(event, value) {
    event.preventDefault();
    document.getElementById("name").value = value;
    document.getElementById("send-name").click();
}

export default function Profile() {
    const [error, setError] = useState("");
    const [aliases, setAliases] = useState([]);

    useEffect(() => {
        setAliases(getAliases().reverse());
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Toodle | Profile</title>
            </Helmet>

            <div className="content-container flex items-center justify-center flex-col">
                <form className="flex items-center justify-center flex-col">
                    <h2>How do you want to be called this time?</h2>
                    <Input id="name" autoFocus={true} placeholder="Hi, my name is ..." />
                    <PrimaryButton id="send-name" onClick={(event) => CreateProfile(event, setError)}>Create</PrimaryButton>
                    <Error className="mt-1">{error}</Error>
                </form>

                { aliases?.length > 0 ? <h3>Here are some suggestions:</h3> : "" }

                <ul className="text-center">
                    { aliases?.map((value, i) => <li key={i}><a href="" onClick={(event) => SuggestionClick(event, value)}>{value}</a></li>)}
                </ul>
            </div>
        </HelmetProvider>
    )
}