//Global variables
const userId = document.getElementById('userId').value;

//Socket script
const socket = io();

sendUserIdToSocket = () => {
  socket.emit('userIdFromClient', userId);
};

socket.on('socketUsersUpdated', (socketUsers) => {
  renderWhoIsOnline(socketUsers);
});

renderWhoIsOnline = (socketUsers) => {
  document.querySelectorAll('.onlineSpan').forEach(e => e.remove());
  let arrayOfSocketUsers = Object.entries(socketUsers).map(
    (element) => element[1]
  );
  arrayOfSocketUsers.forEach((user) => {
    let onlineId = user.userId + 'online';
    if (document.getElementById(onlineId) === null) {
      const item = document.createElement('span');
      item.innerHTML = ' online';
      item.classList.add('onlineSpan')
      if (user.userId === userId) {
        item.innerHTML += ' (you)';
      }
      item.id = user.userId + 'online';
      const onlineUser = document.getElementById(user.userId);
      onlineUser.appendChild(item);
    }
  });
};

//Fetch and render users and channels
renderChannels = (channelList) => {
  channelList.forEach((channel) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `../channels/${channel._id}`;
    a.innerHTML = `#${channel.name}`;
    li.appendChild(a);
    channelsUl.insertBefore(li, create);
  });
};

fetchChannels = () => {
  fetch('/api/channels', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      renderChannels(data);
    });
};

renderUsers = (users) => {
  users.forEach((user) => {
    const li = document.createElement('li');
    li.id = user._id;
    const img = document.createElement('img');
    img.classList.add('icon_image');
    img.src = user.profilePhoto;
    img.alt = user.name;
    li.appendChild(img);
    const a = document.createElement('a');
    a.href = `../channels/DMorProfile/${user._id}`;
    a.innerHTML = user.name;
    li.appendChild(a);
    usersUl.appendChild(li);
  });
};

fetchUsers = () => {
  fetch('/api/users', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      renderUsers(data);
    });
};

//Functions to run on page load
document.addEventListener('DOMContentLoaded', () => {
  sendUserIdToSocket();
  fetchChannels();
  fetchUsers();
});
