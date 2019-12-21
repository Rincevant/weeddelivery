import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css'],
})
export class ListItemsComponent implements OnInit {
  listItem = [
    {
      name: 'Herbe du Lot',
      prix: '15',
      description: 'Frais et fruitee...',
      imageUrl: '../../../../../assets/weedMock.jpg',
    },
    {
      name: 'Pousse de Montpellier',
      prix: '56',
      description: "Une douceur d'automne...",
      imageUrl: '../../../../../assets/weedMock.jpg',
    },
    {
      name: 'Les cheveux de David',
      prix: '451',
      description: 'Boise et roux...',
      imageUrl: '../../../../../assets/davidHair.jpg',
    },
    {
      name: 'Marguerite',
      prix: '25',
      description: 'Jadore cette fleur...',
      imageUrl: '../../../../../assets/weedMock.jpg',
    },
    {
      name: "Davids'hair Collector",
      prix: '6551',
      description: 'Boise et roux...',
      imageUrl: '../../../../../assets/davidHair.jpg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
