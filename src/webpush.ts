const webpush = require('web-push');

// VAPID keys should be generated only once.
// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys)

webpush.setGCMAPIKey('<Your GCM API Key Here>');
webpush.setVapidDetails(
  'mailto:masnik.700@gmail.com',
  process.env.PUSH_NOTIF_PUBLIC_KEY,
  process.env.PUSH_NOTIF_PRIVATE_KEY,
);

export { webpush }