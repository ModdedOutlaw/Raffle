  const urlWalletData = "https://wax.api.atomicassets.io/atomicassets/v1/transfers?recipient=modded.gm&schema_name=miners&page=1&limit=100&order=desc&sort=created";
  const outputDripRates = document.querySelector('.outputDripRates');


  outputDripRates.innerHTML = "";
  
  /********************
   * 
   * 
   */
   const moonLanding = new Date('July 20, 69 20:17:40 GMT+00:00');

   // milliseconds since Jan 1, 1970, 00:00:00.000 GMT
   console.log(moonLanding.getTime());
   // expected output: -14182940000
   


  fetch(urlWalletData).then(function (res) {
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