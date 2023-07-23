import {
  Autocomplete,
  AutocompleteProps,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { useTopicsQuery } from '@client/hooks/apis/topics/useTopicsQuery';
import { forwardRef, useMemo } from 'react';
import Image from 'next/image';
import { TopicStatResponse } from '@libs/openapi-generator/generated';

export interface TopicSelectProps
  extends Omit<
    AutocompleteProps<TopicStatResponse, true, false, false>,
    'options' | 'renderInput'
  > {
  variant?: TextFieldProps['variant'];
  topicIds: Array<TopicStatResponse['id']>;
  onValueChange: (topicIds: Array<TopicStatResponse['id']>) => void;
}

// eslint-disable-next-line react/display-name
export const TopicSelect = forwardRef<typeof Autocomplete, TopicSelectProps>(
  ({ topicIds, onValueChange, variant = 'filled', ...props }, ref) => {
    const topicsQuery = useTopicsQuery({});

    const topics = useMemo(() => {
      return topicsQuery.data?.data ?? [];
    }, [topicsQuery.data?.data]);

    const value = useMemo(() => {
      return topics.filter((topic) => topicIds.includes(topic.id));
    }, [topicIds, topics]);

    return (
      <Autocomplete<TopicStatResponse, true, false, false>
        ref={ref}
        value={value}
        onChange={(event, value) => {
          onValueChange(value.map((v) => v.id));
        }}
        multiple
        options={topics}
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Stack
            component="li"
            {...props}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Image
              width={50}
              height={50}
              alt=""
              unoptimized
              src={option?.cover?.path ?? ''}
            />
            <Stack spacing={0.5} flex={1}>
              <Typography color={'#000'} variant="body2">
                {option.name}
              </Typography>
            </Stack>
          </Stack>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant}
            label="Chủ đề"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )}
        {...props}
      />
    );
  }
);
