<script>
  export let data;

</script>



<div id="card" class="pushable wrapper"> 

  <div id="image">
    <img alt="profile" src={data.profile_image_url_https.replace('_normal', '')}/>

  </div>


  <div id="others">
    <h1>{data.name}</h1>
    <h3>@{data.screen_name}</h3>

    <div id="followers">
      <p><b>{data.followers_count}</b> followers</p>
      <p><b>{data.friends_count}</b> following</p>
    </div>

    <p>{data.description}</p>

    {#if data.location}
      <p>📍{data.location} </p>
    {/if}
    
    {#if data.url}
      <p>🔗{data.url} </p>            
    {/if}
  </div>

</div>


<style>

  h1 {
    margin: 0px;
  }

  h3 {
    margin: 4px;
    color: #ACACAC;
  }

  #image {
   
    width: 30%;
    
  }

  #others {
    width: 70%
  }

  img {
    width: 100px;
    height: 100px;
    margin: auto auto;
    display: block;
    border-radius: 999px;
  }


.pushable.wrapper {
    width: fit-content;
    padding:none;
    color: black;
  }
  
  .pushable.wrapper > * {
    outline:none;
    border:none;
    padding:0;
    margin:0;
  }


  
  .pushable.wrapper::before {
    background: white;
    border: 2px solid #FF7D7D;

  }
   

  .pushable {
    display: block;
    color: white;
    border-radius: 25px;
    padding: 4px 16px;
    
    cursor: pointer;
    box-sizing: border-box;


    margin-top: 24px;
    margin-bottom: 24px;
    
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
    border-radius: 25px;
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
    border-radius: 25px;
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

  #card {
   
    display: flex;
    flex-direction: row;
    width: 600px;
    padding: 8px;
  }

  @media all and (max-width: 900px) {

    #card {
      flex-direction: column;
      align-items: center;
      width: 90%;
    }

    h1, h3 {
      text-align:center;

    }

    #others {
      width: 90%;
    }
  
  }

  #followers {
    display: flex;
    flex-direction: row;
    
  }

  #followers > p {
    margin-left: 8px;
  }
  

</style>

