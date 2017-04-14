import React, { Component } from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

import LinksListFilters from './LinksListFilters';

export default class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    const url = this.state.url;

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }
  onChange(e) {
    this.setState({
      url: e.target.value
    });
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      url: '',
      error: ''
    });
  }
  render() {
    return (
      <div className="content-item">
        <button
          onClick={ () => this.setState({ isOpen: true }) }
          className="button button--add-link">
          + add link
        </button>
        <Modal
          isOpen={ this.state.isOpen }
          contentLabel="Add link"
          onAfterOpen={ () => this.refs.url.focus() }
          onRequestClose={ this.handleModalClose.bind(this) }
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>add a link</h1>
          { this.state.error ? <p>{ this.state.error }</p> : undefined }
          <form onSubmit={ this.onSubmit.bind(this) } className="boxed-view__form">
            <input
              type="text"
              name="url"
              placeholder="url"
              ref="url"
              value={ this.state.url }
              onChange={ this.onChange.bind(this) }
            />
            <button className="button button--add-link">add link</button>
            <button
              onClick={ this.handleModalClose.bind(this) }
              className="button button--secondary"
              type="button">
              cancel
            </button>
          </form>
        </Modal>
        <LinksListFilters />
      </div>
    );
  }
}
