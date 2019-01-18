export default (nowTime, comTime) => {
  let comDate = new Date(comTime);
  let key = nowTime - comTime;
  let res = "";
  let nowYear = new Date().getFullYear();
  let yearStamp = new Date(nowYear, 0).getTime();
  switch (true) {
    case key <= 60000:
      res = "刚刚";
      break;
    case key <= 3600000: {
      let minutes = Math.floor(key / 60000);
      res = `${minutes}分钟前`;
      break;
    }
    case key <= 8.64 * Math.pow(10, 7): {
      let hours = comDate.getHours();
      let minutes = comDate.getMinutes();
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      res = `${hours}:${minutes}`;
      break;
    }
    case comDate.getTime() >= yearStamp && key <= 1.728 * Math.pow(10, 8): {
      let hours = comDate.getHours();
      let minutes = comDate.getMinutes();
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      res = `昨天${hours}:${minutes}`;
      break;
    }
    case comTime >= yearStamp: {
      res = `${comDate.getMonth() + 1}月${comDate.getDate()}日`;
      break;
    }
    default:
      res = `${comDate.getFullYear()}年${comDate.getMonth() +
        1}月${comDate.getDate()}日`;
      break;
  }
  return res;
};
