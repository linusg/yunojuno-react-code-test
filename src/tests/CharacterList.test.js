import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import CharacterList from "../components/CharacterList";

import characters from '../fixtures/characters.json';

describe('CharacterList - Filter and sorting options and a list of relevant characters', () => {
    const component = ReactTestUtils.renderIntoDocument(<CharacterList characters={characters} />);

    it('renders', () => {
        const rootDiv = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'CharacterList');
        expect(ReactTestUtils.isDOMComponent(rootDiv)).toBe(true);
    });

    it('renders options correctly', () => {
        const optionsDiv = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'CharacterList__options');
        expect(optionsDiv.childElementCount).toBe(3);

        const selects = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'select');
        expect(selects.length).toBe(2);
        expect(selects[0].value).toBe('significance');
        expect(selects[1].value).toBe('all');
    });

    it('renders character items correctly', () => {
        const items = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'CharacterListItem');
        expect(items.length).toBe(characters.length);
    });

    it('renders filtered character items correctly', () => {
        const newCategory = 'elf';
        const categorySelect = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'select')[1];
        ReactTestUtils.Simulate.change(categorySelect, { target: { value: newCategory } });

        const firstItem = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'CharacterListItem')[0];
        const actualCharacterName = firstItem.querySelector('.CharacterListItem__summary__name').textContent
        const expectedCharacterName = characters.filter(character => character.category === newCategory)[0].name;
        expect(actualCharacterName).toBe(expectedCharacterName);
    });
});
