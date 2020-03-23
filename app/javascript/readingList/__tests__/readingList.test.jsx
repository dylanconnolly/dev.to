import { h } from 'preact';
import render from 'preact-render-to-json';
// import the reading list component? 
import { ReadingList } from '../readingList';

describe('<ReadingList />', () => {
  it('renders properly', () => {
    const tree = render(<ReadingList availableTags={['discuss']} />);
    // compare to 'fixture' files
    expect(tree).toMatchSnapshot();
  });
});
