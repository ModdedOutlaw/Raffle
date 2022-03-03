  const outputRaffleEntries = document.querySelector('.outputRaffleEntries');
  const outputRaffleDates = document.querySelector('.outputRaffleDates');


  outputRaffleEntries.innerHTML = "";
  outputRaffleDates.innerHTML = "";
  var winner = parseInt("1000");
  //const raffleStart = new Date('FEBRUARY 28, 22 12:00:00 GMT+00:00'); // raffleStart.getTime()

  const raffleStart = parseInt("1646187252500");
  const raffleEnd = new Date('MARCH 7, 22 12:00:00 GMT+00:00');

  // milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  //console.log(raffleStart.getTime());

  //outputRaffleDates.innerHTML += '<tr><td ><b>START DATE:  ' + raffleStart + '</b></td><br></tr><tr><td ><b>END DATE:  ' + raffleEnd + '</b></td></tr>';
  const urlRaffleEntries = "https://wax.api.atomicassets.io/atomicassets/v1/transfers?recipient=moddedwax.gm&schema_name=miners&collection_name=upliftworld&after="+raffleStart+"&page=1&limit=100&order=desc&sort=created";

  fetch(urlRaffleEntries).then(function (res) {
    return res.json()
  }).then(function (data) {
     
    
    let list = data.data;
    console.log(list[0].assets[0].template.template_id);



    j =0;

  for(let i = list.length-1; i >= 0; i--){
       var ms = list[i].created_at_time;
       var time_transfered = new Date(parseInt(list[i].created_at_time));
       if (ms>raffleStart && ms<raffleEnd){
         if(j==winner-1){
          outputRaffleEntries.innerHTML += '<tr style="background-color: #06ffff"><td><b>' + (j+1) + '.</td> </b><td>' + list[i].sender_name + '</td> <td class = "time"> ' + time_transfered +'</tr>';

         }else{
       outputRaffleEntries.innerHTML += '<tr><td><b>' + (j+1) + '.</td> </b><td>' + list[i].sender_name + '</td> <td class = "time"> ' + time_transfered +'</tr>';
       //outputRaffleEntries.innerHTML += '<tr><td><b>' + (i+1) + '.</td> </b><td>' + list[i].sender_name + '</td></tr>';

         }
      j++; 
      }
      if(j==15){
        outputRaffleEntries.innerHTML +='<hr>'
      }
    }

  }).catch(function (error) {
    console.log(error);

  })