'use strict';
const nodemailer = require('nodemailer');
const NODEMAILER = Symbol('Application#nodemailer');

module.exports = {

  get nodemailer() {
    if (!this[NODEMAILER]) {
      this[NODEMAILER] = nodemailer.createTransport(this.config.nodemailer)
    }
    return this[NODEMAILER];
  }
};
