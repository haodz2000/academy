import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { Box, BoxProps, IconButton, Stack, Typography } from '@mui/material';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { StoredFileResponse } from '@libs/openapi-generator/generated';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Lightbox from 'yet-another-react-lightbox';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';
import ReactPlayer from 'react-player';

interface Props extends BoxProps {
  dropzoneOptions?: DropzoneOptions;
  defaultVideo: StoredFileResponse | null;
  file: File | null;
  setFile: (file: File | null) => void;
  variant?: 'circle' | 'rounded' | 'rect';
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

export const UploadSingleVideo: FC<Props> = ({
  dropzoneOptions = {},
  defaultVideo,
  file,
  setFile,
  variant = 'rounded',
  sx,
  setTime,
  children,
  ...props
}) => {
  const videoRef = useRef<ReactPlayer>(null);
  const [openLightbox, setOpenLightbox] = useState<boolean>(false);
  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0] ?? null);
    },
    accept: {
      'video/*': [],
    },
    multiple: false,
    ...dropzoneOptions,
  });

  const videoUrl = useMemo(() => {
    if (file) {
      return window.URL.createObjectURL(file);
    }
    return defaultVideo?.path ?? null;
  }, [defaultVideo?.path, file]);

  useEffect(() => {
    setTimeout(() => {
      if (videoUrl) {
        const time = videoRef.current?.getDuration();
        setTime(time);
      }
    }, 500);
  }, [setTime, videoUrl]);

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
        border: videoUrl
          ? '1px solid rgba(0, 0, 0, 0.1)'
          : '1px dashed #d3d0d0',
        minWidth: '200px',
        minHeight: '200px',
        borderRadius: getBorderRadius(),
        backgroundImage: videoUrl ? `url(${videoUrl})` : 'none',
        backgroundSize: 'cover',
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
          backgroundColor: videoUrl
            ? 'rgba(0, 0, 0, 0)'
            : 'rgba(238, 245, 255, 0)',
        },
        '&:hover::before': {
          backgroundColor: videoUrl
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
      {!!videoUrl && (
        <Stack
          className="AppUploadSingleImage__Actions"
          direction="row"
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: 'translate(-50%, -50%)' }}
          bgcolor="rgba(0, 0, 0, 0.6)"
          zIndex={999}
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
            plugins={[Video]}
            carousel={{ finite: true }}
            open={openLightbox}
            close={() => setOpenLightbox(false)}
            slides={[
              {
                type: 'video',
                width: 1280,
                height: 720,
                poster: videoUrl,
                sources: [
                  {
                    src: videoUrl,
                    type: 'video/mp4',
                  },
                ],
              },
            ]}
          />
        </Stack>
      )}
      {!!videoUrl && (
        <ReactPlayer
          ref={videoRef}
          style={{ zIndex: 1000 }}
          width={'100%'}
          height={'100%'}
          controls
          url={videoUrl}
        />
      )}
      {!videoUrl && (
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
