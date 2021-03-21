//Socket script
const socket = io();

sendUserIdToSocket = () => {
  const userId = document.getElementById('userId').value;
  socket.emit('userIdFromClient', userId );
};
//Fetch and render users and channels
renderChannels = (channelList) => {
  channelList.forEach((channel) => {
    console.log(channel);
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
    /* const img = document.createElement('img');
    img.classList.add('icon_image');
    img.src = user.profilePhoto;
    img.alt = user.name;
    li.appendChild(img); */
    const a = document.createElement('a');
    a.href = `../channels/startDM/${user._id}`;
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

document.addEventListener('DOMContentLoaded', () => {
  sendUserIdToSocket();
  fetchChannels();
  fetchUsers();
});
