'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, VolumeX, RotateCcw, SkipForward, SkipBack } from 'lucide-react';

interface AudioPlayerProps {
  src?: string;
  title?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export function AudioPlayer({
  src,
  title,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Reset state whenever src changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current || !src) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0) setIsMuted(false);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const restart = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full rounded-xl bg-gradient-to-r [background:var(--brand-subtle)] border border-brand p-4">
      {src && <audio ref={audioRef} src={src} preload="metadata" />}

      {title && (
        <div className="text-center mb-3">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>
      )}

      <div className="mb-4">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          disabled={!src}
          className="cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={restart} className="h-8 w-8" title="Restart" disabled={!src}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          {hasPrevious && (
            <Button variant="ghost" size="icon" onClick={onPrevious} className="h-8 w-8" title="Previous">
              <SkipBack className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Button
          onClick={togglePlay}
          className="h-12 w-12 rounded-full bg-gradient-to-br [background:linear-gradient(135deg,var(--brand-dark)_0%,var(--brand)_60%,var(--brand-light)_100%)] text-white shadow-lg"
          disabled={!src}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </Button>

        <div className="flex items-center gap-1">
          {hasNext && (
            <Button variant="ghost" size="icon" onClick={onNext} className="h-8 w-8" title="Next">
              <SkipForward className="h-4 w-4" />
            </Button>
          )}
          <div className="flex items-center gap-1 ml-2">
            <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
              {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>
        </div>
      </div>

      {!src && (
        <p className="text-center text-xs text-muted-foreground mt-3">
          Audio will be available soon
        </p>
      )}
    </div>
  );
}
