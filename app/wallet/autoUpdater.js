/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
import request from 'request-promise';
import log from 'electron-log';
import semver from 'semver';
import os from 'os';
import { eventEmitter } from '../index';
import npmPackage from '../../package.json';

const currentVersion = npmPackage.version;
const operatingSystem = os.platform();
log.debug(operatingSystem);

export default class AutoUpdater {
  getLatestVersion() {
    const options = {
      method: 'GET',
      url: `http://68.183.53.229:3000/latest/${operatingSystem}/${currentVersion}`,
      json: true
    };
    request(options, function(error, response, body) {
      if (error) {
        log.debug('Error when contacting update server...');
        return;
      }
      log.debug(body);
      if (semver.gt(body.latestVersion, npmPackage.version)) {
        log.debug(
          `Update required! Local version: ${
            npmPackage.version
          }, latest version: ${body.latestVersion}`
        );
        const updateFile = body.downloadPath;
        /*
        if (operatingSystem === 'linux') {
          updateFile = body.downloadLinux;
        } else if (operatingSystem === 'win32') {
          updateFile = body.downloadWindows;
        } else if (operatingSystem === 'darwin') {
          updateFile = body.downloadMac;
        } else {
          log.debug(
            'Unsupported operating system for automatic updates. Please see build instructions at https://github.com/turtlecoin/turtle-wallet-proton#readme'
          );
        }
        */
        eventEmitter.emit('updateRequired', updateFile);
      }
      return body;
    });
  }
}
