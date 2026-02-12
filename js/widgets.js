async function getData() {
  const url = 'public/data.json';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    const followers = result.followers;

    for (const follower of followers) {
      createWidget(follower);
    }
  } catch (error) {
    console.error(error.message);
  }
}

getData();

function createWidget(widget) {
  const widgetsContainer = document.querySelector('.widgets-container');
  const widgetsTemplate = document.querySelector('.widgets-template');
  const clone = widgetsTemplate.content.cloneNode(true);

  clone.querySelector('.widget-container').style.borderColor =
    `${widget.gradient}`;
  clone.querySelector('.widget-gradient').style.background =
    `${widget.gradient}`;
  clone.querySelector('.social-icon').src =
    `images/icon-${widget.socialNetwork}.svg`;

  clone.querySelector('.social-icon').alt = `${widget.socialNetwork}`;

  clone.querySelector('.social-handle').innerText = widget.socialHandle;

  clone.querySelector('.followers-text').innerText = widget.title;

  clone.querySelector('.followers-number').innerText = widget.totalFollowers;

  clone.querySelector('.todays-followers').innerText = widget.todaysFollowers;

  if (widget.todaysFollowersOrder === 'ASC') {
    clone.querySelector('.todays-followers-order').src = `images/icon-up.svg`;
    clone.querySelector('.todays-followers-order').alt = 'Up Icon';
    clone.querySelector('.todays-followers').style.color = 'hsl(163, 72%, 41%)';
    clone.querySelector('.todays').style.color = 'hsl(163, 72%, 41%)';
  } else {
    clone.querySelector('.todays-followers-order').src = `images/icon-down.svg`;
    clone.querySelector('.todays-followers-order').alt = 'Down Icon';
    clone.querySelector('.todays-followers').style.color = 'hsl(356, 69%, 56%)';
    clone.querySelector('.todays').style.color = 'hsl(356, 69%, 56%)';
  }

  widgetsContainer.appendChild(clone);
}
