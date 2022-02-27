  const urlRaffleEntries = "https://wax.api.atomicassets.io/atomicassets/v1/transfers?recipient=modded.gm&schema_name=miners&page=1&limit=100&order=desc&sort=created";
  const outputRaffleEntries = document.querySelector('.outputRaffleEntries');
  const outputRaffleDates = document.querySelector('.outputRaffleDates');


  outputRaffleEntries.innerHTML = "";
  outputRaffleDates.innerHTML = "";

  const raffleStart = new Date('FEBRUARY 26, 22 12:00:00 GMT+00:00');
  const raffleEnd = new Date('MARCH 7, 22 12:00:00 GMT+00:00');

  // milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  console.log(raffleStart.getTime());

  outputRaffleDates.innerHTML += '<tr><td class = "raffleDates"><b>START DATE:  ' + raffleStart + '</b></td><br></tr><tr><td class ="raffleDates" ><b>END DATE:  ' + raffleEnd + '</b></td></tr>';

  fetch(urlRaffleEntries).then(function (res) {
    return res.json()
  }).then(function (data) {
    
    let list = data.data;
    
  for(let i = 0; i < list.length; i++){
       let ms = list[i].created_at_time;
       var time_transfered = new Date(ms*1000);
       if (ms>raffleStart && ms<raffleEndingDate){
       outputRaffleEntries.innerHTML += '<tr><td><b>' + (i+1) + '.</td> </b><td>' + list[i].sender_name + '</td> <td class = "time"> ' + time_transfered +'</tr>';
       }
    }

  }).catch(function (error) {
    console.log(error);

  })