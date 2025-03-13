import { IMenu } from '../interface/menu.interface';

const menusData: IMenu[] = [
  {
    _id: 1,
    name: 'Food',
    description: 'Main food items',
    status: 'Active',
    createdAt: new Date('2024-06-01T10:00:00'),
    updatedAt: new Date('2024-06-05T12:00:00'),
    subMenu: [
      {
        _id: 101,
        name: 'Beverages',
        description: 'Hot and cold drinks',
        status: 'Active',
        createdAt: new Date('2024-06-02T11:00:00'),
        updatedAt: new Date('2024-06-06T14:00:00'),
      },
      {
        _id: 102,
        name: 'Desserts',
        description: 'Sweet dishes',
        status: 'Active',
        createdAt: new Date('2024-06-03T12:00:00'),
        updatedAt: new Date('2024-06-07T15:00:00'),
      },
    ],
  },
  {
    _id: 2,
    name: 'Fast Food',
    description: 'Quick and tasty meals',
    status: 'Inactive',
    createdAt: new Date('2024-06-02T09:30:00'),
    updatedAt: new Date('2024-06-08T16:00:00'),
    subMenu: [
      {
        _id: 201,
        name: 'Burgers',
        description: 'Various burger options',
        status: 'Active',
        createdAt: new Date('2024-06-03T10:30:00'),
        updatedAt: new Date('2024-06-09T17:00:00'),
      },
      {
        _id: 202,
        name: 'Fries',
        description: 'French fries and variations',
        status: 'Active',
        createdAt: new Date('2024-06-04T11:30:00'),
        updatedAt: new Date('2024-06-10T18:00:00'),
        subMenu: [
          {
            _id: 204,
            name: 'Frensh Fries',
            description: 'Various burger options',
            status: 'Active',
            createdAt: new Date('2024-06-03T10:30:00'),
            updatedAt: new Date('2024-06-09T17:00:00'),
          },
        ],
      },
    ],
  },
];

export default menusData;
