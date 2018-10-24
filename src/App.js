import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import "./App.css";

import MainJumbotron from "./MainJumbotron";
import ResearchBar from "./ResearchBar";
import GamesList from "./GamesList";
import UserName from "./UserName";
import GameMenu from "./GameMenu";
import ChosenGame from "./ChosenGame";
import PlayersList from "./PlayersList";

const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlayer: null,
      tempPlayer: null,
      gamesList: null,
      selectedGame: null,
      gameSearch: null,
      players: []
    };

    this.selectGame = this.selectGame.bind(this);
    this.handleGameSearchChange = this.handleGameSearchChange.bind(this);
    this.handleNewPlayerChange = this.handleNewPlayerChange.bind(this);
    this.handleNewScoreChange = this.handleNewScoreChange.bind(this);
    this.submitNewPlayer = this.submitNewPlayer.bind(this);
    this.submitScorePlayer = this.submitScorePlayer.bind(this);
  }

  selectGame(game) {
    this.setState({
      selectedGame: game,
      gameSearch: null,
      gamesList: null
    });
  }

  handleNewPlayerChange(event) {
    this.setState({ tempPlayer: event.target.value });
  }

  handleNewScoreChange(name, inputScore) {
    console.log(name, inputScore);
    this.setState({
      players: this.state.players.map(
        player => (player.name === name ? { ...player, inputScore: inputScore } : player)
      )
    });
  }

  submitNewPlayer() {
    console.log("player");
    this.setState({
      players: [
        ...this.state.players,
        {
          name: this.state.tempPlayer
        }
      ]
    });
  }

  submitScorePlayer(name, finalScore) {
    console.log(finalScore)
    this.setState({
      players: this.state.players.map(
        player => (player.name === name ? { ...player, finalScore: player.inputScore } : player)
      )
    });
  }

  handleGameSearchChange(event) {
    //appel api ici
    axios
      .get(
        `https://fathomless-bayou-60427.herokuapp.com/https://api-endpoint.igdb.com/games/?fields=*&search=${
          event.target.value
        }&order=popularity:desc&limit=6`,
        {
          headers: {
            "user-key": "31f397b7994b8d46b0d5aff3b41eb376",
            Accept: "application/json"
          }
        }
      )
      .then(response => {
        return this.setState({ gamesList: response.data });
      })
      .catch(e => {
        console.log("error", e);
      });
    this.setState({
      gameSearch: event.target.value
    });
  }

  componentDidMount() {
    axios
      .get(
        "https://fathomless-bayou-60427.herokuapp.com/https://api-endpoint.igdb.com/games/?fields=*&order=rating:desc&limit=6",
        {
          headers: {
            "user-key": "31f397b7994b8d46b0d5aff3b41eb376",
            Accept: "application/json"
          }
        }
      )
      .then(response => {
        return this.setState({
          gamesList: response.data
        });
      })
      .catch(e => {
        console.log("error", e);
      });
  }

  render() {
    return (
      <section>
        <div className="App">
          <header className="App-header">
            <MainJumbotron />

            <ResearchBar
              value={this.state.gameSearch}
              onChange={this.handleGameSearchChange}
            />
          </header>
          <Container>
            {this.state.gamesList && (
              <GamesList
                list={this.state.gamesList}
                selectGame={this.selectGame}
              />
            )}
            {this.state.selectedGame && (
              <div>
                <ChosenGame game={this.state.selectedGame} />
                <Row>
                  <Col>
                    <UserName
                      handleChange={this.handleNewPlayerChange}
                      submitNewPlayers={this.submitNewPlayer}
                    />
                  </Col>
                </Row>
                <GameMenu />
                <PlayersList
                  list={this.state.players}
                  handleNewScoreChange={this.handleNewScoreChange}
                  submitScorePlayers={this.submitScorePlayer}
                />
              </div>
            )}
          </Container>
        </div>
      </section>
    );
  }
}

export default App;
