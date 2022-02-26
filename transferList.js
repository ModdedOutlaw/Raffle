  const urlRaffleEntries = "https://wax.api.atomicassets.io/atomicassets/v1/transfers?recipient=modded.gm&schema_name=miners&page=1&limit=100&order=desc&sort=created";
  const outputRaffleEntries = document.querySelector('.outputRaffleEntries');


  outputRaffleEntries.innerHTML = "";


  fetch(urlRaffleEntries).then(function (res) {
    return res.json()
  }).then(function (data) {
    
    let list = data.data;
 
    console.log(list);
    console.log(time_transfered);
  
    
  for(let i = 0; i < list.length; i++){
       let ms = list[i].created_at_time*1000;
       var time_transfered = new Date(ms);
       outputRaffleEntries.innerHTML += '<tr><td><b>' + (i+1) + '.</td> </b><td>' + list[i].sender_name + '</td> <td class = "time"> ' + time_transfered +'</tr>';
    }

  }).catch(function (error) {
    console.log(error);

  })