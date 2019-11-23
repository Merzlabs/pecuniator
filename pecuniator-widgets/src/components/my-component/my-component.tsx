import { Component, Prop, h, Watch } from '@stencil/core';
import { PecuniAPI } from '@merzlabs/pecuniator-api';
import { Pecuniator } from '@merzlabs/pecuniator-api/interface';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  public api: Pecuniator;
  amount: number;
  currency: string;
  /**
   * Files from app
   */
  @Prop() files: any;

  @Watch('files')
  watchHandler(newValue: Array<any>) {
    console.log('The new value of allFiles is: ', newValue);
    if (typeof this.files !== 'undefined' && newValue.length > 0) {
      this.api = new PecuniAPI();
      for (const file of this.files) {
        this.api.load(file.content);
      }

      this.amount = 0;
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
