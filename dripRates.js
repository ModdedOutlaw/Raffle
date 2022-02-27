  /*Common GameBuddy Miner*/
  const urlMinerStats = "https://wax.api.atomicassets.io/atomicassets/v1/schemas/upluft/miners/stats";
 
 
 
  const outputMinerStats = document.querySelector('.outputMinerStats');


  outputMinerStats.innerHTML = "";
  
  /********************
   * 
   * 
   */



  fetch(urlMinerStats).then(function (res) {
    return res.json()
  }).then(function (data) {
    
    let list = data.data;
 
    console.log(list);
    

  }).catch(function (error) {
    console.log(error);

  })