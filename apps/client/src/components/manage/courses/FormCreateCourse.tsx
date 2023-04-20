import {
  Autocomplete,
  AutocompleteRenderInputParams,
  FormControl,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import { RoundedButton } from '@client/components/ui/buttons';

export const FormCreateCourse = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <Stack
      position="relative"
      gap={2}
      component="form"
      sx={{ bgcolor: '#328AF11A', p: 3 }}
    >
      <Stack>
        <Typography variant="h3" fontSize={22} fontWeight={700}>
          New Course
        </Typography>
      </Stack>
      <Stack gap={2}>
        <Stack
          borderRadius="15px"
          border="1px solid #a0a0a02a"
          position={'relative'}
          width={300}
          height={300}
        >
          <Stack
            sx={{
              backgroundImage: `url('/images/no-images.png')`,
              opacity: !file ? 0.5 : 1,
              backgroundPosition: 'center',
            }}
            borderRadius={'15px'}
            width={300}
            height={300}
          >
            <Stack
              position={'absolute'}
              top={0}
              left={0}
              right={0}
              bottom={0}
              alignItems={'center'}
              justifyContent="center"
            >
              <Stack flexDirection={'row'} alignItems={'center'}>
                <label style={{ cursor: 'pointer' }} htmlFor="file">
                  <InsertPhotoIcon htmlColor="#5f9661" fontSize="large" />
                </label>
                <IconButton>
                  <DeleteIcon color="error" fontSize="large" />
                </IconButton>
              </Stack>
              <input id="file" name="file" type="file" hidden />
            </Stack>
            {!!file && (
              <Image
                loader={({ src }) => src}
                src="https://i.pinimg.com/originals/b5/02/4e/b5024eb6a96bc0284703693a4ae62068.jpg"
                alt=""
                fill
                unoptimized
                style={{
                  borderRadius: '15px',
                }}
              />
            )}
          </Stack>
        </Stack>
        <Stack>
          <Typography> Name course *</Typography>
          <FormControl>
            <TextField
              name="name"
              size="small"
              sx={{
                bgcolor: '#9494941a',
                '& fieldset': {
                  border: 'none',
                },
              }}
              placeholder="Name course ..."
            />
          </FormControl>
        </Stack>
        <Stack>
          <Typography>Topic *</Typography>
          <FormControl>
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  name="topicIds"
                  size="small"
                  sx={{
                    bgcolor: '#9494941a',
                    '& fieldset': {
                      border: 'none',
                    },
                  }}
                  {...params}
                  placeholder="Topic..."
                />
              )}
              options={[]}
            />
          </FormControl>
        </Stack>
        <Stack>
          <Typography>Descripton</Typography>
          <FormControl>
            <TextField
              name="description"
              size="small"
              multiline
              minRows={4}
              sx={{
                bgcolor: '#9494941a',
                '& fieldset': {
                  border: 'none',
                },
              }}
              placeholder="Name course ..."
            />
          </FormControl>
        </Stack>
        <Stack>
          <Typography>Adminstrator *</Typography>
          <FormControl>
            <Autocomplete
              renderInput={(params) => (
                <TextField
                  name="topicIds"
                  size="small"
                  sx={{
                    bgcolor: '#9494941a',
                    '& fieldset': {
                      border: 'none',
                    },
                  }}
                  {...params}
                  placeholder="Admin..."
                />
              )}
              options={[]}
            />
          </FormControl>
        </Stack>
        <Stack gap={1} justifyContent="flex-end" flexDirection={'row'}>
          <RoundedButton color="secondary">Reset</RoundedButton>
          <RoundedButton>Save</RoundedButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
