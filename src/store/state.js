let defaultUserInfo = {
  id: false
};
try {
  if (localStorage.userInfo && JSON.parse(localStorage.userInfo).id) {
    defaultUserInfo = JSON.parse(localStorage.userInfo);
  }
} catch (error) {
  console.log(error);
}

export default {
  homeMenuShow: false,
  userInfo: defaultUserInfo
};
