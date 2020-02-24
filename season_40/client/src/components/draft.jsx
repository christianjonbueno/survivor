import React from 'react';
import Axios from 'axios';

export default class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      count: 0,
      totalcount: 0,
      randomized: [],
      user: {},
      step1: true,
      step2: false,
      step3: false,
      step4: false
    };
    this.getUsers = this.getUsers.bind(this);
    this.chooseUser = this.chooseUser.bind(this);
    this.sendUser = this.sendUser.bind(this);
    this.increaseCount = this.increaseCount.bind(this);
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    Axios.get('/survivors/users')
      .then((list) => {
        this.setState({
          usersList: list.data
        }, () => console.log(this.state.user))
      })
      .catch((err) => console.error(err))
  }

  chooseUser() {
    var users = this.state.usersList;
    for (let i = users.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [users[i], users[j]] = [users[j], users[i]];
    };
    this.setState({
      randomized: users,
      step1: !this.state.step1,
      user: users[this.state.count]
    }, () => this.sendUser(this.state.user));
  }

  sendUser(user) {
    this.props.chosen(user);
  }

  addPlayerToUser(player) {
    player.chosen = true;
    Axios.put(`/survivors/players/${player._id}`, player)
      .then((playerchosen) => {
        this.updateUser(playerchosen.data);
      })
      .catch((err) => console.error(err));
  }

  updateUser(playerchosen) {
    var user = this.state.randomized[this.state.count];
    user.players.push(playerchosen)
    Axios.put(`/survivors/users/${user._id}`, user)
      .then((user) => {
        this.setState({
          user: user.data
        },() => this.increaseCount())
      })
      .catch((err) => console.error(err));
  }

  increaseCount() {
    if (this.state.count === 4) {
      this.setState({
        count: 0
      });
    } else {
      this.setState({
        count: this.state.count += 1,
        totalcount: this.state.totalcount += 1
      });
    }
    this.props.hideButton();
    console.log(this.state)
    if (this.state.totalcount === 20) {
      this.props.hideDraft();
    };
  }

  render() {
    return(
      <div>
        <img className="mainImage"src="https://i.imgur.com/SOFYo8w.png"></img>
        <h4 className="">Welcome to the bi-annual Survivor Draft!</h4>
        {this.state.step1 ? (
          <div>
            <h4>Let's begin by randomly choosing the draft order!</h4>
            <button type="button" className="btn btn-outline-warning" onClick={() => this.chooseUser()}>Let's Begin</button>
          </div>
        ):(
          <div>
            <h4>The draft order has been chosen!</h4>
            <ol>
              {this.state.randomized.map((user, id) => {
                return <li key={id}>{user.name}: {user.players.length}</li>
              })}
            </ol>
            <img className="userImage" src={this.state.randomized[this.state.count].image}></img>
            <h4>{this.state.randomized[this.state.count].name}, please choose your Survivor.</h4>
            {this.props.player.name && !this.props.player.chosen ? (
              <div>
                <img className="hoveredPlayer" src={this.props.player.image}></img>
                <h3>Choose {this.props.player.name}?</h3>
                <button type="button" className="btn btn-outline-success" onClick={() => this.addPlayerToUser(this.props.player)}>I would like to draft {this.props.player.name} onto my team.</button>
              </div>
            ):null}
          </div>
        )}
      </div>
    )
  }
}

const Step2 = (props) => {
  return(
    <div>
      {props.User}, please choose your User:
    </div>
  )
}