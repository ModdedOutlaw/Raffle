
 async function fetchRaffleEntries(){ 
  const outputRaffleEntries = document.querySelector('.outputRaffleEntries');
  const outputRaffleDates = document.querySelector('.outputRaffleDates');


  outputRaffleEntries.innerHTML = "";
  outputRaffleDates.innerHTML = "";
  var winner = parseInt("1000");
  //const raffleStart = new Date('FEBRUARY 28, 22 12:00:00 GMT+00:00'); // raffleStart.getTime()

  const raffleStart = parseInt("1646187252500");
  const raffleEnd = new Date('MARCH 8, 22 12:00:00 GMT+00:00');

  // milliseconds since Jan 1, 1970, 00:00:00.000 GMT
  //console.log(raffleStart.getTime());

  //outputRaffleDates.innerHTML += '<tr><td ><b>START DATE:  ' + raffleStart + '</b></td><br></tr><tr><td ><b>END DATE:  ' + raffleEnd + '</b></td></tr>';
  const urlRaffleEntries = "https://wax.api.atomicassets.io/atomicassets/v1/transfers?recipient=moddedwax.gm&schema_name=miners&collection_name=upliftworld&after="+raffleStart+"&page=1&limit=100&order=desc&sort=created";

 const response = await fetch(urlRaffleEntries).then(function (res) {
    return res.json()
  }).then(function (data) {
     
    
    let list = data.data;
    console.log(list);

    raffleNumber = 1;

  for(let totalEntries = list.length-1; totalEntries >= 0; totalEntries--){

       var ms = list[totalEntries].created_at_time;
       var time_transfered = new Date(parseInt(list[totalEntries].created_at_time));
       if (ms>raffleStart && ms<raffleEnd){
         if(list[totalEntries].assets.length >= 2){
           transferAmount = list[totalEntries].assets.length;
           let assetIndex = 0;
           while(transferAmount > 0){
             if(list[totalEntries].assets[assetIndex].data.rarity == "Common"||list[totalEntries].assets[assetIndex].data.rarity == "Uncommon"){
            outputRaffleEntries.innerHTML += '<tr ><td><b>' + raffleNumber + '.</td> </b><td>' + list[totalEntries].sender_name + '</td> <td class = "time"> ' + time_transfered +'</tr>';
            raffleNumber++;
             }
             assetIndex++;
            transferAmount--;
           }
         }else{
          if(list[totalEntries].assets[0].data.rarity == "Common"||list[totalEntries].assets[0].data.rarity == "Uncommon"){
            outputRaffleEntries.innerHTML += '<tr ><td><b>' + raffleNumber + '.</td> </b><td>' + list[totalEntries].sender_name + '</td> <td class = "time"> ' + time_transfered +'</tr>';
            raffleNumber++; 
             }
            }
      }
    }

  }).catch(function (error) {
    console.log(error);

  })

}

//fetchRaffleEntries();