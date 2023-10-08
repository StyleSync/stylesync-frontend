'use client';

// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { ServicesTable } from '@/modules/service/components/service-table';

import { faker } from '@faker-js/faker';

import styles from './user-services.module.scss';

// todo: component name should be same as file name
export const Services = () => {
  return (
    <div className={styles.root}>
      <Typography variant='subtitle'>Services</Typography>

      <ServicesTable
        service='hair'
        userServices={[
          {
            id: faker.string.uuid(),
            name: 'Haircut for children',
            duration: '1h',
            price: faker.commerce.price({
              min: 100,
              max: 200,
              dec: 0,
              symbol: '$',
            }),
          },
          {
            id: faker.string.uuid(),
            name: 'Haircut for adults',
            duration: '1h',
            price: faker.commerce.price({
              min: 100,
              max: 200,
              dec: 0,
              symbol: '$',
            }),
          },
          {
            id: faker.string.uuid(),
            name: 'Haircut for adults + beard trimming',
            duration: '1h',
            price: faker.commerce.price({
              min: 100,
              max: 200,
              dec: 0,
              symbol: '$',
            }),
          },
        ]}
      />
      <ServicesTable
        service='makeup'
        userServices={[
          {
            id: faker.string.uuid(),
            name: 'Wedding makeup',
            duration: '1h',
            price: faker.commerce.price({
              min: 100,
              max: 200,
              dec: 0,
              symbol: '$',
            }),
          },
          {
            id: faker.string.uuid(),
            name: 'Evening makeup',
            duration: '1h',
            price: faker.commerce.price({
              min: 100,
              max: 200,
              dec: 0,
              symbol: '$',
            }),
          },
          {
            id: faker.string.uuid(),
            name: 'Makeup masterclass',
            duration: '1h',
            price: faker.commerce.price({
              min: 100,
              max: 200,
              dec: 0,
              symbol: '$',
            }),
          },
          {
            id: faker.string.uuid(),
            name: 'Base makeup',
            duration: '1h',
            price: faker.commerce.price({
              min: 100,
              max: 200,
              dec: 0,
              symbol: '$',
            }),
          },
        ]}
      />
    </div>
  );
};
