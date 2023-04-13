import Link from '@client/components/ui/Link';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { TopicItem } from './TopicItem';

interface ICategory {
  id: number;
  name: string;
  href: string;
}
const categories: ICategory[] = [
  {
    id: 1,
    name: 'DepOpps',
    href: '/category/depopps',
  },
  {
    id: 2,
    name: 'Frameworks',
    href: '/category/frameworks',
  },
  {
    id: 3,
    name: 'Languages',
    href: '/category/languages',
  },
  {
    id: 4,
    name: 'Techniques',
    href: '/category/techniques',
  },
  {
    id: 5,
    name: 'Testing',
    href: '/category/testing',
  },
  {
    id: 6,
    name: 'Tooling',
    href: '/category/tooling',
  },
];

export const Topics = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Stack gap={3}>
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        width={'50%'}
        margin={'0 auto'}
      >
        <Typography variant="h1" fontWeight={500} fontSize={35}>
          Pick a topic. Any topic
        </Typography>
        <Typography variant="subtitle1" fontSize={15} textAlign="center">
          If you already know what {"you'"}re looking for, Laracasts is divided
          into various topics ranging from frameworks to packages to tools.
        </Typography>
      </Stack>
      <Stack alignItems={'center'}>
        <Box sx={{ width: 'auto', bgcolor: 'background.paper' }}>
          <Tabs
            sx={{
              bgcolor: '#151f32',
              borderBottom: '2px solid rgba(59,130,246,.1)',
              width: 'auto',
              color: '#FFF',
              '& .MuiTabs-indicator': {
                border: '2px solid #1890ff',
                borderRadius: '5px',
              },
            }}
            value={value}
            onChange={handleChange}
            centered
          >
            <Tab
              value={0}
              sx={{
                color: '#FFF',
                fontWeight: 600,
                fontSize: 16,
                textTransform: 'none',
              }}
              label="Tất cả"
            />

            {categories.map((category, index) => (
              <Tab
                key={index}
                href={'#'}
                LinkComponent={Link}
                value={category.id}
                sx={{
                  color: '#FFF',
                  fontWeight: 600,
                  fontSize: 16,
                  textTransform: 'none',
                }}
                label={category.name}
              />
            ))}
          </Tabs>
        </Box>
      </Stack>
      <Stack
        padding={'10px 45px'}
        flexWrap={'wrap'}
        flexDirection={'row'}
        gap={2}
        justifyContent="center"
      >
        <TopicItem />
        <TopicItem />
        <TopicItem />
        <TopicItem />
        <TopicItem />
        <TopicItem />
        <TopicItem />
        <TopicItem />
        <TopicItem />
      </Stack>
    </Stack>
  );
};
