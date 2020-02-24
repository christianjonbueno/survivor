import React from 'react';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    var style = {
      width: "18rem"
    }
    return(
      <div className="col-6 playerContainer">
        <p className="playerName">{this.props.player.name}</p>
        <div className="imageContainer">
          <img src={this.props.player.image} className="playerImage"></img>
        </div>
        <p className="playerText">{this.props.player.seasons}</p>
        {this.props.start && !this.props.player.chosen ? (
          <button 
            type="submit" 
            className="btn btn-sm btn-primary" 
            onClick={() => this.props.showPlayer(this.props.player)}
          >Choose</button>
        ):null}
      </div>
    )
  }
}
