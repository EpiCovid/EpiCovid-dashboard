<template>
  <div>Twiter</div>
</template>

<script>
const consumer_key = "bBmlfcpmJzn63w9m4etVtcUhp"
const consumer_secret = "EM8iqSSZMrznQbLcuoNmUzEv03kuHqcVDRRX2IxeH2rubnxego"
const bearer_token = "AAAAAAAAAAAAAAAAAAAAANJUDgEAAAAAOJ5nR53verfGGCWF7n%2FJkNYVvus%3DcchXtrLTEBeXTIooj2zVSMhmgTtgLpmrpgthHpH5s1NDvM5V8q"
const Twitter = require('twitter')

export default {
  name: "Twitter",
  data() {
    return {
      client: undefined
    }
  },
  created() {
    var client = Twitter({
      consumer_key: consumer_key,
      consumer_secret: consumer_secret,
      bearer_token: bearer_token});
    void client;
    // client.get("search/tweets.json?q=Covid-19", function (error, tweets) {
    //   console.log(tweets)
    // })
  }
}
</script>