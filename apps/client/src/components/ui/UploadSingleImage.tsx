import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { Box, BoxProps, IconButton, Stack, Typography } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { StoredFileResponse } from '@libs/openapi-generator/generated';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Props extends BoxProps {
  dropzoneOptions?: DropzoneOptions;
  defaultImage: StoredFileResponse | null;
  file: File | null;
  setFile: (file: File | null) => void;
  variant?: 'circle' | 'rounded' | 'rect';
}

export const UploadSingleImage: FC<Props> = ({
  dropzoneOptions = {},
  defaultImage,
  file,
  setFile,
  variant = 'rounded',
  sx,
  children,
  ...props
}) => {
  const [openLightbox, setOpenLightbox] = useState<boolean>(false);
  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0] ?? null);
    },
    accept: {
      'image/*': [],
    },
    multiple: false,
    ...dropzoneOptions,
  });

  const imageUrl = useMemo(() => {
    if (file) {
      return window.URL.createObjectURL(file);
    }
    return defaultImage?.path ?? null;
  }, [defaultImage?.path, file]);

  const getBorderRadius = () => {
    switch (variant) {
      case 'rounded':
        return '12px';
      case 'circle':
        return '50%';
      default:
        return '0px';
    }
  };

  const handleClickDelete = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setFile(null);
  };

  return (
    <Box
      {...getRootProps()}
      sx={{
        position: 'relative',
        border: imageUrl
          ? '1px solid rgba(0, 0, 0, 0.1)'
          : '1px dashed #d3d0d0',
        p: 3,
        minWidth: '200px',
        minHeight: '200px',
        borderRadius: getBorderRadius(),
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          transition: 'all 0.2s',
          backgroundColor: imageUrl
            ? 'rgba(0, 0, 0, 0)'
            : 'rgba(238, 245, 255, 0)',
        },
        '&:hover::before': {
          backgroundColor: imageUrl
            ? 'rgba(0, 0, 0, 0.2)'
            : 'rgba(238, 245, 255, 0.5)',
        },
        '&:hover': {
          '.AppUploadSingleImage__Actions': { display: 'block' },
        },
        ...sx,
      }}
      {...props}
    >
      <input {...getInputProps()} />
      {!!imageUrl && (
        <Stack
          className="AppUploadSingleImage__Actions"
          direction="row"
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: 'translate(-50%, -50%)' }}
          bgcolor="rgba(0, 0, 0, 0.6)"
          borderRadius="12px"
          px={1}
          display="none"
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton
            size="small"
            onClick={() => {
              setOpenLightbox(true);
            }}
          >
            <VisibilityOutlinedIcon htmlColor="#ffffff" />
          </IconButton>
          {file && (
            <IconButton size="small" onClick={handleClickDelete}>
              <DeleteOutlineOutlinedIcon htmlColor="#ffffff" />
            </IconButton>
          )}
          <Lightbox
            carousel={{ finite: true }}
            open={openLightbox}
            close={() => setOpenLightbox(false)}
            slides={[{ src: imageUrl }]}
          />
        </Stack>
      )}
      {!imageUrl && (
        <Stack
          justifyContent="center"
          alignItems="center"
          width={1}
          height={1}
          zIndex={1}
        >
          <CloudUploadIcon sx={{ fontSize: '4em' }} color="primary" />
          <Typography textAlign="center" variant="body2">
            Kéo thả hoặc click để upload
          </Typography>
        </Stack>
      )}
    </Box>
  );
};
