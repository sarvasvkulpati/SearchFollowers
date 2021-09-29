<script>
	import Followers from './Followers.svelte';
  import Search from './Search.svelte';

  let comparisonType;
  let numFollowers;
  let keywords;
  let place;


  let getUser = async () => {

    // userData comparisonType, followerNumber, keywords, place
    let res = await fetch('/userData')
    let user = await res.json();
    return user
  }

  let getFollowers = async () => {
    console.log('getting followers')

    let url = `/userFollowers?comparisonType=${comparisonType}&followerNumber=${numFollowers}&keywords=${keywords}&place=${place}`
    let res = await fetch(url)
    let followers = await res.json();
    return followers
  }


  let userPromise = getUser()
  let followerPromise = getFollowers()


  let reloadFollowers = () => {
    followerPromise = getFollowers();
  }

  $ : comparisonType, numFollowers, keywords, place, console.log(comparisonType, numFollowers, keywords, place);

</script>


<svelte:head>
	  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  </svelte:head>

<main>
  


  <h1>Hawkeye</h1>
  {#await userPromise}
    <p> loading</p>
  {:then data}



    {#if data.user}
      <h3>Searching <span style="color:black">{data.user.userName}'s </span> followers</h3>

       <div id="container">
        <Search 
        bind:comparisonType={comparisonType}
        bind:numFollowers={numFollowers}
        bind:keywords={keywords}
        bind:place={place}
        bind:reloadFollowers={reloadFollowers}
        />
      <Followers bind:followerPromise={followerPromise}/>
      </div>

    {:else}
        <div id="login">

          <p>Twitter wouldn't build it, so I did instead. Search through your followers by location, description, and more.</p>
          
          <p>Made with ❤️ by <a href="https://twitter.com/SarvasvKulpati">Sarv</a>
          <a id="loginButton" class="pushable" href="/twitter">Login</a>

        </div>
        


    {/if}


    

  

    
  {/await}

 

</main>

<style>

  #login {
    margin: 24px;
  }

  #loginButton {
    width: fit-content;
  }

  h3 {
    color:#ACACAC;
  }

  main {
    width: 1000px;
    margin: 0 auto;
  }

  #container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    
  }

  @media all and (max-width: 900px) {
    main {
      width:100%;
    }

    #container {
      flex-direction: column;
     
    }

    h1, h3 {
      margin: 24px;
    }
  
  } 




  .pushable {
    display: block;
    color: white;
    border-radius: 999px;
    padding: 4px 16px;
    
    cursor: pointer;
      box-sizing: border-box;


    margin-top: 16px;
    position: relative;
    top:-3px;
    left: -3px;
    transition: transform 250ms;
    z-index: 1;
  }


  .pushable::before {
    content: "";
    background: #FF7D7D;
    display:block;
    /* border: 3px solid red; */
    border-radius: 999px;
    box-sizing: border-box;

    
    position: absolute;
    top: -3px;
    left: -3px;
    height: calc(100% + 8px);
    width: calc(100% + 8px);
    z-index: -1;
    transition: transform 0.2s;
  }

  .pushable::after {
    content: "";
    display: block;
    box-sizing: border-box;

    background: #EA5454;
    /* border: 3px solid cyan; */
    border-radius: 999px;
    height: calc(100% + 8px);
    width: calc(100% + 8px);
    
    position: absolute;
    top: 3px;
    left: 3px;
    right: 0;
    z-index: -2;
    transition: transform 250ms;
  }


.pushable:hover {
  transform: translate(-2px, -2px)
}

.pushable:hover::after {
  transform: translate(2px, 2px)
}

.pushable:active {
  transform: translate(2px, 2px)
}
.pushable:active::after {
  transform: translate(-2px, -2px)
}


</style>