import React from 'react';

const PlayerCard = (props) => (
  <div className="d-flex justify-content-center">
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={props.currentPlayer.image2} className="card-img" alt="..."/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-header">{props.currentPlayer.name}</h5>
            <p className="card-text"><small className="text-muted">{props.currentPlayer.seasons}</small></p>
            <table class="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Tribe</th>
                  <td>{props.currentPlayer.tribe}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Idols</th>
                  <td>{props.currentPlayer.idols}</td>
                </tr>
                <tr>
                  <th scope="row">Advantages</th>
                  <td>{props.currentPlayer.advantages}</td>
                </tr>
                <tr>
                  <th scope="row">Extinction</th>
                  <td colspan="2">{props.currentPlayer.extinction.toString()}</td>
                </tr>
                <tr>
                  <th scope="row">Eliminated</th>
                  <td colspan="2">{props.currentPlayer.eliminated.toString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PlayerCard;