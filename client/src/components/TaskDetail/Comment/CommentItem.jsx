import React from "react";

const CommentItem = ({ comment }) => {
    return (
        <div className="comment__item">
            <div className="comment__item-header">
                <div className="comment__item-header__avatar">
                    <img src={comment.user.avatar} alt="" />
                    <div className="comment__item-header__avatar-active"></div>
                </div>
                <h3 className="comment__item-header__name">
                    {comment.user.username}
                </h3>
            </div>
            <div className="comment__item-content">{comment.content}</div>
            <div className="comment__item-footer">
            </div>
        </div>
    );
};

export default CommentItem;
