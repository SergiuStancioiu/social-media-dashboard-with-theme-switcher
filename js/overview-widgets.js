async function getData() {
  const url = 'public/data.json';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    const todaysFollowers = result.todaysFollowers;

    for (let todaysFollower of todaysFollowers) {
      createOverViewWidgets(todaysFollower);
    }
  } catch (error) {
    console.error(error.message);
  }
}

getData();

function createOverViewWidgets(widget) {
  const overviewContainer = document.querySelector('.overview-container');
  const overviewTemplate = document.querySelector('.overview-template');

  const clone = overviewTemplate.content.cloneNode(true);

  clone.querySelector('.social-icon').src =
    `/images/icon-${widget.socialNetwork}.svg`;

  clone.querySelector('.overview-widget-left-content-text').innerText =
    widget.title;

  clone.querySelector('.overview-widget-left-content-number').innerText =
    widget.value;

  clone.querySelector('.overview-percentage').innerText =
    `${widget.percentage}%`;

  if (widget.percentageOrder === 'ASC') {
    clone.querySelector('.todays-followers-order').src = `/images/icon-up.svg`;
    clone.querySelector('.overview-percentage').style.color =
      'hsl(163, 72%, 41%)';
  } else {
    clone.querySelector('.todays-followers-order').src =
      `/images/icon-down.svg`;
    clone.querySelector('.overview-percentage').style.color =
      'hsl(356, 69%, 56%)';
  }

  overviewContainer.appendChild(clone);
}
