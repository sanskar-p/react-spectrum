/** @fileoverview Rating unit tests */

import assert from 'assert';
import Rating from '../../src/Rating';
import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';

describe('Rating', function () {
  it('renders a top level div and passes through className', function () {
    var rating = shallow(<Rating className="abc" />);
    assert.equal(rating.type(), 'div');
    assert.equal(rating.prop('className'), 'spectrum-Rating abc');
  });

  it('provides default currentRating and max', function () {
    var rating = shallow(<Rating />);
    assert.equal(rating.state('currentRating'), 0);
    assert.equal(rating.instance().props.max, 5);
  });

  it('renders a max number of ratings', function () {
    var rating = shallow(<Rating max={10} />);
    assert.equal(rating.children().length, 10);
  });

  it('renders a current number of ratings', function () {
    var rating = shallow(<Rating max={10} value={5} />);
    assert.equal(rating.find('.is-active').length, 5);
  });

  it('sends back the number of stars selected in props.onChange', function () {
    var onChange = sinon.spy();
    var rating = shallow(<Rating max={10} onChange={onChange} />);
    rating.childAt(1).simulate('click', {stopPropagation: function () {}});
    assert(onChange.calledOnce);
    assert.deepEqual(onChange.getCall(0).args, [2]);
    assert.equal(rating.find('.is-active').length, 2);
  });

  it('Provides the ability to disable setting the star functionality', function () {
    var onChange = sinon.spy();
    var rating = shallow(<Rating onChange={onChange} disabled />);
    rating.childAt(1).simulate('click');
    assert(!onChange.called);
  });

  it('provides a hook to change a rating', function () {
    var spyChange = sinon.spy();
    var rating = shallow(<Rating max={10} onChange={spyChange} value={4} />);
    rating.find('span').first().simulate('click', {stopPropagation: function () {}});
    assert(spyChange.called);
    assert.equal(spyChange.lastCall.args[0], 1);
  });

  it('does not update state in controlled mode', function () {
    var spyChange = sinon.spy();
    var rating = shallow(<Rating max={10} onChange={spyChange} value={4} />);
    rating.find('span').first().simulate('click', {stopPropagation: function () {}});
    assert(spyChange.called);
    assert.equal(spyChange.lastCall.args[0], 1);
    assert.equal(rating.find('.is-active').length, 4);

    rating.setProps({value: 1});
    assert.equal(rating.find('.is-active').length, 1);
  });

  it('does not highlight if disabled', function () {
    var rating = shallow(<Rating max={10} value={4} disabled />);
    assert.equal(rating.find('.is-active').length, 4);
    assert.equal(rating.find('.is-disabled').length, 11);
  });
});