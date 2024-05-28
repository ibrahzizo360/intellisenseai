import getYouTubeID from 'get-youtube-id';

export const getVideoId = (url: string) => {
    const id = getYouTubeID(url);
    return id;
  };