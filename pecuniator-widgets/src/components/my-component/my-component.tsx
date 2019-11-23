import { Component, Prop, h, Watch } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * Files from app
   */
  @Prop() allFiles: any;

  private getText(): string {
    return JSON.stringify(this.allFiles);
  }

  @Watch('allFiles')
  watchHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of allFiles is: ', newValue);
  }

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
