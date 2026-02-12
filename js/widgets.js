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
    clone.querySelector('.todays-followers').classList.add('green');
    clone.querySelector('.todays').classList.add('green');
  } else {
    clone.querySelector('.todays-followers-order').src = `images/icon-down.svg`;
    clone.querySelector('.todays-followers-order').alt = 'Down Icon';
    clone.querySelector('.todays-followers').classList.add('red');
    clone.querySelector('.todays').classList.add('red');
  }

  widgetsContainer.appendChild(clone);
}
