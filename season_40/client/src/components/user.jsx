import React from 'react';
import Axios from 'axios';
import FadeIn from 'react-fade-in';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.showPlayerStats = this.showPlayerStats.bind(this);
  }
  
  componentDidMount() {
    // console.log(this.)
  }

  showPlayerStats(player) {
    this.props.showPlayerStats(player);
  }

  render() {
    return(
      <div className="mainUserContainer col-2">
        <FadeIn>
          <div className="">
            <img src={this.props.user.image} className="mainUserPic img img-icon" />
            <br />
            <h2>{this.props.user.name}</h2>
          </div>
          <div className="row">
            <div className="col">
              <ol className="mainPlayerList">
                {this.props.user.players.map((player) => {
                  return <li> 
                    {!player.extinction ? (
                      <img className="torch" src="https://i.ya-webdesign.com/images/torch-transparent-animated-6.gif"/>)
                      :(<img className="torch" src="https://thumbs.gfycat.com/AmusedBriefHen-max-1mb.gif"/>)} 
                    <span className="liPlayer" onClick={() => this.showPlayerStats(player)}>{player.name}</span>
                  </li>
                })}
              </ol>
            </div>
          </div>
        </FadeIn>
        </div>
    )
  }
}

export default User;