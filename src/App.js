import React, { Component } from "react";
import CharacterList from './components/CharacterList/';
import logo from "./logo.svg";
import "./App.css";

import characters from "./fixtures/characters.json";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">
                        Lord of the Rings Character Index
                    </h1>
                </header>

                <section className="App-content">
                    <CharacterList characters={characters} />
                </section>
            </div>
        );
    }
}

export default App;
