import React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { StarRatingInput } from '@/components/StarRatingInput';
import { Spinner } from './ui/spinner';
import { useAuth } from '@/hooks/useAuth';
import {
  useUserEntityRating,
  useSubmitEntityRating,
  EntityType,
} from '@/hooks/queries/useEntityRating';

interface GiveReviewProps {
  entityType: EntityType;
  entityId: string;
}

export const GiveReview = ({ entityType, entityId }: GiveReviewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const entityLabel = entityType === 'plugin' ? 'Plugin' : 'Theme';

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="border border-violet-600 text-violet-600 bg-violet-100 hover:text-gray-200 hover:bg-violet-600 hover:border-violet-800"
        onClick={() => setIsDialogOpen(true)}
      >
        Rate & Review {entityLabel}
      </Button>
      {isDialogOpen && (
        <GiveRatingDialog
          entityType={entityType}
          entityId={entityId}
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
        />
      )}
    </>
  );
};

interface GiveRatingDialogProps {
  entityType: EntityType;
  entityId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const GiveRatingDialog = ({
  entityType,
  entityId,
  open,
  setOpen,
}: GiveRatingDialogProps) => {
  const entityLabel = entityType === 'plugin' ? 'plugin' : 'theme';
  const EntityLabel = entityType === 'plugin' ? 'Plugin' : 'Theme';

  const {
    isAuthenticated,
    token,
    loading: isAuthenticatedLoading,
    login,
    logout,
  } = useAuth();

  const [authInitiated, setAuthInitiated] = useState(false);

  // Local form state
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  // Ref for textarea to control cursor position
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Use React Query hooks
  const {
    data: ratingData,
    isLoading: isRatingLoading,
    error: ratingError,
  } = useUserEntityRating(entityType, entityId, isAuthenticated);

  const {
    mutate: submitRating,
    isPending: isSaving,
    isSuccess: isSuccess,
    isError: isError,
    error: mutationError,
    reset: resetMutation,
  } = useSubmitEntityRating(entityType, entityId);

  // Initialize form when data loads
  useEffect(() => {
    if (ratingData) {
      setSelectedRating(ratingData.rating || 0);
      setReviewText(ratingData.reviewText || '');

      // Set cursor to end of text after a short delay to ensure textarea is rendered
      if (ratingData.reviewText) {
        setTimeout(() => {
          if (textareaRef.current) {
            const length = ratingData.reviewText?.length || 0;
            textareaRef.current.setSelectionRange(length, length);
          }
        }, 0);
      }
    }
  }, [ratingData]);

  // Reset mutation state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      resetMutation();
    }
  }, [open, resetMutation]);

  const handleSubmit = useCallback(() => {
    if (selectedRating === 0) {
      return;
    }
    const trimmedReview = reviewText.trim();
    submitRating({
      rating: selectedRating,
      reviewText: trimmedReview || undefined,
    });
  }, [selectedRating, reviewText, submitRating]);

  const handleEdit = useCallback(() => {
    resetMutation();
  }, [resetMutation]);

  const triggerGoogleAuth = useCallback(() => {
    setAuthInitiated(true);
    login();
  }, [login]);

  // Character count validation
  const remainingChars = 2000 - reviewText.length;
  const isTextTooLong = reviewText.length > 2000;
  const hasChanges =
    ratingData &&
    (selectedRating !== (ratingData.rating || 0) ||
      reviewText.trim() !== (ratingData.reviewText || ''));

  // Derive display values
  const errorMessage = isError
    ? 'An error occurred while saving your review. Please try again later.'
    : ratingError
      ? 'An error occurred while fetching your review. Please try again later.'
      : '';

  let description;
  let content;
  let footer;
  if (isAuthenticatedLoading || isRatingLoading) {
    description = ' ';
    content = <Spinner size="large" />;
  } else if (!isAuthenticated) {
    description = `Log in to rate and review this ${entityLabel}.`;
    content = (
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-sm text-gray-700">
          You need to be logged in to rate and review a {entityLabel}.
        </p>
        {authInitiated ? (
          <Spinner className="mt-2 text-violet-700" />
        ) : (
          <Button
            onClick={() => triggerGoogleAuth()}
            className="mt-2 border border-gray-700 py-1 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
          >
            <Image
              src="/images/logos/google.png"
              alt="Google logo"
              width={32}
              height={32}
              className="w-8"
            />
            <span>Sign in with Google</span>
          </Button>
        )}
      </div>
    );
  } else {
    description = `Share your rating and review for ${entityId}`;
    content = (
      <div className="flex flex-col items-start justify-center p-4 gap-4 w-full">
        {/* Star Rating */}
        <div className="w-full flex flex-col items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Rating <span className="text-red-500">*</span>
          </label>
          <StarRatingInput
            rating={selectedRating}
            setRating={setSelectedRating}
            disabled={isSuccess}
          />
          {selectedRating === 0 && !isSuccess && (
            <p className="text-xs text-gray-500">
              Please select a rating (required)
            </p>
          )}
        </div>

        {/* Review Text */}
        <div className="w-full flex flex-col gap-2">
          <label
            htmlFor="review-text"
            className="text-sm font-medium text-gray-700"
          >
            Review <span className="text-gray-400">(optional)</span>
          </label>
          <Textarea
            ref={textareaRef}
            id="review-text"
            placeholder="Share your experience with this plugin/theme..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            maxLength={2000}
            rows={5}
            className={isTextTooLong ? 'border-red-500' : ''}
            disabled={isSaving || isSuccess}
          />
          <div className="flex justify-between items-center text-xs">
            <span
              className={`${
                remainingChars < 100
                  ? 'text-orange-600'
                  : remainingChars < 0
                    ? 'text-red-600'
                    : 'text-gray-500'
              }`}
            >
              {remainingChars} characters remaining
            </span>
          </div>
        </div>

        {/* Last updated info */}
        {ratingData?.updatedAt && !isSuccess && (
          <span className="text-xs text-gray-500 w-full text-center">
            Last updated: {new Date(ratingData.updatedAt).toLocaleString()}
          </span>
        )}

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-600 text-sm w-full text-center">
            {errorMessage}
          </p>
        )}

        {/* Success Message */}
        {isSuccess && (
          <div className="text-center w-full">
            <p className="text-green-600 text-sm font-medium">
              Review saved successfully!
            </p>
            <p className="text-gray-600 text-xs mt-1">
              It will take some time to update the aggregated rating on the{' '}
              {entityLabel} page.
            </p>
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
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        {!isSuccess ? (
          <>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSaving}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={selectedRating === 0 || isSaving || isTextTooLong}
              className="flex-1 bg-violet-600 hover:bg-violet-700"
            >
              {isSaving ? (
                <>
                  <Spinner className="mr-2" size="small" />
                  Submitting...
                </>
              ) : hasChanges ? (
                'Update Review'
              ) : (
                'Submit Review'
              )}
            </Button>
          </>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="flex-1"
            >
              Close
            </Button>
            <Button
              onClick={handleEdit}
              className="flex-1 bg-violet-600 hover:bg-violet-700"
            >
              Edit Review
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white max-w-2xl">
        <DialogHeader className="relative">
          <DialogTitle>Rate & Review {EntityLabel}</DialogTitle>
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
