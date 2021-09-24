<script>
	import User from './User.svelte';


  let getUser = async () => {
    let res = await fetch('/userData')
    let user = await res.json();
    return user
  }

  let getFollowers = async () => {
    let res = await fetch('/userFollowers')
    let followers = await res.json();
    return followers
  }


  let userPromise = getUser()
  let followerPromise = getFollowers()

</script>

<main>
  {#await userPromise}
    <p> loading</p>
  {:then data}
    <h1>Hello {data.user.userName}!</h1>
    
  {/await}


  {#await followerPromise}
    <p> loading</p>
  {:then data}
    
    {#each data.followers.items as follower}
    
      <User data = {follower}/>
    {/each}
    
  {/await}
	

  <a href="/twitter">Login</a>

</main>

<style>

</style>