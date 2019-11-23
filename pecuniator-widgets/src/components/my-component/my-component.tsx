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
  /**
   * Files from app
   */
  @Prop() allFiles: any;

  private getText(): string {
    this.api = new PecuniAPI();
    for (const file of this.allFiles) {
      this.api.load(file.content);
    }

    return JSON.stringify(this.api.entries[0].amount);
  }

  @Watch('allFiles')
  watchHandler(newValue: boolean) {
    console.log('The new value of allFiles is: ', newValue);
  }

  render() {
    return <div>Last transaction amount {this.getText()}</div>;
  }
}
