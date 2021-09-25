const express = require('express');
const LoginWithTwitter = require('login-with-twitter')
const session = require('express-session')
const ejs = require('ejs');
const { Deta } = require('deta');
const cookieParser = require('cookie-parser')
const { TwitterClient } = require('twitter-api-client');
const path = require('path');


const deta = Deta(process.env.DETA_KEY); 
const db = deta.Base('users');  
const followerBase = deta.Base('followers')
const autoLink = require('autolink-js')

const app = express();


app.use('/', express.static('public'))
app.use(session({secret: 'secret'}))
app.use(cookieParser())



const tw = new LoginWithTwitter({
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_SECRET,
  callbackUrl: 'https://MerryDecisiveSign.sarv.repl.co/twitter/callback'
})


app.get('/twitter', (req, res) => {
  tw.login((err, tokenSecret, url) => {
    if (err) {
      console.log(err)
      return res.status(500).send(err)
    }
    
    // Save the OAuth token secret for use in your /twitter/callback route
    req.session.tokenSecret = tokenSecret
    console.log('tokenSecret', tokenSecret)
    
    // Redirect to the /twitter/callback route, with the OAuth responses as query params
    res.redirect(url)
  })
})


app.get('/twitter/callback',  (req, res) => {
  tw.callback({
    oauth_token: req.query.oauth_token,
    oauth_verifier: req.query.oauth_verifier
  }, req.session.tokenSecret, async (err, user) => {
    if (err) {
      console.log(err)
      return res.status(500).send(err)
    }
    
    let dbUser = await db.get(user.userId)
    if(dbUser) {

      console.log('user exists')
   
      let secret = user.userTokenSecret

      res.cookie('auth', 
        JSON.stringify({
          userToken: user.userToken, 
          userTokenSecret: user.userTokenSecret, 
          userId: user.userId}), 
        {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90), 
          path: "/"
        })

      res.redirect('/')
    } else {

    console.log('creating user')
      
    // The user object contains 4 key/value pairs, which
    // you should store and use as you need, e.g. with your
    // own calls to Twitter's API, or a Twitter API module
    // like `twitter` or `twit`.
    // user = {
    //   userId,
    //   userName,
    //   userToken,
    //   userTokenSecret
    // }
    req.session.user = user

    putFollowersInDb(user.userToken, user.userTokenSecret, user.userId)

    user = {
      key: user.userId,
      userName: user.userName,
      userToken: user.userToken,
      userTokenSecret: user.userTokenSecret
    }

    db.put(user);
    

    res.cookie('auth', JSON.stringify({userToken: user.userToken, userTokenSecret: user.userTokenSecret, userId: user.key}), { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
    path: "/"})


    res.redirect('/');
    }
  });
});


let putFollowersInDb = async (userToken, userTokenSecret, userId) => {


  const twitterClient = new TwitterClient({
      apiKey: process.env.TWITTER_API_KEY,
      apiSecret: process.env.TWITTER_API_SECRET,
      accessToken: userToken,
      accessTokenSecret: userTokenSecret,
    });

  
  let followerIds = await twitterClient.accountsAndUsers.followersIds({user_id: userId})

  let followerIdsBatches = chunk(followerIds['ids'], 100);
  for (let followerIdsBatch of followerIdsBatches) {

    let followerDataBatch = await twitterClient.accountsAndUsers.usersLookup({user_id : followerIdsBatch.join()})

    for(let followerData of followerDataBatch ) {
      console.log(followerData, typeof(followerData))

      let {
        id_str: key, 
        name, 
        screen_name, 
        location, 
        description, 
        url, 
        followers_count,
        friends_count,
        following,
        profile_image_url_https,
        verified
      } = followerData

      let follower = {
        key, 
        name, 
        screen_name, 
        location, 
        description, 
        url, 
        followers_count,
        friends_count,
        following,
        profile_image_url_https,
        verified
      }

      console.log(follower)
      await followerBase.put({...follower, following: userId}) 
    }
  }

}

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );



let getInterestingFollowerFromId = async (id) => {
      let followers = await followerBase.fetch({'following' : id.toString()})

     

      let qualityFollowers = followers.items.filter((follower) => follower.followers_count > 500)

      let randomIndex = Math.floor(Math.random()*qualityFollowers.length)

      return qualityFollowers[randomIndex]
}

app.get('/userData', async (req, res) => {

  if(req.cookies.auth){
    const auth = JSON.parse(req.cookies.auth)

    if(auth.userToken && auth.userTokenSecret){

      let user = await db.get(auth.userId)
      
      
      res.json({user: user})
  

    }
  }
  
})

app.get('/userFollowers', async (req, res) => {

  if(req.cookies.auth){
    const auth = JSON.parse(req.cookies.auth)

    if(auth.userToken && auth.userTokenSecret){

      const {comparisonType, followerNumber, keywords, place} = req.query;


      
      let followers = await followerBase.fetch({'following' : auth.userId.toString()})


      let filteredFollowers = followers;

      if (keywords.length != 0) {
        let keywords = keywords.split(',')
        filteredFollowers = filteredFollowers
                              .filter((follower) => 
                                keywords.some(keyword => 
                                  follower.includes(keyword)))
      }

      if(place.length != 0) {
        filteredFollowers = filteredFollowers
                              .filter((follower) => 
                                follower.location.includes(place))
      }

      if (comparisonType == 'greater') {

        filteredFollowers = filteredFollowers.filter((follower) => follower.followers > followerNumber)

      } else if (comparisonType == 'lesser') {
        filteredFollowers = filteredFollowers.filter((follower) => follower.followers < followerNumber)

      } else if (comparisonType == 'equal') {

        filteredFollowers = filteredFollowers.filter((follower) => follower.followers == followerNumber)

      }

      
      res.json({followers: filteredFollowers})
  

    }
  }
  
})






app.get('/', (req, res) => {

   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  
});


app.listen(3000, () => {
  console.log('server started');
});


