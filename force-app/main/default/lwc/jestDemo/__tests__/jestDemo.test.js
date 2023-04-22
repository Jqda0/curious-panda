import { createElement } from "lwc";
import jestDemoComponent from "c/JestDemo";
import {setImmediate} from 'timers';
import getAccounts from "@salesforce/apex/JestDemoController.getAccounts";

const mockAccounts = require("./mockData/accounts.json");

jest.mock(
  "@salesforce/apex/JestDemoController.getAccounts",
  () => {
    const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
    return {
      default: createApexTestWireAdapter(jest.fn())
    };
  },
  { virtual: true }
);

describe("Positive Testing Suite", () => {
  beforeEach(() => {
    const jestDemo = createElement("c-jest-demo", {
      is: jestDemoComponent
    });
    document.body.appendChild(jestDemo);
  });

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  test("wire apex method test", () => {
    const jestDemo = document.querySelector("c-jest-demo");
    getAccounts.emit(mockAccounts);
    return new Promise(setImmediate).then(() => {
      const accountArray = Array.from(
        jestDemo.shadowRoot.querySelectorAll(".acctInfo")
      );
      const accountNameArray = accountArray.map((div) => div.textContent);
      expect(accountNameArray.length).toBe(3);
      expect(accountNameArray).toEqual([
        "Matts Account",
        "Jimbobs Account",
        "Terrances Account"
      ]);
    });
  });
});
