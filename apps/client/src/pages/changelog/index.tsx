import { AppLayout } from '@client/components/layouts/AppLayout';
import { Stack, Typography } from '@mui/material';
import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
} from 'react';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { useAppSelector } from '@client/stores';

const Index = () => {
  useEffect(() => {
    const config = {
      selector: '.headway',
      account: process.env.NEXT_PUBLIC_ID_HEADWAY_ACCOUNT,
      translations: {
        title: 'Thay đổi gần đây',
        readMore: 'Xem thêm',
        footer: 'Xem thêm 👉',
      },
      widgetPosition: 'center-right',
    };
    window.Headway?.init(config);
  }, []);
  return (
    <Stack spacing={1}>
      <Stack
        px={2}
        py="10px"
        sx={{
          borderRadius: '6px',
          textDecoration: 'none',
          '&:hover, &.active': {
            backgroundColor: 'rgba(255, 255, 255, 0.035)',
            '.AppSidebarItemText, .AppSidebarItemIcon, .AppSidebarCollapseIcon':
              {
                color: '#ffffff',
              },
          },
        }}
        alignItems="center"
        direction="row"
        spacing={1}
      >
        <UpgradeIcon
          className="AppSidebarItemIcon"
          htmlColor="rgba(255, 255, 255, 0.7)"
        />
        <Stack className="headway" flexDirection="row" alignItems="center">
          <Typography
            className="AppSidebarItemText"
            color="rgba(255, 255, 255, 0.7)"
            flex={1}
            fontSize={13}
            fontWeight={500}
          >
            Thay đổi gần đây
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout hasMenu={false} custom={false}>
      {page}
    </AppLayout>
  );
};

export default Index;
