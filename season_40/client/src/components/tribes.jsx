import React from 'react';
import FadeIn from 'react-fade-in';

const Tribes = (props) => (
  <div className="">
    <h1 className="display-3">Tribes</h1>
    <div className="row">
      <div className="col-6">
        <img className="tribePic" src="https://i.imgur.com/kvUIQ95.png"></img>
        <FadeIn>
          <table className="table table-hover">
            <tbody>
            {props.players.map((player) => {
              return <tr className="table-danger">
                {player.tribe === 'Dakal' ? (<td>{player.name}</td>):null}
              </tr>
            })}
            </tbody>
          </table>
        </FadeIn>
      </div>
      <div className="col-6">
        <img className="tribePic" src="https://i.imgur.com/9qsDOPS.png"></img>
        <FadeIn>
          <table className="table table-hover">
            <tbody>
            {props.players.map((player) => {
              return <tr className="table-primary">
                {player.tribe === 'Sele' ? (<td>{player.name}</td>):null}
              </tr>
            })}
            </tbody>
          </table>
        </FadeIn>
      </div>
    </div>
  </div>
);

export default Tribes;