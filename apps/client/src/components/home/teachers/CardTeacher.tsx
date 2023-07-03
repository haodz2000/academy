import {
  Avatar,
  IconButton,
  Paper,
  PaperProps,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from '@client/components/ui/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import { TeacherResponse } from '@libs/openapi-generator/generated';
import Image from 'next/image';

interface Props extends PaperProps {
  isTop: boolean;
  teacher: TeacherResponse;
}
export const CardTeacher = ({ isTop, teacher, ...props }: Props) => {
  return (
    <Paper
      sx={{
        position: 'relative',
        bgcolor: '#18273F',
        width: '100%',
        maxWidth: '380px',
        height: '245px',
        padding: 1,
        ':hover': {
          bgcolor: '#203453',
        },
        borderRadius: 3,
        marginTop: isTop ? '-60px' : '0px',
      }}
      {...props}
    >
      <Stack
        position={'absolute'}
        width={110}
        height={110}
        zIndex={0}
        sx={{
          top: -10,
          left: -10,
          borderRadius: '50%',
          bgcolor: 'yellow',
          opacity: 0.7,
        }}
      ></Stack>
      <Stack
        width={'100%'}
        height={'100%'}
        flexDirection="row"
        zIndex={1}
        gap={3}
      >
        <Stack gap={1}>
          <Stack
            mt={'-10px'}
            ml={'-2px'}
            sx={{
              zIndex: 1,
              borderRadius: '60px',
              border: '3px solid #000',
            }}
            width={105}
            height={165}
            position={'relative'}
          >
            <Image
              loader={({ src }) => src}
              src={teacher.avatar.path}
              alt=""
              fill
              unoptimized
              style={{ borderRadius: '60px' }}
            />
          </Stack>
          <Stack flexDirection={'row'} gap={1}>
            <IconButton>
              <FacebookIcon fontSize="large" color={'primary'} />
            </IconButton>
            <IconButton>
              <GitHubIcon fontSize="large" />
            </IconButton>
          </Stack>
        </Stack>
        <Stack gap={1}>
          <Typography
            variant="h5"
            fontWeight={700}
            href={'#'}
            underline="none"
            color={'inherit'}
            component={Link}
          >
            {teacher.name}
          </Typography>
          <Typography variant="body2" color={'#BAD9FC'}>
            Owner at Laravel
          </Typography>
          <Typography variant="body2" color="#D8E3EE">
            {teacher.description}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        left={'50%'}
        bottom={'-15px'}
        position={'absolute'}
        flexDirection={'row'}
      >
        {teacher.courses.map((course, index) => {
          if (index < 2) {
            return (
              <Avatar
                key={index}
                src={course.cover.path}
                sx={{
                  width: '54px',
                  height: '54px',
                  marginLeft: -index * 12 + 'px',
                }}
                href={'/series/' + course.slug}
                component={Link}
              />
            );
          }
          if (index == 2) {
            return (
              <Avatar
                key={index}
                sx={{
                  width: '54px',
                  height: '54px',
                  marginLeft: -index * 8 + 'px',
                  bgcolor: 'rgba(0, 34, 54, 0.8)',
                }}
              >
                +{teacher.courses.length - 2}
              </Avatar>
            );
          }
        })}
      </Stack>
    </Paper>
  );
};
