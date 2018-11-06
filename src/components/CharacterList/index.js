import React, { Component } from 'react';
import CharacterListItem from '../CharacterListItem/';

class CharacterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'significance',
      category: 'all'
    };

    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleOrderChange(event) {
    this.setState({ order: event.target.value });
  }

  handleCategoryChange(event) {
    this.setState({ category: event.target.value });
  }

  getCharacterCategories(characters) {
    // Use a set to get an array of unique categories.
    // https://stackoverflow.com/a/35092559/5952681
    return ['all', ...new Set(characters.map(character => character.category))];
  }

  render() {
    const toTitleCase = (str) => str
      .split(' ')
      .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join(' ');

    const { characters } = this.props;
    const { order, category } = this.state;
    let filteredCharacters = characters;

    if (category !== 'all') {
      filteredCharacters = characters.filter(character => character.category === category);
    }

    if (order === 'significance') {
      filteredCharacters = filteredCharacters.sort((a, b) => {
        if (a.significanceIndex === b.significanceIndex) {
          return 0;
        }
        return a.significanceIndex > b.significanceIndex ? 1 : -1;
      });
    } else if (order === 'name') {
      // Use String.prototype.localeCompare instead of "greater/lower than"
      // to correctly sort umlauts and the like, e.g. Elrond > Éomer > Éowyn > Faramir
      filteredCharacters = filteredCharacters.sort((a, b) => a.name.localeCompare(b.name));
    }

    return (
      <div className={ `CharacterList ${this.props.className || ''}` }>
        <div className="CharacterList__options">
          Order by:
          <select value={this.state.order} onChange={this.handleOrderChange}>
            <option value="significance">Significance</option>
            <option value="name">Name</option>
          </select>
          <div className="CharacterList__options__spacer"></div>
          Category:
          <select value={this.state.category} onChange={this.handleCategoryChange}>
            {
              // If CSS support for <option> was better, we could use text-transform
              // (as in the CharacterListItem category styles). Currently we can't,
              // so every word of the category is capitalized with JS (see toTitleCase above).
              this.getCharacterCategories(characters).map(category => (
                <option value={category} key={category}>
                  {toTitleCase(category)}
                </option>
              ))
            }
          </select>
        </div>
        {
          filteredCharacters.map(character => (
            <CharacterListItem {...character} key={character.name} />
          ))
        }
      </div>
    );
  }
}

export default CharacterList;
