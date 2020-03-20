import React from 'react';
import Axios from 'axios';

export default class Edit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      showPlayersList: false,
      user: {},
      players: [],
      form: false,
      player: {},
      tribe: '',
      idols: 0,
      advantages: '',
      extinction: '',
      eliminated: '',
      flippedExt: false,
      flippedEli: false
    };
    this.getUsers = this.getUsers.bind(this);
    this.showPlayers = this.showPlayers.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
    this.setChanges = this.setChanges.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.resetForm = this.resetForm.bind(this);
  };

  componentDidMount() {
    this.getUsers();
  };

  getUsers() {
    Axios.get('/survivors/users')
      .then((list) => {
        this.setState({
          users: list.data
        })
      });
  };

  showPlayers(user) {
    this.setState({
      showPlayersList: false,
      form: false
    }, () => {
      this.setState({
        showPlayersList: true,
        user: user,
        players: user.players
      })
    })
  }

  showEditForm(player) {
    this.setState({
      form: false
    }, () => {
      this.setState({
        form: true,
        player: player,
        tribe: player.tribe,
        idols: player.idols,
        advantages: player.advantages,
        extinction: player.extinction,
        eliminated: player.eliminated,
        flippedExt: !player.extinction,
        flippedEli: !player.eliminated
      })
    })
  }

  setChanges(e) {
    console.log(e.target)
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state))
  }

  submitChanges(e) {
    e.preventDefault()
    var changes = {
      _id: this.state.player._id,
      name: this.state.player.name,
      tribe: this.state.tribe,
      idols: this.state.idols,
      advantages: this.state.advantages,
      extinction: JSON.parse(this.state.extinction),
      eliminated: JSON.parse(this.state.eliminated),
      image: this.state.player.image,
      image2: this.state.player.image2,
      seasons: this.state.player.seasons,
      chosen: this.state.player.chosen
    }
    var idx = this.state.user.players.indexOf(this.state.player);
    var toUpdate = this.state.user;
    toUpdate.players.splice(idx, 1, changes);
    var toSend = {
      players: toUpdate.players
    }
    console.log(toSend)
    Axios.put(`/survivors/users/${toUpdate._id}`, toSend)
      .then(() => {
        alert(`${changes.name}'s stats were updated`);
        this.setState({
          form: false,
          showPlayersList: false
        })
        this.getUsers();
      });
  }
  
  resetForm() {
    this.setState({
      form: false,
      player: {},
      tribe: '',
      idols: 0,
      advantages: '',
      extinction: '',
      eliminated: '',
      flippedExt: false,
      flippedEli: false
    })
  }

  render() {
    return(
      <div className="">
        <h1 className="display-3">Edit Players</h1>
        <div className="row">
          <div className="col-3">
            <h4>Step 1: Choose a User </h4>
            {this.state.users.map((user) => {
              return <p><button className="btn btn-secondary" onClick={() => this.showPlayers(user)}>{user.name}</button></p>
            })}
          </div>
          {this.state.showPlayersList ? (
            <div className="col-5"><h4>Step 2: Choose a Player </h4>{this.state.players.map((player) => {
              return <p key={player.id}><button className="btn btn-info" onClick={() => this.showEditForm(player)}>{player.name}</button></p>
            })}
            </div>
          ):null}
          {this.state.form ? (
            <div className="col-4">
              <h4>Step 3: Edit {this.state.player.name}'s stats</h4>
              <form onSubmit={this.submitChanges} id="edits">
                <div className="form-group editForm">
                  <div className="labels">
                    <label>Tribe:</label>
                    <br />
                    <label>Idols:</label>
                    <br />
                    <label>Advantages:</label>
                    <br />
                    <label>At Edge of Extinction:</label>
                    <br />
                    <label>Eliminated:</label>
                  </div>
                  <div className="inputs">
                    <input type="text" className="form-control" name="tribe" defaultValue={this.state.player.tribe} onChange={this.setChanges}></input>
                    <br />
                    <input type="number" min="0" className="form-control" name="idols" defaultValue={this.state.player.idols} onChange={this.setChanges}></input>
                    <br />
                    <input type="text" className="form-control" name="advantages" defaultValue={this.state.player.advantages} onChange={this.setChanges}></input>
                    <br />
                    <select className="form-control" name="extinction" onChange={this.setChanges}>
                      <option value={this.state.player.extinction}>{this.state.player.extinction.toString().toUpperCase()}</option>
                      <option value={!this.state.player.extinction}>{this.state.flippedExt.toString().toUpperCase()}</option>
                    </select>
                    <br />
                    <select className="form-control" name="eliminated" onChange={this.setChanges}>
                      <option value={this.state.player.eliminated}>{this.state.player.eliminated.toString().toUpperCase()}</option>
                      <option value={!this.state.player.eliminated}>{this.state.flippedEli.toString().toUpperCase()}</option>
                    </select>
                  </div>
                  <div className="editButton">
                    <button type="button" className="btn btn-secondary" onClick={() => this.resetForm()}>Cancel</button>
                    <button type="submit" className="btn btn-success">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          ):null}
        </div>
      </div>
    );
  };

};