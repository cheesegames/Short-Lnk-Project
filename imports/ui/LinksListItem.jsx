import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';
import moment from 'moment'

export default class LinksListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', () => {
      this.setState({ justCopied: true });
      setTimeout(() => this.setState({ justCopied: false}), 1000);
    }).on('error', () => {
      alert('unable to copy, please manually copy the link');
    });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;

    if (typeof this.props.lastVisitedAt === 'number') {
      let momentNow = moment(this.props.lastVisitedAt);
      visitedMessage = `(last visited ${ momentNow.fromNow() })`;
    }

    return  (
      <p>
        <small>
          { this.props.visitedCount } { visitMessage } { visitedMessage }
        </small>
      </p>
    );
  }
  render() {
    return (
      <div className="content-item">
        <div>
          <h3>
            <a
              href={ this.props.shortUrl }
              target="_blank">
            { this.props.url }
            </a>
          </h3>
          { this.renderStats() }
        </div>
        <p className="content-item__buttons">
          <button
            ref="copy"
            data-clipboard-text={ this.props.shortUrl }
            className="button button--pill">
            { this.state.justCopied ? 'copied' : 'copy' }
          </button>
          <button onClick={ () => {
            Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
          }} className="button button--pill">
            { this.props.visible ? 'hide' : 'unhide' }
          </button>
        </p>
      </div>
    );
  }
};

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number
};
