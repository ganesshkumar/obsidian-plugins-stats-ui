import useUser from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StarRatingInput } from "@/components/StarRatingInput";
import { Input  } from "@/components/ui/input";
import { Spinner } from "./ui/spinner";

interface GivePluginReviewProps {
  pluginId: string;
}

export const GivePluginReview = ({ pluginId }: GivePluginReviewProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button size="sm" variant="outline" className="border border-violet-600 text-violet-600 bg-violet-100 hover:text-gray-200 hover:bg-violet-600 hover:border-violet-800" onClick={() => setIsDialogOpen(true)}>Rate Plugin</Button>
      {isDialogOpen && <GivePluginRatingDialog pluginId={pluginId} open={isDialogOpen} setOpen={setIsDialogOpen} />}
    </>
  );
};

interface GivePluginRatingDialogProps {
  pluginId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const GivePluginRatingDialog = ({ pluginId, open, setOpen }: GivePluginRatingDialogProps) => {
  const { user, loading, login } = useUser();

  const [isAuthenticatedLoading, setIsAuthenticatedLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [hasUsernameLoading, setHasUsernameLoading] = useState(false);
  const [hasUsername, setHasUsername] = useState(false);
  
  const [newUsername, setNewUsername] = useState('');
  const [newUsernameError, setNewUsernameError] = useState('');
  
  const [userRating, setUserRating] = useState<number>(0);
  const [userRatingSaving, setUserRatingSaving] = useState('');
  const [userRatingError, setUserRatingError] = useState('');
  const [userRatingSuccess, setUserRatingSuccess] = useState('');

  const [updatedAt, setUpdatedAt] = useState('');
  
  // check if user is authenticated
  useEffect(() => {
    if (loading) return;
    setIsAuthenticated(!!user);
    setIsAuthenticatedLoading(false);
  }, [user, loading]);

  // get user username
  useEffect(() => {
    const checkUsername = async () => {
      const { data: existing } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      setHasUsername(!!existing?.username);
      setNewUsername(existing?.username ?? '');
      setHasUsernameLoading(false);
    }

    if (isAuthenticated) {
      setHasUsernameLoading(true);
      checkUsername();
    }
  }, [isAuthenticated]);

  // get user rating
  useEffect(() => {
    const fetchUserRating = async () => {
      const { data: ratingRow } = await supabase
        .from('ratings')
        .select('rating, updated_at')
        .eq('user_id', user.id)
        .eq('plugin_id', pluginId)
        .maybeSingle();

      if (ratingRow) {
        setUserRating(ratingRow.rating ?? 0);
        setUpdatedAt(ratingRow.updated_at ?? '');
      }
    }

    if (isAuthenticated && hasUsername) {
      fetchUserRating();
    }
  }, [isAuthenticated, hasUsername]);

  const handleSetUsername = useCallback(async () => {
    if (!newUsername.trim() || newUsername.length < 4 || newUsername.length > 24) {
      setNewUsernameError('Username must be between 4 and 24 characters long.');
      return;
    } else {
      setNewUsernameError('');
    }

    const { error } = await supabase.from('users').insert({ id: user.id, username: newUsername });
    if (error) {
      setNewUsernameError('An error occurred while saving your username. Please try again later.');
      return;
    } else {
      setHasUsername(true);
    }
  }, [newUsername]);

  const handleRatingChange = useCallback(async (newRating: number) => {
    if (!user) return;
    const oldRating = userRating;

    // optimistic UI BEGIN
    setUserRatingError('');
    setUserRatingSuccess('');
    setUserRatingSaving('Saving your rating...');
    setUserRating(newRating); 
    // optimistic UI END

    const { error, data: updatedRating } = await supabase.from('ratings').upsert({
      plugin_id: pluginId,
      user_id: user.id,
      rating: newRating,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'plugin_id,user_id',
    })
    .select('rating, updated_at')
    .single();

    setUserRatingSaving('');
    if (error) {
      setUserRating(oldRating);
      setUserRatingError('An error occurred while saving your rating. Please try again later.');
    } else {
      setUpdatedAt(updatedRating.updated_at ?? '');
      setUserRatingSuccess('Rating saved successfully!');
      setUserRatingError('');
    }
  }, [user, pluginId, userRating]);

  let description 
  let content
  let footer  
  if (isAuthenticatedLoading || hasUsernameLoading) {
    description = ' ';
    content = <Spinner size="large" />
  } else if (!isAuthenticated) {
    description = 'Log in to rate this plugin.';
    content = (
      <div className="flex flex-col items-center justify-center p-4">
        <p className="text-sm text-gray-700">You need to be logged in to rate a plugin.</p>
        <Button onClick={() => login()} className="mt-2">Sign in with Google</Button>
      </div>
    );
  } else if (!hasUsername) {
    description = 'Set a username to rate this plugin.';
    content = (
      <div className="flex flex-col items-center justify-center p-4">
        <Input 
          placeholder="Enter your username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="mt-2 w-full max-w-xs"
        />
        {newUsernameError && <p className="text-red-600 text-sm">{newUsernameError}</p>}
        <Button onClick={handleSetUsername} className="mt-2">Save Username</Button>
      </div>
    );
  } else {
    description = `My rating for ${pluginId}`;
    content = (
      <div className="flex flex-col items-center justify-center p-4">
        <StarRatingInput rating={userRating} setRating={handleRatingChange} />
        {updatedAt && <span className="text-sm text-gray-500">Updated at: {updatedAt ? new Date(updatedAt).toLocaleString() : 'N/A'}</span>}
        {userRatingError && <p className="text-red-600 text-sm">{userRatingError}</p>}
        {userRatingSuccess && (
          <div className="text-center">
            <p className="text-green-600 text-sm">{userRatingSuccess}</p>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}>
              <ConfettiBoomOnMount />
            </div>
          </div>
        )} 
        {userRatingSaving && <p className="text-gray-600 text-sm">{userRatingSaving}</p>}
      </div>
    );
    footer = (
      <>
        {userRatingSuccess && <p className="text-gray-600 text-sm">It will take some time to update the aggregated rating on plugin page with your rating.</p>}
      </>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="relative">
          <DialogTitle>Rate Plugin</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter className="flex justify-center">
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
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
