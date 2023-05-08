/*
import React, { useState, Suspense } from 'react';

const Comment = React.lazy(() => import('../../Comments/Comment/Comment'));

function CommentSection(props: {comments: IComment[]}) {
  const {comments} = props;
  const [expandedComments, setExpandedComments] = useState(new Set());

  function handleCommentClick(commentId: string) {
    setExpandedComments(prevState => new Set(prevState).add(commentId));
  }

  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id}>
          <p onClick={() => handleCommentClick(comment.id)}>{comment.text}</p>
          {expandedComments.has(comment.id) && (
            <Suspense fallback={<div>Loading...</div>}>
              {comment.childComments && <CommentSection comments={comment.childComments} />}
            </Suspense>
          )}
        </div>
      ))}
    </div>
  );
}
export default CommentSection
*/