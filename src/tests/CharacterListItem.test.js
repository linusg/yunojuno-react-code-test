import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import CharacterListItem from "../components/CharacterListItem";

import characters from '../fixtures/characters.json';

describe('CharacterListItem - Character representation containing name, category, avatar and description', () => {
    const character = characters[0];
    const component = ReactTestUtils.renderIntoDocument(<CharacterListItem {...character} />);

    it('renders summary and description <div>s correctly', () => {
        const rootDiv = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'CharacterListItem');
        expect(ReactTestUtils.isDOMComponent(rootDiv)).toBe(true);
        expect(rootDiv.childElementCount).toBe(2);
    });

    it('renders avatar correctly', () => {
        const characterAvatar = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'CharacterListItem__summary__avatar');
        expect(characterAvatar.src).toContain(`/characters/${character.avatar}`);
    });

    it('renders name correctly', () => {
        const characterName = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'CharacterListItem__summary__name');
        expect(characterName.textContent).toBe(character.name);
    });

    it('renders category correctly', () => {
        const characterCategory = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'CharacterListItem__summary__category');
        expect(characterCategory.textContent).toBe(character.category);
    });

    it('renders description correctly', () => {
        const characterDescription = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'CharacterListItem__description');
        expect(characterDescription.textContent).toBe(character.description);
    });
});
