import React from 'react';
import ReactDOM from 'react-dom';
import { AbcControls } from '../components/abc-controls';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AbcControls />, div);
  ReactDOM.unmountComponentAtNode(div);
});
