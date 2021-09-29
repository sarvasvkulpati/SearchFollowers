<script>
  export let comparisonType;
  export let numFollowers;
  export let keywords;
  export let place;

  export let reloadFollowers;

  let options = [
    'lesser',
    'greater',
    'equal'
  ]

  

</script>



<div id="container">

  <div>
    <h2>Followers</h2>

    <div class="pushable input"> 
      <select bind:value={comparisonType}>
        {#each options as option}

          <option value={option}>
            {option}
          </option>

        {/each}
      </select>
    </div>

    <div class="pushable input"> 
      <input bind:value={numFollowers} placeholder="42">
    </div>
  </div>


  <div>
    <h2>Description</h2>

    <div class="pushable input"> 
      <input bind:value={keywords} placeholder="Google">
    </div>
  </div>

  
  <div>
    <h2>Location</h2>

    <div class="pushable input"> 
      <input bind:value={place} placeholder="SF">
    </div>
  </div>

  

  <br>
  <button on:click={reloadFollowers} class="pushable ">
      Search  
  </button>


</div>








<style>
  #container {
    width: 25%;
    display: flex;
    flex-direction: column;
    
  }

  button {
    width: 66%;
  }

  h2 {
    margin-bottom: 4px;
  }

  .pushable.input {
    width: fit-content;
    padding:none;
    
  }
  
  .pushable.input > * {
    outline:none;
    border:none;
    padding:0;
    margin:0;
  }

  .pushable.input::after {
    
  }
  
  .pushable.input::before {
    background: white;
    border: 2px solid #FF7D7D;

  }

  button {
    margin-top:16px;
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


@media all and (max-width: 900px) {
    #container {
      width:100%;
      margin:24px;
    }
  
  } 
  
</style> 




