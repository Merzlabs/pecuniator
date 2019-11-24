import { Component, Prop, h, Method, State } from '@stencil/core';
import { PecuniAPI } from '@merzlabs/pecuniator-api';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * Always passed from main app
   */
  @Prop() api: PecuniAPI;

  @State() amount: number;
  @State() currency: string;

  /**
   * Is called on entering dashboard page
   */
  @Method()
  async refresh() {
    this.amount = 0;
    if (this.api && this.api.entries && this.api.entries.length > 0) {
      this.currency = this.api.accounts[0].currency;
      for (const entry of this.api.entries) {
        this.amount += Number(entry.amount);
      }
    }
  }

  render() {
    return <div>Total amount {this.amount} {this.currency}</div>;
  }
}
