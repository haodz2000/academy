import { Avatar, IconButton, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from '@client/components/ui/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

interface Props {
  isTop: boolean;
}
export const CardTeacher = ({ isTop }: Props) => {
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
              backgroundImage: `url('https://ik.imagekit.io/laracasts/instructors/335.jpeg?tr=w-200,q-50')`,
              backgroundSize: 'cover',
              zIndex: 1,
              borderRadius: '60px',
              border: '4px solid #000',
            }}
            width={105}
            height={165}
          ></Stack>
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
            Join Swith
          </Typography>
          <Typography variant="body2" color={'#BAD9FC'}>
            Owner at Laravel
          </Typography>
          <Typography variant="body2" color="#D8E3EE">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            consequuntur mollitia autem facere suscipit natus cumque voluptate
          </Typography>
        </Stack>
      </Stack>
      <Stack
        left={'50%'}
        bottom={'-15px'}
        position={'absolute'}
        flexDirection={'row'}
        gap={3}
      >
        <Avatar
          sx={{ width: '54px', height: '54px' }}
          href={'#'}
          component={Link}
        />
        <Avatar
          sx={{ width: '54px', height: '54px' }}
          href={'#'}
          component={Link}
        />
      </Stack>
    </Paper>
  );
};
