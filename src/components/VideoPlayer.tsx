import type { VideoBlock } from '../types';
import { useLanguage } from '../context/LanguageContext';

export default function VideoPlayer({ video }: { video: VideoBlock }) {
  const { t } = useLanguage();

  return (
    <div className="overflow-hidden rounded-2xl border border-stoneline bg-indigo text-sandstone">
      <div className="relative aspect-video w-full">
        {video.src ? (
          <video controls className="h-full w-full object-cover" src={video.src} />
        ) : (
          <div className="jaali-texture-light flex h-full w-full flex-col items-center justify-center gap-3 bg-madder/90 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-sandstone/40">
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none" aria-hidden="true">
                <path d="M2 2L18 11L2 20V2Z" fill="#F4EFE3" />
              </svg>
            </div>
            <p className="font-display text-lg">{t('videoComingSoon')}</p>
            <p className="max-w-xs px-6 text-sm text-sandstone/70">{video.description}</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="font-display text-base font-semibold">{video.title}</p>
          <p className="text-xs text-sandstone/60">{video.description}</p>
        </div>
        <span className="rounded-full border border-sandstone/30 px-2.5 py-1 text-xs font-medium">{video.duration}</span>
      </div>
    </div>
  );
}
