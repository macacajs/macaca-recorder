/* eslint-disable no-undef */
class Extends {
  constructor(injected) {
    if (!window.extends) {
      window.extends = {
        hello() {
          return "hello world";
        },
      };
    }
  }
}

module.exports = Extends;
