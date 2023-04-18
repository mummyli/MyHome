export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/login',
    'pages/dining_room/order',
    'pages/order_history/order_history',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Li\'s Home',
    navigationBarTextStyle: 'black'
  }
})
