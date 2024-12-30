import React from 'react';

export const SubstackNewsletter = () => {
  return (
    <div data-testid="substack-newsletter">
      <h2>Subscribe to our Newsletter</h2>
      <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};
