import assert from 'assert';
import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {Tag} from '../../src/TagList';

describe('Tag', () => {
  it('default', () => {
    const tree = shallow(<Tag />);
    assert.equal(tree.prop('tabIndex'), -1);
    assert.equal(tree.prop('aria-selected'), false);
    assert.equal(tree.prop('aria-label'), 'Remove label');
    assert.equal(tree.hasClass('spectrum-Tag'), true);
  });

  it('supports a quiet variant', () => {
    const tree = shallow(<Tag quiet />);
    assert(tree.prop('className').indexOf('spectrum-Tag--quiet') >= 0);
  });

  it('supports additional classNames', () => {
    const tree = shallow(<Tag className="myClass" />);
    assert(tree.prop('className').indexOf('myClass') >= 0);
  });

  it('supports being closable', () => {
    const tree = shallow(<Tag closable={false} />);
    assert(!tree.find('.spectrum-Tag-removeButton').node);
  });

  it('supports being disabled', () => {
    const onClose = sinon.spy();
    const tree = shallow(<Tag disabled closable onClose={onClose} />);
    tree.find('.spectrum-Tag-removeButton').simulate('click');
    assert(!onClose.called);
  });

  it('supports being selected', () => {
    const tree = shallow(<Tag selected />);
    assert.equal(tree.prop('tabIndex'), 0);
    assert.equal(tree.prop('aria-selected'), true);
  });

  it('supports a value', () => {
    const tree = shallow(<Tag value="myValue" />);
    assert.equal(tree.find('.spectrum-Tag-label').children().text(), 'myValue');
  });

  it('supports an onClose event', () => {
    const onClose = sinon.spy();
    const tree = shallow(<Tag closable value="stuff" onClose={onClose} />);
    tree.find('.spectrum-Tag-removeButton').simulate('click', {});
    const args = onClose.lastCall.args;
    assert.equal(args[0], 'stuff');
    assert.deepEqual(args[1], {});
  });

  it('has a valid aria-label', () => {
    const tree = shallow(<Tag>foo</Tag>);
    assert.equal(tree.prop('aria-label'), 'Remove foo label');
  });

  it('supports additional classNames', () => {
    const tree = shallow(<Tag className="myClass" />);
    assert.equal(tree.hasClass('myClass'), true);
  });

  it('supports additional properties', () => {
    const tree = shallow(<Tag foo />);
    assert.equal(tree.prop('foo'), true);
  });

  it('supports an icon', () => {
    const tree = shallow(<Tag icon="camera" />);
    assert(tree.find('.spectrum-Tag-icon').node);
  });

  it('supports an avatar', () => {
    const tree = shallow(<Tag avatar="https://www.botlibre.com/media/a12832214.png" />);
    assert(tree.find('.spectrum-Tag-avatar').node);
  });

});