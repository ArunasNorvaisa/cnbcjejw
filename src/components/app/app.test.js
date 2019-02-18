import React from 'react';
import { shallow } from 'enzyme';

import App from './app';

describe('App component: ', () => {
  it('should render', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.length).toEqual(1);
  });
});
