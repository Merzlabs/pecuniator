import { Component } from '@angular/core';
import { FileCacheService, CachedFile } from '../services/file-cache.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public allFiles: CachedFile[];

  constructor(private filecache: FileCacheService) { }

  ionViewWillEnter() {
    this.allFiles = [...this.filecache.getAll()];
    console.debug(this.allFiles);
  }

}
