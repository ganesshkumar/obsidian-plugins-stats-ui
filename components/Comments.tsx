import React from 'react';
import { useRef, useEffect } from 'react';

const Comments = () => {
  const commentBox = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('repo', 'ganesshkumar/comments');
    script.setAttribute('issue-term', 'url');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('label', 'obsidian-dataview-query-wizard');
    commentBox.current.appendChild(script);
  }, []);

  return <div ref={commentBox} />;
};

export default Comments;
