import React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { StarRatingInput } from '@/components/StarRatingInput';
import { Spinner } from './ui/spinner';
import { useAuth } from '@/hooks/useAuth';
import { useUserThemeRating, useSubmitThemeRating } from '@/hooks/queries/useThemeRating';

interface GiveThemeReviewProps {
  themeId: string;
}

export const GiveThemeReview = ({ themeId }: GiveThemeReviewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="border border-violet-600 text-violet-600 bg-violet-100 hover:text-gray-200 hover:bg-violet-600 hover:border-violet-800"
        onClick={() => setIsDialogOpen(true)}
      >
        Rate Theme
      </Button>
      {isDialogOpen && (
        <GiveThemeRatingDialog
          themeId={themeId}
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
        />
      )}
    </>
  );
};

interface GiveThemeRatingDialogProps {
  themeId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const GiveThemeRatingDialog = ({
  themeId,
  open,
  setOpen,
}: GiveThemeRatingDialogProps) => {

  const { isAuthenticated, token, loading: isAuthenticatedLoading, login, logout } = useAuth();

  const [authInitiated, setAuthInitiated] = useState(false);

  // Use React Query hooks
  const {
    data: ratingData,
    isLoading: isRatingLoading,
    error: ratingError,
  } = useUserThemeRating(themeId, isAuthenticated);

  const {
    mutate: submitRating,
    isPending: isSaving,
    isSuccess: isSuccess,
    isError: isError,
    error: mutationError,
  } = useSubmitThemeRating(themeId);

  const handleRatingChange = useCallback(
    (newRating: number) => {
      submitRating({ rating: newRating });
    },
    [submitRating]
  );

  const triggerGoogleAuth = useCallback(() => {
    setAuthInitiated(true);
    login();
  }, [login]);

  // Derive display values
  const userRating = ratingData?.rating || 0;
  const updatedAt = ratingData?.updatedAt || '';
  const errorMessage = isError 
    ? 'An error occurred while saving your rating. Please try again later.'
    : ratingError
    ? 'An error occurred while fetching your rating. Please try again later.'
    : '';

  let description;
  let content;
  let footer;
  if (isAuthenticatedLoading || isRatingLoading) {
    description = ' ';
    content = <Spinner size="large" />;
  } else if (!isAuthenticated) {
    description = 'Log in to rate this theme.';
    content = (
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-sm text-gray-700">
          You need to be logged in to rate a theme.
        </p>
        {authInitiated ? 
          <Spinner className="mt-2 text-violet-700" /> :
          <Button onClick={() => triggerGoogleAuth()} className="mt-2 border border-gray-700 py-1 cursor-pointer hover:bg-gray-100 flex items-center gap-2">
            <img src='/images/logos/google.png' className='w-8' />
            <span>Sign in with Google</span>
          </Button>
        }
      </div>
    );
  } else {
    description = `My rating for ${themeId}`;
    content = (
      <div className="flex flex-col items-center justify-center p-4">
        <StarRatingInput rating={userRating} setRating={handleRatingChange} />
        {updatedAt && (
          <span className="text-sm text-gray-500 mt-2">
            Updated at:{' '}
            {updatedAt ? new Date(updatedAt).toLocaleString() : 'N/A'}
          </span>
        )}
        {errorMessage && (
          <p className="text-red-600 text-sm">{errorMessage}</p>
        )}
        {isSuccess && (
          <div className="text-center">
            <p className="text-green-600 text-sm">Rating saved successfully!</p>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              <ConfettiBoomOnMount />
            </div>
          </div>
        )}
      </div>
    );
    footer = (
      <>
        {isSuccess && (
          <p className="text-gray-600 text-sm">
            It will take some time to update the aggregated rating on theme
            page with your rating.
          </p>
        )}
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='bg-white'>
        <DialogHeader className="relative">
          <DialogTitle>Rate Theme</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter className="flex justify-center">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type Shape = 'square' | 'circle' | 'triangle' | 'star' | 'twirl';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  size: number;
  shape: Shape;
  rotation: number;
}

const colors = ['#5b21b6', '#7c3aed', '#facc15', '#dc2626'];
const shapes: Shape[] = ['square', 'circle', 'triangle', 'star', 'twirl'];

export default function ConfettiBoomOnMount() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;

    const particles: Particle[] = Array.from({ length: 100 }, () => {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 2 + 1.5;
      const maxLife = 140 + Math.random() * 60;
      return {
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: maxLife,
        maxLife,
        size: Math.random() * 6 + 4,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
      };
    });

    const drawShape = (p: Particle) => {
      const s = p.size;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      switch (p.shape) {
        case 'square':
          ctx.fillRect(-s / 2, -s / 2, s, s);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -s / 2);
          ctx.lineTo(s / 2, s / 2);
          ctx.lineTo(-s / 2, s / 2);
          ctx.closePath();
          ctx.fill();
          break;
        case 'star':
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (Math.PI / 5) * i * 2;
            const r = i % 2 === 0 ? s : s / 2;
            ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
          }
          ctx.closePath();
          ctx.fill();
          break;
        case 'twirl':
          ctx.beginPath();
          for (let t = 0; t < 6.28; t += 0.3) {
            const spiralR = (t / 6.28) * s;
            ctx.lineTo(Math.cos(t) * spiralR, Math.sin(t) * spiralR);
          }
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          break;
      }

      ctx.restore();
    };

    let animationFrameId: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      let allDead = true;
      particles.forEach((p) => {
        if (p.life > 0) {
          allDead = false;

          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05;
          p.life -= 1;
          p.rotation += 2;

          ctx.globalAlpha = p.life / p.maxLife;
          drawShape(p);
        }
      });

      ctx.globalAlpha = 1;

      if (!allDead) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
