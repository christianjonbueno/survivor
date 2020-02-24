import React from 'react';
import Axios from 'axios';

class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      chosenUser: this.props.usersList[0],
      chosenPlayer: {},
      toUser: this.props.usersList[0]
    }
    this.getUsers = this.getUsers.bind(this);
    this.fromUser = this.fromUser.bind(this);
    this.tradePlayer = this.tradePlayer.bind(this);
    this.toUser = this.toUser.bind(this);
    this.confirmTrade = this.confirmTrade.bind(this);
  };

  componentDidMount() {
    this.getUsers()
  }

  getUsers() {
    Axios.get('/survivors/users')
      .then((list) => {
        this.setState({
          list: list.data,
          chosenUser: list.data[0]
        })
      })
  }

  fromUser(e) {
    for (var i = 0; i < this.props.usersList.length; i++) {
      if (this.props.usersList[i].name === e.target.value) {
        this.setState({
          chosenUser: this.props.usersList[i]
        });
      }
    }
  }

  tradePlayer(e) {
    var playersList = this.state.chosenUser.players;
    for (var k = 0; k < playersList.length; k++) {
      if (playersList[k].name === e.target.value) {
        this.setState({
          chosenPlayer: playersList[k]
        });
      }
    }
  }

  toUser(e) {
    for (var i = 0; i < this.props.usersList.length; i++) {
      if (this.props.usersList[i].name === e.target.value) {
        this.setState({
          toUser: this.props.usersList[i]
        });
      }
    }
  }

  confirmTrade(e) {
    e.preventDefault();
    var user = this.state.toUser;
    user.players.push(this.state.chosenPlayer);
    var confirmed = {
      players: user.players
    }
    console.log(confirmed)
    console.log(user)
    // Axios.put(`/survivors/users/${user._id}`, confirmed)
    //   .then((editedUser) => {
    //     alert(`${this.state.chosenPlayer.name} was traded to ${editedUser.data.name}`)
    //   })
    //   .then(() => {
    //     var idx = this.state.chosenUser.players.indexOf(this.state.chosenPlayer)
    //     var takenFrom = {
    //       name: this.state.chosenUser.name,
    //       image: this.state.chosenUser.image,
    //       players: this.state.chosenUser.players.splice(idx, 1)
    //     };
    //     Axios.put(`/survivors/users/${this.state.chosenUser._id}`, takenFrom)
    //       .then((newUser) => {
    //         document.getElementById('tradeForm').reset()
    //         this.getUsers()
    //       })
    //   })
  }

  render() {
    return(
      <div>
        <h1 className="display-3">Trade Players</h1>
        <form onSubmit={this.confirmTrade} id="tradeForm">
          <div className="form-group">
            <label>Select a User to trade from:</label>
            <select className="form-control" onChange={this.fromUser}>
              {this.state.list.map((user) => {
                return <option>{user.name}</option>
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Select the Players to trade:</label>
            <select multiple className="form-control" onChange={this.tradePlayer}>
              {this.state.chosenUser.players.map((player) => {
                return <option>{player.name}</option>
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Select a User to trade to:</label>
            <select className="form-control" onChange={this.toUser}>
              {this.state.list.map((user) => {
                return <option>{user.name}</option>
              })}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Confirm</button>
        </form>
      </div>
    )
  }
};

export default Trade;