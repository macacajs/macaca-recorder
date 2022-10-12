'use strict';

const wd = require('macaca-wd');
const assert = require('power-assert');

const remoteConfig = {
  host: 'localhost',
  port: 3456
};
const driver = wd.promiseChainRemote(remoteConfig);

const TARGET_URL = 'https://www.baidu.com';

// more API: https://macacajs.github.io/macaca-wd/

describe('playground/test/demo1.test.js', () => {
  describe('page func testing', () => {
    before(() => {
      return driver
        .initWindow({
          platformName: 'playwright',
          browserName: 'chromium',
          width: 1280,
          height: 800,
          headless: false,
          deviceScaleFactor: 2
        });
    });

    beforeEach(() => {
      return driver
        .getUrl(TARGET_URL);
    });

    afterEach(function () {
      return driver
        .coverage()
        .saveScreenshots(this);
    });

    it('#1 should be ok', () => {
      return driver
        .elementByCss('#head_wrapper')
        .then(ele => {
          assert(ele);
        });
    });

    it('#2 should be ok', () => {
      return driver
        .elementByCss('#head_wrapper')
        .then(ele => {
          assert(ele);
        });
    });

    it('#3 should be ok', () => {
      return driver
        .elementByCss('#head_wrapper')
        .then(ele => {
          assert(ele);
        });
    });
  });
});