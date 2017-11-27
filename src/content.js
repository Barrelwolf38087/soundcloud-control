const playControls = getPlayControls();

browser.runtime.onMessage.addListener(function (msg, sender, response) {
  const { from, subject } = msg;

  console.log(from, subject);

  if (from === 'popup' && subject === 'song-info') {
    response(songInfo());
  }

  if (from === 'popup' && subject === 'toggle-playback') {
    const playBtn = playControls.querySelector('.playControls__play');
    playBtn.click();
    response(playerState());
  }

  if (from === 'popup' && subject === 'previous-song') {
    const prevBtn = playControls.querySelector('.playControls__prev');
    prevBtn.click();
    response(songInfo());
  }

  if (from === 'popup' && subject === 'next-song') {
    const nextBtn = playControls.querySelector('.playControls__next');
    nextBtn.click();
    response(songInfo());
  }

  if (from === 'popup' && subject === 'toggle-like') {
    const likeBtn = document.querySelector('.playControls__soundBadge .sc-button-like');
    likeBtn.click();
    response(songInfo());
  }
});

function getPlayControls() {
  return document.querySelector('.playControls');
}

function playerState() {
  const playing = playControls.querySelector('.playControls__play').classList.contains('playing');

  return { playing };
}

function songInfo() {
  const soundBadge = document.querySelector('.playControls__soundBadge');

  const artistLink = soundBadge.querySelector('.playbackSoundBadge__lightLink');
  const artist = artistLink.title;
  const artistUrl = artistLink.href;

  const titleLink = soundBadge.querySelector('.playbackSoundBadge__titleLink');
  const title = titleLink.title;

  const image = soundBadge.querySelector('.image span');
  const imageUrl = image.style.backgroundImage.match(/url\(\"(.*)\"\)/)[1];

  const likeButton = soundBadge.querySelector('.sc-button-like');
  const likeState = likeButton.classList.contains('sc-button-selected');

  return {
    artist,
    artistUrl,
    imageUrl,
    likeState,
    title
  }
}
