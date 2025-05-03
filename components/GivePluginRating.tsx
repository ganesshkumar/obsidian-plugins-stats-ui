import useUser from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { use, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/StarRating";
import { Input  } from "@/components/ui/input";

interface GivePluginReviewProps {
  pluginId: string;
}

export const GivePluginReview = ({ pluginId }: GivePluginReviewProps) => {
  const { user, login } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        setLoading(true);
        const { data: userRow } = await supabase
          .from('users')
          .select('username')
          .eq('id', user.id)
          .maybeSingle();

        setUsername(userRow?.username ?? null);

        const { data: ratingRow } = await supabase
          .from('ratings')
          .select('rating')
          .eq('user_id', user.id)
          .eq('plugin_id', pluginId)
          .maybeSingle();

        setRating(ratingRow?.rating ?? null);
        setLoading(false);
      };

      fetchUserData();
    }
  }, [user, pluginId]);

  const handleSaveUsername = async () => {
    if (!newUsername.trim()) return;

    const { error } = await supabase
      .from('users')
      .update({ username: newUsername })
      .eq('id', user.id);

    if (!error) {
      setUsername(newUsername);
    }
  };

  const handleRatingChange = async (newRating: number) => {
    if (!user) return;

    setRating(newRating); // optimistic UI

    const { error } = await supabase.from('ratings').upsert({
      plugin_id: pluginId,
      user_id: user.id,
      rating: newRating,
    });

    if (error) {
      console.error('Failed to save rating:', error);
    }
  };

  return (
    <>
      <Button size="sm" onClick={() => setIsDialogOpen(true)}>Rate / Update Rating</Button>
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
  const { user, login } = useUser();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasUsername, setHasUsername] = useState(false);
  
  const [newUsername, setNewUsername] = useState('');
  const [newUsernameError, setNewUsernameError] = useState('');
  
  const [userRating, setUserRating] = useState<number>(0);
  const [userRatingSaving, setUserRatingSaving] = useState('');
  const [userRatingError, setUserRatingError] = useState('');
  const [userRatingSuccess, setUserRatingSuccess] = useState('');
  
  // check if user is authenticated
  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  // get user username
  useEffect(() => {
    const checkUsername = async () => {
      const { data: existing } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      setHasUsername(!!existing?.username);
    }

    if (isAuthenticated) {
      checkUsername();
    }
  }, [isAuthenticated]);

  // get user rating
  useEffect(() => {
    const fetchUserRating = async () => {
      const { data: ratingRow } = await supabase
        .from('ratings')
        .select('rating')
        .eq('user_id', user.id)
        .eq('plugin_id', pluginId)
        .maybeSingle();

      if (ratingRow) {
        setUserRating(ratingRow.rating ?? 0);
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

    const { error } = await supabase.from('ratings').upsert({
      plugin_id: pluginId,
      user_id: user.id,
      rating: newRating,
    }, {
      onConflict: 'plugin_id,user_id',
    });

    setUserRatingSaving('');
    if (error) {
      setUserRating(oldRating);
      setUserRatingError('An error occurred while saving your rating. Please try again later.');
    } else {
      setUserRatingSuccess('Rating saved successfully!');
      setUserRatingError('');
    }
  }, [user, pluginId, userRating]);

  let description 
  let content 
  if (!isAuthenticated) {
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
    description = 'Rate this plugin.';
    content = (
      <div className="flex flex-col items-center justify-center p-4">
        <StarRating rating={userRating} setRating={handleRatingChange} />
        {userRatingError && <p className="text-red-600 text-sm">{userRatingError}</p>}
        {userRatingSuccess && <p className="text-green-600 text-sm">{userRatingSuccess}</p>} 
        {userRatingSaving && <p className="text-gray-600 text-sm">{userRatingSaving}</p>}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate Plugin</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
};
