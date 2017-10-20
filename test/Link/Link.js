import assert from 'assert';
import Link from '../../src/Link';
import React from 'react';
import {shallow} from 'enzyme';

describe('Link', () => {
  it('supports the subtle variation', () => {
    const tree = shallow(<Link subtle className="myClass">Testing</Link>);
    assert(tree.prop('className').indexOf('spectrum-Link--subtle') >= 0);
  });

  it('supports additional classNames', () => {
    const tree = shallow(<Link className="myClass">Testing</Link>);
    assert(tree.prop('className').indexOf('myClass') >= 0);
  });

  it('supports additional properties', () => {
    const tree = shallow(<Link foo>My Link</Link>);
    assert.equal(tree.prop('foo'), true);
  });

  it('supports children', () => {
    const tree = shallow(<Link>My Link</Link>);
    assert.equal(tree.children().node, 'My Link');
  });
});