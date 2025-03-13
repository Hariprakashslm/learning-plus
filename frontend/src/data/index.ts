import { IMenu } from '../interface/menu.interface';

const menusData: IMenu[] = [
  {
    _id: 1,
    name: 'Home',
    icon: 'FaHome',
    status: 'Active',
    createdAt: new Date('2024-06-01T10:00:00'),
    updatedAt: new Date('2024-06-05T12:00:00'),
  },
  {
    _id: 2,
    name: 'Projects',
    icon: 'FaProjectDiagram',

    status: 'Active',
    createdAt: new Date('2024-06-01T10:00:00'),
    updatedAt: new Date('2024-06-05T12:00:00'),
    subMenu: [
      {
        _id: 4,
        name: 'Active Projects',
        status: 'Active',
        createdAt: new Date('2024-06-01T10:00:00'),
        updatedAt: new Date('2024-06-05T12:00:00'),
      },
      {
        _id: 6,
        name: 'Archived',
        status: 'Active',
        createdAt: new Date('2024-06-01T10:00:00'),
        updatedAt: new Date('2024-06-05T12:00:00'),
        subMenu: [
          {
            _id: 4,
            name: '2023',
            status: 'Active',
            createdAt: new Date('2024-06-01T10:00:00'),
            updatedAt: new Date('2024-06-05T12:00:00'),
          },

          {
            _id: 5,
            name: '2022',
            status: 'Active',
            createdAt: new Date('2024-06-01T10:00:00'),
            updatedAt: new Date('2024-06-05T12:00:00'),
          },
        ],
      },
    ],
  },
  {
    _id: 3,
    name: 'Teams',
    icon: 'FaUsers',
    status: 'Active',
    createdAt: new Date('2024-06-01T10:00:00'),
    updatedAt: new Date('2024-06-05T12:00:00'),
    subMenu: [
      {
        _id: 3,
        name: 'Engineering',
        status: 'Active',
        createdAt: new Date('2024-06-01T10:00:00'),
        updatedAt: new Date('2024-06-05T12:00:00'),
      },
      {
        _id: 3,
        name: 'Marketing',
        status: 'Active',
        createdAt: new Date('2024-06-01T10:00:00'),
        updatedAt: new Date('2024-06-05T12:00:00'),
        subMenu: [
          {
            _id: 3,
            name: 'Social Media',
            status: 'Active',
            createdAt: new Date('2024-06-01T10:00:00'),
            updatedAt: new Date('2024-06-05T12:00:00'),
          },
          {
            _id: 3,
            name: 'Branding',
            status: 'Active',
            createdAt: new Date('2024-06-01T10:00:00'),
            updatedAt: new Date('2024-06-05T12:00:00'),
          },
        ],
      },
    ],
  },
];

export default menusData;
