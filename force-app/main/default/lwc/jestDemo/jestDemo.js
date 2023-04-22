import { LightningElement, wire } from "lwc";
import getAccounts from "@salesforce/apex/JestDemoController.getAccounts";

export default class JestDemo extends LightningElement {
  @wire(getAccounts)
  accounts;
}
