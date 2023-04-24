import Link from '@client/components/ui/Link';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { TopicItem } from './TopicItem';
import { useTopicsQuery } from '@client/hooks/apis/topics/useTopicsQuery';
import CircularProgress from '@mui/material/CircularProgress';
import { useCategoriesQuery } from '@client/hooks/apis/categories/useCategoriesQuery';
import { useRouter } from 'next/router';

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
        width={'40%'}
        margin={'0 auto'}
      >
        <Typography variant="h1" fontWeight={500} fontSize={35}>
          Explore By Topic
        </Typography>
        <Typography variant="subtitle1" fontSize={15} textAlign="center">
          All Laracasts series are categorized into various //topics. This
          should provide you with an alternate way to decide what to learn next,
          whether it be a particular framework, language, or tool.
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
              href={'#all'}
              LinkComponent={Link}
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
                href={'#' + category.slug}
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
          <TopicItem topic={topic} key={topic.id} />
        ))}
      </Stack>
    </Stack>
  );
};
