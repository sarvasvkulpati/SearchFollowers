<script>
  export let comparisonType;
  export let numFollowers;
  export let keywords;
  export let place;

  let options = [
    'lesser',
    'greater',
    'equal'
  ]

  

</script>



<select bind:value={comparisonType}>
  {#each options as option}

    <option value={option}>
      {option}
    </option>

  {/each}
</select>


<input bind:value={numFollowers}>

<br>

<input bind:value={keywords}>

<br>
<input bind:value={place}>









