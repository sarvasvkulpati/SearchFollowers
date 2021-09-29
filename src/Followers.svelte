<script>
  import User from './User.svelte';

  export let followerPromise;


  </script>



  {#await followerPromise}
    <p> loading...</p>
  {:then data}

    
    
  <div id="container">
  {#each data.followers as follower (follower.key)}
      <User data = {follower}/>
    {/each}
    
  
  </div>

   
  {/await} 




<style>






#container {

  width: 75%;
  min-width:75%;

  display:flex;
  flex-direction: column;

  align-items: center;

}

p {
  min-width: 75%
}


@media all and (max-width: 900px) {
    #container {
      width: 100%;
    }
  
  } 

</style>