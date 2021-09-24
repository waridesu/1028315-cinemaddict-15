import he from 'he';

export const createSiteCommentTemplate = (comment) => (
  `<li class="film-details__comment">
    ${comment
    ? `<span class="film-details__comment-emoji">
          <img src="${comment}" width="55" height="55" alt="emoji-smile">
       </span>`
    : `<span class="film-details__comment-emoji">
          <div style="width: 55px; height: 55px"></div>
      </span>`}
       <div>
          <p class="film-details__comment-text">${he.encode(comment)}</p>
          <p class="film-details__comment-info">
             <span class="film-details__comment-author">${comment}</span>
             <span class="film-details__comment-day">${comment}</span>
             <button class="film-details__comment-delete" value="${comment}">Delete</button>
          </p>
       </div>
    </li>`
);
