import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import popper from 'popper.js';
global.Popper = popper;
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.js'; // 5.1.3
import '/node_modules/bootstrap/dist/css/bootstrap.css'; // 5.1.3
Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
});
