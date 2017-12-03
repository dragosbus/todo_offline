window.addEventListener('load', e => {
  if(navigator.onLine) {
    updateOnlineStatus(true);
  } else {
    updateOnlineStatus(false);
  }
});

window.addEventListener('online', e => {
  updateOnlineStatus(true);
});

window.addEventListener('offline', e => {
  updateOnlineStatus(false);
});

function updateOnlineStatus(online) {
  var oMsg = document.getElementById('onlineStatus');
  if(online) {
    oMsg.innerHTML = `<span class="online">On</span>`;
  } else {
    oMsg.innerHTML = `<span class="offline">Off</span>`;
  }
}