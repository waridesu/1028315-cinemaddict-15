export const createSiteCommentTemplate = (comments) => `${comments.map((element) => `<li class="film-details__comment">
            ${element.emoji ? `<span class="film-details__comment-emoji">
              <img src="${element.emoji}" width="55" height="55" alt="emoji-smile">
  </span>` : `<span class="film-details__comment-emoji">
  <div style="width: 55px; height: 55px"></div>
</span>`}
            <div>
              <p class="film-details__comment-text">${element.text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${element.author}</span>
                <span class="film-details__comment-day">${element.commentaryDate}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`).join('')}`;
