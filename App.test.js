import React from 'react';
import renderer from 'react-test-renderer';
import App from './App.tsx';

jest.useFakeTimers()
jest.mock('./hooks/useCachedResources', () => (
  () => true
));

describe('<App />', () => {
  it('has 2 children', async () => {
    const tree = renderer.create(
        <App />
    ).toJSON();
    expect(tree.children.length).toBe(1);
    expect(tree).toMatchSnapshot();
  });
});