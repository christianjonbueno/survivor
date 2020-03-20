import React from 'react';
import Axios from 'axios';
import User from './user.jsx';
import FadeIn from 'react-fade-in';
import Nav from './nav.jsx';
import PlayerCard from './playerCard.jsx';
import Tribes from './tribes.jsx';
import Trade from './trade.jsx';
import Edit from './edit.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      playersList: [],
      currentPlayer: {},
      showPlayer: false,
      menuHome: true,
      menuTribes: false,
      menuTrade: false,
      menuEdit: false
    };
    this.showNav = this.showNav.bind(this);
    this.hideNav = this.hideNav.bind(this);
    this.showPlayerStats = this.showPlayerStats.bind(this);
  }

  componentDidMount() {
    this.getUsers();
    this.getPlayers();
  }

  getUsers() {
    Axios.get('/survivors/users')
      .then((list) => {
        this.setState({
          usersList: list.data
        })
      })
  }
  getPlayers() {
    Axios.get('/survivors/players')
      .then((list) => {
        this.setState({
          playersList: list.data
        })
      })
  }
  showPlayerStats(player) {
    this.setState({
      currentPlayer: player,
      showPlayer: false
    }, () => this.setState({
      showPlayer: true
    }))
  }

  showNav(navItem) {
    for (var nav in this.state) {
      if (this.state[nav] === true) {
        this.setState({
          [nav] : false
        })
      }
    }
    this.setState({
      [navItem]: true
    });
  }
  hideNav() {
    for (var nav in this.state) {
      if (this.state[nav] === true) {
        this.setState({
          [nav] : false
        })
      }
    }
  }

  render() {
    return(
      <div>
        <FadeIn>
          <Nav showNav={this.showNav} />
        </FadeIn>
        {this.state.menuHome ? (
          <div className="mainContainer container">
            <h1 className="display-3">Survivor 40: Winners at War</h1>
            {this.state.usersList.map((user) => {
              return <User user={user} showPlayerStats={this.showPlayerStats} key={user.id}/>
            })}
            {this.state.showPlayer ? (
            <FadeIn>
              <PlayerCard currentPlayer={this.state.currentPlayer} />
            </FadeIn>
            ):(
            <div className="d-flex justify-content-center">
              <h1>Click on a Survivor to see their current stats!</h1>
            </div>
            )}
          </div>
        ): null }
        {this.state.menuTribes ? (
          <FadeIn>
            <div className="tribesContainer">
              <Tribes players={this.state.playersList} />
            </div>
          </FadeIn>
        ):null}
        {this.state.menuTrade ? (
          <FadeIn>
            <div className="tradeContainer">
              <Trade usersList={this.state.usersList} />
            </div>
          </FadeIn>
        ):null}
        {this.state.menuEdit ? (
          <FadeIn>
            <div className="editContainer">
              <Edit />
            </div>
          </FadeIn>
        ):null}
      </div>
    )
  }
}

export default Main;