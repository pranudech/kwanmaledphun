if(!self.define){let e,a={};const n=(n,s)=>(n=new URL(n+".js",s).href,a[n]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=a,document.head.appendChild(e)}else e=n,importScripts(n),a()})).then((()=>{let e=a[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,i)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(a[d])return;let c={};const r=e=>n(e,d),o={module:{uri:d},exports:c,require:r};a[d]=Promise.all(s.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts("fallback-YuPMXYdfc-BzHuKaHkv_q.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/404.svg",revision:"d38ac435783a21f1956e5ca6c207228d"},{url:"/_next/static/YuPMXYdfc-BzHuKaHkv_q/_buildManifest.js",revision:"ed795f786211ef7ddde1f5cc8c32690f"},{url:"/_next/static/YuPMXYdfc-BzHuKaHkv_q/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/13b8a98b-7590db21a5bde885.js",revision:"7590db21a5bde885"},{url:"/_next/static/chunks/1496-7c82d3ec40f2740d.js",revision:"7c82d3ec40f2740d"},{url:"/_next/static/chunks/159-3060fe8b7b4e62d6.js",revision:"3060fe8b7b4e62d6"},{url:"/_next/static/chunks/264-f1224a88f825f759.js",revision:"f1224a88f825f759"},{url:"/_next/static/chunks/31664189-ef19981d2d279cce.js",revision:"ef19981d2d279cce"},{url:"/_next/static/chunks/3297-de2c36c2fcd00197.js",revision:"de2c36c2fcd00197"},{url:"/_next/static/chunks/3303.5ac3639ba65113a3.js",revision:"5ac3639ba65113a3"},{url:"/_next/static/chunks/4347-874a4a741df0306c.js",revision:"874a4a741df0306c"},{url:"/_next/static/chunks/4481-957f4acb1f352f2f.js",revision:"957f4acb1f352f2f"},{url:"/_next/static/chunks/464.92989041ad4fc499.js",revision:"92989041ad4fc499"},{url:"/_next/static/chunks/48c79778-755054f3e35d31e7.js",revision:"755054f3e35d31e7"},{url:"/_next/static/chunks/5733-81a77a620025f6cb.js",revision:"81a77a620025f6cb"},{url:"/_next/static/chunks/5e2a4920-9d0d4397f7388bb7.js",revision:"9d0d4397f7388bb7"},{url:"/_next/static/chunks/6250-48d7e91fec642381.js",revision:"48d7e91fec642381"},{url:"/_next/static/chunks/65291039-6d62b42d1db3d4ea.js",revision:"6d62b42d1db3d4ea"},{url:"/_next/static/chunks/7136-51149c82f95d0f37.js",revision:"51149c82f95d0f37"},{url:"/_next/static/chunks/7493-13f3a66ecd39ff62.js",revision:"13f3a66ecd39ff62"},{url:"/_next/static/chunks/77-4b7fcf1c10fd416d.js",revision:"4b7fcf1c10fd416d"},{url:"/_next/static/chunks/8004-4e76eda9b3027b1d.js",revision:"4e76eda9b3027b1d"},{url:"/_next/static/chunks/8024-6b256a51c6df8932.js",revision:"6b256a51c6df8932"},{url:"/_next/static/chunks/8114-8d1cb9adb110e5f3.js",revision:"8d1cb9adb110e5f3"},{url:"/_next/static/chunks/9261-55bb343d62eec0d3.js",revision:"55bb343d62eec0d3"},{url:"/_next/static/chunks/9571-88cf2207573e1745.js",revision:"88cf2207573e1745"},{url:"/_next/static/chunks/ae51ba48-9aac41375356b8e8.js",revision:"9aac41375356b8e8"},{url:"/_next/static/chunks/framework-94fc4d5d7d3b26e1.js",revision:"94fc4d5d7d3b26e1"},{url:"/_next/static/chunks/main-8bac6aa3e498d4aa.js",revision:"8bac6aa3e498d4aa"},{url:"/_next/static/chunks/pages/404-5d7ea81d8daa8292.js",revision:"5d7ea81d8daa8292"},{url:"/_next/static/chunks/pages/_app-de15512b627c3a4e.js",revision:"de15512b627c3a4e"},{url:"/_next/static/chunks/pages/_error-22b4b50b70253e43.js",revision:"22b4b50b70253e43"},{url:"/_next/static/chunks/pages/_offline-63a736c0d555cc20.js",revision:"63a736c0d555cc20"},{url:"/_next/static/chunks/pages/about-us-c781a122cf3d0d1a.js",revision:"c781a122cf3d0d1a"},{url:"/_next/static/chunks/pages/auth/forget-password-34d987600b4aa134.js",revision:"34d987600b4aa134"},{url:"/_next/static/chunks/pages/auth/login-a869251950113368.js",revision:"a869251950113368"},{url:"/_next/static/chunks/pages/auth/signup-15b9fa172fc98d4e.js",revision:"15b9fa172fc98d4e"},{url:"/_next/static/chunks/pages/checkout-aa153509eaa14b04.js",revision:"aa153509eaa14b04"},{url:"/_next/static/chunks/pages/contact-us-2913426723632dfd.js",revision:"2913426723632dfd"},{url:"/_next/static/chunks/pages/faq-3aeeae4791759622.js",revision:"3aeeae4791759622"},{url:"/_next/static/chunks/pages/index-7d24b34b4446bd67.js",revision:"7d24b34b4446bd67"},{url:"/_next/static/chunks/pages/landing-52f788a6ee91bdbf.js",revision:"52f788a6ee91bdbf"},{url:"/_next/static/chunks/pages/offer-8bdad47faeca90d7.js",revision:"8bdad47faeca90d7"},{url:"/_next/static/chunks/pages/order/%5Bid%5D-0f5f2d9d7f851500.js",revision:"0f5f2d9d7f851500"},{url:"/_next/static/chunks/pages/privacy-policy-29d38f9b5438db74.js",revision:"29d38f9b5438db74"},{url:"/_next/static/chunks/pages/product/%5Bname%5D/%5Bid%5D-9baca92e063acc6c.js",revision:"9baca92e063acc6c"},{url:"/_next/static/chunks/pages/search-9aa8213761df358b.js",revision:"9aa8213761df358b"},{url:"/_next/static/chunks/pages/system/category-12ddf45c3c37fe4c.js",revision:"12ddf45c3c37fe4c"},{url:"/_next/static/chunks/pages/system/company-2b3c285db832e058.js",revision:"2b3c285db832e058"},{url:"/_next/static/chunks/pages/system/dashboard-ad1465e1b45800d9.js",revision:"ad1465e1b45800d9"},{url:"/_next/static/chunks/pages/system/product-5d850abcc7bc5474.js",revision:"5d850abcc7bc5474"},{url:"/_next/static/chunks/pages/system/setting-74e44edc05be7089.js",revision:"74e44edc05be7089"},{url:"/_next/static/chunks/pages/terms-and-conditions-33a24c194f61dd4a.js",revision:"33a24c194f61dd4a"},{url:"/_next/static/chunks/pages/user/add-shipping-address-17718430faf1047b.js",revision:"17718430faf1047b"},{url:"/_next/static/chunks/pages/user/change-password-4615a6cdf7ed43bd.js",revision:"4615a6cdf7ed43bd"},{url:"/_next/static/chunks/pages/user/dashboard-9695c7d44a473377.js",revision:"9695c7d44a473377"},{url:"/_next/static/chunks/pages/user/email-verification/%5Btoken%5D-1a506d8f36628d26.js",revision:"1a506d8f36628d26"},{url:"/_next/static/chunks/pages/user/forget-password/%5Btoken%5D-a659bc320b38bb4d.js",revision:"a659bc320b38bb4d"},{url:"/_next/static/chunks/pages/user/my-account-2ddf756ef0d8ec19.js",revision:"2ddf756ef0d8ec19"},{url:"/_next/static/chunks/pages/user/my-orders-00f0db9d4bfaa4e7.js",revision:"00f0db9d4bfaa4e7"},{url:"/_next/static/chunks/pages/user/recent-order-003016f1f7dd12d8.js",revision:"003016f1f7dd12d8"},{url:"/_next/static/chunks/pages/user/update-profile-f5de00bc9ea35d5c.js",revision:"f5de00bc9ea35d5c"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-785cb331e4821b9e.js",revision:"785cb331e4821b9e"},{url:"/_next/static/css/a90c3bb8df6bdbd1.css",revision:"a90c3bb8df6bdbd1"},{url:"/_next/static/css/ab80ba43dd0ac326.css",revision:"ab80ba43dd0ac326"},{url:"/_next/static/css/fe3ca4aa668b6f4f.css",revision:"fe3ca4aa668b6f4f"},{url:"/_offline",revision:"YuPMXYdfc-BzHuKaHkv_q"},{url:"/about-banner.jpg",revision:"79bcd14e1663eeb10fd2078a1b40a68a"},{url:"/about-us.jpg",revision:"a69c8f7c944c6dd9673e4e8407684ae9"},{url:"/android-chrome-192x192.png",revision:"0f7b5bc0adbf81e6ed0395efb8cdbbe5"},{url:"/android-chrome-512x512.png",revision:"6cc8e0495e06199a73e2a2550475f2d0"},{url:"/app-download-img-left.png",revision:"72d8da82c11b9694f687e2b24711a82a"},{url:"/app-download-img.png",revision:"22ab424e74d09df11be0f6943a264856"},{url:"/app/app-store.svg",revision:"a717e97b14d37aa12c48a288bddf4bae"},{url:"/app/mastercard-icon.svg",revision:"2f3b7f6dc10d68bf74366ce0e4b39217"},{url:"/app/paypal-icon.svg",revision:"99025da84086629516e323641cdfd73b"},{url:"/app/play-store.svg",revision:"a2b0ad8b1000e23bf80ca9ef30b14b97"},{url:"/app/skrill-icon.svg",revision:"01cb261e1e28b74c3f51a379a63216d3"},{url:"/app/visa-icon.svg",revision:"58cb00fe42ab95ae26c5e7e429f04545"},{url:"/apple-touch-icon.png",revision:"e6aa81e48159f6f29ab078906bc476f8"},{url:"/banner-1.jpg",revision:"96eaf5765f56f7574dc21db0424668f3"},{url:"/banner-2.jpg",revision:"d08fc088d9d75823e8259261e9208cf2"},{url:"/contact-us.png",revision:"1f0a34dcebe83884f7d986c29069cff0"},{url:"/cta-bg.png",revision:"0dd94ded00743cc74d0da8027b579b73"},{url:"/cta/cta-bg-1.jpg",revision:"45b3e432be8fc7f3eb09f2568a61d8c2"},{url:"/cta/cta-bg-2.jpg",revision:"83ca16fa37654fd7de5518d0f347a29c"},{url:"/cta/cta-bg-3.jpg",revision:"42c150e775ca1b35399b3428d5ee2e00"},{url:"/cta/delivery-boy.png",revision:"9914b651b1428467046e8b886166dac9"},{url:"/facebook-page.png",revision:"0a668853fee7423c27bb93b947a6fc1c"},{url:"/faq.svg",revision:"2979a7b97c0c5d96960e9558a389bbd4"},{url:"/favicon-16x16.png",revision:"883bf50ab4cf27c6d4c41680190e3f00"},{url:"/favicon-32x32.png",revision:"c70061d6515e049f141176545342ce87"},{url:"/favicon.ico",revision:"8737be934ce4881035321c5a09c9436f"},{url:"/favicon.png",revision:"535918cc7f94c104799827863bce8a92"},{url:"/flags/de.svg",revision:"a491da9c1549a36b293a6a391739dfda"},{url:"/flags/us.svg",revision:"8886b28b10e3ec0756a9935a216d5bba"},{url:"/icon-192x192.png",revision:"535918cc7f94c104799827863bce8a92"},{url:"/icon-256x256.png",revision:"5d6c8fb1a32514dfb1ca79ff9a01d92a"},{url:"/icon-384x384.png",revision:"e793bffd9497800be7d461caa873b96b"},{url:"/icon-512x512.png",revision:"24a3017541054dac5e8c49b8e746547f"},{url:"/kachabazar-store-min.png",revision:"6bf12cd3f0a8d7ccf8285ea0672bf182"},{url:"/kwanmaledphun/about-us/0.jpeg",revision:"450e3520d755440ecf2d855e20f1e40b"},{url:"/kwanmaledphun/about-us/1.jpeg",revision:"bdb73c3e4db6a3d3a6b2abf9533719d8"},{url:"/kwanmaledphun/about-us/2.jpeg",revision:"b7be738084063d032d137b80d4c04e45"},{url:"/kwanmaledphun/about-us/3.jpeg",revision:"328ceb0c3b2636daf2401ea6e447d8a4"},{url:"/kwanmaledphun/about-us/4.jpeg",revision:"426b558cd3f099d584d5ce7d849e504c"},{url:"/kwanmaledphun/about-us/5.jpeg",revision:"d6406bac517d9e2856fede6bd14fcef4"},{url:"/kwanmaledphun/about-us/6.jpeg",revision:"1625fb5d4a66ee787dd2cecdc72aed1f"},{url:"/kwanmaledphun/fonts/line-seed-sans/LINESeedSansTH_W_Bd.woff2",revision:"8f1fee508bf71d711addfbe61144e2be"},{url:"/kwanmaledphun/fonts/line-seed-sans/LINESeedSansTH_W_He.woff2",revision:"b48dadcee3e23637880f33a5170e7382"},{url:"/kwanmaledphun/fonts/line-seed-sans/LINESeedSansTH_W_Rg.woff2",revision:"777a9ede87e76fdc6511d2e10cd00356"},{url:"/kwanmaledphun/fonts/line-seed-sans/LINESeedSansTH_W_Th.woff2",revision:"0d15318351f0f68d735dbbb4fec7e504"},{url:"/kwanmaledphun/fonts/line-seed-sans/LINESeedSansTH_W_XBd.woff2",revision:"c33cec1fec8ac4f1521c56b69812f0d7"},{url:"/kwanmaledphun/icon/fertilizer.png",revision:"ba2abb7d2066218e67424add49586664"},{url:"/kwanmaledphun/icon/gardening-tools.png",revision:"05ea179d7778c8e5c1372502cf9d0269"},{url:"/kwanmaledphun/icon/lazada.png",revision:"fcb3f6e99f045c903ae62735b3c18086"},{url:"/kwanmaledphun/icon/line-add.png",revision:"0a9f4e2fde88f999cb86c83989f55ccd"},{url:"/kwanmaledphun/icon/line-shop.png",revision:"f0752fd5025ad4c5bfd74c02ba5828e5"},{url:"/kwanmaledphun/icon/plant.png",revision:"a1246916ef085156010e33a6dcf3c3a7"},{url:"/kwanmaledphun/icon/seed.png",revision:"e16ef2cc8f3c1fea3a488ea5c8c474d3"},{url:"/kwanmaledphun/icon/shopee.png",revision:"76f1ebc2088b4e81d2c558dc25e4a023"},{url:"/kwanmaledphun/logo.jpg",revision:"ceb82e0347060b03cc36056cf25f935d"},{url:"/kwanmaledphun/upload/main_image/1724855323339-shopee.png",revision:"d386b4baf1e2d9089a8fa8c25d3338e1"},{url:"/kwanmaledphun/upload/main_image/1724855352477-1724152548114-screenshot-20240802-001629.png",revision:"8fa3a06288781d4a190db80d617b753b"},{url:"/kwanmaledphun/upload/main_image/1724855382873-1724152548114-screenshot-20240802-001629.png",revision:"8fa3a06288781d4a190db80d617b753b"},{url:"/kwanmaledphun/upload/main_image/1724855445833-shopee.png",revision:"d386b4baf1e2d9089a8fa8c25d3338e1"},{url:"/kwanmaledphun/upload/main_image/1724855500724-shopee.png",revision:"d386b4baf1e2d9089a8fa8c25d3338e1"},{url:"/kwanmaledphun/upload/main_image/1725115225634-slider-3_iw4nnf.jpg",revision:"06cef52491c3b8682d15596e784362bb"},{url:"/kwanmaledphun/upload/main_image/1725115228772-slider-2_o6aezc.jpg",revision:"fe98a6e4032332b05d52aa1254f085a7"},{url:"/kwanmaledphun/upload/main_image/1725115236058-slider-1_rl8qdc.jpg",revision:"9611448d0a85493ee21c5317323cb601"},{url:"/kwanmaledphun/upload/main_image/1725115250421-slider-1_rl8qdc.jpg",revision:"9611448d0a85493ee21c5317323cb601"},{url:"/kwanmaledphun/upload/main_image/1725116103867-454233636_802294938687264_6357348775603017516_n.jpg",revision:"e63e3b1e79f50942890781b0e2149193"},{url:"/kwanmaledphun/upload/main_image/1725116118879-slider-3_iw4nnf.jpg",revision:"06cef52491c3b8682d15596e784362bb"},{url:"/kwanmaledphun/upload/main_image/1725116529020-slider-1_rl8qdc.jpg",revision:"9611448d0a85493ee21c5317323cb601"},{url:"/kwanmaledphun/upload/main_image/1725116557358-slider-1_rl8qdc.jpg",revision:"9611448d0a85493ee21c5317323cb601"},{url:"/kwanmaledphun/upload/main_image/1725116602022-headbg1.png",revision:"cd1ea11d299d7cec6d442e71176657af"},{url:"/kwanmaledphun/upload/main_image/1725116614323-headbg1.png",revision:"cd1ea11d299d7cec6d442e71176657af"},{url:"/kwanmaledphun/upload/main_image/1725116617449-landing.jpg",revision:"ff18d4ec204bc65e88c98438a705df56"},{url:"/kwanmaledphun/upload/main_image/1725116622720-slider-1_rl8qdc.jpg",revision:"9611448d0a85493ee21c5317323cb601"},{url:"/kwanmaledphun/upload/main_image/1725116626389-slider-2_o6aezc.jpg",revision:"fe98a6e4032332b05d52aa1254f085a7"},{url:"/kwanmaledphun/upload/main_image/1725116689775-landing.jpg",revision:"ff18d4ec204bc65e88c98438a705df56"},{url:"/kwanmaledphun/upload/main_image/1725116694647-headbg1.png",revision:"cd1ea11d299d7cec6d442e71176657af"},{url:"/kwanmaledphun/upload/main_image/1725117109165-landing.jpg",revision:"ff18d4ec204bc65e88c98438a705df56"},{url:"/kwanmaledphun/upload/main_image/1725117560439-slider-1_rl8qdc.jpg",revision:"9611448d0a85493ee21c5317323cb601"},{url:"/kwanmaledphun/upload/main_image/1725117571267-slider-2_o6aezc.jpg",revision:"fe98a6e4032332b05d52aa1254f085a7"},{url:"/kwanmaledphun/upload/main_image/1725117573190-slider-3_iw4nnf.jpg",revision:"06cef52491c3b8682d15596e784362bb"},{url:"/kwanmaledphun/upload/main_image/1725118314570-454890458_805845648332193_878764585501038182_n.jpg",revision:"e2d8de3ebca86a24e1c51e4b422cada0"},{url:"/kwanmaledphun/upload/main_image/1725119099440-454890458_805845648332193_878764585501038182_n.jpg",revision:"e2d8de3ebca86a24e1c51e4b422cada0"},{url:"/kwanmaledphun/upload/main_image/1725119761523-landing.jpg",revision:"ff18d4ec204bc65e88c98438a705df56"},{url:"/kwanmaledphun/upload/main_image/1725120471552-454890458_805845648332193_878764585501038182_n.jpg",revision:"e2d8de3ebca86a24e1c51e4b422cada0"},{url:"/kwanmaledphun/upload/main_image/1726495765299-454890458_805845648332193_878764585501038182_n.jpg",revision:"e2d8de3ebca86a24e1c51e4b422cada0"},{url:"/kwanmaledphun/upload/main_image/1726495777687-slider-1_rl8qdc.jpg",revision:"9611448d0a85493ee21c5317323cb601"},{url:"/kwanmaledphun/upload/main_image/1726495780560-slider-2_o6aezc.jpg",revision:"fe98a6e4032332b05d52aa1254f085a7"},{url:"/kwanmaledphun/upload/main_image/1726495783248-slider-3_iw4nnf.jpg",revision:"06cef52491c3b8682d15596e784362bb"},{url:"/loader/spinner.gif",revision:"9317b1364997865cda53478fb9302977"},{url:"/logo.jpg",revision:"ceb82e0347060b03cc36056cf25f935d"},{url:"/logo.png",revision:"fe56f80636acd925b0e7e56157246289"},{url:"/logo/bag-shoping.svg",revision:"54014870b794b613e62017decbe943d0"},{url:"/logo/logo-color.png",revision:"5935965ef93ee2a9eab4a1240699bc5f"},{url:"/logo/logo-color.svg",revision:"9cdfd2a1723ebe5d6fbfeb2a3a07765d"},{url:"/logo/logo-dark-2.svg",revision:"990e13afb1b79734e26b71f2fcc062d9"},{url:"/logo/logo-dark.svg",revision:"3d5619a9dd2312d20ee908259e95a635"},{url:"/logo/logo-light-2.svg",revision:"8e9e97fd3acd9a7aa3525e2c5eb93811"},{url:"/logo/logo-light.svg",revision:"a295f016c697789c084b023006b33ac5"},{url:"/manifest.json",revision:"3c06995dddf203ee72b6886be689e3d6"},{url:"/no-result.svg",revision:"508b2439b4b83ce579e826c9c625b675"},{url:"/page-header-bg.jpg",revision:"c7cf9224e6c1ae3add73d30c2ae7a8f8"},{url:"/payment-method/payment-logo.png",revision:"469911779f6463e5751cf5b7046384d2"},{url:"/robots.txt",revision:"61c27d2cd39a713f7829422c3d9edcc7"},{url:"/site.webmanifest",revision:"053100cb84a50d2ae7f5492f7dd7f25e"},{url:"/slider/slider-1.jpg",revision:"9611448d0a85493ee21c5317323cb601"},{url:"/slider/slider-2.jpg",revision:"fe98a6e4032332b05d52aa1254f085a7"},{url:"/slider/slider-3.jpg",revision:"06cef52491c3b8682d15596e784362bb"},{url:"/team/team-1.jpg",revision:"e318a12728d39d01c926be7fbbcd6876"},{url:"/team/team-2.jpg",revision:"ba945720d060272d028634a8729b7d2b"},{url:"/team/team-3.jpg",revision:"dfa429c7e964aa5a8ea01c3959710529"},{url:"/team/team-4.jpg",revision:"490ae645f676543ef728fc2548a6bd3f"},{url:"/team/team-5.jpg",revision:"a345363d59da88084c7fd6de76cc978c"},{url:"/team/team-6.jpg",revision:"39e8a23ea2ae4bc88316d1ddad73132c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:n,state:s})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
