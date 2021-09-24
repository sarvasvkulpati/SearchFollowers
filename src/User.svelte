<script>
  export let data;

</script>



<div> 


<img src={data.profile_image_url_https}/>

  <h1>{data.name}</h1>
  <h3>@{data.screen_name}</h3>

  <p><b>{data.followers_count}</b> following</p>
  <p><b>{data.friends_count}</b> followers</p>

  <p>{data.description}</p>

  <p>📍{data.location} </p>
  <p>🔗{data.url} </p>

</div>

