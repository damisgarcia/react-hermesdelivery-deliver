import BackgroundTimer from 'react-native-background-timer';

module.exports = async (taskData) => {
  BackgroundTimer.setTimeout(()=>{
    alert("Hello World in Background")
  }, 3000)
}
