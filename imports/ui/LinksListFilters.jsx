import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

export default class LinksListFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true
    };
  }
  componentDidMount() {
    this.visibleTracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      });
    });
  }
  componentWillUnmount() {
    this.visibleTracker.stop();
  }
  render() {
    return (
      <label className="checkbox">
        <input
          type="checkbox"
          checked={ !this.state.showVisible }
          onChange={ (e) => {
            Session.set('showVisible', !e.target.checked);
          }}
          className="checkbox__box"/>
        show hidden links
      </label>
    );
  }
}
