import React from 'react';
import Axios from 'axios';
import Player from './player.jsx';
import Draft from './draft.jsx';
import Main from './main.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      survivorsList: {
        dakal: [],
        sele: [],
      },
      buttons: false,
      currentUser: {},
      player: {},
      count: 0,
      draftScreen: false
    };
    this.getPlayers = this.getPlayers.bind(this);
    this.currentUser = this.currentUser.bind(this);
    this.showPlayer = this.showPlayer.bind(this);
    this.hideButton = this.hideButton.bind(this);
    this.hideDraft = this.hideDraft.bind(this);
  };

  componentDidMount() {
    this.getPlayers();
  };

  getPlayers() {
    Axios.get('/survivors/players')
      .then((list) => {
        let dakalTribe = [];
        let seleTribe = [];
        list.data.forEach((player) => {
          if(player.tribe === 'Dakal') {
            dakalTribe.push(player);
          } else {
            seleTribe.push(player);
          }
        });
        this.setState({
          survivorsList: {
            dakal: dakalTribe,
            sele: seleTribe
          }
        })
      })
      .catch((err) => console.error(err));
  };

  currentUser(user) {
    this.setState({
      start: !this.state.start,
      currentUser: user
    })
  }

  showPlayer(player) {
    this.setState({
      player: player
    })
  }

  hideButton() {
    this.setState({
      buttons: !this.state.buttons
    })
  }

  hideDraft() {
    this.setState({
      draftScreen: !this.state.draftScreen
    })
  }
  render() {
    return(
      <div className="main">
        {this.state.draftScreen ? (
          <div className="row draftContainer">
            <div className="col-4 tribe dakalTribe">
              {this.state.survivorsList.dakal.map((player, id) => {
                return <Player player={player} start={this.state.start} showPlayer={this.showPlayer} buttons={this.state.buttons} key={id} />
              })}
            </div>
            <div className="mainImageContainer col-4">
              <Draft chosen={this.currentUser} player={this.state.player} hideButton={this.hideButton} hideDraft={this.hideDraft} />
            </div>
            <div className="col-4 tribe seleTribe">
              {this.state.survivorsList.sele.map((player, id) => {
                return <Player player={player} start={this.state.start} showPlayer={this.showPlayer} buttons={this.state.buttons} key={id} />
              })}
            </div>
          </div>
        ) : <Main/>}
      </div>
    );
  };
};