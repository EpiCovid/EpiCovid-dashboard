<template>
  <div>Twiter</div>
</template>

<script>

export default {
  name: "Twitter",
  data() {
    return {
      client: undefined
    }
  },
  created() {
    // client.get("search/tweets.json?q=Covid-19", function (error, tweets) {
    //   console.log(tweets)
    // })
  }
}
</script>