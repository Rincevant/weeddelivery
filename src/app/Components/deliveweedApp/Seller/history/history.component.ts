import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {

  historySale = [
    {
      name: 'Herbe du Lot',
      prix: '15',
      description: 'Frais et fruitee...',
      imageUrl: '../../../../../assets/weedMock.jpg',
      customerUsername : 'Julien'
    },
    {
      name: 'Pousse de Montpellier',
      prix: '56',
      description: "Une douceur d'automne...",
      imageUrl: '../../../../../assets/weedMock.jpg',
      customerUsername : 'Arthur'
    },
    {
      name: 'Les cheveux de David',
      prix: '451',
      description: 'Boise et roux...',
      imageUrl: '../../../../../assets/davidHair.jpg',
      customerUsername : 'Lucas'
    },
  ]


  constructor() {}

  ngOnInit() {}
}
