import {Component, Input, OnInit} from '@angular/core';
import {INormalizeData} from '../../models/core.interface';

@Component({
  selector: 'card-item',
  templateUrl: './card.component.html',
  styleUrls: ['card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() item: INormalizeData;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

  getImageUrl(index: number): string {
    return `assets/image/${index % 3}.png`;
  }

}
