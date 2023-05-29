import Link from '@client/components/ui/Link';
import {
  Box,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { TopicItem } from './TopicItem';
import { useTopicsQuery } from '@client/hooks/apis/topics/useTopicsQuery';
import { useCategoriesQuery } from '@client/hooks/apis/categories/useCategoriesQuery';

export const Topics = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const topicsQuery = useTopicsQuery({ c: value });
  const categoriesQuery = useCategoriesQuery();
  const topics = useMemo(() => {
    return topicsQuery.data?.data ?? [];
  }, [topicsQuery.data?.data]);
  const categories = useMemo(() => {
    return categoriesQuery.data?.data ?? [];
  }, [categoriesQuery.data?.data]);

  if (topicsQuery.isLoading) {
    return (
      <Stack position="absolute" top={0} right={0} left={0} bottom={0}>
        <CircularProgress />
      </Stack>
    );
  }
  return (
    <Stack gap={3}>
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        width={'50%'}
        margin={'0 auto'}
      >
        <Typography variant="h1" fontWeight={500} fontSize={35}>
          Chọn 1 chủ đề, bất cứ chủ đề nào
        </Typography>
        <Typography variant="subtitle1" fontSize={15} textAlign="center">
          Nếu bạn đã biết những gì bạn đang tìm kiếm,{' '}
          <Typography
            component={'span'}
            marginX={1}
            fontSize={22}
            color={'#175cdd'}
          >
            𝓩𝓮𝓻𝓸3𝔃
          </Typography>{' '}
          được chia thành các chủ đề khác nhau, từ frameworks đến gói đến tools.
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
        {topics.map((topic) => (
          <TopicItem key={topic.id} topic={topic} />
        ))}
      </Stack>
    </Stack>
  );
};
