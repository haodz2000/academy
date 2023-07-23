import { RoundedButton } from '@client/components/ui/buttons';
import { Avatar, Paper, Rating, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useRef } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { CourseResponse } from '@libs/openapi-generator/generated';
import { PriceCourse } from './PriceCourse';
import Link from 'next/link';

interface Props {
  course: CourseResponse;
}
export const CourseItem = ({ course }: Props) => {
  return (
    <Stack paddingX={6} zIndex={1} width={'100%'}>
      <Stack
        sx={{
          minHeight: '420px',
          bgcolor: '#18273f',
          ':hover': {
            bgcolor: '#203453',
            borderRadius: '16px',
          },
        }}
        color={'inherit'}
        component={Link}
        href={'/series/' + course.slug}
      >
        <Stack
          flexDirection={'row'}
          justifyContent={'space-between'}
          height={1}
        >
          <Stack
            width={250}
            position={'relative'}
            sx={{
              borderRadius: '16px',
              backgroundImage:
                'linear-gradient(to right, rgb(80, 120, 150) 0%, transparent)',
            }}
            height={1}
          >
            <Stack width={'100%'} position="relative" height={1}>
              <Stack
                width={'100%'}
                position="relative"
                height={1}
                sx={{
                  clipPath: 'circle(56.5% at 0 50%)',
                  border: '2px solid #000',
                }}
              >
                <Image
                  loader={({ src }) => src}
                  alt={course.name}
                  src={course.cover.path}
                  fill
                  unoptimized
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack
            width={'50%'}
            padding={2}
            justifyContent={'space-between'}
            gap={1}
          >
            <Stack gap={2}>
              <Stack flexDirection="row" gap={2} alignItems={'center'}>
                <Typography variant="h1" fontWeight={700} fontSize={30}>
                  {course.name}
                </Typography>
                <Rating size="small" readOnly value={5} />
              </Stack>
              <PriceCourse course={course} />
              <Typography variant="subtitle1" fontSize={13}>
                {course.description}
              </Typography>
            </Stack>
            <Stack gap={2}>
              <Stack>
                <Avatar></Avatar>
              </Stack>
              <Stack flexDirection={'row'} gap={2} mb={2}>
                <RoundedButton
                  size="large"
                  variant="contained"
                  sx={{
                    bgcolor: '#203453',
                    ':hover': {
                      bgcolor: '#192941',
                    },
                  }}
                  color="inherit"
                  startIcon={<PlayCircleOutlineIcon />}
                >
                  Start Series
                </RoundedButton>
                <RoundedButton
                  variant="contained"
                  size="large"
                  sx={{ bgcolor: '#203453' }}
                  color="inherit"
                  startIcon={<BookmarkIcon />}
                >
                  Add to Watchlist
                </RoundedButton>
              </Stack>
            </Stack>
          </Stack>
          <Stack paddingY={1} paddingX={2} height={1}>
            <Stack
              component={Link}
              href={'/user/' + course.administrator.email.split('@')[0]}
              height={1}
            >
              <Stack
                justifyContent={'flex-end'}
                color={'inherit'}
                width={280}
                position={'relative'}
                height={1}
              >
                <Image
                  loader={({ src }) => src}
                  alt="image"
                  src={course.administrator.avatar?.path}
                  fill
                  style={{
                    borderRadius: '25px',
                    position: 'absolute',
                    boxShadow: '-10px 8px 5px 0px rgba(51, 51, 51, 0.65)',
                  }}
                  unoptimized
                />
                <Stack
                  sx={{ borderRadius: '0px 0px 25px 25px' }}
                  paddingY={1}
                  paddingX={2}
                  bgcolor="rgba(136, 136, 136, 0.5)"
                  zIndex={1}
                >
                  <Typography variant="body1" fontWeight={600} fontSize={15}>
                    {course.administrator.name}
                  </Typography>
                  <Stack
                    width={'100%'}
                    flexDirection={'row'}
                    alignItems="center"
                    gap={1}
                  >
                    <Typography
                      fontWeight={600}
                      variant="body2"
                      fontSize={12}
                      color="#78909C"
                    >
                      Developer
                    </Typography>
                    <Stack
                      width={'100%'}
                      height={'2px'}
                      bgcolor={'#78909C'}
                    ></Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
