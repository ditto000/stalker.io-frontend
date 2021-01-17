import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { A, B } from '../actions';

class ComponentA extends Component {
  render() {
    return <div>Test Component A</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { myProps: ownProps, curState: state.testElement };
};

export default connect(mapStateToProps, { A, B })(ComponentA);
