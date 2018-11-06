import React, { Component } from 'react';

class CharacterListItem extends Component {
  render() {
    const { name, category, description, avatar } = this.props;
    const avatarUrl = `${process.env.PUBLIC_URL}/characters/${avatar}`;

    return (
      <div className={ `CharacterListItem ${this.props.className || ''}` }>
        <div className="CharacterListItem__summary">
          <img className="CharacterListItem__summary__avatar" src={avatarUrl} alt={name} />
          <h2 className="CharacterListItem__summary__name">{name}</h2>
          <span className="CharacterListItem__summary__category">{category}</span>
        </div>
        <div className="CharacterListItem__description">
          {description}
        </div>
      </div>
    );
  }
}

export default CharacterListItem;
