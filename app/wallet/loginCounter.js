// @flow
//
// Copyright (C) 2019 ExtraHash
//
// Please see the included LICENSE file for more information.
export default class LoginCounter {
  userLoginAttempted: boolean;

  isLoggedIn: boolean;

  lastLoginAttemptFailed: boolean;

  freshRestore: boolean;

  loginsAttempted: number;

  navBarCount: number;

  constructor() {
    this.userLoginAttempted = false;
    this.isLoggedIn = false;
    this.lastLoginAttemptFailed = false;
    this.freshRestore = false;
    this.loginsAttempted = 0;
    this.navBarCount = 0;
  }
}
