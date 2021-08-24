export const createSiteCommentTemplate = (comment) => (
  `<li class="film-details__comment">
    ${comment.emoji
    ? `<span class="film-details__comment-emoji">
          <img src="${comment.emoji}" width="55" height="55" alt="emoji-smile">
       </span>`
    : `<span class="film-details__comment-emoji">
          <div style="width: 55px; height: 55px"></div>
      </span>`}
       <div>
          <p class="film-details__comment-text">${comment.text}</p>
          <p class="film-details__comment-info">
             <span class="film-details__comment-author">${comment.author}</span>
             <span class="film-details__comment-day">${comment.commentaryDate}</span>
             <button class="film-details__comment-delete">Delete</button>
          </p>
       </div>
    </li>`
);
