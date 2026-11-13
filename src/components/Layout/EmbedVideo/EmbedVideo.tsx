import React, { FC } from 'react';
import { Modal } from 'antd';

import './EmbedVideo.scss';

interface EmbedVideoProps {
  isOpen: boolean;
  embedId: string;
  onClick: () => void;
}

export const EmbedVideo: FC<EmbedVideoProps> = ({ isOpen, embedId, onClick }) => (
  <Modal
    className="video-responsive"
    width="100%"
    open={isOpen}
    destroyOnClose
    footer={null}
    closable={false}
    onCancel={onClick}
    styles={{ mask: { backgroundColor: 'rgba(47, 60, 95, 0.5)', backdropFilter: 'blur(8px)' } }}
  >
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </Modal>
);
