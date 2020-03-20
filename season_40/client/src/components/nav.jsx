import React from 'react';
import FadeIn from 'react-fade-in';

const Nav = (props) => {
  return(
    <div className="sideNav">
      <img className="logo"src="https://i.imgur.com/SOFYo8w.png"></img>
      <div className="list-group">
        <button type="button" className="list-group-item list-group-item-action list-group-item-warning">
          Actions:
        </button>
        <button type="button" className="list-group-item list-group-item-action" onClick={() => props.showNav('menuHome')}>All Players</button>
        <button type="button" className="list-group-item list-group-item-action" onClick={() => props.showNav('menuTribes')}>Tribes</button>
        <button type="button" className="list-group-item list-group-item-action" onClick={() => props.showNav('menuTrade')}>Make a Trade</button>
        <button type="button" className="list-group-item list-group-item-action" onClick={() => props.showNav('menuEdit')}>Edit Players</button>
        <button type="button" className="list-group-item list-group-item-action" onClick={() => props.selectionScreen()}>Change Season</button>
      </div>
    </div>
  );
};

export default Nav;