import React from 'react';

const AuthorAndDescription = ({ author, description }) => {
  return (
    <>
      <div className="text-sm">
        by <span className="group-hover:text-violet-500">{author}</span>
      </div>
      <div className="mr-5">{description}</div>
    </>
  );
};

export default AuthorAndDescription;
